import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface SubjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (subject: string) => void;
}

export function SubjectSelectionModal({ isOpen, onClose, onSelect }: SubjectSelectionModalProps) {
  const uniqueSubjects = Array.from(new Set(mentors.map((m) => m.subject)));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card backdrop-blur-xl border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text text-center">
            Choose Your Subject
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
          {uniqueSubjects.map((subject) => {
            const Icon = subjectIcons[subject] || BookOpen;
            const mentor = mentors.find((m) => m.subject === subject);
            
            return (
              <Card
                key={subject}
                onClick={() => onSelect(subject)}
                className="glass-card backdrop-blur-xl glass-card-hover cursor-pointer p-4 rounded-2xl space-y-3 group border-2 border-primary/10 hover:border-primary/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {subject}
                  </h3>
                  {mentor && (
                    <p className="text-xs text-muted-foreground mt-1">
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
