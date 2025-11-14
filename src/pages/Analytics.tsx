import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 pb-24">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Your Analytics</h1>
          <ThemeToggle />
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-card backdrop-blur-xl rounded-2xl p-5 space-y-2 border-2 border-primary/20">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Subjects</p>
              <p className="text-2xl font-bold gradient-text">3</p>
            </div>
          </Card>

          <Card className="glass-card backdrop-blur-xl rounded-2xl p-5 space-y-2 border-2 border-accent/20">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hours</p>
              <p className="text-2xl font-bold gradient-text">2.5</p>
            </div>
          </Card>

          <Card className="glass-card backdrop-blur-xl rounded-2xl p-5 space-y-2 border-2 border-primary/20">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Quizzes</p>
              <p className="text-2xl font-bold gradient-text">5</p>
            </div>
          </Card>

          <Card className="glass-card backdrop-blur-xl rounded-2xl p-5 space-y-2 border-2 border-accent/20">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Score</p>
              <p className="text-2xl font-bold gradient-text">85%</p>
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
        <Card className="glass-card backdrop-blur-xl rounded-3xl p-6 space-y-6 border-2 border-primary/20">
          <h2 className="text-xl font-bold gradient-text">Subject Progress</h2>
          <div className="space-y-5">
            {subjects.map((subject) => (
              <div key={subject.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{subject.name}</span>
                  <span className="text-xs text-muted-foreground">{subject.hours}h</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
                <div className="flex items-center justify-end">
                  <span className="text-xs font-semibold gradient-text">
                    {subject.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Analytics;
