import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bell, BookOpen, MessageCircle, Brain, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import mentor images
import lisaImg from "@/assets/lisa-mentor.jpg";
import soniaImg from "@/assets/sonia-mentor.jpg";
import lucyImg from "@/assets/lucy-mentor.jpg";
import sophieImg from "@/assets/sophie-mentor.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  const mentorImages = [lisaImg, soniaImg, lucyImg, sophieImg];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-glass bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
              U
            </div>
            <span className="font-semibold text-foreground">Guest User</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/notifications")}
              className="rounded-full"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Analytics Card */}
        <Card className="glass-card backdrop-blur-glass border-2 border-primary/20 shadow-glow">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Your Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Subjects Studied</p>
                <p className="text-4xl font-bold text-primary">3</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-muted-foreground">Hours Spent</p>
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2.5 * 3.14159 * 56} ${(10 - 2.5) * 3.14159 * 56}`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">2h 30m</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Quizzes Attempted</p>
                <p className="text-4xl font-bold text-secondary">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ask Doubts Card */}
        <Card className="glass-card backdrop-blur-glass border-2 border-secondary/20 shadow-glow hover:scale-[1.02] transition-all">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-secondary" />
              Ask Doubts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get instant answers from AI mentors
            </p>
            <Button 
              onClick={() => navigate("/live-chat")}
              className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90"
            >
              Ask Doubt
            </Button>
          </CardContent>
        </Card>

        {/* Study Subjects Card */}
        <Card className="glass-card backdrop-blur-glass border-2 border-accent/20 shadow-glow hover:scale-[1.02] transition-all cursor-pointer"
              onClick={() => navigate("/subjects")}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
              Study 12 Different Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Science, Maths, Tech, Arts, etc. with Specialized Mentors
            </p>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {mentorImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Mentor ${idx + 1}`}
                    className="w-12 h-12 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 font-semibold">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Yourself Card */}
        <Card className="glass-card backdrop-blur-glass border-2 border-primary/20 shadow-glow hover:scale-[1.02] transition-all">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Test Yourself with Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Challenge yourself with AI-generated quizzes
            </p>
            <Button 
              onClick={() => navigate("/create-quiz")}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              Create a Quiz
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-glass bg-background/90 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/dashboard")}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary">🏠</span>
              </div>
              <span className="text-xs text-primary font-semibold">Home</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/calendar")}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <span>📅</span>
              </div>
              <span className="text-xs text-muted-foreground">Calendar</span>
            </Button>
            
            <Button 
              className="w-14 h-14 rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-glow -mt-8"
              onClick={() => navigate("/live-chat")}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/analytics")}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <span>📊</span>
              </div>
              <span className="text-xs text-muted-foreground">Analytics</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center gap-1" onClick={() => navigate("/profile")}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <span>👤</span>
              </div>
              <span className="text-xs text-muted-foreground">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
