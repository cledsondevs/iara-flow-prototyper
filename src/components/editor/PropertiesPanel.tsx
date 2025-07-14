import { useState } from 'react';
import { Node } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Trash2 } from 'lucide-react';
import { AgentNodeData, DataNodeData } from './NodeTypes';

interface PropertiesPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, data: any) => void;
  onDeleteNode: (nodeId: string) => void;
  onClose: () => void;
}

export const PropertiesPanel = ({ node, onUpdateNode, onDeleteNode, onClose }: PropertiesPanelProps) => {
  const updateField = (field: string, value: any) => {
    onUpdateNode(node.id, { [field]: value });
  };

  const isAgentNode = node.type === 'agent';
  const isDataNode = node.type === 'data';
  const agentData = node.data as AgentNodeData;
  const dataData = node.data as DataNodeData;

  return (
    <Card className="h-full rounded-none border-none shadow-none">
      <CardHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Propriedades</CardTitle>
            <CardDescription className="text-sm">
              {node.type === 'agent' ? 'Agente de IA' : 'Dados'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDeleteNode(node.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Propriedades Gerais */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              value={(node.data.label as string) || ''}
              onChange={(e) => updateField('label', e.target.value)}
              placeholder="Nome do elemento"
            />
          </div>

          {isAgentNode && (
            <>
              <div className="space-y-2">
                <Label>Tipo de Agente</Label>
                <Select 
                  value={agentData.agentType || 'chatbot'} 
                  onValueChange={(value) => updateField('agentType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chatbot">Chatbot</SelectItem>
                    <SelectItem value="analyzer">Analisador</SelectItem>
                    <SelectItem value="retriever">Recuperador</SelectItem>
                    <SelectItem value="generator">Gerador</SelectItem>
                    <SelectItem value="processor">Processador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Provedor de IA</Label>
                <Select 
                  value={agentData.provider || 'openai'} 
                  onValueChange={(value) => updateField('provider', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o provedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="gemini">Google Gemini</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>
                <Select 
                  value={agentData.model || ''} 
                  onValueChange={(value) => updateField('model', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    {agentData.provider === 'gemini' ? (
                      <>
                        <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                        <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                        <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Instruções</Label>
                <Textarea
                  value={agentData.instructions || ''}
                  onChange={(e) => updateField('instructions', e.target.value)}
                  placeholder="Defina o comportamento do agente..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Temperatura: {agentData.temperature || 0.7}</Label>
                <Slider
                  value={[agentData.temperature || 0.7]}
                  onValueChange={(value) => updateField('temperature', value[0])}
                  max={2}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Max Tokens</Label>
                <Input
                  type="number"
                  value={agentData.maxTokens || 500}
                  onChange={(e) => updateField('maxTokens', parseInt(e.target.value))}
                  placeholder="500"
                />
              </div>
            </>
          )}

          {isDataNode && (
            <>
              <div className="space-y-2">
                <Label>Tipo de Dados</Label>
                <Select 
                  value={dataData.dataType || 'input'} 
                  onValueChange={(value) => updateField('dataType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="input">Entrada</SelectItem>
                    <SelectItem value="output">Saída</SelectItem>
                    <SelectItem value="database">Base de Dados</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="file">Arquivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Formato</Label>
                <Input
                  value={dataData.format || ''}
                  onChange={(e) => updateField('format', e.target.value)}
                  placeholder="text/plain, application/json..."
                />
              </div>

              <div className="space-y-2">
                <Label>Tamanho</Label>
                <Input
                  value={dataData.size || ''}
                  onChange={(e) => updateField('size', e.target.value)}
                  placeholder="1MB, 500KB..."
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};