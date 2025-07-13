// src/pages/Profile.tsx
import React, { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User as UserIcon, // Renamed to avoid conflict with user object
  Settings,
  Trophy,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Flame,
  Clock,
  Mail
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, logout, loading } = useAuthContext();
  const navigate = useNavigate();

  // Redirect if not logged in or still loading
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading profile...</p>
      </div>
    );
  }

  // Mock data for other stats, using Redux user data for name and email
  const userStats = {
    name: user.username, // Get from Redux
    email: user.email,   // Get from Redux
    joinDate: "March 2024", // Mock data
    currentStreak: 12,      // Mock data
    longestStreak: 28,      // Mock data
    totalWorkouts: 156,     // Mock data
    totalCalories: 45280,   // Mock data
    achievements: 18,       // Mock data
    currentRank: 8,         // Mock data
    level: 15               // Mock data
  };

  const recentAchievements = [
    {
      id: 1,
      name: "Week Warrior",
      description: "Complete 7 workouts in a week",
      date: "2 days ago",
      icon: "🏆"
    },
    {
      id: 2,
      name: "Consistency King",
      description: "Maintain a 30-day streak",
      date: "1 week ago",
      icon: "👑"
    },
    {
      id: 3,
      name: "Calorie Crusher",
      description: "Burn 500+ calories in one session",
      date: "2 weeks ago",
      icon: "⚡"
    }
  ];

  const weeklyActivity = [
    { day: "Mon", workouts: 1, calories: 320 },
    { day: "Tue", workouts: 0, calories: 0 },
    { day: "Wed", workouts: 2, calories: 580 },
    { day: "Thu", workouts: 1, calories: 290 },
    { day: "Fri", workouts: 1, calories: 410 },
    { day: "Sat", workouts: 2, calories: 650 },
    { day: "Sun", workouts: 1, calories: 380 }
  ];

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Header */}
        <Card className="card-fitness">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                {/* Use DiceBear API for avatar based on username */}
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username ?? 'user'}`} alt={user?.username ?? 'user'} />
                <AvatarFallback className="text-2xl">
                  {user?.username?.substring(0, 2).toUpperCase() ?? 'US'}
                </AvatarFallback>
              </Avatar>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-black mb-2">{userStats.name}</h1>
                <p className="text-muted-foreground mb-4 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  {userStats.email}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Level {userStats.level}
                  </Badge>
                  <Badge variant="secondary" className="bg-fitness-orange/10 text-fitness-orange">
                    Rank #{userStats.currentRank}
                  </Badge>
                  <Badge variant="secondary" className="bg-fitness-green/10 text-fitness-green">
                    {userStats.currentStreak} Day Streak
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-fitness text-center p-4">
            <CardContent className="p-0">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-black text-primary mb-1">
                {userStats.totalWorkouts}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Workouts
              </div>
            </CardContent>
          </Card>

          <Card className="card-fitness text-center p-4">
            <CardContent className="p-0">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-fitness-orange/10 flex items-center justify-center">
                <Flame className="h-6 w-6 text-fitness-orange" />
              </div>
              <div className="text-2xl font-black text-fitness-orange mb-1">
                {userStats.totalCalories.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Calories Burned
              </div>
            </CardContent>
          </Card>

          <Card className="card-fitness text-center p-4">
            <CardContent className="p-0">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-black text-secondary mb-1">
                {userStats.achievements}
              </div>
              <div className="text-sm text-muted-foreground">
                Achievements
              </div>
            </CardContent>
          </Card>

          <Card className="card-fitness text-center p-4">
            <CardContent className="p-0">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-black text-accent mb-1">
                {userStats.longestStreak}
              </div>
              <div className="text-sm text-muted-foreground">
                Longest Streak
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Achievements */}
          <Card className="card-fitness">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-fitness-orange" />
                Recent Achievements
              </CardTitle>
              <CardDescription>
                Your latest accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-muted/30"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.description}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.date}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="card-fitness">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                This Week's Activity
              </CardTitle>
              <CardDescription>
                Your workout consistency this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 text-sm font-medium text-muted-foreground">
                        {day.day}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        day.workouts > 0 ? 'bg-primary' : 'bg-muted'
                      }`} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {day.workouts} workout{day.workouts !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {day.calories} cal
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="card-fitness">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              Progress Towards Next Level
            </CardTitle>
            <CardDescription>
              Keep going to reach Level {userStats.level + 1}!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={75} className="h-4" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Level {userStats.level}</span>
                <span className="text-primary font-medium">75% to Level {userStats.level + 1}</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Complete 3 more workouts to unlock Level {userStats.level + 1} and exclusive rewards!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;