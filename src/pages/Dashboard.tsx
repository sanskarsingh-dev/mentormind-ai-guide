import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AskDoubtModal } from "@/components/AskDoubtModal";
import { Bell, BookOpen, Brain, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Import mentor images
import lisaImg from "@/assets/lisa-mentor.webp";
import soniaImg from "@/assets/sonia-mentor.webp";
import lucyImg from "@/assets/lucy-mentor.webp";
import sophieImg from "@/assets/sophie-mentor.webp";

const Dashboard = () => {
  const navigate = useNavigate();
  const mentorImages = [lisaImg, soniaImg, lucyImg, sophieImg];
  const [isAskDoubtModalOpen, setIsAskDoubtModalOpen] = useState(false);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                U
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{getGreeting()}</p>
              <p className="text-xs text-muted-foreground">{getCurrentDate()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/notifications")}
              className="rounded-full relative"
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
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Your Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Stacked Stats */}
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">Subjects Studied</p>
                  <p className="text-4xl font-bold text-primary">3</p>
                </div>
                
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">Quizzes Attempted</p>
                  <p className="text-4xl font-bold text-primary">5</p>
                </div>
              </div>
              
              {/* Right Column - Hours Circle */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-sm text-muted-foreground">Hours Spent</p>
                <div className="relative w-28 h-28">
                  <svg className="transform -rotate-90 w-28 h-28">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2.5 * 3.14159 * 48} ${(10 - 2.5) * 3.14159 * 48}`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">2h 30m</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study & Ask Doubts Card (Merged) */}
        <Card className="glass-card backdrop-blur-glass border-2 border-secondary/20 shadow-glow">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
              Study & Ask Doubts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Get help from specialised mentors across 12 different subjects.
            </p>
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap gap-2 flex-1">
                <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Maths</span>
                <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Sciences</span>
                <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">Languages</span>
                <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">Tech</span>
                <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Arts</span>
                <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">Humanities</span>
                <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Skills</span>
              </div>
              
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {mentorImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Mentor ${idx + 1}`}
                        className="w-10 h-10 rounded-full border-2 border-background object-cover hover:scale-110 transition-transform cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/subjects");
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">+more</span>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsAskDoubtModalOpen(true);
              }}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all"
            >
              Ask Doubt
            </Button>
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
              onClick={() => navigate("/quiz")}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all"
            >
              Create a Quiz
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
      
      {/* Ask Doubt Modal */}
      <AskDoubtModal 
        open={isAskDoubtModalOpen} 
        onOpenChange={setIsAskDoubtModalOpen} 
      />
    </div>
  );
};

export default Dashboard;
