import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Added: For subject modal
import { mentors } from "@/data/mentors";

import { Phone, Video, Mic, MicOff, PhoneOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  greeting?: string;
}

const LiveAITalk = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Added: For subject modal control

  // Dynamically get unique subjects from mentors
  const subjects = Array.from(new Set((mentors as Mentor[]).map(m => m.subject)));

  useEffect(() => {
    if (mentorId) {
      // Find mentor by id (or slug if you change to name-based)
      const foundMentor = (mentors as Mentor[]).find(m => m.id === mentorId);
      if (foundMentor) {
        setMentor(foundMentor);
        setIsCallActive(true); // Auto-start call view when param present
      } else {
        toast.error("Mentor not found");
        navigate("/subjects"); // Fallback redirect
      }
    }
  }, [mentorId, navigate]);

  const handleSubjectSelect = (selectedSubject: string) => {
    const foundMentor = (mentors as Mentor[]).find(m => m.subject === selectedSubject);
    if (foundMentor) {
      // TODO: If you want URL as /live-talk/mentor-name, compute slug:
      // const slug = foundMentor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      // navigate(`/live-talk/${slug}`);
      // Then update useEffect find to match slug instead of id.
      navigate(`/live-talk/${foundMentor.id}`);
      setIsModalOpen(false); // Close modal
    } else {
      toast.error("No mentor available for this subject");
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    if (mentor) {
      navigate(`/chat/${mentor.id}`);
    }
  };

  // Call interface (shows avatar & name when active)
  if (isCallActive && mentor) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-slate-950 to-slate-950" />

        <div className={`relative z-10 w-32 h-32 rounded-full overflow-hidden blur-xl transition-all duration-1000 ${isCallActive ? 'animate-pulse scale-150' : ''}`}>
          <div className="w-full h-full relative">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
            {isCallActive && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
            )}
          </div>
        </div>

        <div className="w-32 h-32 rounded-full overflow-hidden hidden md:block">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {isCallActive && (
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
        )}

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">{mentor.name}</h2>
          <p className="text-slate-400">Connected at 00:12</p>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <Button
            variant="outline"
            size="icon"
            className={` ${isMuted ? 'bg-white text-slate-950 hover:bg-slate-200' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="bg-red-600 hover:bg-red-700"
            onClick={handleEndCall}
          >
            <PhoneOff className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-slate-800 text-white hover:bg-slate-700"
          >
            <Video className="w-6 h-6" />
          </Button>
        </div>
      </div>
    );
  }

  // Subject selection view (with modal)
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/subjects")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">Live Mentor Talk</h1>
        </div>

        {/* New: Centered subject prompt + modal trigger */}
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <h2 className="text-2xl font-semibold text-center">Which subject do you want to ask?</h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-full">Select Subject</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Choose a Subject</DialogTitle>
                <DialogDescription>Pick a subject to connect with the expert mentor.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-4">
                {subjects.map((subject) => (
                  <Button
                    key={subject}
                    variant="ghost"
                    className="justify-start h-12"
                    onClick={() => handleSubjectSelect(subject)}
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Optional: Keep old mentor grid as fallback if no subjects, but hidden here */}
        {subjects.length === 0 && (
          <div className="text-center text-muted-foreground">
            No subjects available. Check your mentors data.
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAITalk;
