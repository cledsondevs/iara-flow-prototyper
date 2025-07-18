// Configuração da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://54.162.170.1:5000/api';
export interface FlowData {
  nodes: any[];
  edges: any[];
  exportedAt?: string;
}
export interface Flow {
  id: string;
  name: string;
  description: string;
  flow_data: FlowData;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface FlowExecution {
  id: string;
  flow_id: string;
  input_data: any;
  output_data: any;
  status: string;
  error_message?: string;
  started_at: string;
  completed_at?: string;
}
export interface ExecutionResult {
  success: boolean;
  output?: string; // A saída principal do agente
  message?: string; // Mensagem de sucesso do agente
  error?: string;
}
export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}
class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }
  // Métodos para Fluxos
  async createFlow({
    name,
    description,
    flow_data,
  }: { name: string; description?: string; flow_data: FlowData }): Promise<
    ApiResponse<{ flow: Flow; validation_warnings?: string[] }>
  > {
    return this.request('/flows', {
      method: 'POST',
      body: JSON.stringify({ name, description, flow_data }),
    });
  }
  async listFlows(): Promise<ApiResponse<{ flows: Flow[] }>> {
    return this.request('/flows');
  }
  async getFlow(flowId: string): Promise<ApiResponse<{ flow: Flow }>> {
    return this.request(`/flows/${flowId}`);
  }
  async updateFlow(
    flowId: string,
    updates: { name?: string; description?: string; flow_data?: FlowData }
  ): Promise<ApiResponse<{ flow: Flow }>> {
    return this.request(`/flows/${flowId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }
  async deleteFlow(flowId: string): Promise<ApiResponse<{ message: string }>> {
    return this.request(`/flows/${flowId}`, {
      method: 'DELETE',
    });
  }
  async executeFlow(
    flowId: string,
    input: string
  ): Promise<
    ApiResponse<{ execution: FlowExecution; output?: string; error?: string }>
  > {
    return this.request(`/flows/${flowId}/execute`, {
      method: 'POST',
      body: JSON.stringify({ input }),
    });
  }
  async validateFlow(flowId: string): Promise<
    ApiResponse<{ validation: { valid: boolean; errors: string[]; warnings: string[] } }>
  > {
    return this.request(`/flows/${flowId}/validate`, {
      method: 'POST',
    });
  }
  async getFlowExecutions(flowId: string): Promise<
    ApiResponse<{ executions: FlowExecution[] }>
  > {
    return this.request(`/flows/${flowId}/executions`);
  }
  async getExecution(executionId: string): Promise<
    ApiResponse<{ execution: FlowExecution }>
  > {
    return this.request(`/executions/${executionId}`);
  }
  // Método para executar fluxo diretamente (sem salvar no DynamoDB)
  async executeFlowDirect(
    flowData: FlowData,
    input: string = '',
    userId: string
  ): Promise<ApiResponse<ExecutionResult>> {
    return this.request('/flow/execute', {
      method: 'POST',
      body: JSON.stringify({
        flow_data: flowData, // Mantido para compatibilidade, mas o backend usa apenas input e user_id
        input: input,
        user_id: userId,
      }),
    });
  }
  // Método para validar fluxo diretamente (sem salvar no DynamoDB)
  async validateFlowDirect(flowData: FlowData): Promise<
    ApiResponse<{ validation: { valid: boolean; errors: string[]; warnings: string[] } }>
  > {
    return this.request('/flow/validate', {
      method: 'POST',
      body: JSON.stringify({
        flow_data: flowData
      }),
    });
  }
  // Método para testar se a API está funcionando
  async testConnection(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    return this.request('/flow/test');
  }
}
export const apiService = new ApiService();
export default apiService;


