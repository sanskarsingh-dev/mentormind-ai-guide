import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { mentors } from "@/data/mentors";
import { BookOpen, Beaker, Calculator, Languages, Microscope } from "lucide-react";

// 1. Import all SVGs
import physicsSvg from "@/assets/subjects/physics.svg";
import hindiSvg from "@/assets/subjects/hindi.svg";
import computerSvg from "@/assets/subjects/computer.svg";
import artSvg from "@/assets/subjects/art.svg";
import meditationSvg from "@/assets/subjects/meditation.svg";
import historySvg from "@/assets/subjects/history.svg";
import geographySvg from "@/assets/subjects/geography.svg";
import musicSvg from "@/assets/subjects/music.svg";

// 2. Create Helper Components
const PhysicsIcon = ({ className }: { className?: string }) => (
  <img src={physicsSvg} alt="Physics" className={className} />
);
const HindiIcon = ({ className }: { className?: string }) => (
  <img src={hindiSvg} alt="Hindi" className={className} />
);
const ComputerIcon = ({ className }: { className?: string }) => (
  <img src={computerSvg} alt="Computer Science" className={className} />
);
const ArtIcon = ({ className }: { className?: string }) => (
  <img src={artSvg} alt="Art" className={className} />
);
const MeditationIcon = ({ className }: { className?: string }) => (
  <img src={meditationSvg} alt="Meditation" className={className} />
);
const HistoryIcon = ({ className }: { className?: string }) => (
  <img src={historySvg} alt="History" className={className} />
);
const GeographyIcon = ({ className }: { className?: string }) => (
  <img src={geographySvg} alt="Geography" className={className} />
);
const MusicIcon = ({ className }: { className?: string }) => (
  <img src={musicSvg} alt="Music" className={className} />
);

// 3. Map keys EXACTLY to the subject strings in mentors.ts
const subjectIcons: Record<string, any> = {
  "Mathematics": Calculator,
  "Physics": PhysicsIcon,
  "Biology": Microscope,
  "English": Languages,
  "Chemistry": Beaker,
  "Hindi": HindiIcon,
  "Art": ArtIcon,
  "Geography": GeographyIcon,
  
  // These keys must have quotes to handle spaces & special characters
  "Computer Science": ComputerIcon,
  "History & Civics": HistoryIcon,
  "Meditation & P.E.": MeditationIcon,
  "Vocal Music": MusicIcon, 
};

interface SubjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (subject: string) => void;
}

export function SubjectSelectionModal({ isOpen, onClose, onSelect }: SubjectSelectionModalProps) {
  // ... (rest of the component code remains the same)
  const uniqueSubjects = Array.from(new Set(mentors.map((m) => m.subject)));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-2xl max-h-[80vh] overflow-y-auto glass-card backdrop-blur-xl border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text text-center">
            Choose Your Subject
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
          {uniqueSubjects.map((subject) => {
            // This line looks up the exact string in your map above
            const Icon = subjectIcons[subject] || BookOpen;
            const mentor = mentors.find((m) => m.subject === subject);
            
            return (
              <Card
                key={subject}
                onClick={() => onSelect(subject)}
                className="glass-card backdrop-blur-xl glass-card-hover cursor-pointer p-3 rounded-2xl space-y-2 group border-2 border-primary/10 hover:border-primary/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
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
