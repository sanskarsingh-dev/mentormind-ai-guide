import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";
import { Bell } from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 pb-24">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Notifications</h1>
          <ThemeToggle />
        </div>

        <Card className="glass-card backdrop-blur-xl rounded-3xl p-12 text-center space-y-6 border-2 border-primary/20">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
            <Bell className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold gradient-text">No New Notifications</h2>
            <p className="text-muted-foreground">
              You're all caught up! We'll notify you when there's something new.
            </p>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Notifications;
