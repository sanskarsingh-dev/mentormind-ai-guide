import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMentorById } from "@/data/mentors";
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8 pt-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/subjects")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </Button>

        {/* Mentor Card */}
        <Card className="glass-card rounded-3xl p-12 text-center space-y-8 animate-fade-in">
          {/* Avatar with Gradient Ring */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-full p-1">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
            </div>
          </div>

          {/* Mentor Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-5xl font-bold gradient-text mb-2">
                {mentor.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {mentor.subject} Expert
              </p>
            </div>

            <p className="text-lg text-foreground max-w-xl mx-auto">
              {mentor.description}
            </p>
          </div>

          {/* Expertise */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {mentor.expertise.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-white/50 text-foreground text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Greeting */}
          <div className="glass-card rounded-2xl p-6 bg-white/40">
            <p className="text-lg text-foreground italic">
              "{mentor.greeting}"
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => navigate(`/chat/${mentor.id}`)}
            size="lg"
            className="text-lg px-12 py-6 rounded-full glass-card-hover shadow-glow bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:opacity-90 gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Ask a Doubt
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default MentorIntro;
