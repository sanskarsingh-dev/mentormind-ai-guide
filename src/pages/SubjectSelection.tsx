import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentors } from "@/data/mentors";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";
import { BookOpen, Beaker, Calculator, Languages, Microscope, ArrowLeft } from "lucide-react";

// Themed subject icons (SVG assets) - imported as URLs
import physicsIcon from "@/assets/subjects/physics.svg";
import hindiIcon from "@/assets/subjects/hindi.svg";
import csIcon from "@/assets/subjects/computer-science.svg";
import historyIcon from "@/assets/subjects/history-civics.svg";
import meditationIcon from "@/assets/subjects/meditation-pe.svg";
import geographyIcon from "@/assets/subjects/geography.svg";
import artsIcon from "@/assets/subjects/arts.svg";
import vocalIcon from "@/assets/subjects/vocal-music.svg";

const subjectIcons: Record<string, any> = {
  Mathematics: Calculator,
  Physics: physicsIcon,
  Biology: Microscope,
  English: Languages,
  Chemistry: Beaker,
  Hindi: hindiIcon,
  "Computer Science": csIcon,
  "History & Civics": historyIcon,
  Geography: geographyIcon,
  "Meditation & Physical Education": meditationIcon,
  Arts: artsIcon,
  "Vocal Music": vocalIcon,
};

const SUBJECT_ORDER = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Computer Science",
  "History & Civics",
  "Geography",
  "Meditation & Physical Education",
  "Arts",
  "Vocal Music",
];

const SubjectSelection = () => {
  const navigate = useNavigate();

  // get unique subjects present in mentors
  const uniqueSubjects = Array.from(new Set(mentors.map((m) => m.subject)));

  // Build orderedSubjects: follow SUBJECT_ORDER exactly for items present, then append any extras
  const orderedSubjects = SUBJECT_ORDER.filter((s) => uniqueSubjects.includes(s)).concat(
    uniqueSubjects.filter((s) => !SUBJECT_ORDER.includes(s))
  );

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          {orderedSubjects.map((subject) => {
            const mentor = mentors.find((m) => m.subject === subject);
            const Icon = subjectIcons[subject] || BookOpen;

            return (
              <Card
                key={subject}
                onClick={() => {
                  if (mentor) navigate(`/mentor/${mentor.id}`);
                  else navigate("/subjects");
                }}
                className="glass-card backdrop-blur-xl glass-card-hover cursor-pointer p-6 rounded-2xl space-y-4 group border-2 border-primary/10 transition-all transform-gpu will-change-transform hover:scale-[1.02] motion-reduce:transform-none"
              >
                <div className="flex items-start gap-4">
                  {/* Icon (circular, consistent) */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-180 ease-in-out overflow-hidden">
                      {typeof Icon === "string" ? (
                        <img src={Icon} alt={`${subject} icon`} className="w-8 h-8" loading="eager" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Subject Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">{subject}</h3>
                      {mentor && (
                        <span className="text-xs text-muted-foreground">with {mentor.name}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mentor?.description ?? "Expert mentor available"}
                    </p>
                  </div>
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
