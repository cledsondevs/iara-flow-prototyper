import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center particles-bg overflow-hidden">
      {/* Enhanced background with gradient animation */}
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5"></div>
      
      <div className="relative container-modern grid lg:grid-cols-2 gap-16 items-center section-padding">
        {/* Content */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h1 className="hero-title">
              <span className="block">Agentes de IA</span>
              <span className="block">Inteligentes</span>
            </h1>
            <p className="text-responsive-lg text-muted-foreground max-w-2xl leading-relaxed">
              O Iara Flow Prototyper oferece diversos tipos de agentes de IA para compor fluxos de trabalho inteligentes e automatizados.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Permite aos usuários projetar, testar e implementar fluxos de processamento de dados e lógica de negócios sem necessidade de codificação tradicional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              size="lg" 
              className="btn-modern text-lg px-10 py-4 h-auto font-semibold focus-modern"
            >
              Experimentar Grátis
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-10 py-4 h-auto font-semibold border-2 hover:bg-primary/5 focus-modern transition-all duration-300"
            >
              Ver Demonstração
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">10+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Agentes IA</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">100%</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Visual</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">0</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Código</div>
            </div>
          </div>
        </div>

        {/* Enhanced Visual */}
        <div className="relative">
          <div className="feature-card shadow-modern-lg">
            <div className="space-y-8">
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Central hub with enhanced styling */}
                  <div className="w-32 h-32 btn-modern rounded-full flex items-center justify-center pulse-glow shadow-modern-lg">
                    <span className="text-primary-foreground font-bold text-sm text-center leading-tight">Iara Flow</span>
                  </div>
                  
                  {/* Surrounding agents with floating animation */}
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 float-animation" style={{animationDelay: '0s'}}>
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-modern">
                      <span className="text-primary-foreground text-xs font-semibold">Chat</span>
                    </div>
                  </div>
                  
                  <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 float-animation" style={{animationDelay: '1.5s'}}>
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-modern">
                      <span className="text-primary-foreground text-xs font-semibold">Data</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 float-animation" style={{animationDelay: '3s'}}>
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-modern">
                      <span className="text-primary-foreground text-xs font-semibold">Email</span>
                    </div>
                  </div>
                  
                  <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 float-animation" style={{animationDelay: '4.5s'}}>
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-modern">
                      <span className="text-primary-foreground text-xs font-semibold">Review</span>
                    </div>
                  </div>

                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{width: '200px', height: '200px', left: '-50px', top: '-50px'}}>
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(262 83% 58%)" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="hsl(290 83% 65%)" stopOpacity="0.1"/>
                      </linearGradient>
                    </defs>
                    <line x1="100" y1="100" x2="100" y2="20" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </line>
                    <line x1="100" y1="100" x2="180" y2="100" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </line>
                    <line x1="100" y1="100" x2="100" y2="180" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </line>
                    <line x1="100" y1="100" x2="20" y2="100" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </line>
                  </svg>
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold text-foreground">Ecossistema Conectado</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Agentes especializados trabalhando em harmonia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};