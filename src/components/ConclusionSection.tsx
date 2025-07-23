import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const benefits = [
  {
    label: "Produtividade",
    value: 90,
    description: "Aumento na velocidade de desenvolvimento"
  },
  {
    label: "Facilidade de Uso",
    value: 85,
    description: "Interface intuitiva e amigável"
  },
  {
    label: "Flexibilidade",
    value: 80,
    description: "Adaptação a diferentes necessidades"
  },
  {
    label: "Integração",
    value: 75,
    description: "Compatibilidade com APIs externas"
  },
  {
    label: "Escalabilidade",
    value: 70,
    description: "Crescimento conforme demanda"
  }
];

export const ConclusionSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Conclusão</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-foreground leading-relaxed">
                O Iara Flow Prototyper representa uma abordagem moderna para a criação de fluxos de IA.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Combinando tecnologias de ponta com uma interface intuitiva, o projeto facilita a prototipagem visual de agentes de IA sem necessidade de codificação complexa.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
              <p className="text-base text-foreground/80 italic">
                "Uma solução completa que democratiza o acesso à automação inteligente, 
                permitindo que qualquer pessoa crie fluxos de trabalho avançados com IA."
              </p>
            </div>
          </div>

          {/* Gráfico de Benefícios */}
          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                Benefícios do Iara Flow Prototyper
              </h3>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {benefit.label}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {benefit.value}%
                      </span>
                    </div>
                    <Progress 
                      value={benefit.value} 
                      className="h-3"
                    />
                    <p className="text-xs text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground">
                  Baseado em feedback de usuários e métricas de performance
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};