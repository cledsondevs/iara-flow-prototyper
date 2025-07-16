import { PrototypeEditor } from "@/components/editor/PrototypeEditor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold">Prototype Editor</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Olá, cledsonborgesalves@gmail.com
          </span>
        </div>
      </div>
      <PrototypeEditor />
    </div>
  );
};

export default Index;

