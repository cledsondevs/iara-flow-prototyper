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

import { ScreenNode, ComponentNode, ScreenNodeData, ComponentNodeData } from './NodeTypes';
import { NodePalette } from './NodePalette';
import { EditorToolbar } from './EditorToolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { WelcomeGuide } from './WelcomeGuide';

// Tipos de nós disponíveis
const nodeTypes = {
  screen: ScreenNode,
  component: ComponentNode,
};

// Configuração inicial de nós e conexões
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'screen',
    position: { x: 400, y: 100 },
    data: {
      label: 'Home Screen',
      screenType: 'mobile',
      width: 375,
      height: 812
    } as ScreenNodeData,
  },
];

const initialEdges: Edge[] = [];

export const PrototypeEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

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

  const selectedNode = selectedNodeId 
    ? nodes.find(node => node.id === selectedNodeId) 
    : null;

  return (
    <div className="h-screen flex bg-background relative">
      {/* Paleta de Nós */}
      <div className="flex-shrink-0 border-r border-border">
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
        />

        {/* Canvas do Editor */}
        <div className="flex-1 relative">
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
          >
            <Controls className="!bottom-4 !left-4" />
            <MiniMap 
              className="!bottom-4 !right-4"
              nodeStrokeWidth={3}
              nodeColor={(node) => {
                switch (node.type) {
                  case 'screen': return '#D72638';
                  case 'component': return '#6B7280';
                  default: return '#9CA3AF';
                }
              }}
            />
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1}
              className="!fill-editor-grid"
            />
          </ReactFlow>
        </div>
      </div>

      {/* Painel de Propriedades */}
      {selectedNode && (
        <div className="flex-shrink-0 border-l border-border">
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
    </div>
  );
};