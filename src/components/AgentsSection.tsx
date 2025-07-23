import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Database, 
  Mail, 
  Star, 
  FileText, 
  Search, 
  Zap, 
  Archive, 
  Brain, 
  BarChart3,
  Workflow
} from "lucide-react";

const agents = [
  {
    icon: MessageCircle,
    name: "Chat Assistant",
    description: "Assistente conversacional",
    details: "Agente especializado em conversas naturais e suporte ao cliente",
    category: "Conversação",
    popular: true
  },
  {
    icon: Zap,
    name: "LangChain Agent",
    description: "Agente com ferramentas",
    details: "Integração avançada com frameworks de IA e processamento de linguagem natural",
    category: "Ferramentas"
  },
  {
    icon: BarChart3,
    name: "Data Analyzer",
    description: "Análise de dados",
    details: "Processamento e análise inteligente de grandes volumes de dados",
    category: "Analytics"
  },
  {
    icon: Search,
    name: "Info Retriever",
    description: "Busca informações",
    details: "Recuperação inteligente de informações de múltiplas fontes",
    category: "Busca"
  },
  {
    icon: FileText,
    name: "Content Generator",
    description: "Gera conteúdo",
    details: "Criação automática de textos, artigos e materiais de marketing",
    category: "Conteúdo"
  },
  {
    icon: Star,
    name: "Review Collector",
    description: "Coleta reviews de lojas de aplicativos",
    details: "Monitoramento e análise automatizada de avaliações de usuários",
    category: "Monitoramento",
    popular: true
  },
  {
    icon: Brain,
    name: "Sentiment Analyzer",
    description: "Analisa sentimento e tópicos de reviews",
    details: "Análise avançada de sentimentos e extração de insights comportamentais",
    category: "Analytics"
  },
  {
    icon: Archive,
    name: "Backlog Generator",
    description: "Gera itens de backlog automaticamente",
    details: "Criação inteligente de tarefas e organização de projetos",
    category: "Produtividade",
    popular: true
  },
  {
    icon: Database,
    name: "Memory Manager",
    description: "Gerencia a memória de longo prazo do agente",
    details: "Sistema avançado de memória persistente para contextos complexos",
    category: "Sistema"
  },
  {
    icon: Mail,
    name: "Email Sender",
    description: "Envia emails automaticamente",
    details: "Automação completa de campanhas e comunicações por email",
    category: "Comunicação"
  }
];

export const AgentsSection = () => {
  return (
    <section id="agentes" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nossos Agentes de IA</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada agente possui funcionalidades específicas, desde processamento de linguagem natural até análise de dados e integração com APIs externas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <Card key={agent.name} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {agent.name}
                  </CardTitle>
                  <IconComponent className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agent.description}</div>
                  <p className="text-xs text-muted-foreground">
                    {agent.details}
                  </p>
                  {agent.popular && (
                    <Badge variant="secondary" className="mt-2">Popular</Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Criar Meu Primeiro Fluxo
          </Button>
        </div>
      </div>
    </section>
  );
};

