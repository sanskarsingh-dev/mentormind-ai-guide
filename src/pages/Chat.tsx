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

// --- MEMOIZED MESSAGE LIST COMPONENT ---
// This component will NOT re-render when you type in the input box.
const MessageList = memo(({ messages, isSpeaking, stopSpeaking, speakText, containerRef }: any) => {
  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message: any, idx: number) => (
        <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <Card className={`relative max-w-[90%] p-4 rounded-3xl ${
            message.role === 'user' 
              ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white' 
              : 'glass-card border border-white/20'
          }`}>
            <div className={`${message.role === 'assistant' ? 'pb-6' : ''} overflow-x-auto max-w-full`}>
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => (
                    <p className={`mb-2 leading-relaxed whitespace-pre-wrap break-words max-w-full ${message.role === 'user' ? 'text-white' : 'text-foreground'}`} {...props} />
                  ),
                  strong: ({node, ...props}) => <span className="font-bold" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-2" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            {message.role === 'assistant' && (
              <Button
                variant="ghost" size="icon"
                className="absolute bottom-2 right-2 w-8 h-8 hover:bg-primary/10 rounded-full"
                onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-primary" /> : <Volume2 className="w-4 h-4 text-primary" />}
              </Button>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
}, (prev, next) => {
  // Only re-render if the message count or speaking state changes
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

  // MathJax logic remains here, but will only trigger when 'messages' actually updates
  useEffect(() => {
    if (messagesContainerRef.current && (window as any).MathJax?.typesetPromise) {
      setTimeout(() => {
        (window as any).MathJax.typesetPromise([messagesContainerRef.current])
          .catch((err: any) => console.warn('MathJax error:', err));
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
      toast.error(error.message || "Failed to get response");
    } finally {
      setIsLoading(true); // Small delay to show typing animation
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ... (Keep toggleListening, speakText, stopSpeaking as they were) ...

  if (!mentor) return <div className="min-h-screen flex items-center justify-center">Mentor not found</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="glass-card border-b p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/subjects")}><ArrowLeft className="w-5 h-5" /></Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">{mentor.name}</h2>
              <p className="text-xs text-muted-foreground">{mentor.subject}</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => navigate(`/live-talk/${mentorId}`)}>
           <img src={callMentorIcon} alt="Call" className="w-6 h-6" />
        </Button>
      </div>

      {/* Memoized Messages Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList 
          messages={messages} 
          isSpeaking={isSpeaking}
          stopSpeaking={stopSpeaking}
          speakText={speakText}
          containerRef={messagesContainerRef}
        />
        
        {/* Messenger Style Typing Animation */}
        {isLoading && (
          <div className="px-6 pb-4 flex justify-start">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-none">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background/80 backdrop-blur-md border-t">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0"><Upload className="w-5 h-5" /></Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your question..."
            className="rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="rounded-full bg-primary shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
