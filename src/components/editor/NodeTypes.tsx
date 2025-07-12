import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Smartphone, Monitor, Square, Type, Image, MousePointer, Menu } from 'lucide-react';

// Tipos de dados para os nós compatíveis com React Flow
export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
}

export interface ComponentNodeData extends BaseNodeData {
  componentType: 'button' | 'input' | 'image' | 'text' | 'container';
  properties: {
    width?: number;
    height?: number;
    color?: string;
    text?: string;
  };
}

export interface ScreenNodeData extends BaseNodeData {
  screenType: 'mobile' | 'desktop' | 'tablet';
  width: number;
  height: number;
}

// Componente Nó de Tela
export const ScreenNode = memo(({ data }: NodeProps & { data: ScreenNodeData }) => {
  const Icon = data.screenType === 'mobile' ? Smartphone : Monitor;
  
  return (
    <div className="px-4 py-3 bg-card border-2 border-node-border rounded-lg min-w-[160px] shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      <div className="text-xs text-muted-foreground font-mono">
        {data.width} × {data.height}px
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary border-2 border-card"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary border-2 border-card"
      />
    </div>
  );
});

// Componente Nó de Componente UI
export const ComponentNode = memo(({ data }: NodeProps & { data: ComponentNodeData }) => {
  const getIcon = () => {
    switch (data.componentType) {
      case 'button': return MousePointer;
      case 'input': return Square;
      case 'image': return Image;
      case 'text': return Type;
      case 'container': return Menu;
      default: return Square;
    }
  };
  
  const Icon = getIcon();
  
  const getColor = () => {
    switch (data.componentType) {
      case 'button': return 'text-blue-600';
      case 'input': return 'text-green-600';
      case 'image': return 'text-purple-600';
      case 'text': return 'text-orange-600';
      case 'container': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="px-3 py-2 bg-card border border-node-border rounded-lg min-w-[120px] shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${getColor()}`} />
        <span className="font-medium text-sm">{data.label}</span>
      </div>
      
      {data.properties.text && (
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          "{data.properties.text}"
        </div>
      )}
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-primary border border-card"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-primary border border-card"
      />
    </div>
  );
});

ScreenNode.displayName = 'ScreenNode';
ComponentNode.displayName = 'ComponentNode';