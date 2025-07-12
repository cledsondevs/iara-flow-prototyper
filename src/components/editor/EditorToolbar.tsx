import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Save,
  Download,
  Undo,
  Redo,
  Play,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  Settings
} from 'lucide-react';

interface EditorToolbarProps {
  onSave: () => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onPreview?: () => void;
}

export const EditorToolbar = ({ 
  onSave, 
  onExport, 
  onUndo, 
  onRedo, 
  onPreview 
}: EditorToolbarProps) => {
  return (
    <div className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
      {/* Grupo de ações principais */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            className="h-8 px-3"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="h-8 px-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            className="h-8 w-8 p-0"
          >
            <Undo className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            className="h-8 w-8 p-0"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <span className="text-sm text-muted-foreground font-mono min-w-[50px] text-center">
            100%
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Logo e título */}
      <div className="flex items-center gap-3">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-foreground">
            Iara <span className="text-primary">Hub</span>
          </h1>
          <p className="text-xs text-muted-foreground">Visual Prototyping</p>
        </div>
      </div>

      {/* Grupo de ações secundárias */}
      <div className="flex items-center gap-2">
        {onPreview && (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={onPreview}
              className="h-8 px-3 bg-primary hover:bg-primary-hover"
            >
              <Play className="w-4 h-4 mr-2" />
              Preview
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
          </>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};