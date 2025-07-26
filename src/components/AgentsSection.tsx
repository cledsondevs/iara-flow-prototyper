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
    name: "Agente Gemini",
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
    <section id="agentes" className="section-padding particles-bg">
      <div className="container-modern">
        <div className="text-center space-y-6 mb-16">
          <h2 className="section-title">Nossos Agentes de IA</h2>
          <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cada agente possui funcionalidades específicas, desde processamento de linguagem natural até análise de dados e integração com APIs externas.
          </p>
        </div>

        <div className="grid-modern">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <div key={agent.name} className="feature-card group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 btn-modern rounded-2xl flex items-center justify-center shadow-modern group-hover:pulse-glow transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  {agent.popular && (
                    <Badge className="bg-gradient-primary text-primary-foreground font-semibold px-3 py-1 shadow-modern">
                      Popular
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{agent.name}</h3>
                    <p className="text-muted-foreground font-medium">{agent.description}</p>
                  </div>

                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {agent.details}
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <Badge variant="outline" className="font-medium">
                      {agent.category}
                    </Badge>
                    <Button 
                      size="sm" 
                      className="btn-modern text-sm font-semibold focus-modern"
                      onClick={() => window.location.href = 
'/auth'}
                    >
                      Usar Agente
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="btn-modern text-lg px-10 py-4 h-auto font-semibold focus-modern"
            onClick={() => window.location.href = 
'/auth'}
          >
            Criar Meu Primeiro Fluxo
          </Button>
        </div>
      </div>
    </section>
  );
};

