import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithMock: () => Promise<{ success: boolean; error?: string }>;
  register: (username: string, password: string, email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);
    const sessionToken = authService.getSessionToken();
    const isMockUser = localStorage.getItem('is_mock_user') === 'true';
    
    if (!sessionToken || !authService.isAuthenticated()) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    // Se for usuário mock, não fazer verificação no servidor
    if (isMockUser) {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        setUser({
          id: parseInt(userId),
          username: 'usuario_mock',
          email: 'mock@exemplo.com',
        });
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      return;
    }

    try {
      const verifyResult = await authService.verifySession(sessionToken);
      if (verifyResult.valid && verifyResult.user_id) {
        setUser({
          id: verifyResult.user_id,
          username: verifyResult.username || '',
          email: verifyResult.email || '',
        });
        setIsAuthenticated(true);
      } else {
        // Sessão inválida, limpar dados
        localStorage.removeItem('session_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('is_mock_user');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await authService.login(username, password);
      if (result.session_token && result.user_id) {
        setUser({
          id: result.user_id,
          username: username,
          email: '', // Será preenchido na próxima verificação
        });
        setIsAuthenticated(true);
        await checkAuth(); // Atualizar dados completos do usuário
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Erro no login' };
      }
    } catch (error) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const loginWithMock = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simular um delay para parecer mais realista
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Criar usuário mock
      const mockUser: User = {
        id: 999,
        username: 'usuario_mock',
        email: 'mock@exemplo.com'
      };
      
      // Simular token de sessão mock
      const mockSessionToken = 'mock_session_token_' + Date.now();
      const mockExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 horas
      
      // Salvar no localStorage para manter consistência
      localStorage.setItem('session_token', mockSessionToken);
      localStorage.setItem('user_id', String(mockUser.id));
      localStorage.setItem('expires_at', mockExpiresAt);
      localStorage.setItem('is_mock_user', 'true');
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login com usuário mock' };
    }
  };

  const register = async (username: string, password: string, email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await authService.register(username, password, email);
      if (result.user_id) {
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Erro no registro' };
      }
    } catch (error) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const logout = async () => {
    const sessionToken = authService.getSessionToken();
    const isMockUser = localStorage.getItem('is_mock_user') === 'true';
    
    if (sessionToken && !isMockUser) {
      try {
        await authService.logout(sessionToken);
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
    
    // Limpar todos os dados do localStorage
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('is_mock_user');
    
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginWithMock,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
