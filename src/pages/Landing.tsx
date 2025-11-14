import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, GraduationCap, MessageSquare, Brain } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthModal } from "@/components/AuthModal";

const Landing = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-accent/20">
        <div className="bubble-effect absolute inset-0" />
      </div>

      {/* Floating bubble decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl animate-pulse" />
      
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-8">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-accent to-primary/80 flex items-center justify-center shadow-glow animate-in zoom-in-50 duration-700">
            <GraduationCap className="w-16 h-16 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-accent/80 flex items-center justify-center animate-bounce">
            <Sparkles className="w-6 h-6 text-accent-foreground" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-100">
          <h1 className="text-6xl md:text-7xl font-bold gradient-text">
            Luna AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI tutor has the power to transform the way you learn
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl animate-in fade-in-50 slide-in-from-bottom-6 duration-700 delay-200">
          <div className="glass-card rounded-3xl p-6 space-y-2 hover:scale-105 transition-transform duration-300">
            <Brain className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold text-foreground">Smart Learning</h3>
            <p className="text-sm text-muted-foreground">Personalized AI mentors</p>
          </div>
          <div className="glass-card rounded-3xl p-6 space-y-2 hover:scale-105 transition-transform duration-300">
            <MessageSquare className="w-8 h-8 text-accent mx-auto" />
            <h3 className="font-semibold text-foreground">Chat Anytime</h3>
            <p className="text-sm text-muted-foreground">24/7 instant help</p>
          </div>
          <div className="glass-card rounded-3xl p-6 space-y-2 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold text-foreground">Quiz Master</h3>
            <p className="text-sm text-muted-foreground">Test your knowledge</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-300">
          <Button
            size="lg"
            onClick={() => setShowAuthModal(true)}
            className="rounded-full px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Get Started
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Bottom tagline */}
        <p className="text-sm text-muted-foreground animate-in fade-in-50 duration-700 delay-500">
          Your personalized AI learning companion
        </p>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default Landing;
