import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AgentsSection } from "@/components/AgentsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ConclusionSection } from "@/components/ConclusionSection";
import { Footer } from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AgentsSection />
      <FeaturesSection />
      <ConclusionSection />
      <Footer />
    </div>
  );
};

export default Landing;

