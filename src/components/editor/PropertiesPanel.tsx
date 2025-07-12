import { useState } from 'react';
import { Node } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { X, Settings, Palette, Type } from 'lucide-react';
import { ScreenNodeData, ComponentNodeData } from './NodeTypes';

interface PropertiesPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, newData: any) => void;
  onClose: () => void;
}

export const PropertiesPanel = ({ node, onUpdateNode, onClose }: PropertiesPanelProps) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'style'>('properties');

  const isScreenNode = node.type === 'screen';
  const isComponentNode = node.type === 'component';

  const screenData = isScreenNode ? (node.data as unknown as ScreenNodeData) : null;
  const componentData = isComponentNode ? (node.data as unknown as ComponentNodeData) : null;

  const handleInputChange = (field: string, value: any) => {
    if (isScreenNode) {
      onUpdateNode(node.id, { [field]: value });
    } else if (isComponentNode) {
      if (field.startsWith('properties.')) {
        const propField = field.replace('properties.', '');
        onUpdateNode(node.id, {
          properties: {
            ...componentData?.properties,
            [propField]: value
          }
        });
      } else {
        onUpdateNode(node.id, { [field]: value });
      }
    }
  };

  return (
    <Card className="w-80 h-full rounded-none border-l-0 border-r-0 border-t-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Propriedades
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
            Geral
          </Button>
          <Button
            variant={activeTab === 'style' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs h-7"
            onClick={() => setActiveTab('style')}
          >
            <Palette className="w-3 h-3 mr-1" />
            Estilo
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
                  Nome do Elemento
                </Label>
                <Input
                  id="label"
                  value={screenData?.label || componentData?.label || ''}
                  onChange={(e) => handleInputChange('label', e.target.value)}
                  className="h-8 text-sm"
                  placeholder="Digite o nome..."
                />
              </div>

              {/* Propriedades específicas de tela */}
              {isScreenNode && screenData && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Configurações da Tela
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="width" className="text-xs">Largura</Label>
                        <Input
                          id="width"
                          type="number"
                          value={screenData.width}
                          onChange={(e) => handleInputChange('width', parseInt(e.target.value))}
                          className="h-7 text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height" className="text-xs">Altura</Label>
                        <Input
                          id="height"
                          type="number"
                          value={screenData.height}
                          onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                          className="h-7 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Propriedades específicas de componente */}
              {isComponentNode && componentData && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Configurações do Componente
                    </h4>

                    {componentData.properties.text !== undefined && (
                      <div>
                        <Label htmlFor="text" className="text-xs">Texto</Label>
                        <Input
                          id="text"
                          value={componentData.properties.text || ''}
                          onChange={(e) => handleInputChange('properties.text', e.target.value)}
                          className="h-8 text-sm"
                          placeholder="Digite o texto..."
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="comp-width" className="text-xs">Largura</Label>
                        <Input
                          id="comp-width"
                          type="number"
                          value={componentData.properties.width || ''}
                          onChange={(e) => handleInputChange('properties.width', parseInt(e.target.value))}
                          className="h-7 text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="comp-height" className="text-xs">Altura</Label>
                        <Input
                          id="comp-height"
                          type="number"
                          value={componentData.properties.height || ''}
                          onChange={(e) => handleInputChange('properties.height', parseInt(e.target.value))}
                          className="h-7 text-xs"
                        />
                      </div>
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
              Aparência
            </h4>
            
            {isComponentNode && componentData && (
              <div>
                <Label htmlFor="color" className="text-xs">Cor Principal</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="color"
                    type="color"
                    value={componentData.properties.color || '#D72638'}
                    onChange={(e) => handleInputChange('properties.color', e.target.value)}
                    className="h-8 w-16 p-1"
                  />
                  <Input
                    value={componentData.properties.color || '#D72638'}
                    onChange={(e) => handleInputChange('properties.color', e.target.value)}
                    className="h-8 text-sm font-mono"
                    placeholder="#D72638"
                  />
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Mais opções de estilo em breve...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};