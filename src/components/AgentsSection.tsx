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
    icon: Database,
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
    icon: Brain,
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
    <section id="agentes" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Nossos <span className="bg-gradient-primary bg-clip-text text-transparent">Agentes de IA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada agente possui funcionalidades específicas, desde processamento de linguagem natural 
            até análise de dados e integração com APIs externas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    {agent.popular && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {agent.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {agent.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/80">
                    {agent.details}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {agent.category}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Usar Agente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Workflow className="w-5 h-5 mr-2" />
            Criar Meu Primeiro Fluxo
          </Button>
        </div>
      </div>
    </section>
  );
};