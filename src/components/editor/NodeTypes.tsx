import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Bot, Brain, MessageSquare, Database, Zap, Search, FileText, Image, Code, Cpu, GitBranch, Workflow, FlaskConical } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

// Tipos de dados para os nós de agentes de IA
export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
}

export interface AgentNodeData extends BaseNodeData {
  agentType: 'chatbot' | 'analyzer' | 'retriever' | 'generator' | 'processor' | 'langchain_agent' | 'review_collector' | 'sentiment_analyzer' | 'backlog_generator' | 'memory_manager' | 'email_sender' | 'postgresql_memory' | 'openai_assistant' | 'gemini_agent';
  provider?: 'openai' | 'gemini';
  model?: string;
  temperature?: number;
  maxTokens?: number;
  instructions?: string;
  // Email-specific properties
  toEmail?: string;
  subject?: string;
  emailBody?: string;
  // PostgreSQL-specific properties
  connectionString?: string;
  tableName?: string;
  operation?: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  query?: string;
  fields?: string;
  conditions?: string;
}

export interface DataNodeData extends BaseNodeData {
  dataType: 'input' | 'output' | 'database' | 'api' | 'file' | 'boolean';
  format?: string;
  size?: string;
  userInput?: string;
  value?: boolean;
  apiUrl?: string; // Adiciona URL da API para o tipo External API
}

// Tipos de dados para os nós de lógica
export interface LogicNodeData extends Record<string, unknown> {
  label: string;
  conditionType: 'if' | 'else';
  condition?: string;
  description?: string;
}

// Componente Nó de Agente de IA
export const AgentNode = memo(({ data, isExecuting, isActive }: NodeProps & { 
  data: AgentNodeData; 
  isExecuting?: boolean; 
  isActive?: boolean; 
}) => {
  const getIcon = () => {
    switch (data.agentType) {
      case 'chatbot': return MessageSquare;
      case 'analyzer': return Brain;
      case 'retriever': return Search;
      case 'generator': return Zap;
      case 'processor': return Cpu;
      case 'langchain_agent': return FlaskConical;
      case 'review_collector': return FileText; // Ícone para coletor de reviews
      case 'sentiment_analyzer': return Brain; // Ícone para analisador de sentimento
      case 'backlog_generator': return Workflow; // Ícone para gerador de backlog
      case 'memory_manager': return Database; // Ícone para gerenciador de memória
      case 'email_sender': return MessageSquare; // Ícone para envio de e-mail
      case 'postgresql_memory': return Database; // Ícone para memória PostgreSQL
      case 'gemini_agent': return Brain; // Ícone para agente Gemini
      default: return Bot;
    }
  };
  
  const Icon = getIcon();
  
  const getColor = () => {
    switch (data.agentType) {
      case 'chatbot': return 'text-blue-600';
      case 'analyzer': return 'text-purple-600';
      case 'retriever': return 'text-green-600';
      case 'generator': return 'text-orange-600';
      case 'processor': return 'text-red-600';
      case 'langchain_agent': return 'text-pink-600';
      case 'review_collector': return 'text-cyan-600'; // Cor para coletor de reviews
      case 'sentiment_analyzer': return 'text-indigo-600'; // Cor para analisador de sentimento
      case 'backlog_generator': return 'text-lime-600'; // Cor para gerador de backlog
      case 'memory_manager': return 'text-amber-600'; // Cor para gerenciador de memória
      case 'email_sender': return 'text-teal-600'; // Cor para envio de e-mail
      case 'postgresql_memory': return 'text-purple-600'; // Cor para memória PostgreSQL
      case 'gemini_agent': return 'text-purple-600'; // Cor para agente Gemini
      default: return 'text-gray-600';
    }
  };

  // Aplicar animação apenas durante execução e se o nó estiver ativo
  const animationClass = isExecuting && isActive 
    ? 'animate-pulse border-primary/60 shadow-lg shadow-primary/20' 
    : '';

  return (
    <div className={`px-4 py-3 bg-card border-2 border-primary/20 rounded-lg min-w-[180px] shadow-lg transition-all duration-300 ${animationClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${getColor()}`} />
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      {data.provider && data.model && (
        <div className="text-xs text-muted-foreground font-mono mb-1">
          {data.provider.toUpperCase()}: {data.model}
        </div>
      )}
      
      {data.instructions && (
        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {data.instructions}
        </div>
      )}
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-primary border-2 border-card"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-primary border-2 border-card"
      />
    </div>
  );
});

