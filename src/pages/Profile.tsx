import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  ArrowLeft, 
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

        {/* Profile Header */}
        <Card className="glass-card rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold gradient-text">Student Name</h1>
              <p className="text-muted-foreground">student@example.com</p>
            </div>
            <ThemeToggle />
          </div>

          {/* Analytics Summary */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">8</p>
              <p className="text-sm text-muted-foreground">Subjects</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">36h</p>
              <p className="text-sm text-muted-foreground">Study Time</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">12</p>
              <p className="text-sm text-muted-foreground">Quizzes</p>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="glass-card rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold gradient-text">Account Settings</h2>
          <div className="space-y-3">
            {[
              { icon: User, label: "Personal Information", desc: "Update your details" },
              { icon: Bell, label: "Notifications", desc: "Manage your alerts" },
              { icon: CreditCard, label: "Subscription", desc: "View your plan" },
              { icon: Shield, label: "Security", desc: "Password and security" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-4 h-auto py-4 px-4 hover:bg-accent"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Project Settings */}
        <Card className="glass-card rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold gradient-text">Project Settings</h2>
          <div className="space-y-3">
            {[
              { icon: Users, label: "Friends", desc: "Manage your connections" },
              { icon: Paperclip, label: "Attachments", desc: "View saved files" },
              { icon: Eye, label: "Privacy AI", desc: "AI data preferences" },
              { icon: Lock, label: "Password", desc: "Change your password" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-4 h-auto py-4 px-4 hover:bg-accent"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Logout */}
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full gap-2 rounded-full py-6"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
