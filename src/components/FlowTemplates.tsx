import { Node, Edge } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Mail, Workflow, Brain } from 'lucide-react';

interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  nodes: Node[];
  edges: Edge[];
}

interface FlowTemplatesProps {
  onLoadTemplate: (template: FlowTemplate) => void;
}

export const FlowTemplates = ({ onLoadTemplate }: FlowTemplatesProps) => {
  const templates: FlowTemplate[] = [
    {
      id: 'simple-review-email-flow',
      name: 'Coleta, Análise e Email',
      description: 'Fluxo simplificado para coletar reviews, analisar sentimento e enviar e-mail.',
      icon: Mail,
      nodes: [
        {
          id: 'input-simple-review',
          type: 'data',
          position: { x: 50, y: 100 },
          data: {
            label: 'Package Name',
            dataType: 'input',
            format: 'text/plain',
            userInput: 'com.itau.investimentos'
          }
        },
        {
          id: 'review-collector-simple',
          type: 'agent',
          position: { x: 300, y: 100 },
          data: {
            label: 'Review Collector',
            agentType: 'review_collector',
            instructions: 'Coleta reviews de Google Play e App Store'
          }
        },
        {
          id: 'sentiment-analyzer-simple',
          type: 'agent',
          position: { x: 550, y: 100 },
          data: {
            label: 'Sentiment Analyzer',
            agentType: 'sentiment_analyzer',
            instructions: 'Analisa o sentimento e extrai tópicos de reviews'
          }
        },
        {
          id: 'email-sender-simple',
          type: 'agent',
          position: { x: 800, y: 100 },
          data: {
            label: 'Email Sender',
            agentType: 'email_sender',
            instructions: 'Envia emails para destinatários específicos',
            toEmail: 'gerente@empresa.com',
            subject: 'Relatório de Reviews Simplificado',
            emailBody: 'Relatório simplificado de reviews processados.'
          }
        }
      ],
      edges: [
        {
          id: 'e-simple-1',
          source: 'input-simple-review',
          target: 'review-collector-simple',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e-simple-2',
          source: 'review-collector-simple',
          target: 'sentiment-analyzer-simple',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e-simple-3',
          source: 'sentiment-analyzer-simple',
          target: 'email-sender-simple',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        }
      ]
    },
    {
      id: 'review-analysis-flow',
      name: 'Análise de Reviews',
      description: 'Fluxo completo para coletar, analisar reviews e gerar backlog automaticamente',
      icon: FileText,
      nodes: [
        {
          id: 'input-1',
          type: 'data',
          position: { x: 50, y: 100 },
          data: {
            label: 'Package Name',
            dataType: 'input',
            format: 'text/plain',
            userInput: 'com.itau.investimentos'
          }
        },
        {
          id: 'review-collector-1',
          type: 'agent',
          position: { x: 300, y: 100 },
          data: {
            label: 'Review Collector',
            agentType: 'review_collector',
            instructions: 'Coleta reviews de Google Play e App Store'
          }
        },
        {
          id: 'api-google-1',
          type: 'data',
          position: { x: 550, y: 50 },
          data: {
            label: 'External API - Google',
            dataType: 'api',
            format: 'application/json',
            apiUrl: 'http://200.98.64.133:5000/api/scraping/google-play'
          }
        },
        {
          id: 'api-apple-1',
          type: 'data',
          position: { x: 550, y: 150 },
          data: {
            label: 'External API - Apple',
            dataType: 'api',
            format: 'application/json',
            apiUrl: 'http://200.98.64.133:5000/api/scraping/apple-store'
          }
        },
        {
          id: 'sentiment-analyzer-1',
          type: 'agent',
          position: { x: 800, y: 100 },
          data: {
            label: 'Sentiment Analyzer',
            agentType: 'sentiment_analyzer',
            instructions: 'Analisa o sentimento e extrai tópicos de reviews'
          }
        },
        {
          id: 'boolean-1',
          type: 'data',
          position: { x: 1050, y: 100 },
          data: {
            label: 'Reviews Negativos?',
            dataType: 'boolean',
            value: true
          }
        },
        {
          id: 'memory-manager-1',
          type: 'agent',
          position: { x: 1300, y: 50 },
          data: {
            label: 'Memory Manager',
            agentType: 'memory_manager',
            instructions: 'Gerencia a memória do agente'
          }
        },
        {
          id: 'backlog-generator-1',
          type: 'agent',
          position: { x: 1300, y: 150 },
          data: {
            label: 'Backlog Generator',
            agentType: 'backlog_generator',
            instructions: 'Cria itens de backlog baseados em reviews'
          }
        },
        {
          id: 'email-sender-1',
          type: 'agent',
          position: { x: 1550, y: 100 },
          data: {
            label: 'Email Sender',
            agentType: 'email_sender',
            instructions: 'Envia emails para destinatários específicos',
            toEmail: 'gerente@empresa.com',
            subject: 'Relatório de Reviews Negativos',
            emailBody: 'Relatório executivo de reviews negativos detectados.'
          }
        }
      ],
      edges: [
        {
          id: 'e1-2',
          source: 'input-1',
          target: 'review-collector-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e2-3',
          source: 'review-collector-1',
          target: 'api-google-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e2-4',
          source: 'review-collector-1',
          target: 'api-apple-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e3-5',
          source: 'api-google-1',
          target: 'sentiment-analyzer-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e4-5',
          source: 'api-apple-1',
          target: 'sentiment-analyzer-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e5-6',
          source: 'sentiment-analyzer-1',
          target: 'boolean-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e6-7',
          source: 'boolean-1',
          sourceHandle: 'true',
          target: 'memory-manager-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e7-8',
          source: 'memory-manager-1',
          target: 'backlog-generator-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e8-9',
          source: 'backlog-generator-1',
          target: 'email-sender-1',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        }
      ]
    },
    {
      id: 'simple-chatbot-flow',
      name: 'Chatbot Simples',
      description: 'Fluxo básico de chatbot com entrada e saída de texto',
      icon: Brain,
      nodes: [
        {
          id: 'input-simple',
          type: 'data',
          position: { x: 100, y: 100 },
          data: {
            label: 'User Input',
            dataType: 'input',
            format: 'text/plain',
            userInput: 'Olá, como você pode me ajudar?'
          }
        },
        {
          id: 'chatbot-simple',
          type: 'agent',
          position: { x: 400, y: 100 },
          data: {
            label: 'Chat Assistant',
            agentType: 'chatbot',
            provider: 'openai',
            model: 'gpt-4',
            temperature: 0.7,
            maxTokens: 500,
            instructions: 'Assistente conversacional amigável e prestativo'
          }
        },
        {
          id: 'output-simple',
          type: 'data',
          position: { x: 700, y: 100 },
          data: {
            label: 'Agent Output',
            dataType: 'output',
            format: 'text/plain'
          }
        }
      ],
      edges: [
        {
          id: 'e-simple-1',
          source: 'input-simple',
          target: 'chatbot-simple',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        },
        {
          id: 'e-simple-2',
          source: 'chatbot-simple',
          target: 'output-simple',
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 2 }
        }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Templates de Fluxo</h2>
        <p className="text-muted-foreground">
          Escolha um template para começar rapidamente ou crie seu próprio fluxo do zero.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="w-8 h-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {template.nodes.length} nós • {template.edges.length} conexões
                  </div>
                  <Button 
                    onClick={() => onLoadTemplate(template)}
                    size="sm"
                  >
                    Usar Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Dica</h3>
        <p className="text-sm text-muted-foreground">
          O template "Análise de Reviews" implementa o fluxo completo solicitado: 
          Review Collector → APIs Externas → Sentiment Analyzer → (se negativo) Memory Manager → Backlog Generator → Email Sender
        </p>
      </div>
    </div>
  );
};

