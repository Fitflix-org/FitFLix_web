
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Timer, 
  Target, 
  Plus, 
  Play, 
  Pause,
  RotateCcw,
  TrendingUp,
  Calendar,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExerciseTracker = () => {
  const { toast } = useToast();
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState({ completed: 4, target: 5 });

  const workoutPrograms = [
    {
      id: 1,
      name: "Full Body Strength",
      duration: "45 min",
      exercises: 8,
      difficulty: "Intermediate",
      color: "bg-primary/10 text-primary",
      category: "Strength"
    },
    {
      id: 2,
      name: "HIIT Cardio Blast",
      duration: "30 min",
      exercises: 6,
      difficulty: "Advanced",
      color: "bg-fitness-orange/10 text-fitness-orange",
      category: "Cardio"
    },
    {
      id: 3,
      name: "Yoga Flow",
      duration: "60 min",
      exercises: 12,
      difficulty: "Beginner",
      color: "bg-fitness-green/10 text-fitness-green",
      category: "Flexibility"
    },
    {
      id: 4,
      name: "Core Power",
      duration: "25 min",
      exercises: 10,
      difficulty: "Intermediate",
      color: "bg-secondary/10 text-secondary",
      category: "Core"
    }
  ];

  const recentWorkouts = [
    {
      id: 1,
      name: "Upper Body Strength",
      date: "Today",
      duration: "42 min",
      exercises: 8,
      calories: 320
    },
    {
      id: 2,
      name: "Morning Cardio",
      date: "Yesterday",
      duration: "35 min",
      exercises: 6,
      calories: 280
    },
    {
      id: 3,
      name: "Leg Day",
      date: "2 days ago",
      duration: "50 min",
      exercises: 10,
      calories: 410
    }
  ];

  const currentExercises = [
    { name: "Push-ups", sets: 3, reps: 12, completed: 2 },
    { name: "Squats", sets: 4, reps: 15, completed: 1 },
    { name: "Plank", sets: 3, reps: "60s", completed: 0 },
    { name: "Burpees", sets: 3, reps: 10, completed: 0 }
  ];

  const handleStartWorkout = (programName: string) => {
    setIsWorkoutActive(true);
    toast({
      title: "Workout Started!",
      description: `${programName} is now active. Give it your best!`,
    });
  };

  const weeklyProgress = (weeklyGoal.completed / weeklyGoal.target) * 100;

  return (
    <div className="space-y-8">
      {/* Workout Status & Goals */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-black text-primary mb-2">
                {weeklyGoal.completed} / {weeklyGoal.target}
              </div>
              <div className="text-sm text-muted-foreground">workouts completed</div>
            </div>
            <Progress value={weeklyProgress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {weeklyGoal.target - weeklyGoal.completed} remaining
              </span>
              <span className="text-primary font-medium">
                {Math.round(weeklyProgress)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-secondary" />
              Active Workout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isWorkoutActive ? (
              <div className="text-center">
                <div className="text-2xl font-black text-secondary mb-2">
                  {Math.floor(workoutTimer / 60)}:{(workoutTimer % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground mb-4">elapsed time</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-lg text-muted-foreground mb-4">
                  No active workout
                </div>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Start Workout
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Current Workout Exercises */}
      {isWorkoutActive && (
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Current Workout: Full Body Strength
            </CardTitle>
            <CardDescription>
              Track your progress through each exercise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentExercises.map((exercise, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-muted/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps} reps
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">
                      {exercise.completed}/{exercise.sets}
                    </div>
                    <Badge 
                      variant={exercise.completed === exercise.sets ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {exercise.completed === exercise.sets ? "Complete" : "In Progress"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workout Programs */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Workout Programs
          </CardTitle>
          <CardDescription>
            Choose from our curated fitness programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {workoutPrograms.map((program) => (
              <div 
                key={program.id}
                className="p-4 rounded-2xl border border-border cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">
                      {program.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {program.duration} • {program.exercises} exercises
                    </p>
                  </div>
                  <Badge variant="secondary" className={program.color}>
                    {program.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {program.difficulty}
                  </Badge>
                  <Button 
                    size="sm" 
                    onClick={() => handleStartWorkout(program.name)}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-secondary" />
            Recent Workouts
          </CardTitle>
          <CardDescription>
            Your workout history and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentWorkouts.map((workout) => (
              <div 
                key={workout.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-muted/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">{workout.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {workout.date} • {workout.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{workout.calories} kcal</div>
                  <div className="text-sm text-muted-foreground">
                    {workout.exercises} exercises
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseTracker;
