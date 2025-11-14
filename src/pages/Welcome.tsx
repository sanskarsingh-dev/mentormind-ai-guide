import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Animated background bubbles */}
      <div className="bubble-effect absolute inset-0" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center space-y-8 max-w-md">
          {/* Animated logo/bubble */}
          <div className="relative mx-auto w-48 h-48 animate-in zoom-in-50 duration-700">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-accent/30 to-primary/20 blur-2xl animate-pulse" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary via-accent to-primary/80 shadow-glow flex items-center justify-center">
              <Sparkles className="w-20 h-20 text-primary-foreground animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-100">
            <h1 className="text-5xl font-bold gradient-text">Luna AI</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              AI tutor has the power to transform the way you learn
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-4 animate-in fade-in-50 slide-in-from-bottom-6 duration-700 delay-200">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="rounded-full w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="rounded-full w-full py-6 text-lg font-semibold border-2 bg-background/50 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full" />
    </div>
  );
};

export default Welcome;
