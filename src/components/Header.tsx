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
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10 backdrop-blur-xl">
      <div className="container-modern flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 btn-modern rounded-xl flex items-center justify-center shadow-modern">
            <span className="text-primary-foreground font-black text-xl">I</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Iara Hub</h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Visual Prototyping</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#agentes" className="text-foreground hover:text-primary transition-all duration-300 font-medium animated-underline">
            Agentes
          </a>
          <a href="#recursos" className="text-foreground hover:text-primary transition-all duration-300 font-medium animated-underline">
            Recursos
          </a>
          <a href="#precos" className="text-foreground hover:text-primary transition-all duration-300 font-medium animated-underline">
            Preços
          </a>
          <a href="#contato" className="text-foreground hover:text-primary transition-all duration-300 font-medium animated-underline">
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="hidden sm:flex border-2 hover:bg-primary/5 focus-modern font-semibold transition-all duration-300" 
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button 
            className="btn-modern font-semibold focus-modern" 
            onClick={handleGetStarted}
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </header>
  );
};