import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { mentors } from "@/data/mentors";
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <h1 className="text-5xl font-bold gradient-text">
            Choose Your Subject
          </h1>
          <p className="text-xl text-muted-foreground">
            Select a subject to meet your AI mentor
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {mentors.map((mentor) => {
            const Icon = subjectIcons[mentor.subject] || BookOpen;
            
            return (
              <Card
                key={mentor.id}
                onClick={() => navigate(`/mentor/${mentor.id}`)}
                className="glass-card glass-card-hover cursor-pointer p-6 rounded-3xl space-y-4 group"
              >
                {/* Subject Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Subject Name */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {mentor.subject}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    with {mentor.name}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground">
                  {mentor.description}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {mentor.expertise.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-white/50 text-foreground"
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
    </div>
  );
};

export default SubjectSelection;
