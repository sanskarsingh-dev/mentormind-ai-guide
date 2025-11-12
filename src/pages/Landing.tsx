import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroBubble from "@/assets/hero-bubble.jpg";

const Landing = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-6 relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="text-center space-y-8 max-w-2xl">
        {/* Hero Bubble */}
        <div className="relative w-64 h-64 mx-auto mb-8 animate-fade-in">
          <img 
            src={heroBubble} 
            alt="MentorMind" 
            className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
          />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold gradient-text">
            MentorMind
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-powered learning assistants for every subject
          </p>
        </div>

        {/* Welcome Message */}
        <div className="glass-card rounded-3xl p-8 space-y-4 animate-fade-in backdrop-blur-glass border-2 border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome to MentorMind! 👋
          </h2>
          <p className="text-lg text-muted-foreground">
            Your personal AI learning companion
          </p>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={() => setShowAuthModal(true)}
          size="lg"
          className="text-lg px-12 py-6 rounded-full shadow-glow bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Button>

        {/* Stats */}
        <div className="flex justify-center gap-8 text-sm text-muted-foreground pt-4">
          <div>
            <span className="font-semibold text-foreground">12</span> Expert Mentors
          </div>
          <div>•</div>
          <div>
            <span className="font-semibold text-foreground">24/7</span> Available
          </div>
          <div>•</div>
          <div>
            <span className="font-semibold text-foreground">∞</span> Questions
          </div>
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default Landing;
