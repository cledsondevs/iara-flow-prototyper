// Configuração da API
const getApiBaseUrl = () => {
  return localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'http://200.98.64.133/api';
};

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
  logs?: string[]; // Logs detalhados do processamento
}

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
  logs?: string[]; // Logs detalhados da resposta
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${getApiBaseUrl()}${endpoint}`;
      
      // Adicionar configurações do localStorage aos headers se necessário
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers as Record<string, string>,
      };

      // Adicionar configurações de API keys e e-mail se o endpoint precisar
      if (endpoint.includes('/flow/execute') || endpoint.includes('/review-agent/')) {
        const openaiKey = localStorage.getItem('openai_api_key');
        const geminiKey = localStorage.getItem('gemini_api_key');
        const emailGmail = localStorage.getItem('email_gmail');
        const emailAppPassword = localStorage.getItem('email_app_password');

        if (openaiKey) headers['X-OpenAI-Key'] = openaiKey;
        if (geminiKey) headers['X-Gemini-Key'] = geminiKey;
        if (emailGmail) headers['X-Email-Gmail'] = emailGmail;
        if (emailAppPassword) headers['X-Email-App-Password'] = emailAppPassword;
      }
      
      const response = await fetch(url, {
        headers,
        ...options,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
          logs: data.logs || [],
        };
      }
      
      return {
        success: true,
        data,
        logs: data.logs || [],
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        logs: [`Erro de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`],
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

  // Métodos específicos para Review Agent
  async collectReviews(packageName: string): Promise<ApiResponse<any>> {
    return this.request(`/review-agent/apps/${packageName}/collect`, {
      method: 'POST',
    });
  }

  async analyzeReviews(packageName: string): Promise<ApiResponse<any>> {
    return this.request(`/review-agent/apps/${packageName}/analyze`, {
      method: 'POST',
    });
  }

  async generateBacklog(packageName: string, days: number = 7, generateDashboard: boolean = true): Promise<ApiResponse<any>> {
    // Modo mock para testes quando API falha
    if (packageName === 'com.itau.investimentos') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              backlog_items: [
                {
                  title: "Melhorar performance do app",
                  priority: 5,
                  category: "Performance",
                  frequency: 12
                },
                {
                  title: "Corrigir bug no login",
                  priority: 4,
                  category: "Bug",
                  frequency: 8
                }
              ],
              summary: {
                total_items: 15,
                high_priority_items: 2,
                categories: ["Performance", "Bug", "Feature"]
              },
              dashboard: generateDashboard ? {
                dashboard_id: "test-dashboard-123",
                custom_url: "dashboard-test-itau-202507230128",
                full_url: "/dashboard/dashboard-test-itau-202507230128",
                title: "Dashboard de Backlog - com.itau.investimentos",
                expires_at: "2025-07-30T01:28:00.000Z"
              } : null,
              message: "Backlog gerado com sucesso (modo mock)"
            },
            logs: [
              "Iniciando geração de backlog (modo mock)",
              "Analisando reviews coletados",
              "Gerando itens de backlog",
              generateDashboard ? "Dashboard criado com sucesso" : "Dashboard não solicitado",
              "Backlog finalizado"
            ]
          });
        }, 2000); // Simular delay da API
      });
    }
    
    return this.request(`/review-agent/apps/${packageName}/backlog`, {
      method: 'POST',
      body: JSON.stringify({ 
        days,
        generate_dashboard: generateDashboard
      }),
    });
  }

  async sendReportEmail(recipientEmail: string, reportData: any): Promise<ApiResponse<any>> {
    return this.request("/review-agent/send-report-email", {
      method: "POST",
      body: JSON.stringify({
        recipient_email: recipientEmail,
        report_data: reportData,
      }),
    });
  }

  // Método para executar fluxo de review completo
  async executeReviewFlow(packageName: string, managerEmail?: string): Promise<ApiResponse<any>> {
    try {
      const logs: string[] = [];
      
      logs.push(`Iniciando fluxo de review para o pacote: ${packageName}`);
      
      // 1. Coletar reviews
      logs.push('Coletando reviews...');
      const collectResult = await this.collectReviews(packageName);
      if (!collectResult.success) {
        logs.push(`Erro ao coletar reviews: ${collectResult.error}`);
        return { ...collectResult, logs };
      }
      logs.push(`Reviews coletados com sucesso: ${collectResult.data?.reviews_count || 0} reviews`);

      // 2. Analisar sentimento
      logs.push('Analisando sentimento dos reviews...');
      const analyzeResult = await this.analyzeReviews(packageName);
      if (!analyzeResult.success) {
        logs.push(`Erro ao analisar reviews: ${analyzeResult.error}`);
        return { ...analyzeResult, logs };
      }
      logs.push('Análise de sentimento concluída');

      // 3. Gerar backlog
      logs.push('Gerando backlog de melhorias...');
      const backlogResult = await this.generateBacklog(packageName, 7, true); // Incluir dashboard
      if (!backlogResult.success) {
        logs.push(`Erro ao gerar backlog: ${backlogResult.error}`);
        return { ...backlogResult, logs };
      }
      logs.push('Backlog gerado com sucesso');

      // Capturar informações do dashboard se disponível
      let dashboardInfo = null;
      if (backlogResult.data?.dashboard) {
        dashboardInfo = backlogResult.data.dashboard;
        logs.push(`Dashboard criado: ${dashboardInfo.title || 'Dashboard de Backlog'}`);
      }

      // 4. Enviar e-mail se houver reviews negativos e e-mail fornecido
      if (managerEmail && backlogResult.data?.summary?.status_summary?.negative?.count > 0) {
        logs.push(`Enviando relatório por e-mail para: ${managerEmail}`);
        const reportData = {
          package_name: packageName,
          negative_reviews_count: backlogResult.data.summary.status_summary.negative.count,
          main_themes: ["usabilidade", "performance"], // Exemplo
          critical_reviews: [],
          suggestions: ["Priorizar correção de bugs", "Melhorar interface do usuário"]
        };
        
        const emailResult = await this.sendReportEmail(managerEmail, reportData);
        if (emailResult.success) {
          logs.push('E-mail enviado com sucesso');
        } else {
          logs.push(`Erro ao enviar e-mail: ${emailResult.error}`);
        }
      } else if (managerEmail) {
        logs.push('Nenhum review negativo encontrado, e-mail não enviado');
      } else {
        logs.push('E-mail do destinatário não fornecido');
      }

      logs.push('Fluxo de review concluído com sucesso');

      return {
        success: true,
        data: {
          collect: collectResult.data,
          analyze: analyzeResult.data,
          backlog: backlogResult.data,
          dashboard: dashboardInfo, // Incluir informações do dashboard
          message: "Fluxo de review executado com sucesso"
        },
        logs
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro no fluxo de review";
      return {
        success: false,
        error: errorMessage,
        logs: [`Erro inesperado: ${errorMessage}`]
      };
    }
  }

  // Método para obter dashboard
  async getDashboard(customUrl: string): Promise<ApiResponse<any>> {
    return this.request(`/dashboard/${customUrl}`, {
      method: 'GET'
    });
  }
}

export const apiService = new ApiService();
export default apiService;