// Componente Nó de Dados
export const DataNode = memo(({ data, id, isExecuting, isActive }: NodeProps & { 
  data: DataNodeData; 
  id: string; 
  isExecuting?: boolean; 
  isActive?: boolean; 
}) => {
  const [userInput, setUserInput] = useState(data.userInput || '');
  
  const getIcon = () => {
    switch (data.dataType) {
      case 'input': return FileText;
      case 'output': return FileText;
      case 'database': return Database;
      case 'api': return Code;
      case 'file': return FileText;
      case 'boolean': return Search;
      default: return Database;
    }
  };
  
  const Icon = getIcon();
  
  const getColor = () => {
    switch (data.dataType) {
      case 'input': return 'text-blue-600';
      case 'output': return 'text-green-600';
      case 'database': return 'text-purple-600';
      case 'api': return 'text-orange-600';
      case 'file': return 'text-gray-600';
      case 'boolean': return 'text-indigo-600';
      default: return 'text-gray-600';
    }
  };

  // Aplicar animação apenas durante execução e se o nó estiver ativo
  const animationClass = isExecuting && isActive 
    ? 'animate-pulse border-primary/60 shadow-lg shadow-primary/20' 
    : '';

  // Atualizar dados do nó quando o input muda
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);
    // Atualizar os dados do nó usando um evento customizado
    window.dispatchEvent(new CustomEvent('updateNodeData', {
      detail: { nodeId: id, updates: { userInput: value } }
    }));
  };

  return (
    <div className={`px-3 py-2 bg-card border border-border rounded-lg min-w-[180px] shadow-md transition-all duration-300 ${animationClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${getColor()}`} />
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      {data.dataType === 'input' && (
        <div className="mt-2">
          <Textarea
            placeholder="Digite sua mensagem aqui..."
            value={userInput}
            onChange={handleInputChange}
            className="nodrag min-h-[60px] text-xs"
          />
        </div>
      )}
      
      {data.dataType === 'boolean' && (
        <div className="mt-2 flex items-center gap-2">
          <button
            className={`px-3 py-1 text-xs rounded ${data.value === true ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('updateNodeData', {
                detail: { nodeId: id, updates: { value: true } }
              }));
            }}
          >
            TRUE
          </button>
          <button
            className={`px-3 py-1 text-xs rounded ${data.value === false ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('updateNodeData', {
                detail: { nodeId: id, updates: { value: false } }
              }));
            }}
          >
            FALSE
          </button>
        </div>
      )}
      
      {data.format && (
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          {data.format}
        </div>
      )}
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-primary border border-card"
      />
      
      {data.dataType === 'boolean' ? (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="true"
            className="w-3 h-3 bg-green-500 border-2 border-green-600"
            style={{ left: '25%' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="false"
            className="w-3 h-3 bg-red-500 border-2 border-red-600"
            style={{ left: '75%' }}
          />
        </>
      ) : (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-2 h-2 !bg-primary border border-card"
        />
      )}
    </div>
  );
});

// Componente Nó de Lógica (If/Else)
export const LogicNode = memo(({ data, id, isExecuting, isActive }: NodeProps & { 
  data: LogicNodeData; 
  id: string; 
  isExecuting?: boolean; 
  isActive?: boolean; 
}) => {
  const [condition, setCondition] = useState(data.condition || '');
  
  const getIcon = () => {
    switch (data.conditionType) {
      case 'if': return GitBranch;
      case 'else': return Workflow;
      default: return GitBranch;
    }
  };

  const getColor = () => {
    switch (data.conditionType) {
      case 'if': return 'text-amber-600';
      case 'else': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBgColor = () => {
    switch (data.conditionType) {
      case 'if': return 'bg-amber-50 border-amber-200';
      case 'else': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  // Aplicar animação apenas durante execução e se o nó estiver ativo
  const animationClass = isExecuting && isActive 
    ? 'animate-pulse border-primary/60 shadow-lg shadow-primary/20' 
    : '';

  // Atualizar condição quando muda
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCondition(value);
    // Atualizar os dados do nó usando um evento customizado
    window.dispatchEvent(new CustomEvent('updateNodeData', {
      detail: { nodeId: id, updates: { condition: value } }
    }));
  };

  const Icon = getIcon();

  return (
    <div className={`px-3 py-2 border rounded-lg min-w-[180px] shadow-md transition-all duration-300 ${getBgColor()} ${animationClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${getColor()}`} />
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      {data.conditionType === 'if' && (
        <div className="mt-2">
          <Input
            placeholder="Ex: length > 10"
            value={condition}
            onChange={handleConditionChange}
            className="nodrag text-xs"
          />
          <div className="text-xs text-muted-foreground mt-1">
            Condição a ser avaliada
          </div>
        </div>
      )}
      
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description}
        </div>
      )}
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-background border-2 border-border"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-background border-2 border-border"
      />
      
      {data.conditionType === 'if' && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="true"
            className="w-3 h-3 bg-green-500 border-2 border-green-600"
            style={{ left: '25%' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="false"
            className="w-3 h-3 bg-red-500 border-2 border-red-600"
            style={{ left: '75%' }}
          />
        </>
      )}
    </div>
  );
});

AgentNode.displayName = 'AgentNode';
DataNode.displayName = 'DataNode';


