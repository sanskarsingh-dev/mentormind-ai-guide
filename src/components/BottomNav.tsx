import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Calendar, BarChart3, User } from "lucide-react";
import liveTalkLogo from "@/assets/live-talk-logo.png";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className={`flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all ${
              isActive("/dashboard") ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/calendar")}
            className={`flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all ${
              isActive("/calendar") ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs font-medium">Calendar</span>
          </Button>

          <Button
            onClick={() => navigate("/live-talk")}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all hover:scale-110 -mt-8 p-0 shadow-lg shadow-primary/50"
            aria-label="Live AI Doubt Solving"
          >
            <img src={liveTalkLogo} alt="Live AI Talk" className="w-full h-full rounded-full" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/analytics")}
            className={`flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all ${
              isActive("/analytics") ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs font-medium">Analytics</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className={`flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all ${
              isActive("/profile") ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
