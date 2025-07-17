import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, AlertCircle, Clock, Copy } from 'lucide-react';
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
}

export const ExecutionResult = ({ open, onClose, steps, finalResult }: ExecutionResultProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Resultado copiado para a área de transferência.",
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
          <div className="space-y-4">
            {/* Steps */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Passos da Execução:</h4>
              <ScrollArea className="h-32 border rounded-lg p-3">
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

            {/* Final Result */}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};