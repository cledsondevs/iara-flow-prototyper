import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">I</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Iara Hub</h1>
            <p className="text-xs text-muted-foreground">Visual Prototyping</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#agentes" className="text-foreground hover:text-primary transition-colors">
            Agentes
          </a>
          <a href="#recursos" className="text-foreground hover:text-primary transition-colors">
            Recursos
          </a>
          <a href="#precos" className="text-foreground hover:text-primary transition-colors">
            Preços
          </a>
          <a href="#contato" className="text-foreground hover:text-primary transition-colors">
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:flex" onClick={handleLogin}>
            Login
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300" onClick={handleGetStarted}>
            Começar Agora
          </Button>
        </div>
      </div>
    </header>
  );
};