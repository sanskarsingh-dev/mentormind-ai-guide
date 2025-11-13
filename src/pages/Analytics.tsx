import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Clock, Award, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Analytics = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "Mathematics", hours: 12, progress: 75, color: "from-blue-500 to-cyan-500" },
    { name: "Physics", hours: 8, progress: 60, color: "from-purple-500 to-pink-500" },
    { name: "Chemistry", hours: 10, progress: 70, color: "from-green-500 to-emerald-500" },
    { name: "Biology", hours: 6, progress: 45, color: "from-orange-500 to-red-500" },
  ];

  const weeklyData = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 3 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 2.5 },
    { day: "Sat", hours: 5 },
    { day: "Sun", hours: 3 },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <h1 className="text-4xl font-bold gradient-text">Your Analytics</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Subjects Studied</p>
              <p className="text-3xl font-bold gradient-text">8</p>
            </div>
          </Card>

          <Card className="glass-card rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <p className="text-3xl font-bold gradient-text">36</p>
            </div>
          </Card>

          <Card className="glass-card rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quizzes Taken</p>
              <p className="text-3xl font-bold gradient-text">12</p>
            </div>
          </Card>

          <Card className="glass-card rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Score</p>
              <p className="text-3xl font-bold gradient-text">85%</p>
            </div>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card className="glass-card rounded-3xl p-8 space-y-6">
          <h2 className="text-2xl font-bold gradient-text">Weekly Activity</h2>
          <div className="flex items-end justify-between gap-4 h-48">
            {weeklyData.map((data) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-purple-500 via-blue-500 to-pink-500 transition-all hover:opacity-80"
                  style={{ height: `${(data.hours / maxHours) * 100}%` }}
                />
                <p className="text-sm text-muted-foreground">{data.day}</p>
                <p className="text-xs font-semibold">{data.hours}h</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Subject Progress */}
        <Card className="glass-card rounded-3xl p-8 space-y-6">
          <h2 className="text-2xl font-bold gradient-text">Subject Progress</h2>
          <div className="space-y-6">
            {subjects.map((subject) => (
              <div key={subject.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{subject.name}</span>
                  <span className="text-sm text-muted-foreground">{subject.hours} hours</span>
                </div>
                <Progress value={subject.progress} className="h-3" />
                <p className="text-xs text-muted-foreground text-right">{subject.progress}% complete</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
