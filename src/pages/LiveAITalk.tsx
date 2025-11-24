import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentors } from "@/data/mentors"; // Assuming this exports an array of mentor objects

import { Phone, Video, Mic, MicOff, PhoneOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Fixed: Added Mentor interface (define based on your data/mentors.ts structure; adjust fields as needed)
interface Mentor {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  greeting?: string; // Optional, if used elsewhere
}

const LiveAITalk = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  
  // Fixed: Used proper Mentor type
  const [activeMentor, setActiveMentor] = useState<Mentor | null>(
    mentorId ? (mentors as Mentor[]).find(m => m.id === mentorId) || null : null
  );
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // EFFECT: Watch for URL changes.
  // If a user navigates here with an ID, auto-start the session setup.
  useEffect(() => {
    if (mentorId) {
      const foundMentor = (mentors as Mentor[]).find(m => m.id === mentorId);
      if (foundMentor) {
        setActiveMentor(foundMentor);
        // Optionally: setIsCallActive(true); 
      } else {
        toast.error("Mentor not found");
        navigate("/subjects"); // Redirect if invalid ID
      }
    }
  }, [mentorId, navigate]);

  const handleStartCall = (mentor: Mentor) => {
    setActiveMentor(mentor);
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    // Decide where to go after call ends:
    // Option A: Go back to chat
    if (activeMentor) {
      navigate(`/chat/${activeMentor.id}`);
    } else {
      // Option B: Reset local state
      setActiveMentor(null);
    }
  };

  // --- VIEW: ACTIVE CALL INTERFACE ---
  if (activeMentor) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-slate-950 to-slate-950" />

        {/* Mentor Avatar pulsing effect */}
        {/* Fixed: Used backticks for template literal in className */}
        <div className={`relative z-10 w-32 h-32 rounded-full overflow-hidden blur-xl transition-all duration-1000 ${isCallActive ? 'animate-pulse scale-150' : ''}`}>
          <div className="w-full h-full relative">
            <img
              src={activeMentor.avatar}
              alt={activeMentor.name}
              className="w-full h-full object-cover"
            />
            {isCallActive && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
            )}
          </div>
        </div>

        {/* Hidden on mobile, shown on md+ */}
        <div className="w-32 h-32 rounded-full overflow-hidden hidden md:block">
          <img
            src={activeMentor.avatar}
            alt={activeMentor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {isCallActive && (
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
        )}

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">{activeMentor.name}</h2>
          <p className="text-slate-400">Connected at 00:12</p>
        </div>

        {/* Call Controls */}
        <div className="flex items-center gap-6 mt-8">
          <Button
            variant="outline"
            size="icon"
            className={`${isMuted ? 'bg-white text-slate-950 hover:bg-slate-200' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
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

  // --- VIEW: MENTOR SELECTION LIST (Fallback if no ID provided) ---
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/subjects")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">Live Mentor Talk</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(mentors as Mentor[]).map((mentor) => (
            <Card
              key={mentor.id}
              className="p-6 hover:shadow-lg transition-all cursor-pointer border-slate-200"
              onClick={() => handleStartCall(mentor)}
            >
              {/* Fixed: Used backticks for template literal */}
              <div className={`relative z-10 w-full h-48 rounded-lg overflow-hidden blur-xl transition-all duration-1000 ${isCallActive ? 'animate-pulse scale-150' : ''}`}>
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-semibold text-lg">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground">{mentor.subject}</p>
              </div>

              <Button className="w-full mt-4 gap-2">
                <Phone className="w-4 h-4" />
                Start Call
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAITalk;
