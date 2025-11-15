import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [showGuestDisclaimer, setShowGuestDisclaimer] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log("Google sign in clicked");
    navigate("/dashboard");
    onOpenChange(false);
  };

  const handleGuestContinue = () => {
    setShowGuestDisclaimer(true);
  };

  const confirmGuestMode = () => {
    localStorage.setItem("userMode", "guest");
    navigate("/dashboard");
    onOpenChange(false);
    setShowGuestDisclaimer(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md max-w-[90vw] glass-card backdrop-blur-xl border-2 border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center gradient-text">Welcome to MentorMind</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Sign in to save your progress and access all features
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Button
              onClick={handleGoogleSignIn}
              className="w-full h-12 text-base bg-card hover:bg-accent text-foreground border-2 border-border"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <button
              onClick={handleGuestContinue}
              className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors underline"
            >
              Continue as Guest
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showGuestDisclaimer} onOpenChange={setShowGuestDisclaimer}>
        <AlertDialogContent className="glass-card backdrop-blur-xl border-2 border-primary/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="gradient-text">Guest Mode</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Data won't be saved in guest mode. For the full experience, log in with Google.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={confirmGuestMode}
              className="bg-gradient-to-r from-primary to-accent"
            >
              Continue as Guest
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
