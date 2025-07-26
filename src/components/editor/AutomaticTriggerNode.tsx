import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Play } from 'lucide-react';

interface AutomaticTriggerNodeData {
  label: string;
  agentType: string;
  schedule: string;
  instructions: string;
}

interface AutomaticTriggerNodeProps {
  data: AutomaticTriggerNodeData;
  isExecuting: boolean;
  isActive: boolean;
}

export const AutomaticTriggerNode = ({ data, isExecuting, isActive }: AutomaticTriggerNodeProps) => {
  const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSchedule = event.target.value;
    // Disparar evento customizado para atualizar o nó no ReactFlow
    const nodeElement = event.target.closest('.react-flow__node') as HTMLElement;
    if (nodeElement && nodeElement.dataset.id) {
      window.dispatchEvent(new CustomEvent('updateNodeData', {
        detail: {
          nodeId: nodeElement.dataset.id,
          updates: { schedule: newSchedule }
        }
      }));
    }
  };

  return (
    <Card className={`w-64 shadow-md ${isActive ? 'border-2 border-blue-500' : 'border border-border'} ${isExecuting ? 'opacity-70' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Play className="w-4 h-4 text-blue-500" />
          {data.label}
        </CardTitle>
        <span className="text-xs text-muted-foreground">{data.agentType}</span>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-2">{data.instructions}</p>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="schedule" className="text-xs">Horário (Cron):</Label>
          <Input
            id="schedule"
            type="text"
            placeholder="Ex: 0 0 * * * (meia-noite diária)"
            value={data.schedule}
            onChange={handleScheduleChange}
            className="text-xs"
          />
        </div>
      </CardContent>
      <Handle type="source" position={Position.Right} id="output" />
    </Card>
  );
};

