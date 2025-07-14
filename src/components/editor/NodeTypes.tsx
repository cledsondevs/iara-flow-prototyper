import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Bot, Brain, MessageSquare, Database, Zap, Search, FileText, Image, Code, Cpu } from 'lucide-react';

// Tipos de dados para os nós de agentes de IA
export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
}

export interface AgentNodeData extends BaseNodeData {
  agentType: 'chatbot' | 'analyzer' | 'retriever' | 'generator' | 'processor';
  provider?: 'openai' | 'gemini';
  model?: string;
  temperature?: number;
  maxTokens?: number;
  instructions?: string;
}

export interface DataNodeData extends BaseNodeData {
  dataType: 'input' | 'output' | 'database' | 'api' | 'file';
  format?: string;
  size?: string;
}

// Componente Nó de Agente de IA
export const AgentNode = memo(({ data }: NodeProps & { data: AgentNodeData }) => {
  const getIcon = () => {
    switch (data.agentType) {
      case 'chatbot': return MessageSquare;
      case 'analyzer': return Brain;
      case 'retriever': return Search;
      case 'generator': return Zap;
      case 'processor': return Cpu;
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
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="px-4 py-3 bg-card border-2 border-primary/20 rounded-lg min-w-[180px] shadow-lg">
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
export const DataNode = memo(({ data }: NodeProps & { data: DataNodeData }) => {
  const getIcon = () => {
    switch (data.dataType) {
      case 'input': return FileText;
      case 'output': return FileText;
      case 'database': return Database;
      case 'api': return Code;
      case 'file': return FileText;
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
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="px-3 py-2 bg-card border border-border rounded-lg min-w-[140px] shadow-md">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${getColor()}`} />
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
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
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-primary border border-card"
      />
    </div>
  );
});

AgentNode.displayName = 'AgentNode';
DataNode.displayName = 'DataNode';