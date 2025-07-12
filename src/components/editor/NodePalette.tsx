import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  MousePointer, 
  Square, 
  Type, 
  Image, 
  Menu,
  Plus
} from 'lucide-react';

interface NodePaletteProps {
  onAddNode: (type: string, data: any) => void;
}

export const NodePalette = ({ onAddNode }: NodePaletteProps) => {
  const [activeCategory, setActiveCategory] = useState<'screens' | 'components'>('screens');

  const screenTemplates = [
    {
      id: 'mobile-screen',
      label: 'Mobile Screen',
      icon: Smartphone,
      data: {
        label: 'Tela Mobile',
        screenType: 'mobile',
        width: 375,
        height: 812
      }
    },
    {
      id: 'desktop-screen',
      label: 'Desktop Screen',
      icon: Monitor,
      data: {
        label: 'Tela Desktop',
        screenType: 'desktop',
        width: 1440,
        height: 900
      }
    },
    {
      id: 'tablet-screen',
      label: 'Tablet Screen',
      icon: Tablet,
      data: {
        label: 'Tela Tablet',
        screenType: 'tablet',
        width: 768,
        height: 1024
      }
    }
  ];

  const componentTemplates = [
    {
      id: 'button-component',
      label: 'Botão',
      icon: MousePointer,
      data: {
        label: 'Botão',
        componentType: 'button',
        properties: {
          text: 'Clique aqui',
          width: 120,
          height: 40,
          color: '#D72638'
        }
      }
    },
    {
      id: 'input-component',
      label: 'Input',
      icon: Square,
      data: {
        label: 'Campo de Input',
        componentType: 'input',
        properties: {
          text: 'Digite aqui...',
          width: 200,
          height: 40
        }
      }
    },
    {
      id: 'text-component',
      label: 'Texto',
      icon: Type,
      data: {
        label: 'Texto',
        componentType: 'text',
        properties: {
          text: 'Lorem ipsum dolor sit amet',
          width: 200,
          height: 'auto'
        }
      }
    },
    {
      id: 'image-component',
      label: 'Imagem',
      icon: Image,
      data: {
        label: 'Imagem',
        componentType: 'image',
        properties: {
          width: 200,
          height: 150,
          text: 'placeholder.jpg'
        }
      }
    },
    {
      id: 'container-component',
      label: 'Container',
      icon: Menu,
      data: {
        label: 'Container',
        componentType: 'container',
        properties: {
          width: 300,
          height: 200
        }
      }
    }
  ];

  const handleAddNode = (template: any) => {
    if (activeCategory === 'screens') {
      onAddNode('screen', template.data);
    } else {
      onAddNode('component', template.data);
    }
  };

  return (
    <Card className="w-64 h-full bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Paleta de Nós
        </CardTitle>
        
        <div className="flex rounded-lg bg-muted p-1">
          <Button
            variant={activeCategory === 'screens' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveCategory('screens')}
          >
            Telas
          </Button>
          <Button
            variant={activeCategory === 'components' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setActiveCategory('components')}
          >
            Componentes
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 space-y-2">
        {activeCategory === 'screens' && (
          <>
            <div className="text-xs font-medium text-muted-foreground mb-3">
              Adicione telas para o seu fluxo
            </div>
            {screenTemplates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                className="w-full justify-start h-12 bg-card hover:bg-accent"
                onClick={() => handleAddNode(template)}
              >
                <template.icon className="w-4 h-4 mr-3 text-primary" />
                <div className="text-left">
                  <div className="text-sm font-medium">{template.label}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {template.data.width} × {template.data.height}
                  </div>
                </div>
              </Button>
            ))}
          </>
        )}

        {activeCategory === 'components' && (
          <>
            <div className="text-xs font-medium text-muted-foreground mb-3">
              Componentes de interface
            </div>
            {componentTemplates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                className="w-full justify-start h-10 bg-card hover:bg-accent"
                onClick={() => handleAddNode(template)}
              >
                <template.icon className="w-4 h-4 mr-3" />
                <span className="text-sm">{template.label}</span>
              </Button>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};