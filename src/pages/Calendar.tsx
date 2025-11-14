import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-16" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = 
      day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();
    
    days.push(
      <Card
        key={day}
        className={`h-16 flex items-center justify-center cursor-pointer transition-all ${
          isToday
            ? 'glass-card bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 text-white font-bold shadow-glow'
            : 'glass-card hover:bg-accent'
        }`}
      >
        {day}
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 pb-24">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Calendar</h1>
          <ThemeToggle />
        </div>

        <Card className="glass-card backdrop-blur-xl rounded-3xl p-6 space-y-6 border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevMonth}
              className="rounded-full hover:bg-accent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <h2 className="text-2xl font-bold gradient-text">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="rounded-full hover:bg-accent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold text-sm text-muted-foreground">
                {day}
              </div>
            ))}
            {days}
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Calendar;
