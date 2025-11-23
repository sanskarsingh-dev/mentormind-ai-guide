import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentors } from "@/data/mentors"; // Assuming this is where your array lives
import { Phone, Video, Mic, MicOff, PhoneOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const LiveAITalk = () => {
  const { mentorId } = useParams<{ mentorId: string }>(); // Get ID from URL
  const navigate = useNavigate();
  
  // If mentorId exists in URL, initialize state with that mentor
  const [activeMentor, setActiveMentor] = useState(
    mentorId ? mentors.find(m => m.id === mentorId) : null
  );
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // EFFECT: Watch for URL changes. 
  // If a user navigates here with an ID, auto-start the session setup.
  useEffect(() => {
    if (mentorId) {
      const foundMentor = mentors.find(m => m.id === mentorId);
      if (foundMentor) {
        setActiveMentor(foundMentor);
        // Optional: Auto-start the call connection immediately
        // setIsCallActive(true); 
      }
    }
  }, [mentorId]);

  const handleStartCall = (mentor: any) => {
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
        
        <div className="z-10 flex flex-col items-center gap-8 w-full max-w-md animate-fade-in">
          {/* Mentor Avatar pulsing effect */}
          <div className="relative">
            <div className={`absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-1000 ${isCallActive ? 'animate-pulse scale-150' : 'scale-100'}`} />
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 relative z-10">
              <img 
                src={activeMentor.avatar} 
                alt={activeMentor.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {isCallActive && (
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-950 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
            )}
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">{activeMentor.name}</h2>
            <p className="text-slate-400">{isCallActive ? "Connected • 00:12" : "Connecting..."}</p>
          </div>

          {/* Call Controls */}
          <div className="flex items-center gap-6 mt-8">
            <Button
              variant="outline"
              size="icon"
              className={`w-14 h-14 rounded-full border-none ${isMuted ? 'bg-white text-slate-900' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="w-16 h-16 rounded-full shadow-lg shadow-red-500/20 hover:bg-red-600 scale-110"
              onClick={handleEndCall}
            >
              <PhoneOff className="w-8 h-8" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-none bg-slate-800 text-white hover:bg-slate-700"
            >
              <Video className="w-6 h-6" />
            </Button>
          </div>
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
          {mentors.map((mentor) => (
            <Card 
              key={mentor.id}
              className="p-6 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => handleStartCall(mentor)}
            >
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">{mentor.subject}</p>
                </div>
                <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-white">
                  <Phone className="w-4 h-4" />
                  Start Call
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAITalk;
