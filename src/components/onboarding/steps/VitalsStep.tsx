import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Droplets, Activity, Thermometer, Wind, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VitalsStepProps {
  userId: string;
  onComplete: () => void;
  onBack: () => void;
}

export const VitalsStep = ({ userId, onComplete, onBack }: VitalsStepProps) => {
  const [formData, setFormData] = useState({
    systolic_bp: "",
    diastolic_bp: "",
    heart_rate: "",
    blood_sugar: "",
    temperature: "",
    oxygen_saturation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);

    // Insert initial vitals if any values are provided
    const hasVitals = Object.values(formData).some((v) => v !== "");
    
    if (hasVitals) {
      const { error: vitalsError } = await supabase.from("vitals").insert({
        user_id: userId,
        systolic_bp: formData.systolic_bp ? parseInt(formData.systolic_bp) : null,
        diastolic_bp: formData.diastolic_bp ? parseInt(formData.diastolic_bp) : null,
        heart_rate: formData.heart_rate ? parseInt(formData.heart_rate) : null,
        blood_sugar: formData.blood_sugar ? parseFloat(formData.blood_sugar) : null,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        oxygen_saturation: formData.oxygen_saturation ? parseInt(formData.oxygen_saturation) : null,
      });

      if (vitalsError) {
        toast({
          title: "Error saving vitals",
          description: vitalsError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    // Mark onboarding as complete
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        onboarding_completed: true,
        onboarding_step: 5,
      })
      .eq("user_id", userId);

    setIsLoading(false);

    if (profileError) {
      toast({
        title: "Error completing onboarding",
        description: profileError.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile Complete!",
      description: "Welcome to Docyo. Your health dashboard is ready.",
    });

    onComplete();
  };

  const vitalFields = [
    {
      icon: Heart,
      label: "Blood Pressure",
      color: "text-destructive",
      fields: [
        { name: "systolic_bp", placeholder: "120", suffix: "mmHg", label: "Systolic" },
        { name: "diastolic_bp", placeholder: "80", suffix: "mmHg", label: "Diastolic" },
      ],
    },
    {
      icon: Activity,
      label: "Heart Rate",
      color: "text-primary",
      fields: [{ name: "heart_rate", placeholder: "72", suffix: "bpm" }],
    },
    {
      icon: Droplets,
      label: "Blood Sugar",
      color: "text-info",
      fields: [{ name: "blood_sugar", placeholder: "100", suffix: "mg/dL" }],
    },
    {
      icon: Thermometer,
      label: "Temperature",
      color: "text-warning",
      fields: [{ name: "temperature", placeholder: "98.6", suffix: "°F" }],
    },
    {
      icon: Wind,
      label: "Oxygen Saturation",
      color: "text-accent",
      fields: [{ name: "oxygen_saturation", placeholder: "98", suffix: "%" }],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Your Vitals</h2>
        <p className="text-muted-foreground mt-1">
          Record your current health metrics (optional but recommended)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vitalFields.map((vital) => (
          <Card key={vital.label} variant="gradient">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <vital.icon className={`w-5 h-5 ${vital.color}`} />
                <Label className="font-medium">{vital.label}</Label>
              </div>
              <div className="flex gap-2">
                {vital.fields.map((field) => (
                  <div key={field.name} className="flex-1">
                    {field.label && (
                      <span className="text-xs text-muted-foreground">{field.label}</span>
                    )}
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.name]: e.target.value })
                        }
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        {field.suffix}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <p className="font-medium text-accent">Almost Done!</p>
            <p className="text-sm text-muted-foreground mt-1">
              After completing this step, you'll have access to your personalized health
              dashboard. You can always update these values later.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading} size="lg">
          {isLoading ? (
            "Completing..."
          ) : (
            <>
              Complete Setup
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};
