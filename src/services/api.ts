// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
  async createFlow(flowData: {
    name: string;
    description?: string;
    flow_data: FlowData;
  }): Promise<ApiResponse<{ flow: Flow; validation_warnings?: string[] }>> {
    return this.request('/flows', {
      method: 'POST',
      body: JSON.stringify(flowData),
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
    updates: {
      name?: string;
      description?: string;
      flow_data?: FlowData;
    }
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
  ): Promise<ApiResponse<{
    execution: FlowExecution;
    output?: string;
    error?: string;
  }>> {
    return this.request(`/flows/${flowId}/execute`, {
      method: 'POST',
      body: JSON.stringify({ input }),
    });
  }

  async validateFlow(flowId: string): Promise<ApiResponse<{
    validation: {
      valid: boolean;
      errors: string[];
      warnings: string[];
    };
  }>> {
    return this.request(`/flows/${flowId}/validate`, {
      method: 'POST',
    });
  }

  async getFlowExecutions(flowId: string): Promise<ApiResponse<{
    executions: FlowExecution[];
  }>> {
    return this.request(`/flows/${flowId}/executions`);
  }

  async getExecution(executionId: string): Promise<ApiResponse<{
    execution: FlowExecution;
  }>> {
    return this.request(`/executions/${executionId}`);
  }

  // Método para executar fluxo diretamente (sem salvar)
  async executeFlowDirect(flowData: FlowData, input: string): Promise<ApiResponse<{
    execution: FlowExecution;
    output?: string;
    error?: string;
  }>> {
    // Primeiro criar um fluxo temporário
    const createResult = await this.createFlow({
      name: `Fluxo Temporário ${Date.now()}`,
      description: 'Fluxo criado para execução direta',
      flow_data: flowData,
    });

    if (!createResult.success || !createResult.data) {
      return {
        success: false,
        error: createResult.error || 'Erro ao criar fluxo temporário',
      };
    }

    const flowId = createResult.data.flow.id;

    try {
      // Executar o fluxo
      const executeResult = await this.executeFlow(flowId, input);

      // Deletar o fluxo temporário (opcional, pode manter para histórico)
      // await this.deleteFlow(flowId);

      return executeResult;
    } catch (error) {
      // Tentar deletar o fluxo temporário mesmo em caso de erro
      try {
        await this.deleteFlow(flowId);
      } catch (deleteError) {
        console.warn('Erro ao deletar fluxo temporário:', deleteError);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro na execução',
      };
    }
  }
}

export const apiService = new ApiService();
export default apiService;

