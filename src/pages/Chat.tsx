import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Fixed: Added leading / for alias (standard Vite setup)
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
  Loader2 
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import callMentorIcon from "@/assets/subjects/call-mentor.webp"; // Fixed: Added leading / for alias

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (mentorId) {
      setMentor(getMentorById(mentorId || ""));
    }
  }, [mentorId]);

  useEffect(() => {
    if (mentor && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: mentor.greeting
      }]);
    }
  }, [mentor]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error("Speech recognition error");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
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
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response
      };

      setMessages(prev => [...prev, assistantMessage]);
      speakText(data.response);
    } catch (error: any) {
      console.error('Chat error:', error);
      toast.error(error.message || "Failed to get response");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover rounded-full" />
            <h2 className="font-semibold text-foreground">{mentor.name}</h2>
          </div>
        </div>
      </div>

      {/* Call Mentor Button */}
      <div className="flex items-center justify-center p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/live-talk/${mentorId}`)} // Fixed: Match route path in App.tsx
          className="hover:bg-primary/10 rounded-full"
        >
          <img
            src={callMentorIcon}
            alt="Call Mentor"
            className="w-6 h-6"
          />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`
              flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4
            `}
          >
            <Card
              className={`
                max-w-[90%] p-4 rounded-3xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white'
                    : 'bg-card'
                }
              `}
            >
              {message.role === 'assistant' ? (
                <div className={`${message.role === 'assistant' ? 'pb-6' : ''}`}>
                  <p className={`
                    whitespace-pre-wrap leading-relaxed ${
                      message.role === 'assistant' 
                        ? 'text-foreground' 
                        : 'text-white'
                    }
                  `}>
                    {message.content}
                  </p>
                </div>
              ) : (
                <p className="text-foreground">{message.content}</p>
              )}

              {message.role === 'assistant' && (
                <div className="flex items-center justify-end gap-2 mt-2">
                  {isSpeaking ? (
                    <VolumeX 
                      className="w-4 h-4 cursor-pointer" 
                      onClick={stopSpeaking}
                    />
                  ) : (
                    <Volume2 
                      className="w-4 h-4 cursor-pointer" 
                      onClick={() => speakText(message.content)}
                    />
                  )}
                </div>
              )}
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-card border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              className="flex-1 rounded-full"
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleListening}
              disabled={isLoading}
              className={isListening ? "text-red-500" : ""}
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="rounded-full"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
