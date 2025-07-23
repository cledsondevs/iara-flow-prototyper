import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, CheckCircle, AlertCircle, Clock, Copy, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExecutionStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'success' | 'error';
  result?: string;
  error?: string;
}

interface ExecutionResultProps {
  open: boolean;
  onClose: () => void;
  steps: ExecutionStep[];
  finalResult?: string;
  logs?: string[];
  error?: string;
}

export const ExecutionResult = ({ open, onClose, steps, finalResult, logs = [], error }: ExecutionResultProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-background border-l border-border z-40 flex flex-col shadow-xl">
      <Card className="h-full flex flex-col border-0 rounded-none shadow-none">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Execução do Fluxo</CardTitle>
              <CardDescription>
                Resultado da execução dos agentes de IA
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <Tabs defaultValue="steps" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="steps">Passos</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="result">Resultado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="steps" className="flex-1 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Passos da Execução:</h4>
                <ScrollArea className="h-64 border rounded-lg p-3">
                  <div className="space-y-2">
                    {steps.map((step) => (
                      <div key={step.id} className="flex items-center gap-2 text-sm">
                        {step.status === 'pending' && <Clock className="w-4 h-4 text-muted-foreground" />}
                        {step.status === 'running' && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
                        {step.status === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {step.status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                        
                        <span className="flex-1">{step.label}</span>
                        
                        <Badge variant={
                          step.status === 'success' ? 'default' : 
                          step.status === 'error' ? 'destructive' : 
                          'secondary'
                        }>
                          {step.status === 'pending' ? 'Pendente' : 
                           step.status === 'running' ? 'Executando' :
                           step.status === 'success' ? 'Concluído' : 'Erro'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Logs Detalhados:</h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(logs.join('\n'))}
                    disabled={logs.length === 0}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                <ScrollArea className="h-64 border rounded-lg p-3">
                  {logs.length > 0 ? (
                    <div className="space-y-1">
                      {logs.map((log, index) => (
                        <div key={index} className="text-xs font-mono text-muted-foreground">
                          <span className="text-primary">[{index + 1}]</span> {log}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground text-center py-8">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      Nenhum log disponível
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="result" className="flex-1 space-y-4">
              {error && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-red-600">Erro:</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(error)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <ScrollArea className="h-32 border rounded-lg p-3 bg-red-50">
                    <pre className="text-sm text-red-700 whitespace-pre-wrap">{error}</pre>
                  </ScrollArea>
                </div>
              )}

              {finalResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Resultado Final:</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(finalResult)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <ScrollArea className="h-48 border rounded-lg p-3">
                    <pre className="text-sm whitespace-pre-wrap">{finalResult}</pre>
                  </ScrollArea>
                </div>
              )}

              {!finalResult && !error && (
                <div className="text-sm text-muted-foreground text-center py-8">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  Aguardando resultado da execução...
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

