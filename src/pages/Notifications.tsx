import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bell } from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <h1 className="text-4xl font-bold gradient-text">Notifications</h1>

        <Card className="glass-card rounded-3xl p-12 text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center mx-auto">
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
    </div>
  );
};

export default Notifications;
