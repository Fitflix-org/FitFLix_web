
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Apple, 
  Coffee, 
  Utensils, 
  Plus, 
  Target, 
  TrendingUp,
  Calendar,
  Clock,
  Flame
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DietNutrition = () => {
  const { toast } = useToast();
  const [mealName, setMealName] = useState('');
  const [caloriesInput, setCaloriesInput] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  
  const [todayMeals, setTodayMeals] = useState([
    {
      id: 1,
      name: "Greek Yogurt with Berries",
      time: "8:00 AM",
      calories: 320,
      type: "Breakfast",
      color: "bg-fitness-green/10 text-fitness-green"
    },
    // ... (keep existing meal objects)
  ]);

  const [calories, setCalories] = useState({ consumed: 1450, target: 2200 });
  const [macros, setMacros] = useState({
    protein: { consumed: 85, target: 120 },
    carbs: { consumed: 160, target: 250 },
    fat: { consumed: 45, target: 70 }
  });

  const nutritionTips = [
    "Drink at least 8 glasses of water daily",
    "Include lean protein in every meal",
    "Eat colorful fruits and vegetables",
    "Choose whole grains over refined ones"
  ];

  const handleAddMeal = () => {
    if (!mealName || !caloriesInput) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill all meal details",
      });
      return;
    }

    const newMeal = {
      id: Date.now(),
      name: mealName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: parseInt(caloriesInput),
      type: mealType,
      color: {
        Breakfast: 'bg-fitness-green/10 text-fitness-green',
        Lunch: 'bg-primary/10 text-primary',
        Dinner: 'bg-fitness-orange/10 text-fitness-orange',
        Snack: 'bg-fitness-pink/10 text-fitness-pink'
      }[mealType]
    };

    setTodayMeals([...todayMeals, newMeal]);
    setCalories(prev => ({
      ...prev,
      consumed: prev.consumed + newMeal.calories
    }));

    setMealName('');
    setCaloriesInput('');
    setMealType('Breakfast');

    toast({
      title: "Meal Logged!",
      description: `${newMeal.name} added to your daily log`,
    });
  };

  const calorieProgress = (calories.consumed / calories.target) * 100;

  return (
    <div className="space-y-8">
      {/* Daily Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-fitness-orange" />
              Daily Calories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-black text-primary mb-2">
                {calories.consumed} / {calories.target}
              </div>
              <div className="text-sm text-muted-foreground">calories</div>
            </div>
            <Progress value={calorieProgress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {Math.max(0, calories.target - calories.consumed)} remaining
              </span>
              <span className="text-primary font-medium">
                {Math.round(calorieProgress)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              Macronutrients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(macros).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize font-medium">{key}</span>
                  <span className="text-muted-foreground">
                    {value.consumed}g / {value.target}g
                  </span>
                </div>
                <Progress 
                  value={(value.consumed / value.target) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Log */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-accent" />
            Quick Log Meal
          </CardTitle>
          <CardDescription>
            Add a meal to your daily nutrition log
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meal-name">Meal Name</Label>
              <Input 
                id="meal-name" 
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="e.g., Grilled Chicken" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input 
                id="calories" 
                type="number"
                value={caloriesInput}
                onChange={(e) => setCaloriesInput(e.target.value)}
                placeholder="0" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meal-type">Type</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddMeal} className="w-full">
                Log Meal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Today's Meals
          </CardTitle>
          <CardDescription>
            Your complete nutrition log for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayMeals.map((meal) => (
              <div 
                key={meal.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-muted/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Utensils className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{meal.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {meal.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{meal.calories} cal</div>
                  <Badge variant="secondary" className={meal.color}>
                    {meal.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Tips */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="h-5 w-5 text-fitness-green" />
            Today's Nutrition Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {nutritionTips.map((tip, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
              >
                <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DietNutrition;
