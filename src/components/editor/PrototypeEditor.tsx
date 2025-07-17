import { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './editor-styles.css';

import { AgentNode, DataNode, LogicNode, AgentNodeData, DataNodeData, LogicNodeData } from './NodeTypes';
import { NodePalette } from './NodePalette';
import { EditorToolbar } from './EditorToolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { WelcomeGuide } from './WelcomeGuide';
import { ConfigDialog } from './ConfigDialog';
import { ExecutionResult } from './ExecutionResult';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

// Tipos de nós disponíveis
const nodeTypes = {
  agent: AgentNode,
  data: DataNode,
  logic: LogicNode,
};

// Configuração inicial de nós e conexões
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'agent',
    position: { x: 300, y: 100 },
    data: {
      label: 'Chat Assistant',
      agentType: 'chatbot',
      provider: 'openai',
      model: 'gpt-4',
      temperature: 0.7,
      instructions: 'Assistente conversacional para suporte ao cliente'
    } as AgentNodeData,
  },
  {
    id: '2',
    type: 'data',
    position: { x: 100, y: 200 },
    data: {
      label: 'User Input',
      dataType: 'input',
      format: 'text/plain'
    } as DataNodeData,
  },
  {
    id: '3',
    type: 'logic',
    position: { x: 200, y: 300 },
    data: {
      label: 'If Condition',
      conditionType: 'if',
      condition: 'length > 10',
      description: 'Verifica se a resposta tem mais de 10 caracteres'
    } as LogicNodeData,
  },
];

const initialEdges: Edge[] = [];

const PrototypeEditorInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [showExecution, setShowExecution] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<any[]>([]);
  const [finalResult, setFinalResult] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const { toast } = useToast();
  const { zoomIn, zoomOut, getZoom } = useReactFlow();
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const { user } = useAuth(); // Obter o usuário logado

  // Conectar nós
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: false,
      style: { strokeWidth: 2 }
    }, eds)),
    [setEdges],
  );

  // Adicionar novo nó da paleta
  const addNode = useCallback((type: string, data: any) => {
    const newNode: Node = {
      id: `${Date.now()}`,
      type,
      position: { 
        x: Math.random() * 300 + 200, 
        y: Math.random() * 200 + 150 
      },
      data,
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Selecionar nó
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  // Atualizar propriedades do nó selecionado
  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  }, [setNodes]);

  // Event listener para atualizações do nó via eventos customizados
  useEffect(() => {
    const handleUpdateNodeData = (event: CustomEvent) => {
      const { nodeId, updates } = event.detail;
      updateNodeData(nodeId, updates);
    };

    window.addEventListener('updateNodeData', handleUpdateNodeData);
    return () => window.removeEventListener('updateNodeData', handleUpdateNodeData);
  }, [updateNodeData]);

  // Deletar nó selecionado
  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNodeId(null);
  }, [setNodes, setEdges]);

  // Limpar seleção ao clicar no fundo
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Deletar nó com tecla Delete
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Delete' && selectedNodeId) {
      deleteNode(selectedNodeId);
    }
  }, [selectedNodeId, deleteNode]);

  // Adicionar listener para tecla Delete
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Exportar nós para JSON
  const exportNodesToJson = () => {
    const exportData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        animated: edge.animated,
        style: edge.style
      })),
      exportedAt: new Date().toISOString()
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fluxo-ia-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Exportação concluída",
      description: "Fluxo exportado para JSON com sucesso!"
    });
  };

  // Executar fluxo de IA usando o backend
  const executeFlow = async () => {
    const agentNodes = nodes.filter(node => node.type === 'agent');
    
    if (agentNodes.length === 0) {
      toast({
        title: "Nenhum agente encontrado",
        description: "Adicione pelo menos um agente de IA ao fluxo.",
        variant: "destructive"
      });
      return;
    }

    setExecutionSteps([]);
    setFinalResult('');
    setShowExecution(true);
    setIsExecuting(true);
    
    // Animar edges durante execução
    setEdges(prev => prev.map(edge => ({ ...edge, animated: true })));

    // Preparar dados do fluxo
    const flowData = {
      nodes,
      edges,
      exportedAt: new Date().toISOString()
    };

    // Buscar nós de input para obter entrada do usuário
    const inputNodes = nodes.filter(node => node.type === 'data' && node.data.dataType === 'input');
    const userInput = inputNodes.length > 0 && inputNodes[0].data.userInput 
      ? inputNodes[0].data.userInput 
      : "Entrada do usuário não fornecida";

    // Mostrar steps iniciais
    const steps = agentNodes.map(node => ({
      id: node.id,
      label: node.data.label,
      type: node.type,
      status: 'pending' as const
    }));
    setExecutionSteps(steps);

    if (!user || !user.id) {
      toast({
        title: "Usuário não autenticado",
        description: "Por favor, faça login para executar o fluxo.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Executar fluxo via API
      const result = await apiService.executeFlowDirect(flowData, userInput as string, user.id);

      if (result.success && result.data) {
        // Atualizar steps como sucesso
        setExecutionSteps(prev => prev.map(step => ({
          ...step,
          status: 'success' as const,
          result: result.data?.output || 'Executado com sucesso'
        })));

        setFinalResult(result.data.output || 'Execução concluída');
        
        toast({
          title: "Execução concluída",
          description: "Fluxo de IA executado com sucesso!"
        });
      } else {
        // Atualizar steps como erro
        setExecutionSteps(prev => prev.map(step => ({
          ...step,
          status: 'error' as const,
          error: result.error || 'Erro desconhecido'
        })));

        toast({
          title: "Erro na execução",
          description: result.error || "Falha ao executar o fluxo",
          variant: "destructive"
        });
      }
    } catch (error) {
      // Atualizar steps como erro
      setExecutionSteps(prev => prev.map(step => ({
        ...step,
        status: 'error' as const,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })));

      toast({
        title: "Erro na execução",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
    } finally {
      // Parar animação das edges quando execução terminar
      setIsExecuting(false);
      setEdges(prev => prev.map(edge => ({ ...edge, animated: false })));
    }
  };

  const handleZoomIn = useCallback(() => {
    zoomIn();
    setTimeout(() => setZoomLevel(getZoom()), 100);
  }, [zoomIn, getZoom]);

  const handleZoomOut = useCallback(() => {
    zoomOut();
    setTimeout(() => setZoomLevel(getZoom()), 100);
  }, [zoomOut, getZoom]);

  const selectedNode = selectedNodeId 
    ? nodes.find(node => node.id === selectedNodeId) 
    : null;

  useEffect(() => {
    const handleLoadFlow = (event: MessageEvent) => {
      if (event.data.type === 'loadFlow') {
        const { flowData } = event.data;
        setNodes(flowData.nodes);
        setEdges(flowData.edges);
        setShowWelcome(false);
      }
    };

    const handleClearFlow = (event: MessageEvent) => {
      if (event.data.type === 'clearFlow') {
        setNodes([]);
        setEdges([]);
        setShowWelcome(true);
      }
    };

    window.addEventListener('message', handleLoadFlow);
    window.addEventListener('message', handleClearFlow);

    return () => {
      window.removeEventListener('message', handleLoadFlow);
      window.removeEventListener('message', handleClearFlow);
    };
  }, [setNodes, setEdges]);

  return (
    <div className="h-screen flex bg-background relative">
      {/* Paleta de Nós */}
      <div className="w-80 flex-shrink-0 border-r border-border bg-card">
        <NodePalette onAddNode={addNode} />
      </div>

      {/* Editor Principal */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <EditorToolbar 
          onSave={() => console.log('Salvando projeto...')}
          onExport={exportNodesToJson}
          onUndo={() => console.log('Desfazer')}
          onRedo={() => console.log('Refazer')}
          onExecute={executeFlow}
          onConfig={() => setShowConfig(true)}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          zoomLevel={zoomLevel}
        />

        {/* Canvas do Editor com Device Frame */}
        <div className="flex-1 relative bg-muted/20">
          {/* Device Frame Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="device-frame-mobile bg-card border-2 border-border rounded-[2rem] shadow-2xl pointer-events-none">
              <div className="device-screen bg-background rounded-[1.5rem] m-2">
                <div className="device-notch bg-border rounded-b-xl mx-auto w-20 h-4"></div>
              </div>
            </div>
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            className="editor-surface"
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          >
            <Controls className="!bottom-6 !left-6 !bg-card !border-border" />
            <MiniMap 
              className="!bottom-6 !right-6 !bg-card !border-border"
              nodeStrokeWidth={3}
              nodeColor={(node) => {
                switch (node.type) {
                  case 'screen': return 'hsl(var(--primary))';
                  case 'component': return 'hsl(var(--muted-foreground))';
                  default: return 'hsl(var(--muted-foreground)/0.5)';
                }
              }}
            />
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={24} 
              size={1.5}
              className="!fill-muted-foreground/20"
            />
          </ReactFlow>
        </div>
      </div>

      {/* Painel de Propriedades */}
      {selectedNode && (
        <div className="w-80 flex-shrink-0 border-l border-border bg-card">
          <PropertiesPanel
            node={selectedNode}
            onUpdateNode={updateNodeData}
            onDeleteNode={deleteNode}
            onClose={() => setSelectedNodeId(null)}
          />
        </div>
      )}

      {/* Guia de boas-vindas */}
      {showWelcome && (
        <WelcomeGuide onClose={() => setShowWelcome(false)} />
      )}

      {/* Dialog de Configurações */}
      <ConfigDialog 
        open={showConfig} 
        onOpenChange={setShowConfig} 
      />

      {/* Resultado da Execução */}
      <ExecutionResult 
        open={showExecution}
        onClose={() => setShowExecution(false)}
        steps={executionSteps}
        finalResult={finalResult}
      />
    </div>
  );
};

export const PrototypeEditor = () => {
  return (
    <ReactFlowProvider>
      <PrototypeEditorInner />
    </ReactFlowProvider>
  );
};

