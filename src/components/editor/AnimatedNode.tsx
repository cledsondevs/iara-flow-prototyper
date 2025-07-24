import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { AgentNode, DataNode, LogicNode, AgentNodeData, DataNodeData, LogicNodeData } from './NodeTypes';

interface AnimatedNodeProps extends NodeProps {
  isExecuting?: boolean;
  isActive?: boolean;
}

// Wrapper para AgentNode com animação
export const AnimatedAgentNode = memo(({ data, isExecuting, isActive, ...props }: AnimatedNodeProps & { data: AgentNodeData }) => {
  const animationClass = isExecuting && isActive ? 'animate-pulse border-primary/60 shadow-lg shadow-primary/20' : '';
  
  return (
    <div className={`transition-all duration-300 ${animationClass}`}>
      <AgentNode data={data} {...props} />
    </div>
  );
});

// Wrapper para DataNode com animação
export const AnimatedDataNode = memo(({ data, isExecuting, isActive, ...props }: AnimatedNodeProps & { data: DataNodeData }) => {
  const animationClass = isExecuting && isActive ? 'animate-pulse border-primary/60 shadow-lg shadow-primary/20' : '';
  
  return (
    <div className={`transition-all duration-300 ${animationClass}`}>
      <DataNode data={data} {...props} />
    </div>
  );
});

// Wrapper para LogicNode com animação  
export const AnimatedLogicNode = memo(({ data, isExecuting, isActive, ...props }: AnimatedNodeProps & { data: LogicNodeData }) => {
  const animationClass = isExecuting && isActive ? 'animate-pulse border-primary/60 shadow-lg shadow-primary/20' : '';
  
  return (
    <div className={`transition-all duration-300 ${animationClass}`}>
      <LogicNode data={data} {...props} />
    </div>
  );
});

AnimatedAgentNode.displayName = 'AnimatedAgentNode';
AnimatedDataNode.displayName = 'AnimatedDataNode';  
AnimatedLogicNode.displayName = 'AnimatedLogicNode';

