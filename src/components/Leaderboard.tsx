import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Medal, Award, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardPlayer {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  change: string;
}

interface LeaderboardProps {
  players: LeaderboardPlayer[];
  currentUserId: string;
  title?: string;
  showRankChange?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  players, 
  currentUserId, 
  title = "Leaderboard",
  showRankChange = true 
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-4 h-4 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 text-gray-400" />;
      case 3: return <Award className="w-4 h-4 text-amber-600" />;
      default: return null;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white";
      case 2: return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
      case 3: return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith("+")) return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (change.startsWith("-")) return <TrendingDown className="w-3 h-3 text-red-500" />;
    return null;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-500";
    if (change.startsWith("-")) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={cn(
              "flex items-center gap-4 p-3 rounded-lg transition-all hover:scale-[1.02]",
              player.id === currentUserId 
                ? "bg-primary/10 border-2 border-primary/20 shadow-sm" 
                : "hover:bg-muted/50",
              player.rank <= 3 && "border border-opacity-30",
              player.rank === 1 && "border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/10",
              player.rank === 2 && "border-gray-400/30 bg-gray-50/50 dark:bg-gray-900/10",
              player.rank === 3 && "border-amber-600/30 bg-amber-50/50 dark:bg-amber-900/10"
            )}
          >
            {/* Rank */}
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
              getRankColor(player.rank)
            )}>
              {getRankIcon(player.rank) || player.rank}
            </div>

            {/* Avatar */}
            <Avatar className="w-12 h-12 shrink-0">
              <AvatarImage src={player.avatar} alt={player.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {player.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            {/* Player Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{player.name}</span>
                {player.id === currentUserId && (
                  <Badge variant="secondary" className="text-xs shrink-0">
                    You
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>Level {player.level}</span>
                <span>•</span>
                <span className="font-medium text-foreground">{player.points.toLocaleString()} XP</span>
              </div>
            </div>

            {/* Rank Change */}
            {showRankChange && player.change !== "0" && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium shrink-0",
                getChangeColor(player.change)
              )}>
                {getChangeIcon(player.change)}
                <span>{player.change}</span>
              </div>
            )}
          </div>
        ))}

        {/* Podium for Top 3 */}
        {players.length >= 3 && (
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium mb-3 text-center text-muted-foreground">
              This Week's Top Performers
            </h4>
            <div className="flex items-end justify-center gap-4 h-24">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="bg-gray-400 text-white rounded-lg p-2 mb-2">
                  <Medal className="w-6 h-6" />
                </div>
                <div className="bg-gray-400 h-12 w-16 rounded-t-lg flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="text-xs font-medium mt-1 text-center max-w-16 truncate">
                  {players[1]?.name.split(' ')[0]}
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="bg-yellow-500 text-white rounded-lg p-2 mb-2">
                  <Crown className="w-6 h-6" />
                </div>
                <div className="bg-yellow-500 h-16 w-20 rounded-t-lg flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div className="text-xs font-medium mt-1 text-center max-w-20 truncate">
                  {players[0]?.name.split(' ')[0]}
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="bg-amber-600 text-white rounded-lg p-2 mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <div className="bg-amber-600 h-10 w-14 rounded-t-lg flex items-end justify-center pb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="text-xs font-medium mt-1 text-center max-w-14 truncate">
                  {players[2]?.name.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
