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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-4 max-w-lg mx-auto">
        {/* Logo/Icon */}
        <div className="relative mb-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary/80 flex items-center justify-center shadow-glow animate-in zoom-in-50 duration-700">
            <GraduationCap className="w-12 h-12 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center animate-bounce">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-100">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            MentorMind
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            AI tutor has the power to transform the way you learn
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 w-full animate-in fade-in-50 slide-in-from-bottom-6 duration-700 delay-200">
          <div className="glass-card rounded-2xl p-3 space-y-1 hover:scale-105 transition-transform duration-300">
            <Brain className="w-6 h-6 text-primary mx-auto" />
            <h3 className="text-xs font-semibold text-foreground">Smart Learning</h3>
          </div>
          <div className="glass-card rounded-2xl p-3 space-y-1 hover:scale-105 transition-transform duration-300">
            <MessageSquare className="w-6 h-6 text-accent mx-auto" />
            <h3 className="text-xs font-semibold text-foreground">Chat Anytime</h3>
          </div>
          <div className="glass-card rounded-2xl p-3 space-y-1 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-6 h-6 text-primary mx-auto" />
            <h3 className="text-xs font-semibold text-foreground">Quiz Master</h3>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-300">
          <Button
            size="lg"
            onClick={() => setShowAuthModal(true)}
            className="rounded-full px-10 py-5 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Get Started
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Bottom tagline */}
        <p className="text-xs text-muted-foreground animate-in fade-in-50 duration-700 delay-500">
          Your personalized AI learning companion
        </p>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default Landing;
