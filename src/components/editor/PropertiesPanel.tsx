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
                    <SelectItem value="langchain_agent">LangChain Agent</SelectItem>
                    <SelectItem value="review_collector">Coletor de Reviews</SelectItem>
                    <SelectItem value="sentiment_analyzer">Analisador de Sentimento</SelectItem>
                    <SelectItem value="backlog_generator">Gerador de Backlog</SelectItem>
                    <SelectItem value="memory_manager">Gerenciador de Memória</SelectItem>
                    <SelectItem value="email_sender">Envio de Email</SelectItem>
                    <SelectItem value="postgresql_memory">Memória PostgreSQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {agentData.agentType !== 'review_collector' && 
               agentData.agentType !== 'sentiment_analyzer' && 
               agentData.agentType !== 'backlog_generator' && 
               agentData.agentType !== 'memory_manager' && 
               agentData.agentType !== 'email_sender' && 
               agentData.agentType !== 'postgresql_memory' && (
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

              {agentData.agentType !== 'review_collector' && 
               agentData.agentType !== 'sentiment_analyzer' && 
               agentData.agentType !== 'backlog_generator' && 
               agentData.agentType !== 'memory_manager' && 
               agentData.agentType !== 'email_sender' && 
               agentData.agentType !== 'postgresql_memory' && (
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
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    O Review Collector receberá a URL da API através de uma conexão com um nó External API.
                  </div>
                </div>
              )}

              {agentData.agentType === 'sentiment_analyzer' && (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    O Sentiment Analyzer processará reviews coletados e extrairá sentimentos e tópicos principais.
                  </div>
                </div>
              )}

              {agentData.agentType === 'backlog_generator' && (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    O Backlog Generator criará itens de backlog baseados na análise de reviews negativos.
                  </div>
                </div>
              )}

              {agentData.agentType === 'memory_manager' && (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    O Memory Manager gerenciará a memória de longo prazo do agente, armazenando contexto e aprendizados.
                  </div>
                </div>
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

              {agentData.agentType === 'postgresql_memory' && (
                <>
                  <div className="space-y-2">
                    <Label>Connection String</Label>
                    <Input
                      value={(agentData as any).connectionString || ''}
                      onChange={(e) => updateField('connectionString', e.target.value)}
                      placeholder="postgresql://user:password@host:port/database"
                    />
                    <div className="text-xs text-muted-foreground">
                      String de conexão com o banco PostgreSQL
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Nome da Tabela</Label>
                    <Input
                      value={(agentData as any).tableName || ''}
                      onChange={(e) => updateField('tableName', e.target.value)}
                      placeholder="nome_da_tabela"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Operação</Label>
                    <Select 
                      value={(agentData as any).operation || 'SELECT'} 
                      onValueChange={(value) => updateField('operation', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a operação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SELECT">SELECT</SelectItem>
                        <SelectItem value="INSERT">INSERT</SelectItem>
                        <SelectItem value="UPDATE">UPDATE</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Campos</Label>
                    <Input
                      value={(agentData as any).fields || '*'}
                      onChange={(e) => updateField('fields', e.target.value)}
                      placeholder="campo1, campo2, campo3 ou *"
                    />
                    <div className="text-xs text-muted-foreground">
                      Campos para SELECT/INSERT/UPDATE (usar * para todos)
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Condições WHERE</Label>
                    <Input
                      value={(agentData as any).conditions || ''}
                      onChange={(e) => updateField('conditions', e.target.value)}
                      placeholder="id = 1, status = 'ativo'"
                    />
                    <div className="text-xs text-muted-foreground">
                      Condições para SELECT/UPDATE/DELETE
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Query SQL Personalizada</Label>
                    <Textarea
                      value={(agentData as any).query || ''}
                      onChange={(e) => updateField('query', e.target.value)}
                      placeholder="SELECT * FROM tabela WHERE condicao"
                      rows={4}
                    />
                    <div className="text-xs text-muted-foreground">
                      Se preenchida, a query personalizada será usada no lugar dos campos acima
                    </div>
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

              {dataData.dataType === 'api' && (
                <div className="space-y-2">
                  <Label>URL da API</Label>
                  <Input
                    value={(dataData as any).apiUrl || ''}
                    onChange={(e) => updateField('apiUrl', e.target.value)}
                    placeholder="https://bff-analyse.vercel.app/api/apps/com.itau.investimentos/reviews?store=google_play"
                  />
                  <div className="text-xs text-muted-foreground">
                    URL completa da API que será chamada
                  </div>
                </div>
              )}

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