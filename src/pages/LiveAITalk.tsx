import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentors } from "@/data/mentors.ts"; 
import { Phone, Video, Mic, MicOff, PhoneOff, ArrowLeft } from "lucide-react";

const LiveAITalk = () => {
  const { mentorId } = useParams<{ mentorId: string }>(); 
  const navigate = useNavigate();
  
  // State is derived from whether a URL parameter exists
  const [activeMentor, setActiveMentor] = useState(
    mentorId ? mentors.find(m => m.id === mentorId) : null
  );
  
  const [isMuted, setIsMuted] = useState(false);

  // 1. URL SYNC EFFECT
  // This watches the URL. If it changes to /live-talk/lisa, it sets Lisa as active.
  useEffect(() => {
    if (mentorId) {
      const foundMentor = mentors.find(m => m.id === mentorId);
      if (foundMentor) {
        setActiveMentor(foundMentor);
      }
    } else {
      // If URL is just /live-talk, clear the active mentor
      setActiveMentor(null);
    }
  }, [mentorId]);

  // 2. START CALL (Navigates to URL)
  // Instead of setting state locally, we just change the URL.
  // The useEffect above handles the rest.
  const handleStartCall = (mentorId: string) => {
    navigate(`/live-talk/${mentorId}`);
  };

  // 3. END CALL
  // Removes the ID from the URL, returning to the list view
  const handleEndCall = () => {
    setIsMuted(false);
    navigate("/live-talk");
  };

  // --- VIEW: ACTIVE CALL ---
  if (activeMentor) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          {/* Avatar Area */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 relative z-10">
              <img 
                src={activeMentor.avatar} 
                alt={activeMentor.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">{activeMentor.name}</h2>
            <p className="text-slate-400">Connected</p>
          </div>

          {/* Call Controls */}
          <div className="flex items-center gap-6 mt-8">
            <Button
              variant="outline"
              size="icon"
              className={`w-14 h-14 rounded-full border-none ${isMuted ? 'bg-white text-slate-900' : 'bg-slate-800 text-white'}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="w-16 h-16 rounded-full hover:bg-red-600"
              onClick={handleEndCall}
            >
              <PhoneOff className="w-8 h-8" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-none bg-slate-800 text-white"
            >
              <Video className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: MENTOR LIST ---
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
              className="p-6 hover:shadow-lg transition-all cursor-pointer group"
              // CHANGE: Only update URL here
              onClick={() => handleStartCall(mentor.id)}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/10">
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
