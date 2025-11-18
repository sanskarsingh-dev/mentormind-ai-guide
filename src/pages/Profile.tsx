import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Brain } from "lucide-react";
import { 
  User, 
  Bell, 
  CreditCard, 
  Shield, 
  Users, 
  Paperclip, 
  Lock, 
  Eye,
  LogOut
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 pb-24">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Profile</h1>
          <ThemeToggle />
        </div>

        {/* Profile Header */}
        <Card className="glass-card backdrop-blur-xl rounded-3xl p-8 space-y-6 border-2 border-primary/20">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold">
                U
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold gradient-text">Guest User</h2>
              <p className="text-muted-foreground">guest@mentormind.app</p>
            </div>
          </div>

          {/* Analytics Summary */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center">
                <Brain className="h-4 w-4 text-primary mr-1" />
                <p className="text-3xl font-bold gradient-text">3</p>
              </div>
              <p className="text-sm text-muted-foreground">Subjects</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-3xl font-bold gradient-text">2h 30m</p>
              <p className="text-sm text-muted-foreground">Study Time</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-3xl font-bold gradient-text">5</p>
              <p className="text-sm text-muted-foreground">Quizzes</p>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="glass-card backdrop-blur-xl rounded-3xl p-6 space-y-4 border-2 border-border/50">
          <h2 className="text-xl font-bold gradient-text">Account Settings</h2>
          <div className="space-y-2">
            {[
              { icon: User, label: "Personal Information", desc: "Update your details" },
              { icon: Bell, label: "Notifications", desc: "Manage your alerts" },
              { icon: CreditCard, label: "Subscription", desc: "View your plan" },
              { icon: Shield, label: "Security", desc: "Password and security" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3 px-3 hover:bg-accent/50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Project Settings */}
        <Card className="glass-card backdrop-blur-xl rounded-3xl p-6 space-y-4 border-2 border-border/50">
          <h2 className="text-xl font-bold gradient-text">Project Settings</h2>
          <div className="space-y-2">
            {[
              { icon: Users, label: "Friends", desc: "Manage your connections" },
              { icon: Paperclip, label: "Attachments", desc: "View your files" },
              { icon: Eye, label: "Privacy AI", desc: "AI privacy settings" },
              { icon: Lock, label: "Password", desc: "Change your password" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3 px-3 hover:bg-accent/50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full gap-2 h-12 text-base rounded-xl"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
