import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  MessageCircle, 
  UserPlus, 
  Search, 
  Flame,
  Clock,
  Trophy,
  BookOpen,
  Video,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  streak: number;
  status: "online" | "studying" | "offline";
  lastActive: string;
  recentActivity?: {
    type: "study" | "quiz" | "achievement" | "document";
    description: string;
    timestamp: string;
  };
}

interface FriendsActivityProps {
  friends: Friend[];
  onAddFriend?: () => void;
  onMessageFriend?: (friendId: string) => void;
  onJoinStudy?: (friendId: string) => void;
}

const FriendsActivity: React.FC<FriendsActivityProps> = ({ 
  friends, 
  onAddFriend, 
  onMessageFriend,
  onJoinStudy 
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "studying": return "bg-blue-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getStatusText = (status: string, lastActive: string) => {
    switch (status) {
      case "online": return "Online now";
      case "studying": return "Studying now";
      case "offline": return `Last seen ${lastActive}`;
      default: return lastActive;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "study": return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "quiz": return <Zap className="w-4 h-4 text-yellow-500" />;
      case "achievement": return <Trophy className="w-4 h-4 text-orange-500" />;
      case "document": return <Video className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter(f => f.status === "online" || f.status === "studying");
  const offlineFriends = filteredFriends.filter(f => f.status === "offline");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Friends Activity ({friends.length})
          </CardTitle>
          <Button size="sm" onClick={onAddFriend}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Friend
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="flex gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search friends..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Online Friends */}
        {onlineFriends.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Online ({onlineFriends.length})
            </h4>
            <div className="space-y-3">
              {onlineFriends.map((friend) => (
                <div key={friend.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {friend.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                      getStatusColor(friend.status)
                    )}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{friend.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        Level {friend.level}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        {friend.streak} day streak
                      </span>
                      <span>•</span>
                      <span className={friend.status === "studying" ? "text-blue-500 font-medium" : ""}>
                        {getStatusText(friend.status, friend.lastActive)}
                      </span>
                    </div>

                    {/* Recent Activity */}
                    {friend.recentActivity && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        {getActivityIcon(friend.recentActivity.type)}
                        <span>{friend.recentActivity.description}</span>
                        <span>•</span>
                        <span>{friend.recentActivity.timestamp}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onMessageFriend?.(friend.id)}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    {friend.status === "studying" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-500 border-blue-500/20"
                        onClick={() => onJoinStudy?.(friend.id)}
                      >
                        Join Study
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offline Friends */}
        {offlineFriends.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Offline ({offlineFriends.length})
            </h4>
            <div className="space-y-2">
              {offlineFriends.map((friend) => (
                <div key={friend.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors opacity-75">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {friend.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-background"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate text-sm">{friend.name}</h4>
                      <Badge variant="outline" className="text-xs opacity-75">
                        Level {friend.level}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getStatusText(friend.status, friend.lastActive)}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="opacity-50">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredFriends.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? (
              <div>
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No friends found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div>
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="mb-2">No friends yet</p>
                <p className="text-sm mb-4">Add friends to see their study activity and collaborate!</p>
                <Button onClick={onAddFriend}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Your First Friend
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Study Together CTA */}
        {onlineFriends.length > 0 && (
          <div className="pt-4 border-t">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => {
                const studyingFriends = onlineFriends.filter(f => f.status === "studying");
                if (studyingFriends.length > 0) {
                  const friendNames = studyingFriends.map(f => f.name).join(", ");
                  alert(`Creating study session with online friends...\n\nStudying friends: ${friendNames}\n\nThis would:\n- Create a shared study room\n- Invite all online friends\n- Set up collaboration tools`);
                } else {
                  alert("Creating study session...\n\nThis would:\n- Create a new study room\n- Invite online friends to join\n- Start collaborative study session");
                }
              }}
            >
              <Users className="w-4 h-4 mr-2" />
              Create Study Session
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FriendsActivity;
