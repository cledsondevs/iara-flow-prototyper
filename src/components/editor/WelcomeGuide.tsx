import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, Zap, FileText, Mail, Lightbulb, Plus, MousePointer, Smartphone } from 'lucide-react';
import { FlowTemplates } from '../FlowTemplates';

interface WelcomeGuideProps {
  onClose: () => void;
  onLoadTemplate?: (template: any) => void;
}

export const WelcomeGuide = ({ onClose, onLoadTemplate }: WelcomeGuideProps) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const handleLoadTemplate = (template: any) => {
    if (onLoadTemplate) {
      onLoadTemplate(template);
    }
    onClose();
  };

  if (showTemplates) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Templates de Fluxo</CardTitle>
                <CardDescription>Escolha um template para começar</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <FlowTemplates onLoadTemplate={handleLoadTemplate} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                Bem-vindo ao Editor de Agentes IA
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
          <p className="text-sm text-muted-foreground">
            Editor visual para criação de fluxos de agentes de IA
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Plus className="w-3 h-3 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">1. Adicione agentes</h4>
                <p className="text-xs text-muted-foreground">
                  Use a paleta à esquerda para adicionar agentes de IA e componentes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <MousePointer className="w-3 h-3 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">2. Conecte agentes</h4>
                <p className="text-xs text-muted-foreground">
                  Arraste dos pontos de conexão para criar fluxos entre agentes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Smartphone className="w-3 h-3 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">3. Configure agentes</h4>
                <p className="text-xs text-muted-foreground">
                  Clique em qualquer agente para configurar suas propriedades e parâmetros
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border space-y-2">
            <Button 
              onClick={() => setShowTemplates(true)}
              variant="outline"
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Ver Templates de Fluxo
            </Button>
            <Button 
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary-hover"
            >
              Começar do Zero
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};