import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Settings, Eye, EyeOff } from 'lucide-react';

interface ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfigDialog = ({ open, onOpenChange }: ConfigDialogProps) => {
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);

  useEffect(() => {
    const savedOpenaiKey = localStorage.getItem('openai_api_key');
    const savedGeminiKey = localStorage.getItem('gemini_api_key');
    if (savedOpenaiKey) setOpenaiApiKey(savedOpenaiKey);
    if (savedGeminiKey) setGeminiApiKey(savedGeminiKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem('openai_api_key', openaiApiKey);
    localStorage.setItem('gemini_api_key', geminiApiKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações de API
          </DialogTitle>
          <DialogDescription>
            Configure suas chaves de API para executar os fluxos de IA.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="openai" className="pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="gemini">Google Gemini</TabsTrigger>
          </TabsList>
          
          <TabsContent value="openai" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openaiKey">Chave de API OpenAI</Label>
              <div className="relative">
                <Input
                  id="openaiKey"
                  type={showOpenaiKey ? "text" : "password"}
                  placeholder="sk-..."
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-7 w-7 p-0"
                  onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                >
                  {showOpenaiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Obtenha sua chave em: platform.openai.com/api-keys
              </p>
            </div>
          </TabsContent>

          <TabsContent value="gemini" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="geminiKey">Chave de API Google Gemini</Label>
              <div className="relative">
                <Input
                  id="geminiKey"
                  type={showGeminiKey ? "text" : "password"}
                  placeholder="AIza..."
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-7 w-7 p-0"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                >
                  {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Obtenha sua chave em: aistudio.google.com/app/apikey
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};