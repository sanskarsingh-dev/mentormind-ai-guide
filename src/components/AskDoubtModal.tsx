import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AskDoubtModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AskDoubtModal = ({ open, onOpenChange }: AskDoubtModalProps) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    onOpenChange(false);
    navigate("/subjects");
  };

  const handleTalkClick = () => {
    onOpenChange(false);
    navigate("/live-talk");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[90vw] p-6 gap-6">
        <div className="space-y-4">
          <Card 
            className="glass-card backdrop-blur-glass border-2 border-primary/20 shadow-glow cursor-pointer hover:scale-[1.02] transition-all"
            onClick={handleChatClick}
          >
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                Chat with Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ask questions instantly through text chat with your subject mentor.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="glass-card backdrop-blur-glass border-2 border-primary/20 shadow-glow cursor-pointer hover:scale-[1.02] transition-all"
            onClick={handleTalkClick}
          >
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <Phone className="h-6 w-6 text-accent" />
                Talk with Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Speak directly with your mentor through live voice guidance.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
