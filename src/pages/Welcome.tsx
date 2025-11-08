import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBubble from "@/assets/hero-bubble.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
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
        <div className="glass-card rounded-3xl p-8 space-y-4 animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome to MentorMind! 👋
          </h2>
          <p className="text-lg text-muted-foreground">
            Which subject would you like to study today?
          </p>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={() => navigate("/subjects")}
          size="lg"
          className="text-lg px-12 py-6 rounded-full glass-card-hover shadow-glow bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:opacity-90"
        >
          Get Started
        </Button>

        {/* Stats */}
        <div className="flex justify-center gap-8 text-sm text-muted-foreground pt-4">
          <div>
            <span className="font-semibold text-foreground">5</span> Expert Mentors
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
    </div>
  );
};

export default Welcome;
