import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyStreakProps {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  weeklyData?: { day: string; studied: boolean; date: string }[];
}

const StudyStreak: React.FC<StudyStreakProps> = ({ 
  currentStreak, 
  longestStreak, 
  lastStudyDate,
  weeklyData 
}) => {
  // Generate default weekly data if not provided
  const defaultWeeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      studied: i < 5 || i === 6, // Mock data: studied most days
      date: date.toISOString().split('T')[0]
    };
  });

  const weekData = weeklyData || defaultWeeklyData;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="w-5 h-5 text-orange-500" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Streak Display */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-orange-500">
            {currentStreak}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentStreak === 1 ? 'Day' : 'Days'} in a row
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            This Week
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {weekData.map((day, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-xs text-muted-foreground font-medium">
                  {day.day}
                </div>
                <div className={cn(
                  "w-8 h-8 mx-auto rounded-lg flex items-center justify-center transition-colors",
                  day.studied 
                    ? "bg-orange-500 text-white" 
                    : "bg-muted border-2 border-dashed border-muted-foreground/30"
                )}>
                  {day.studied ? (
                    <Flame className="w-4 h-4" />
                  ) : (
                    <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold">{longestStreak}</div>
            <div className="text-xs text-muted-foreground">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {weekData.filter(d => d.studied).length}
            </div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </div>
        </div>

        {/* Motivation Message */}
        <div className="text-center text-sm text-muted-foreground italic">
          {currentStreak >= 7 ? "Amazing streak! Keep it up! 🔥" :
           currentStreak >= 3 ? "Great consistency! You're on fire! ✨" :
           currentStreak >= 1 ? "Good start! Build that momentum! 💪" :
           "Ready to start your streak? 🚀"}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreak;
