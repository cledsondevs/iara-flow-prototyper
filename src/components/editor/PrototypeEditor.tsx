import { useCallback, useState } from 'react';
import {
  ReactFlow,
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './editor-styles.css';

import { AgentNode, DataNode, AgentNodeData, DataNodeData } from './NodeTypes';
import { NodePalette } from './NodePalette';
import { EditorToolbar } from './EditorToolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { WelcomeGuide } from './WelcomeGuide';
import { ConfigDialog } from './ConfigDialog';
import { ExecutionResult } from './ExecutionResult';
import { useToast } from '@/hooks/use-toast';

// Tipos de nós disponíveis
const nodeTypes = {
  agent: AgentNode,
  data: DataNode,
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
      model: 'GPT-4',
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
];

const initialEdges: Edge[] = [];

export const PrototypeEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [showExecution, setShowExecution] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<any[]>([]);
  const [finalResult, setFinalResult] = useState<string>('');
  const { toast } = useToast();

  // Conectar nós
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
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

  // Limpar seleção ao clicar no fundo
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Executar fluxo de IA
  const executeFlow = async () => {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      toast({
        title: "API Key não configurada",
        description: "Configure sua chave de API da OpenAI nas configurações.",
        variant: "destructive"
      });
      return;
    }

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

    const steps = agentNodes.map(node => ({
      id: node.id,
      label: node.data.label,
      status: 'pending' as const
    }));
    setExecutionSteps(steps);

    let result = "Entrada do usuário";

    for (const node of agentNodes) {
      setExecutionSteps(prev => prev.map(step => 
        step.id === node.id ? { ...step, status: 'running' } : step
      ));

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: node.data.model || 'gpt-4',
            messages: [
              {
                role: 'system',
                content: node.data.instructions || 'Você é um assistente útil.'
              },
              {
                role: 'user',
                content: result
              }
            ],
            temperature: node.data.temperature || 0.7,
            max_tokens: node.data.maxTokens || 500
          })
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        result = data.choices[0].message.content;

        setExecutionSteps(prev => prev.map(step => 
          step.id === node.id ? { ...step, status: 'success', result } : step
        ));
      } catch (error) {
        setExecutionSteps(prev => prev.map(step => 
          step.id === node.id ? { ...step, status: 'error', error: error.message } : step
        ));
        toast({
          title: "Erro na execução",
          description: `Falha ao executar o agente ${node.data.label}`,
          variant: "destructive"
        });
        return;
      }
    }

    setFinalResult(result);
    toast({
      title: "Execução concluída",
      description: "Fluxo de IA executado com sucesso!"
    });
  };

  const selectedNode = selectedNodeId 
    ? nodes.find(node => node.id === selectedNodeId) 
    : null;

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
          onExport={() => console.log('Exportando...')}
          onUndo={() => console.log('Desfazer')}
          onRedo={() => console.log('Refazer')}
          onExecute={executeFlow}
          onConfig={() => setShowConfig(true)}
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