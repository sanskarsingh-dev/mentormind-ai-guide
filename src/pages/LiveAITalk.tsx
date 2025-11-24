import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Mic, X, Grid3x3 } from "lucide-react";
import { SubjectSelectionModal } from "@/components/SubjectSelectionModal";
import { mentors } from "@/data/mentors.ts";

// Define the states exactly like the original for smooth transitions
type ConnectionState = "idle" | "selecting" | "connecting" | "connected" | "ended";

const LiveAITalk = () => {
  const navigate = useNavigate();
  // We use the URL parameter to determine WHICH mentor we are talking to
  const { mentorName } = useParams<{ mentorName: string }>(); 
  
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle");
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sessionTime, setSessionTime] = useState(600); 
  const [statusText, setStatusText] = useState("");

  // 1. PRIMARY EFFECT: Watch the URL. 
  // If the URL has a name, we start the connection logic. 
  // If not, we stay in "idle" mode.
  useEffect(() => {
    if (mentorName) {
      // Decode the URL parameter (e.g., "miss%20lisa" -> "Miss Lisa")
      const decodedName = decodeURIComponent(mentorName);
      const mentor = mentors.find(
        (m) => m.name.toLowerCase() === decodedName.toLowerCase()
      );

      if (mentor) {
        setSelectedMentor(mentor);
        
        // Only start the "connecting" animation if we aren't already connected/ended
        // This prevents the loop/freeze issue
        if (connectionState === "idle" || connectionState === "selecting") {
            setConnectionState("connecting");
            setStatusText(`You will be connected with ${mentor.name}`);

            // The simulation delay
            const timer = setTimeout(() => {
                setConnectionState("connected");
                setStatusText(`You are connected to ${mentor.name}`);
            }, 2500);
            
            return () => clearTimeout(timer);
        }
      }
    } else {
      // No name in URL? Reset to start.
      setConnectionState("idle");
      setSelectedMentor(null);
    }
  }, [mentorName]); // Only re-run if URL changes

  // 2. TIMER EFFECT (Standard logic)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (connectionState === "connected" && sessionTime > 0) {
      timer = setInterval(() => {
        setSessionTime((prev) => {
          if (prev <= 1) {
            setConnectionState("ended");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [connectionState, sessionTime]);

  // 3. HANDLERS
  const handleSubjectSelect = (subject: string) => {
    const mentor = mentors.find((m) => m.subject === subject);
    if (mentor) {
      setIsModalOpen(false);
      // CRITICAL CHANGE: We do NOT set state here. 
      // We just change the URL. The useEffect above will handle the rest.
      navigate(`/live-talk/${encodeURIComponent(mentor.name.toLowerCase())}`);
    }
  };

  const handleReconnect = () => {
    // For reconnect, we just reset the timers and state locally, 
    // keeping the same URL.
    setSessionTime(600);
    setConnectionState("connecting");
    setStatusText(`You will be connected with ${selectedMentor.name}`);
    setTimeout(() => {
      setConnectionState("connected");
      setStatusText(`You are connected to ${selectedMentor.name}`);
    }, 2500);
  };

  const handleReselectSubject = () => {
    // Clear the URL to go back to "idle"
    navigate("/live-talk");
    setIsModalOpen(true);
  };

  const handleEndCall = () => {
    setConnectionState("ended");
    setIsListening(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bubble-float absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-pulse" />
        <div className="bubble-float absolute top-40 right-20 w-40 h-40 rounded-full bg-accent/10 blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="bubble-float absolute bottom-32 left-1/4 w-36 h-36 rounded-full bg-secondary/10 blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Button>
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center py-4" style={{ minHeight: 'calc(100vh - 180px)', maxHeight: 'calc(100vh - 180px)' }}>
        
        {/* Session Timer (when connected) */}
        {connectionState === "connected" && (
          <div className="mb-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-lg">
            <span className="text-sm font-semibold text-primary">{formatTime(sessionTime)}</span>
          </div>
        )}

        {/* Central Sphere with Animation */}
        <div className="relative mb-4 sm:mb-6">
          {/* Animated Rings */}
          {isListening && (
            <>
              <div className="absolute inset-0 -m-8 rounded-full border-2 border-primary/30 animate-ping" />
              <div className="absolute inset-0 -m-12 rounded-full border-2 border-accent/20 animate-ping" style={{ animationDelay: "0.3s" }} />
            </>
          )}

          {/* Main Sphere */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 backdrop-blur-2xl shadow-2xl shadow-primary/50 flex items-center justify-center animate-float">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-xl animate-pulse" />
            
            {/* Mentor Avatar (when connecting/connected) - Circular */}
            {(connectionState === "connecting" || connectionState === "connected" || connectionState === "ended") && selectedMentor && (
              <div className="relative z-10 animate-scale-in">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary/40 shadow-glow">
                  <img
                    src={selectedMentor.avatar}
                    alt={selectedMentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {connectionState === "connected" && (
                  <div className="absolute inset-0 -m-2 rounded-full border-2 border-primary/50 animate-pulse" />
                )}
              </div>
            )}

            {/* Idle State - Inner Glow */}
            {connectionState === "idle" && (
              <div className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 blur-md animate-pulse" />
            )}
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-2 mb-6 px-4">
          {connectionState === "idle" && (
            <p className="text-base sm:text-lg text-muted-foreground">Ready to start learning</p>
          )}
          
          {(connectionState === "connecting" || connectionState === "connected") && selectedMentor && (
            <>
              <p className="text-lg sm:text-xl font-semibold text-foreground animate-fade-in">
                {statusText}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {selectedMentor.subject} expert
              </p>
            </>
          )}

          {connectionState === "ended" && (
            <p className="text-lg sm:text-xl font-semibold text-foreground">Call Ended</p>
          )}
        </div>

        {/* Subject Selection Box (idle or selecting) */}
        {(connectionState === "idle" || connectionState === "selecting") && (
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="px-4 py-4 sm:px-6 sm:py-6 rounded-2xl glass-card border-2 border-primary/30 hover:border-primary/60 transition-all mb-6 text-sm sm:text-base"
          >
            <span>Which subject do you want to ask?</span>
          </Button>
        )}

        {/* End State Actions */}
        {connectionState === "ended" && (
          <div className="flex flex-col items-center gap-3 animate-fade-in w-full max-w-xs px-4">
            <Button
              onClick={handleReconnect}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-sm sm:text-base"
            >
              Reconnect
            </Button>
            <Button
              onClick={handleReselectSubject}
              variant="outline"
              className="w-full px-6 py-3 rounded-xl text-sm sm:text-base"
            >
              Reselect Subject
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              className="w-full px-6 py-3 rounded-xl text-sm sm:text-base"
            >
              Back to Dashboard
            </Button>
          </div>
        )}

        {/* Bottom Action Buttons */}
        {connectionState !== "ended" && connectionState !== "idle" && (
          <div className="flex items-center justify-center gap-8 mt-8">
            {/* History/Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30"
            >
              <Grid3x3 className="w-5 h-5" />
            </Button>

            {/* Microphone Button */}
            <Button
              size="icon"
              onClick={() => setIsListening(!isListening)}
              className={`w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow transition-all ${
                isListening ? "scale-110 animate-pulse" : "hover:scale-105"
              }`}
            >
              <Mic className="w-8 h-8" />
            </Button>

            {/* Close/End Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEndCall}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-destructive/20 to-destructive/30 hover:from-destructive/30 hover:to-destructive/40"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Subject Selection Modal */}
      <SubjectSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSubjectSelect}
      />
    </div>
  );
};

export default LiveAITalk;
                                                 
