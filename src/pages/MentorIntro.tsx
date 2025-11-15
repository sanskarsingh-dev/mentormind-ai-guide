import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMentorById } from "@/data/mentors";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, MessageCircle } from "lucide-react";

const MentorIntro = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  const mentor = getMentorById(mentorId || "");

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Mentor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-6">
      <div className="max-w-3xl mx-auto space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/subjects")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <ThemeToggle />
        </div>

        {/* Mentor Card */}
        <Card className="glass-card backdrop-blur-xl rounded-3xl p-10 text-center space-y-6 animate-fade-in border-2 border-primary/20">
          {/* Avatar with Gradient Ring (Squircle) */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-xl opacity-70 animate-pulse"></div>
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl p-1">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-full h-full rounded-2xl object-cover bg-card"
                />
              </div>
            </div>
          </div>

          {/* Mentor Info */}
          <div className="space-y-3">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                {mentor.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {mentor.subject} Expert
              </p>
            </div>

            <p className="text-base text-foreground max-w-xl mx-auto">
              {mentor.description}
            </p>
          </div>

          {/* Expertise */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {mentor.expertise.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-secondary text-foreground text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Greeting */}
          <div className="glass-card rounded-2xl p-5 bg-secondary/50">
            <p className="text-base text-foreground italic">
              "{mentor.greeting}"
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => navigate(`/chat/${mentor.id}`)}
            size="lg"
            className="text-base px-10 py-6 rounded-full glass-card-hover shadow-glow bg-gradient-to-r from-primary to-accent hover:opacity-90 gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Start Chat
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default MentorIntro;
