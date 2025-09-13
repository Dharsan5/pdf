import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Trophy, 
  Flame, 
  Target,
  ArrowRight,
  Crown,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePreview = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-orange-500/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Track Your Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay motivated with streaks, compete on leaderboards, and collaborate with friends. 
            Your personalized dashboard keeps you engaged and accountable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Profile Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/20 to-orange-500/20 p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-background">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="text-lg font-bold bg-primary text-white">
                    AJ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">Alex Johnson</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">Level 12</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Rank #2
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Study Streak</span>
                  <div className="flex items-center gap-1 font-semibold text-orange-500">
                    <Flame className="w-4 h-4" />
                    23 days
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quizzes Completed</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Score</span>
                  <span className="font-semibold text-green-500">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { rank: 1, name: "Emma Wilson", points: "4,250 XP", icon: <Crown className="w-4 h-4" /> },
                { rank: 2, name: "You", points: "2,847 XP", icon: null, isUser: true },
                { rank: 3, name: "Sarah Chen", points: "2,650 XP", icon: null }
              ].map((player) => (
                <div key={player.rank} className={`flex items-center gap-3 p-2 rounded-lg ${
                  player.isUser ? 'bg-primary/10 border border-primary/20' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    player.rank === 1 ? 'bg-yellow-500 text-white' :
                    player.rank === 2 ? 'bg-gray-400 text-white' :
                    'bg-amber-600 text-white'
                  }`}>
                    {player.icon || player.rank}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{player.name}</div>
                    <div className="text-xs text-muted-foreground">{player.points}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Friends & Collaboration Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Study Together
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: "Sarah Chen", status: "online", activity: "Studying AI" },
                  { name: "Mike Rodriguez", status: "studying", activity: "Taking quiz" },
                  { name: "David Kim", status: "online", activity: "Just finished" }
                ].map((friend, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                        friend.status === 'studying' ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{friend.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{friend.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-3 border-t">
                <div className="text-center text-sm text-muted-foreground mb-2">
                  Study sessions completed together
                </div>
                <div className="text-2xl font-bold text-center text-primary">127</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Unlock Achievements & Stay Motivated</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🔥", title: "Week Warrior", desc: "7-day streak" },
              { icon: "🧠", title: "Quiz Master", desc: "90%+ average" },
              { icon: "⚡", title: "Speed Reader", desc: "50 documents" },
              { icon: "🎯", title: "Perfect Score", desc: "100% on quiz" }
            ].map((achievement, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold mb-1">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" asChild className="group">
            <Link to="/profile">
              View Your Profile
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePreview;
