import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getMentorById } from "@/data/mentors";
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Upload,
  Loader2,
  MoreVertical
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
// Import the call icon
import callMentorIcon from "@/assets/subjects/call-mentor.svg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  const mentor = getMentorById(mentorId || "");
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize with mentor's greeting
  useEffect(() => {
    if (mentor && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: mentor.greeting
      }]);
    }
  }, [mentor]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error("Speech recognition error");
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [...messages, userMessage],
          mentorId: mentorId,
          mentorName: mentor?.name,
          mentorSubject: mentor?.subject
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      toast.error(error.message || "Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Mentor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="glass-card border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/subjects")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{mentor.name}</h2>
              <p className="text-sm text-muted-foreground">{mentor.subject}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Call Mentor Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/live-talk")}
            className="hover:bg-primary/10"
          >
            <img 
              src={callMentorIcon} 
              alt="Call Mentor" 
              className="w-6 h-6"
            />
          </Button>
          
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card
              className={`relative max-w-[90%] p-4 rounded-3xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white'
                  : 'glass-card'
              }`}
            >
              {/* Text Content */}
              <div className={`${message.role === 'assistant' ? 'pb-6' : ''}`}>
                <p className={`whitespace-pre-wrap leading-relaxed ${message.role === 'user' ? 'text-white' : 'text-foreground'}`}>
                  {message.content}
                </p>
              </div>

              {/* Speaker Icon - Absolutely positioned to corner */}
              {message.role === 'assistant' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 w-8 h-8 hover:bg-primary/10 rounded-full"
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
                >
                  {isSpeaking ? (
                    <VolumeX className="w-4 h-4 text-primary" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-primary" />
                  )}
                </Button>
              )}
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="glass-card p-4 rounded-3xl">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-card border-t p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
          >
            <Upload className="w-5 h-5" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              className="rounded-full pr-12 bg-white/80 text-gray-900 placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`flex-shrink-0 ${isListening ? 'text-red-500' : ''}`}
            onClick={toggleListening}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>

          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
