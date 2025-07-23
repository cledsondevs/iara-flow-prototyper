import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">I</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Iara Hub</h3>
                <p className="text-xs text-muted-foreground">Visual Prototyping</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Plataforma líder em criação visual de fluxos de trabalho para agentes de IA, 
              democratizando o acesso à automação inteligente.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Produto */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Agentes de IA</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Integrações</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentação</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sobre nós</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Imprensa</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Parceiros</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">contato@iarahub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Iara Hub. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termos
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};