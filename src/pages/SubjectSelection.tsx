import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { mentors } from "@/data/mentors";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";
import { BookOpen, Beaker, Calculator, Languages, Microscope } from "lucide-react";

const subjectIcons: Record<string, any> = {
  Mathematics: Calculator,
  Physics: Beaker,
  Biology: Microscope,
  English: Languages,
  Chemistry: Beaker,
};

const SubjectSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 pb-24">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-6">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold gradient-text">
            Choose Your Subject
          </h1>
          <p className="text-lg text-muted-foreground">
            Select a subject to meet your AI mentor
          </p>
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
                {/* Subject Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Subject Name */}
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {mentor.subject}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    with {mentor.name}
                  </p>
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
