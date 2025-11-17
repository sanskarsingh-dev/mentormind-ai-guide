import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { mentors } from "@/data/mentors";
import { BookOpen } from "lucide-react";

// Themed subject icons (SVG assets)
import physicsIcon from "@/assets/subjects/physics.svg";
import hindiIcon from "@/assets/subjects/hindi.svg";
import csIcon from "@/assets/subjects/computer-science.svg";
import historyIcon from "@/assets/subjects/history-civics.svg";
import meditationIcon from "@/assets/subjects/meditation-pe.svg";
import geographyIcon from "@/assets/subjects/geography.svg";
import artsIcon from "@/assets/subjects/arts.svg";
import vocalIcon from "@/assets/subjects/vocal-music.svg";

const subjectIcons: Record<string, any> = {
  Mathematics: "Calculator",
  Physics: physicsIcon,
  Biology: "Microscope",
  English: "Languages",
  Chemistry: "Beaker",
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

interface SubjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (subject: string) => void;
}

export function SubjectSelectionModal({ isOpen, onClose, onSelect }: SubjectSelectionModalProps) {
  const uniqueSubjects = Array.from(new Set(mentors.map((m) => m.subject)));
  const orderedSubjects = SUBJECT_ORDER.filter((s) => uniqueSubjects.includes(s)).concat(
    uniqueSubjects.filter((s) => !SUBJECT_ORDER.includes(s))
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-2xl max-h-[80vh] overflow-y-auto glass-card backdrop-blur-xl border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text text-center">
            Choose Your Subject
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
          {orderedSubjects.map((subject) => {
            const Icon = subjectIcons[subject] || BookOpen;
            const mentor = mentors.find((m) => m.subject === subject);

            return (
              <Card
                key={subject}
                onClick={() => onSelect(subject)}
                className="glass-card backdrop-blur-xl glass-card-hover cursor-pointer p-3 rounded-2xl space-y-2 group border-2 border-primary/10 hover:border-primary/40 transition-all duration-180 ease-in-out"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-180 ease-in-out overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img src={Icon} alt={`${subject} icon`} className="w-6 h-6" loading="eager" />
                  ) : (
                    <Icon className="w-5 h-5 text-white" />
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {subject}
                  </h3>
                  {mentor && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      with {mentor.name}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
    }
