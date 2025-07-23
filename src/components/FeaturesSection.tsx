import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Puzzle, Zap, Shield, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Puzzle,
    title: "Fluxos Visuais",
    description: "Crie fluxos de trabalho complexos através de uma interface visual intuitiva, sem necessidade de programação."
  },
  {
    icon: Zap,
    title: "Execução Rápida",
    description: "Performance otimizada para processamento em tempo real de grandes volumes de dados e requisições."
  },
  {
    icon: CheckCircle,
    title: "Configuração Simples",
    description: "Configure seus agentes em minutos com templates pré-definidos e configurações personalizáveis."
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Proteção enterprise com criptografia de ponta a ponta e controle de acesso granular."
  },
  {
    icon: Globe,
    title: "Integração Universal",
    description: "Conecte com APIs externas, bancos de dados e ferramentas como Google, Apple e muito mais."
  },
  {
    icon: Users,
    title: "Colaboração em Equipe",
    description: "Trabalhe em equipe com recursos de versionamento, comentários e aprovações em tempo real."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Por que escolher o <span className="bg-gradient-primary bg-clip-text text-transparent">Iara Hub</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa para criação, teste e implementação de fluxos de IA 
            sem necessidade de conhecimento técnico avançado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-glow transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 shadow-elegant">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto para começar?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de empresas que já automatizaram seus processos com nossos agentes de IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Teste grátis por 14 dias</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Sem necessidade de cartão</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Suporte especializado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};