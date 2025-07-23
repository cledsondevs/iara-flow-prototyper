import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Agentes de IA</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Inteligentes
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              O Iara Flow Prototyper oferece diversos tipos de agentes de IA para compor fluxos de trabalho inteligentes e automatizados.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-foreground">
              Permite aos usuários projetar, testar e implementar fluxos de processamento de dados e lógica de negócios sem necessidade de codificação tradicional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-3"
            >
              Experimentar Grátis
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3"
            >
              Ver Demonstração
            </Button>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Agentes IA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Visual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Código</div>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <Card className="p-8 shadow-elegant bg-gradient-to-br from-background to-primary/5 border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Central hub */}
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-primary-foreground font-bold text-lg">Iara Flow</span>
                  </div>
                  
                  {/* Surrounding agents */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-medium">Chat</span>
                    </div>
                  </div>
                  
                  <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-medium">Data</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-medium">Email</span>
                    </div>
                  </div>
                  
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-medium">Review</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Ecossistema Conectado</h3>
                <p className="text-sm text-muted-foreground">
                  Agentes especializados trabalhando em harmonia
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};