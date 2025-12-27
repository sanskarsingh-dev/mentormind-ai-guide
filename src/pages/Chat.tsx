import React, { useState, useRef, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getMentorById } from "@/data/mentors";
import { 
  ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX, 
  Upload, MoreVertical 
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import callMentorIcon from "@/assets/subjects/call-mentor.svg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// --- MEMOIZED MESSAGE LIST ---
const MessageList = memo(({ messages, isSpeaking, stopSpeaking, speakText, containerRef }: any) => {
  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((message: any, idx: number) => (
        <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <Card 
            className={`relative max-w-[85%] p-4 animate-scale-in shadow-soft ${
              message.role === 'user' 
                ? 'text-white rounded-[2rem] rounded-br-none border-none shadow-glow' 
                : 'glass-card text-foreground rounded-[2rem] rounded-bl-none'
            }`}
            style={message.role === 'user' ? { background: 'var(--gradient-primary)' } : {}}
          >
            <div className={`${message.role === 'assistant' ? 'pb-4' : ''} overflow-x-auto max-w-full`}>
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => <p className="mb-2 leading-relaxed whitespace-pre-wrap break-words text-sm md:text-base" {...props} />,
                  strong: ({node, ...props}) => <span className="font-bold underline-offset-2" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1 list-inside" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc ml-2 mb-2" {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            
            {message.role === 'assistant' && (
              <Button
                variant="ghost" size="icon"
                className="absolute bottom-1 right-1 w-7 h-7 hover:bg-primary/10 rounded-full"
                onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-primary" /> : <Volume2 className="w-3.5 h-3.5 text-primary" />}
              </Button>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
}, (prev, next) => {
  return prev.messages.length === next.messages.length && prev.isSpeaking === next.isSpeaking;
});

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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (mentor && messages.length === 0) {
      setMessages([{ role: "assistant", content: mentor.greeting }]);
    }
  }, [mentor]);

  useEffect(() => {
    const mj = (window as any).MathJax;
    if (messagesContainerRef.current && mj?.typesetPromise) {
      setTimeout(() => {
        mj.typesetPromise([messagesContainerRef.current])
          .catch((err: any) => console.warn('MathJax error:', err));
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.onresult = (event: any) => {
        setInput(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return toast.error("Speech not supported");
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
    setIsListening(!isListening);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
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
          mentorId,
          mentorName: mentor?.name,
          mentorSubject: mentor?.subject
        }
      });
      if (error) throw error;
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error: any) {
      toast.error("Failed to get response");
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

  if (!mentor) return <div className="min-h-screen flex items-center justify-center">Mentor not found</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="glass-card border-b p-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/subjects")}><ArrowLeft className="w-5 h-5" /></Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-semibold text-sm leading-none mb-1">{mentor.name}</h2>
              <p className="text-xs text-muted-foreground">{mentor.subject}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/live-talk/${mentorId}`)}>
             <img src={callMentorIcon} alt="Call" className="w-5 h-5 opacity-80 hover:opacity-100" />
          </Button>
          <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden flex flex-col bg-[#fdfdfd] dark:bg-zinc-950">
        <MessageList 
          messages={messages} 
          isSpeaking={isSpeaking} 
          stopSpeaking={stopSpeaking} 
          speakText={speakText} 
          containerRef={messagesContainerRef} 
        />
        
        {isLoading && (
          <div className="px-6 pb-6 flex justify-start">
            <div className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input */}
      <div className="p-4 bg-background/80 backdrop-blur-lg border-t z-20 safe-area-bottom">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
            <Upload className="w-5 h-5" />
          </Button>
          
          <div className="flex-1">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyPress} 
              placeholder={`Message ${mentor.name}...`} 
              className="rounded-full bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary h-11" 
            />
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleListening} 
            className={`shrink-0 transition-colors ${isListening ? "text-red-500 animate-pulse" : "text-muted-foreground hover:text-primary"}`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>

          <Button 
            size="icon" 
            onClick={sendMessage} 
            disabled={!input.trim() || isLoading} 
            className="rounded-full bg-primary hover:opacity-90 shadow-md shrink-0 h-10 w-10 transition-all active:scale-95"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
                  
