import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { mentors } from "@/data/mentors";
import { BookOpen, Beaker, Calculator, Languages, Microscope } from "lucide-react";
import physicsSvg from "@/assets/subjects/physics.svg";
import hindiSvg from "@/assets/subjects/hindi.svg";




// 2. Create the helper component
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
  Hindi : HindiIcon
};

interface SubjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (subject: string) => void;
}

export function SubjectSelectionModal({ isOpen, onClose, onSelect }: SubjectSelectionModalProps) {
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
