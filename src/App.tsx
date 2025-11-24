import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner'; // Note: You have two toasters – consider removing one if redundant
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase'; // Fixed: Correct import path (matches pattern in other files)

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SubjectSelection from './pages/SubjectSelection';
import MentorIntro from './pages/MentorIntro';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import QuizGenerator from './pages/QuizGenerator';
import LiveAITalk from './pages/LiveAITalk';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const AppContent = () => {
  const navigate = useNavigate();

  // Fixed: Moved auth listener to useEffect to avoid re-subscriptions and leaks.
  // Properly destructure subscription and unsubscribe on cleanup.
  // Removed unused session destructuring and useSupabase import.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // Redirect to dashboard if user is on the landing page
        if (window.location.pathname === '/') {
          navigate('/dashboard');
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    // Cleanup: Unsubscribe on unmount
    return () => {
      if (subscription) subscription.unsubscribe();
    };
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
      <Route path="/live-talk/:mentorId?" element={<LiveAITalk />} /> {/* Note: Matches fixed route in Chat.tsx */}
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
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
