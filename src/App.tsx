import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect } from "react"; // Import useEffect
import { supabase } from "@/integrations/supabase/client"; // Import supabase
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SubjectSelection from "./pages/SubjectSelection";
import MentorIntro from "./pages/MentorIntro";
import Chat from "./pages/Chat";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import QuizGenerator from "./pages/QuizGenerator";
import LiveAITalk from "./pages/LiveAITalk";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Create a wrapper component to handle Auth Logic because useNavigate needs to be inside BrowserRouter
const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        // If we are on the landing page, redirect to dashboard
        if (window.location.pathname === "/") {
          navigate("/dashboard");
        }
      } else if (event === "SIGNED_OUT") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/subjects" element={<SubjectSelection />} />
      <Route path="/mentor/:mentorId" element={<MentorIntro />} />
      <Route path="/chat/:mentorId" element={<Chat />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/quiz" element={<QuizGenerator />} />
      <Route path="/live-talk" element={<LiveAITalk />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent /> {/* Use the wrapper component */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
