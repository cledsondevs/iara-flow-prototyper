import { useState } from 'react';
import { Node } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { X, Settings, Palette, Type } from 'lucide-react';
import { AgentNodeData, DataNodeData } from './NodeTypes';

interface PropertiesPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, newData: any) => void;
  onClose: () => void;
}

export const PropertiesPanel = ({ node, onUpdateNode, onClose }: PropertiesPanelProps) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'style'>('properties');

  const isAgentNode = node.type === 'agent';
  const isDataNode = node.type === 'data';

  const agentData = isAgentNode ? (node.data as unknown as AgentNodeData) : null;
  const dataData = isDataNode ? (node.data as unknown as DataNodeData) : null;

  const handleInputChange = (field: string, value: any) => {
    onUpdateNode(node.id, { [field]: value });
  };

  return (
    <Card className="w-80 h-full rounded-none border-l-0 border-r-0 border-t-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Propriedades do Agente
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex rounded-lg bg-muted p-1">
          <Button
            variant={activeTab === 'properties' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs h-7"
            onClick={() => setActiveTab('properties')}
          >
            <Settings className="w-3 h-3 mr-1" />
            Configuração
          </Button>
          <Button
            variant={activeTab === 'style' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs h-7"
            onClick={() => setActiveTab('style')}
          >
            <Palette className="w-3 h-3 mr-1" />
            Parâmetros
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {activeTab === 'properties' && (
          <>
            {/* Propriedades Gerais */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="label" className="text-xs font-medium">
                  Nome do Agente
                </Label>
                <Input
                  id="label"
                  value={agentData?.label || dataData?.label || ''}
                  onChange={(e) => handleInputChange('label', e.target.value)}
                  className="h-8 text-sm"
                  placeholder="Digite o nome..."
                />
              </div>

              {/* Propriedades específicas de agente */}
              {isAgentNode && agentData && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Configurações do Agente IA
                    </h4>
                    
                    <div>
                      <Label htmlFor="model" className="text-xs">Modelo</Label>
                      <Input
                        id="model"
                        value={agentData.model || ''}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        className="h-8 text-sm"
                        placeholder="GPT-4, Claude, etc."
                      />
                    </div>

                    <div>
                      <Label htmlFor="instructions" className="text-xs">Instruções</Label>
                      <Input
                        id="instructions"
                        value={agentData.instructions || ''}
                        onChange={(e) => handleInputChange('instructions', e.target.value)}
                        className="h-8 text-sm"
                        placeholder="Defina o comportamento do agente..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="temperature" className="text-xs">Temperature</Label>
                        <Input
                          id="temperature"
                          type="number"
                          step="0.1"
                          min="0"
                          max="2"
                          value={agentData.temperature || 0.7}
                          onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                          className="h-7 text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxTokens" className="text-xs">Max Tokens</Label>
                        <Input
                          id="maxTokens"
                          type="number"
                          value={agentData.maxTokens || 1000}
                          onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value))}
                          className="h-7 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Propriedades específicas de dados */}
              {isDataNode && dataData && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Configurações de Dados
                    </h4>

                    <div>
                      <Label htmlFor="format" className="text-xs">Formato</Label>
                      <Input
                        id="format"
                        value={dataData.format || ''}
                        onChange={(e) => handleInputChange('format', e.target.value)}
                        className="h-8 text-sm"
                        placeholder="text/plain, application/json, etc."
                      />
                    </div>

                    <div>
                      <Label htmlFor="size" className="text-xs">Tamanho</Label>
                      <Input
                        id="size"
                        value={dataData.size || ''}
                        onChange={(e) => handleInputChange('size', e.target.value)}
                        className="h-8 text-sm"
                        placeholder="1MB, 500KB, etc."
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {activeTab === 'style' && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Parâmetros Avançados
            </h4>
            
            {isAgentNode && agentData && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="description" className="text-xs">Descrição</Label>
                  <Input
                    id="description"
                    value={agentData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="h-8 text-sm"
                    placeholder="Descrição detalhada do agente..."
                  />
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Mais parâmetros de configuração em breve...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};