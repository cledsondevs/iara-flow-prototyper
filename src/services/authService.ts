const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AuthResponse {
  message: string;
  session_token?: string;
  user_id?: number;
  expires_at?: string;
  error?: string;
}

interface UserData {
  id: number;
  username: string;
  email: string;
}

export const authService = {
  async register(username: string, password: string, email: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });
    return response.json();
  },

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data: AuthResponse = await response.json();
    if (response.ok && data.session_token) {
      localStorage.setItem('session_token', data.session_token);
      localStorage.setItem('user_id', String(data.user_id));
      localStorage.setItem('expires_at', data.expires_at || '');
    }
    return data;
  },

  async logout(sessionToken: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_token: sessionToken }),
    });
    if (response.ok) {
      localStorage.removeItem('session_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('expires_at');
    }
    return response.json();
  },

  async verifySession(sessionToken: string): Promise<{ valid: boolean; user_id?: number; username?: string; email?: string; expires_at?: string; error?: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_token: sessionToken }),
    });
    return response.json();
  },

  async getUserInfo(userId: number, sessionToken: string): Promise<UserData | { error: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    });
    return response.json();
  },

  isAuthenticated(): boolean {
    const sessionToken = localStorage.getItem('session_token');
    const expiresAt = localStorage.getItem('expires_at');
    if (!sessionToken || !expiresAt) {
      return false;
    }
    const expiryDate = new Date(expiresAt);
    return expiryDate > new Date();
  },

  getSessionToken(): string | null {
    return localStorage.getItem('session_token');
  },

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  },
};
