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
import { AgentNodeData, DataNodeData, LogicNodeData } from './NodeTypes';

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
  const isLogicNode = node.type === 'logic';
  const agentData = node.data as AgentNodeData;
  const dataData = node.data as DataNodeData;
  const logicData = node.data as LogicNodeData;

  return (
    <Card className="h-full rounded-none border-none shadow-none">
      <CardHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Propriedades</CardTitle>
            <CardDescription className="text-sm">
              {node.type === 'agent' && 'Agente de IA'}
              {node.type === 'data' && 'Nó de Dados'}
              {node.type === 'logic' && 'Nó de Lógica'}
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
                    <SelectItem value="review_collector">Coletor de Reviews</SelectItem>
                    <SelectItem value="email_sender">Envio de Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {agentData.agentType !== 'review_collector' && agentData.agentType !== 'email_sender' && (
                <>
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
                </>
              )}

              <div className="space-y-2">
                <Label>Instruções</Label>
                <Textarea
                  value={agentData.instructions || ''}
                  onChange={(e) => updateField('instructions', e.target.value)}
                  placeholder="Defina o comportamento do agente..."
                  rows={3}
                />
              </div>

              {agentData.agentType !== 'review_collector' && agentData.agentType !== 'email_sender' && (
                <>
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

              {agentData.agentType === 'review_collector' && (
                <>
                  <div className="space-y-2">
                    <Label>App ID</Label>
                    <Input
                      value={(agentData as any).appId || ''}
                      onChange={(e) => updateField('appId', e.target.value)}
                      placeholder="ID do aplicativo"
                    />
                    <div className="text-xs text-muted-foreground">
                      ID do aplicativo na loja (ex: com.example.app)
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Loja</Label>
                    <Select 
                      value={(agentData as any).store || 'google_play'} 
                      onValueChange={(value) => updateField('store', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a loja" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google_play">Google Play</SelectItem>
                        <SelectItem value="app_store">App Store</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {agentData.agentType === 'email_sender' && (
                <>
                  <div className="space-y-2">
                    <Label>Email do Destinatário</Label>
                    <Input
                      value={(agentData as any).toEmail || ''}
                      onChange={(e) => updateField('toEmail', e.target.value)}
                      placeholder="destinatario@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Assunto</Label>
                    <Input
                      value={(agentData as any).subject || ''}
                      onChange={(e) => updateField('subject', e.target.value)}
                      placeholder="Assunto do email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Corpo do Email</Label>
                    <Textarea
                      value={(agentData as any).emailBody || ''}
                      onChange={(e) => updateField('emailBody', e.target.value)}
                      placeholder="Conteúdo do email..."
                      rows={4}
                    />
                  </div>
                </>
              )}
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
                    <SelectItem value="boolean">Boolean (True/False)</SelectItem>
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

          {isLogicNode && (
            <>
              <div className="space-y-2">
                <Label>Tipo de Condição</Label>
                <Select 
                  value={logicData.conditionType || 'if'} 
                  onValueChange={(value) => updateField('conditionType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="if">If (Condição)</SelectItem>
                    <SelectItem value="else">Else (Alternativo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {logicData.conditionType === 'if' && (
                <div className="space-y-2">
                  <Label>Condição</Label>
                  <Input
                    value={logicData.condition || ''}
                    onChange={(e) => updateField('condition', e.target.value)}
                    placeholder="Ex: length > 10"
                  />
                  <div className="text-xs text-muted-foreground">
                    Condição a ser avaliada (ex: length &gt; 10)
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={logicData.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Descrição do nó de lógica"
                  rows={2}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};