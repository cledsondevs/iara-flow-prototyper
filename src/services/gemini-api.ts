// Configuração da API do Gemini
const getGeminiApiKey = () => {
  return localStorage.getItem("gemini_api_key") || process.env.GEMINI_API_KEY || "";
};

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
    finishReason: string;
    index: number;
  }[];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

export interface GeminiChatRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

class GeminiApiService {
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  async chat(
    message: string,
    conversationHistory: GeminiMessage[] = [],
    apiKey?: string
  ): Promise<{ success: boolean; response?: string; error?: string; usage?: any }> {
    try {
      const key = apiKey || getGeminiApiKey();
      
      if (!key) {
        return {
          success: false,
          error: 'Chave da API do Gemini não configurada'
        };
      }

      // Preparar mensagens para o Gemini
      const messages: GeminiMessage[] = [
        ...conversationHistory,
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      const requestBody: GeminiChatRequest = {
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      };

      const response = await fetch(`${this.baseUrl}?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data: GeminiResponse = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        return {
          success: false,
          error: 'Nenhuma resposta gerada pelo Gemini'
        };
      }

      const candidate = data.candidates[0];
      const responseText = candidate.content.parts[0]?.text || '';

      return {
        success: true,
        response: responseText,
        usage: data.usageMetadata
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido ao chamar API do Gemini'
      };
    }
  }

  async generateResponse(prompt: string, apiKey?: string): Promise<{ success: boolean; response?: string; error?: string }> {
    return this.chat(prompt, [], apiKey);
  }
}

export const geminiApiService = new GeminiApiService();
export default geminiApiService;

