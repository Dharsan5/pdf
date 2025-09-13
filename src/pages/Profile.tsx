import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Trophy, 
  Flame, 
  Users, 
  BookOpen, 
  Calendar,
  Target,
  Award,
  TrendingUp,
  Clock,
  Star,
  Medal,
  Crown,
  Zap,
  MessageCircle,
  UserPlus,
  Settings,
  Share2,
  MoreVertical,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import PDFHeader from "@/components/PDFHeader";
import StudyStreak from "@/components/StudyStreak";
import Leaderboard from "@/components/Leaderboard";
import FriendsActivity from "@/components/FriendsActivity";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockUserData = {
  user: {
    id: "user123",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "",
    joinDate: "2024-01-15",
    level: 12,
    experience: 2847,
    nextLevelExp: 3200,
    streak: {
      current: 23,
      longest: 47,
      lastStudyDate: "2025-09-13"
    },
    stats: {
      totalStudySessions: 156,
      totalStudyTime: 2340, // minutes
      documentsProcessed: 89,
      quizzesCompleted: 234,
      averageScore: 87,
      topicsLearned: 156
    },
    achievements: [
      { id: 1, title: "Week Warrior", description: "Study for 7 days straight", icon: "🔥", earned: true, date: "2025-09-07" },
      { id: 2, title: "Quiz Master", description: "Score 90%+ on 10 quizzes", icon: "🧠", earned: true, date: "2025-08-28" },
      { id: 3, title: "Speed Reader", description: "Process 50 documents", icon: "⚡", earned: true, date: "2025-08-15" },
      { id: 4, title: "Perfect Score", description: "Get 100% on any quiz", icon: "🎯", earned: true, date: "2025-07-20" },
      { id: 5, title: "Marathon Learner", description: "Study for 5+ hours in a day", icon: "🏃", earned: false, progress: 78 },
      { id: 6, title: "Social Butterfly", description: "Study with 5 friends", icon: "🦋", earned: false, progress: 60 }
    ]
  },
  friends: [
    { 
      id: "f1", 
      name: "Sarah Chen", 
      avatar: "", 
      level: 15, 
      streak: 31, 
      status: "online" as const, 
      lastActive: "now",
      recentActivity: {
        type: "achievement",
        description: "Completed 'Quiz Master' achievement",
        timestamp: "2 hours ago"
      }
    },
    { 
      id: "f2", 
      name: "Mike Rodriguez", 
      avatar: "", 
      level: 8, 
      streak: 12, 
      status: "offline" as const, 
      lastActive: "2 hours ago",
      recentActivity: {
        type: "study",
        description: "Studied JavaScript fundamentals",
        timestamp: "4 hours ago"
      }
    },
    { 
      id: "f3", 
      name: "Emma Wilson", 
      avatar: "", 
      level: 20, 
      streak: 55, 
      status: "studying" as const, 
      lastActive: "5 min ago",
      recentActivity: {
        type: "document",
        description: "Processing AI research paper",
        timestamp: "5 min ago"
      }
    },
    { 
      id: "f4", 
      name: "David Kim", 
      avatar: "", 
      level: 11, 
      streak: 8, 
      status: "online" as const, 
      lastActive: "now",
      recentActivity: {
        type: "quiz",
        description: "Scored 95% on Data Structures quiz",
        timestamp: "1 hour ago"
      }
    }
  ],
  leaderboard: [
    { rank: 1, id: "l1", name: "Emma Wilson", avatar: "", points: 4250, level: 20, change: "+2" },
    { rank: 2, id: "l2", name: "Alex Johnson", avatar: "", points: 2847, level: 12, change: "0" },
    { rank: 3, id: "l3", name: "Sarah Chen", avatar: "", points: 2650, level: 15, change: "-1" },
    { rank: 4, id: "l4", name: "Marcus Brown", avatar: "", points: 2400, level: 14, change: "+1" },
    { rank: 5, id: "l5", name: "Lisa Zhang", avatar: "", points: 2180, level: 13, change: "+3" },
    { rank: 6, id: "l6", name: "David Kim", avatar: "", points: 1950, level: 11, change: "-2" },
    { rank: 7, id: "l7", name: "Mike Rodriguez", avatar: "", points: 1820, level: 8, change: "0" }
  ],
  studyGroups: [
    { 
      id: "sg1", 
      name: "AI & Machine Learning", 
      members: 12, 
      avatar: "", 
      lastActivity: "2 hours ago",
      description: "Exploring the latest in AI and ML technologies",
      isActive: true
    },
    { 
      id: "sg2", 
      name: "Web Development", 
      members: 8, 
      avatar: "", 
      lastActivity: "1 day ago",
      description: "Frontend and backend development discussions",
      isActive: true
    },
    { 
      id: "sg3", 
      name: "Data Science", 
      members: 15, 
      avatar: "", 
      lastActivity: "3 days ago",
      description: "Data analysis, visualization, and statistics",
      isActive: false
    }
  ]
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSettings, setShowSettings] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState<string[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  const { user, friends, leaderboard, studyGroups } = mockUserData;

  // Button handlers
  const handleSettings = () => {
    setShowSettings(true);
    // In a real app, this would open a settings modal
    console.log("Opening settings...");
    alert("Settings modal would open here with options for:\n- Profile picture\n- Notifications\n- Privacy settings\n- Account preferences");
  };

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/profile/${user.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.name}'s Learning Profile`,
          text: `Check out my learning progress! Level ${user.level} with a ${user.streak.current} day study streak!`,
          url: profileUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(profileUrl);
        alert("Profile link copied to clipboard!");
      } catch (error) {
        console.log('Error copying to clipboard:', error);
        alert(`Share this profile: ${profileUrl}`);
      }
    }
  };

  const handleAddFriend = () => {
    setShowAddFriend(true);
    // In a real app, this would open an add friend modal
    console.log("Opening add friend modal...");
    const friendName = prompt("Enter friend's username or email:");
    if (friendName) {
      alert(`Friend request sent to ${friendName}!`);
    }
  };

  const handleMessageFriend = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend) {
      console.log(`Opening chat with ${friend.name}`);
      alert(`Opening chat with ${friend.name}...\n\nThis would open a messaging interface where you can:\n- Send direct messages\n- Start a study session together\n- Share learning materials`);
    }
  };

  const handleJoinStudy = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend && friend.status === "studying") {
      console.log(`Joining study session with ${friend.name}`);
      alert(`Joining ${friend.name}'s study session...\n\nThis would:\n- Connect you to their current study session\n- Share the same document/video\n- Enable collaborative note-taking`);
    }
  };

  const handleCreateGroup = () => {
    setShowCreateGroup(true);
    console.log("Opening create group modal...");
    const groupName = prompt("Enter study group name:");
    const groupTopic = prompt("Enter group topic/subject:");
    if (groupName && groupTopic) {
      alert(`Study group "${groupName}" created for ${groupTopic}!\n\nGroup features:\n- Shared study materials\n- Group chat\n- Study schedules\n- Progress tracking`);
    }
  };

  const handleJoinGroup = (groupId: string) => {
    const group = studyGroups.find(g => g.id === groupId);
    if (group && !joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
      alert(`You joined "${group.name}"!\n\nYou can now:\n- Access group materials\n- Participate in discussions\n- Join group study sessions\n- See member activity`);
    }
  };

  const handleCreateStudySession = () => {
    console.log("Creating study session...");
    alert("Creating study session...\n\nThis would:\n- Create a shared virtual study room\n- Invite online friends\n- Set up collaborative tools\n- Start timer and tracking");
  };

  const handleStartLearning = () => {
    console.log("Redirecting to upload page...");
    // This is handled by the Link component, but we can add analytics
  };

  return (
    <div className="min-h-screen bg-background">
      <PDFHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20"></div>
            <CardContent className="relative p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                      {user.name}
                      <Badge variant="secondary" className="text-sm">
                        Level {user.level}
                      </Badge>
                    </h1>
                    <p className="text-muted-foreground">
                      Member since {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold">{user.streak.current} day streak</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span>Rank #{leaderboard.find(l => l.id === user.id)?.rank || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      <span>{user.stats.quizzesCompleted} quizzes completed</span>
                    </div>
                  </div>
                  
                  {/* XP Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Experience: {user.experience} XP</span>
                      <span>Next level: {user.nextLevelExp} XP</span>
                    </div>
                    <Progress 
                      value={(user.experience / user.nextLevelExp) * 100} 
                      className="h-3"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSettings}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Study Groups
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Streak Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                  <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.streak.current} days</div>
                  <p className="text-xs text-muted-foreground">
                    Longest: {user.streak.longest} days
                  </p>
                </CardContent>
              </Card>

              {/* Study Time */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                  <Clock className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(user.stats.totalStudyTime / 60)}h</div>
                  <p className="text-xs text-muted-foreground">
                    Total time learned
                  </p>
                </CardContent>
              </Card>

              {/* Average Score */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.stats.averageScore}%</div>
                  <p className="text-xs text-muted-foreground">
                    Across all quizzes
                  </p>
                </CardContent>
              </Card>

              {/* Documents Processed */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents</CardTitle>
                  <BookOpen className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.stats.documentsProcessed}</div>
                  <p className="text-xs text-muted-foreground">
                    PDFs processed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Study Streak */}
              <StudyStreak 
                currentStreak={user.streak.current}
                longestStreak={user.streak.longest}
                lastStudyDate={user.streak.lastStudyDate}
              />

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.achievements.slice(0, 4).map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                        achievement.earned ? "hover:bg-yellow-50 dark:hover:bg-yellow-900/10" : "hover:bg-muted/50"
                      )}
                      onClick={() => {
                        if (achievement.earned) {
                          alert(`🎉 Achievement Unlocked!\n\n${achievement.icon} ${achievement.title}\n\n${achievement.description}\n\nCompleted: ${new Date(achievement.date).toLocaleDateString()}\n\nKeep up the great work!`);
                        } else {
                          alert(`🔒 Achievement Locked\n\n${achievement.title}\n\n${achievement.description}\n\nProgress: ${achievement.progress || 0}%\n\nKeep studying to unlock this achievement!`);
                        }
                      }}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-lg",
                        achievement.earned ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-gray-100 dark:bg-gray-800"
                      )}>
                        {achievement.earned ? achievement.icon : "🔒"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={cn(
                          "font-medium text-sm truncate",
                          !achievement.earned && "text-muted-foreground"
                        )}>
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {achievement.description}
                        </p>
                        {!achievement.earned && achievement.progress && (
                          <Progress value={achievement.progress} className="h-1 mt-1" />
                        )}
                      </div>
                      {achievement.earned && (
                        <Badge variant="secondary" className="text-xs shrink-0">
                          Done
                        </Badge>
                      )}
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4" 
                    size="sm"
                    onClick={() => {
                      const earnedCount = user.achievements.filter(a => a.earned).length;
                      const totalCount = user.achievements.length;
                      alert(`Achievement Progress: ${earnedCount}/${totalCount}\n\n${user.achievements.map(a => `${a.earned ? '✅' : '🔒'} ${a.title}\n   ${a.description}\n   ${a.earned ? `Completed: ${new Date(a.date).toLocaleDateString()}` : `Progress: ${a.progress || 0}%`}`).join('\n\n')}`);
                    }}
                  >
                    View All Achievements ({user.achievements.filter(a => a.earned).length}/{user.achievements.length})
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Study Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Study Sessions</span>
                      <span className="font-medium">{user.stats.totalStudySessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Topics Learned</span>
                      <span className="font-medium">{user.stats.topicsLearned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Session</span>
                      <span className="font-medium">
                        {Math.round(user.stats.totalStudyTime / user.stats.totalStudySessions)} min
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>This Week's Goal</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">5/7 days</div>
                        <Progress value={71} className="h-2 w-20" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" asChild>
                    <Link to="/upload">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Learning
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Leaderboard 
              players={leaderboard}
              currentUserId={user.id}
              title="Weekly Leaderboard"
              showRankChange={true}
            />
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            <FriendsActivity 
              friends={friends}
              onAddFriend={handleAddFriend}
              onMessageFriend={handleMessageFriend}
              onJoinStudy={handleJoinStudy}
            />
            
            {/* Additional Friends Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Study Together
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="w-full" onClick={handleCreateStudySession}>
                    <Users className="w-4 h-4 mr-2" />
                    Create Study Session
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {
                    alert("Finding study buddies...\n\nThis would:\n- Match you with users studying similar topics\n- Show available study partners\n- Suggest optimal study times based on schedules");
                  }}>
                    <Search className="w-4 h-4 mr-2" />
                    Find Study Buddies
                  </Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Study with friends to boost motivation and retention!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    Study Groups
                  </CardTitle>
                  <Button size="sm" onClick={handleCreateGroup}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyGroups.map((group) => (
                    <Card key={group.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={group.avatar} alt={group.name} />
                          <AvatarFallback className="bg-primary text-white">
                            {group.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{group.name}</h4>
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              group.isActive ? "bg-green-500" : "bg-gray-400"
                            )}></div>
                            {joinedGroups.includes(group.id) && (
                              <Badge variant="secondary" className="text-xs">
                                Joined
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {group.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {group.members} members
                            </span>
                            <span>Last activity {group.lastActivity}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleJoinGroup(group.id)}
                            disabled={joinedGroups.includes(group.id)}
                          >
                            {joinedGroups.includes(group.id) ? 'Joined' : 'Join Group'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              alert(`Group options for "${group.name}":\n\n- View group details\n- See member list\n- Group chat history\n- Leave group\n- Group settings (if admin)`);
                            }}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {/* Group Actions */}
                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => {
                      alert("Browsing all study groups...\n\nThis would show:\n- All available public groups\n- Filter by subject/topic\n- Search by keywords\n- Recommended groups based on your interests");
                    }}>
                      <Search className="w-4 h-4 mr-2" />
                      Browse All Groups
                    </Button>
                    <Button variant="outline" onClick={() => {
                      alert("Group invitations...\n\nThis would show:\n- Pending group invitations\n- Accept or decline invites\n- Invited by friends notifications");
                    }}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Group Invites
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
