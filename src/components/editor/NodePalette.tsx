import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Brain, MessageSquare, Database, Zap, Search, FileText, Code, Plus, GitBranch, Workflow, FlaskConical, Mail } from 'lucide-react';

interface NodePaletteProps {
  onAddNode: (type: string, data: any) => void;
}

export const NodePalette = ({ onAddNode }: NodePaletteProps) => {
  const [activeCategory, setActiveCategory] = useState<'agents' | 'data' | 'logic'>('agents');

  const agentTemplates = [
    {
      id: 'chatbot-agent',
      label: 'Chat Assistant',
      icon: MessageSquare,
      description: 'Assistente conversacional',
      color: 'text-blue-600',
      data: {
        label: 'Chat Assistant',
        agentType: 'chatbot',
        model: 'GPT-4',
        temperature: 0.7,
        instructions: 'Assistente conversacional para suporte ao cliente'
      }
    },
    {
      id: 'langchain-agent',
      label: 'LangChain Agent',
      icon: FlaskConical,
      description: 'Agente com ferramentas',
      color: 'text-pink-600',
      data: {
        label: 'LangChain Agent',
        agentType: 'langchain_agent',
        provider: 'gemini',
        model: 'gemini-1.5-flash',
        temperature: 0.7,
        instructions: 'Agente inteligente que pode decidir usar ferramentas externas'
      }
    },
    {
      id: 'analyzer-agent',
      label: 'Data Analyzer',
      icon: Brain,
      description: 'Análise de dados',
      color: 'text-purple-600',
      data: {
        label: 'Data Analyzer',
        agentType: 'analyzer',
        model: 'Claude-3',
        temperature: 0.3,
        instructions: 'Analisa e processa dados estruturados'
      }
    },
    {
      id: 'retriever-agent',
      label: 'Info Retriever',
      icon: Search,
      description: 'Busca informações',
      color: 'text-green-600',
      data: {
        label: 'Info Retriever',
        agentType: 'retriever',
        model: 'Embedding Model',
        temperature: 0.1,
        instructions: 'Busca e recupera informações relevantes'
      }
    },
    {
      id: 'generator-agent',
      label: 'Content Generator',
      icon: Zap,
      description: 'Gera conteúdo',
      color: 'text-orange-600',
      data: {
        label: 'Content Generator',
        agentType: 'generator',
        model: 'GPT-4',
        temperature: 0.8,
        instructions: 'Gera conteúdo criativo e original'
      }
    },
    {
      id: 'review-collector-agent',
      label: 'Review Collector',
      icon: FileText,
      description: 'Coleta reviews de lojas de aplicativos',
      color: 'text-cyan-600',
      data: {
        label: 'Review Collector',
        agentType: 'review_collector',
        instructions: 'Coleta reviews de Google Play e App Store. Requer appId e store.'
      }
    },
    {
      id: 'sentiment-analyzer-agent',
      label: 'Sentiment Analyzer',
      icon: Brain,
      description: 'Analisa sentimento e tópicos de reviews',
      color: 'text-indigo-600',
      data: {
        label: 'Sentiment Analyzer',
        agentType: 'sentiment_analyzer',
        model: 'OpenAI',
        instructions: 'Analisa o sentimento e extrai tópicos de reviews'
      }
    },
    {
      id: 'backlog-generator-agent',
      label: 'Backlog Generator',
      icon: Workflow,
      description: 'Gera itens de backlog automaticamente',
      color: 'text-lime-600',
      data: {
        label: 'Backlog Generator',
        agentType: 'backlog_generator',
        instructions: 'Cria itens de backlog baseados em reviews'
      }
    },
    {
      id: 'memory-manager-agent',
      label: 'Memory Manager',
      icon: Database,
      description: 'Gerencia a memória de longo prazo do agente',
      color: 'text-amber-600',
      data: {
        label: 'Memory Manager',
        agentType: 'memory_manager',
        instructions: 'Gerencia a memória do agente. Requer userId e sessionId.'
      }
    },
    {
      id: 'email-sender-agent',
      label: 'Email Sender',
      icon: Mail,
      description: 'Envia emails automaticamente',
      color: 'text-teal-600',
      data: {
        label: 'Email Sender',
        agentType: 'email_sender',
        instructions: 'Envia emails para destinatários específicos',
        toEmail: '',
        subject: '',
        emailBody: ''
      }
    },
    {
      id: 'postgresql-memory-agent',
      label: 'PostgreSQL Memory',
      icon: Database,
      description: 'Conecta com banco PostgreSQL',
      color: 'text-purple-600',
      data: {
        label: 'PostgreSQL Memory',
        agentType: 'postgresql_memory',
        instructions: 'Conecta com banco PostgreSQL para armazenar e recuperar dados',
        connectionString: '',
        tableName: '',
        operation: 'SELECT',
        query: '',
        fields: '*',
        conditions: ''
      }
    }
  ];

  const dataTemplates = [
    {
      id: 'input-data',
      label: 'User Input',
      icon: FileText,
      description: 'Entrada do usuário',
      color: 'text-blue-600',
      data: {
        label: 'User Input',
        dataType: 'input',
        format: 'text/plain'
      }
    },
    {
      id: 'boolean-data',
      label: 'True/False',
      icon: Search,
      description: 'Valor booleano',
      color: 'text-indigo-600',
      data: {
        label: 'Boolean',
        dataType: 'boolean',
        value: true
      }
    },
    {
      id: 'output-data',
      label: 'Agent Output',
      icon: FileText,
      description: 'Saída do agente',
      color: 'text-green-600',
      data: {
        label: 'Agent Output',
        dataType: 'output',
        format: 'text/plain'
      }
    },
    {
      id: 'database-data',
      label: 'Knowledge Base',
      icon: Database,
      description: 'Base de conhecimento',
      color: 'text-purple-600',
      data: {
        label: 'Knowledge Base',
        dataType: 'database',
        format: 'vector/embeddings'
      }
    },
    {
      id: 'api-data',
      label: 'External API',
      icon: Code,
      description: 'Serviço externo',
      color: 'text-orange-600',
      data: {
        label: 'External API',
        dataType: 'api',
        format: 'application/json',
        apiUrl: ''
      }
    }
  ];

  const logicTemplates = [
    {
      id: 'if-condition',
      label: 'Condition (If)',
      icon: GitBranch,
      description: 'Condição lógica',
      color: 'text-amber-600',
      data: {
        label: 'If Condition',
        conditionType: 'if',
        condition: 'length > 10',
        description: 'Verifica se a condição é verdadeira'
      }
    },
    {
      id: 'else-condition',
      label: 'Alternative (Else)',
      icon: Workflow,
      description: 'Caminho alternativo',
      color: 'text-red-600',
      data: {
        label: 'Else',
        conditionType: 'else',
        description: 'Executa quando a condição é falsa'
      }
    }
  ];

  const handleAddNode = (template: any) => {
    if (activeCategory === 'agents') {
      onAddNode('agent', template.data);
    } else if (activeCategory === 'data') {
      onAddNode('data', template.data);
    } else if (activeCategory === 'logic') {
      onAddNode('logic', template.data);
    }
  };

  return (
    <Card className="w-80 h-full bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Agentes de IA
        </CardTitle>
        
        <div className="flex rounded-lg bg-muted p-1">
          <Button
            variant={activeCategory === 'agents' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveCategory('agents')}
          >
            <Brain className="w-3 h-3 mr-1" />
            Agentes
          </Button>
          <Button
            variant={activeCategory === 'data' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveCategory('data')}
          >
            <Database className="w-3 h-3 mr-1" />
            Dados
          </Button>
          <Button
            variant={activeCategory === 'logic' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveCategory('logic')}
          >
            <GitBranch className="w-3 h-3 mr-1" />
            Lógica
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 space-y-2">
        {activeCategory === 'agents' && (
          <>
            <div className="text-xs font-medium text-muted-foreground mb-3">
              Adicione agentes de IA ao seu fluxo
            </div>
            {agentTemplates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                className="w-full justify-start h-auto p-3 bg-card hover:bg-accent text-left"
                onClick={() => handleAddNode(template)}
              >
                <template.icon className={`w-4 h-4 mr-3 ${template.color} flex-shrink-0`} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{template.label}</div>
                  <div className="text-xs text-muted-foreground">{template.description}</div>
                </div>
              </Button>
            ))}
          </>
        )}

        {activeCategory === 'data' && (
          <>
            <div className="text-xs font-medium text-muted-foreground mb-3">
              Fontes de dados e APIs
            </div>
            {dataTemplates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                className="w-full justify-start h-auto p-3 bg-card hover:bg-accent text-left"
                onClick={() => handleAddNode(template)}
              >
                <template.icon className={`w-4 h-4 mr-3 ${template.color} flex-shrink-0`} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{template.label}</div>
                  <div className="text-xs text-muted-foreground">{template.description}</div>
                </div>
              </Button>
            ))}
          </>
        )}

        {activeCategory === 'logic' && (
          <>
            <div className="text-xs font-medium text-muted-foreground mb-3">
              Nós de controle de fluxo
            </div>
            {logicTemplates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                className="w-full justify-start h-auto p-3 bg-card hover:bg-accent text-left"
                onClick={() => handleAddNode(template)}
              >
                <template.icon className={`w-4 h-4 mr-3 ${template.color} flex-shrink-0`} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{template.label}</div>
                  <div className="text-xs text-muted-foreground">{template.description}</div>
                </div>
              </Button>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

