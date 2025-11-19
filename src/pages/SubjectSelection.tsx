import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentors } from "@/data/mentors";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";
import { BookOpen, Beaker, Calculator, Languages, Microscope, ArrowLeft } from "lucide-react";
import physicsSvg from "@/assets/subjects/physics.svg";
import hindiSvg from "@/assets/subjects/hindi.svg";


// 2. Create a helper component to render the image
const PhysicsIcon = ({ className }: { className?: string }) => (
  <img src={physicsSvg} alt="Physics" className={className} />
);

const hindiIcon = ({ className }: { className?: string }) => (
  <img src={hindiSvg} alt="Hindi" className={className} />
);


const subjectIcons: Record<string, any> = {
  Mathematics: Calculator,
  Physics: PhysicsIcon,
  Biology: Microscope,
  English: Languages,
  Chemistry: Beaker,
  Hindi : HindiIcon,
};

const SubjectSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 pb-24">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <ThemeToggle />
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">
              Choose Your Subject
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a subject to meet your AI mentor
            </p>
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          {mentors.map((mentor) => {
            const Icon = subjectIcons[mentor.subject] || BookOpen;
            
            return (
              <Card
                key={mentor.id}
                onClick={() => navigate(`/mentor/${mentor.id}`)}
                className="glass-card backdrop-blur-xl glass-card-hover cursor-pointer p-6 rounded-2xl space-y-4 group border-2 border-primary/10"
              >
                <div className="flex items-start gap-4">
                  {/* Mentor Avatar (Squircle) */}
                  <div className="flex-shrink-0 relative">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-lg object-cover border-2 border-primary/20"
                    />
                  </div>
                  
                  <div className="absolute -bottom-1 left-0 flex items-center gap-1 bg-background/95 rounded-full px-2 py-0.5 border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-500 font-medium">online</span>
                  </div>

                  {/* Subject Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {mentor.subject}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          with {mentor.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {mentor.description}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {mentor.expertise.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SubjectSelection;
