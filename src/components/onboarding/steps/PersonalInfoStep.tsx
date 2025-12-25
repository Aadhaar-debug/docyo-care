import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Ruler, Weight, Phone, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type GenderType = Database["public"]["Enums"]["gender_type"];

interface PersonalInfoStepProps {
  userId: string;
  onNext: () => void;
}

export const PersonalInfoStep = ({ userId, onNext }: PersonalInfoStepProps) => {
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "" as GenderType | "",
    height_cm: "",
    weight_kg: "",
    phone: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (data) {
        setFormData({
          full_name: data.full_name || "",
          date_of_birth: data.date_of_birth || "",
          gender: (data.gender as GenderType) || "",
          height_cm: data.height_cm?.toString() || "",
          weight_kg: data.weight_kg?.toString() || "",
          phone: data.phone || "",
          emergency_contact_name: data.emergency_contact_name || "",
          emergency_contact_phone: data.emergency_contact_phone || "",
        });
      }
    };
    fetchProfile();
  }, [userId]);

  const calculateBMI = () => {
    if (formData.height_cm && formData.weight_kg) {
      const heightM = parseFloat(formData.height_cm) / 100;
      const weight = parseFloat(formData.weight_kg);
      const bmi = weight / (heightM * heightM);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "Underweight", color: "text-warning" };
    if (bmi < 25) return { status: "Normal", color: "text-success" };
    if (bmi < 30) return { status: "Overweight", color: "text-warning" };
    return { status: "Obese", color: "text-destructive" };
  };

  const handleSubmit = async () => {
    if (!formData.full_name || !formData.date_of_birth || !formData.gender) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name, date of birth, and gender.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        date_of_birth: formData.date_of_birth,
        gender: formData.gender as GenderType,
        height_cm: formData.height_cm ? parseFloat(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        phone: formData.phone || null,
        emergency_contact_name: formData.emergency_contact_name || null,
        emergency_contact_phone: formData.emergency_contact_phone || null,
        onboarding_step: 2,
      })
      .eq("user_id", userId);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onNext();
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMIStatus(parseFloat(bmi)) : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground mt-1">
          Let's start with your basic details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <div className="relative mt-1.5">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="full_name"
              placeholder="John Doe"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="date_of_birth">Date of Birth *</Label>
          <div className="relative mt-1.5">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="gender">Gender *</Label>
          <Select
            value={formData.gender}
            onValueChange={(value: GenderType) => setFormData({ ...formData, gender: value })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="height_cm">Height (cm)</Label>
          <div className="relative mt-1.5">
            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="height_cm"
              type="number"
              placeholder="175"
              value={formData.height_cm}
              onChange={(e) => setFormData({ ...formData, height_cm: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="weight_kg">Weight (kg)</Label>
          <div className="relative mt-1.5">
            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="weight_kg"
              type="number"
              placeholder="70"
              value={formData.weight_kg}
              onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {bmi && bmiInfo && (
          <div className="md:col-span-2 p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your BMI</span>
              <div className="text-right">
                <span className="text-2xl font-bold">{bmi}</span>
                <span className={`ml-2 text-sm font-medium ${bmiInfo.color}`}>
                  ({bmiInfo.status})
                </span>
              </div>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative mt-1.5">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div className="md:col-span-2 pt-4 border-t border-border">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-muted-foreground" />
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergency_contact_name">Contact Name</Label>
              <Input
                id="emergency_contact_name"
                placeholder="Jane Doe"
                value={formData.emergency_contact_name}
                onChange={(e) =>
                  setFormData({ ...formData, emergency_contact_name: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
              <Input
                id="emergency_contact_phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.emergency_contact_phone}
                onChange={(e) =>
                  setFormData({ ...formData, emergency_contact_phone: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSubmit} disabled={isLoading} size="lg">
          {isLoading ? "Saving..." : "Continue"}
        </Button>
      </div>
    </motion.div>
  );
};
