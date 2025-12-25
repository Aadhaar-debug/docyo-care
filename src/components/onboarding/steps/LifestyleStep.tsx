import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cigarette, Wine, Dumbbell, Utensils, Moon, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type SmokingStatus = Database["public"]["Enums"]["smoking_status"];
type AlcoholStatus = Database["public"]["Enums"]["alcohol_status"];
type ActivityLevel = Database["public"]["Enums"]["activity_level"];
type DietType = Database["public"]["Enums"]["diet_type"];

interface LifestyleStepProps {
  userId: string;
  onNext: () => void;
  onBack: () => void;
}

export const LifestyleStep = ({ userId, onNext, onBack }: LifestyleStepProps) => {
  const [formData, setFormData] = useState({
    smoking_status: "" as SmokingStatus | "",
    alcohol_status: "" as AlcoholStatus | "",
    activity_level: "" as ActivityLevel | "",
    diet_type: "" as DietType | "",
    sleep_hours_avg: 7,
    stress_level: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLifestyle = async () => {
      const { data } = await supabase
        .from("lifestyle")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (data) {
        setFormData({
          smoking_status: (data.smoking_status as SmokingStatus) || "",
          alcohol_status: (data.alcohol_status as AlcoholStatus) || "",
          activity_level: (data.activity_level as ActivityLevel) || "",
          diet_type: (data.diet_type as DietType) || "",
          sleep_hours_avg: data.sleep_hours_avg ? Number(data.sleep_hours_avg) : 7,
          stress_level: data.stress_level || 5,
        });
      }
    };
    fetchLifestyle();
  }, [userId]);

  const handleSubmit = async () => {
    setIsLoading(true);

    const { error } = await supabase
      .from("lifestyle")
      .update({
        smoking_status: formData.smoking_status || null,
        alcohol_status: formData.alcohol_status || null,
        activity_level: formData.activity_level || null,
        diet_type: formData.diet_type || null,
        sleep_hours_avg: formData.sleep_hours_avg,
        stress_level: formData.stress_level,
      })
      .eq("user_id", userId);

    if (!error) {
      await supabase
        .from("profiles")
        .update({ onboarding_step: 4 })
        .eq("user_id", userId);
    }

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error saving lifestyle info",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onNext();
  };

  const getStressLabel = (level: number) => {
    if (level <= 3) return "Low";
    if (level <= 6) return "Moderate";
    if (level <= 8) return "High";
    return "Very High";
  };

  const getStressColor = (level: number) => {
    if (level <= 3) return "text-success";
    if (level <= 6) return "text-warning";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Lifestyle Factors</h2>
        <p className="text-muted-foreground mt-1">
          Help us understand your daily habits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Smoking Status */}
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Cigarette className="w-4 h-4 text-muted-foreground" />
            Smoking Status
          </Label>
          <Select
            value={formData.smoking_status}
            onValueChange={(value: SmokingStatus) =>
              setFormData({ ...formData, smoking_status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never Smoked</SelectItem>
              <SelectItem value="former">Former Smoker</SelectItem>
              <SelectItem value="occasional">Occasional Smoker</SelectItem>
              <SelectItem value="current">Current Smoker</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alcohol Consumption */}
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Wine className="w-4 h-4 text-muted-foreground" />
            Alcohol Consumption
          </Label>
          <Select
            value={formData.alcohol_status}
            onValueChange={(value: AlcoholStatus) =>
              setFormData({ ...formData, alcohol_status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="occasional">Occasional (1-2/month)</SelectItem>
              <SelectItem value="moderate">Moderate (1-2/week)</SelectItem>
              <SelectItem value="heavy">Heavy (Daily)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Physical Activity */}
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Dumbbell className="w-4 h-4 text-accent" />
            Physical Activity Level
          </Label>
          <Select
            value={formData.activity_level}
            onValueChange={(value: ActivityLevel) =>
              setFormData({ ...formData, activity_level: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
              <SelectItem value="lightly_active">Lightly Active (1-3 days/week)</SelectItem>
              <SelectItem value="moderately_active">Moderately Active (3-5 days/week)</SelectItem>
              <SelectItem value="very_active">Very Active (6-7 days/week)</SelectItem>
              <SelectItem value="extremely_active">Extremely Active (athlete)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Diet Type */}
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Utensils className="w-4 h-4 text-primary" />
            Diet Type
          </Label>
          <Select
            value={formData.diet_type}
            onValueChange={(value: DietType) =>
              setFormData({ ...formData, diet_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="omnivore">Omnivore (Everything)</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sleep Hours */}
        <div className="md:col-span-2">
          <Label className="flex items-center gap-2 mb-4">
            <Moon className="w-4 h-4 text-info" />
            Average Sleep Hours
          </Label>
          <div className="space-y-4">
            <Slider
              value={[formData.sleep_hours_avg]}
              onValueChange={(value) =>
                setFormData({ ...formData, sleep_hours_avg: value[0] })
              }
              min={3}
              max={12}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">3 hours</span>
              <span className="font-medium text-lg">
                {formData.sleep_hours_avg} hours/night
              </span>
              <span className="text-muted-foreground">12 hours</span>
            </div>
          </div>
        </div>

        {/* Stress Level */}
        <div className="md:col-span-2">
          <Label className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-warning" />
            Stress Level
          </Label>
          <div className="space-y-4">
            <Slider
              value={[formData.stress_level]}
              onValueChange={(value) =>
                setFormData({ ...formData, stress_level: value[0] })
              }
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">1 (Low)</span>
              <span className={`font-medium text-lg ${getStressColor(formData.stress_level)}`}>
                {formData.stress_level}/10 ({getStressLabel(formData.stress_level)})
              </span>
              <span className="text-muted-foreground">10 (High)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Continue"}
        </Button>
      </div>
    </motion.div>
  );
};
