import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, X, Heart, Scissors, AlertTriangle, Pill, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MedicalHistoryStepProps {
  userId: string;
  onNext: () => void;
  onBack: () => void;
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const MedicalHistoryStep = ({ userId, onNext, onBack }: MedicalHistoryStepProps) => {
  const [formData, setFormData] = useState({
    chronic_illnesses: [] as string[],
    past_surgeries: [] as { name: string; year: string }[],
    allergies: [] as string[],
    current_medications: [] as { name: string; dosage: string; frequency: string }[],
    blood_type: "",
    family_history: {} as Record<string, boolean>,
  });
  const [newIllness, setNewIllness] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [newSurgery, setNewSurgery] = useState({ name: "", year: "" });
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "", frequency: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const familyConditions = [
    "Diabetes",
    "Heart Disease",
    "High Blood Pressure",
    "Cancer",
    "Stroke",
    "Alzheimer's",
    "Asthma",
    "Mental Health",
  ];

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      const { data } = await supabase
        .from("medical_history")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (data) {
        setFormData({
          chronic_illnesses: data.chronic_illnesses || [],
          past_surgeries: (data.past_surgeries as { name: string; year: string }[]) || [],
          allergies: data.allergies || [],
          current_medications: (data.current_medications as { name: string; dosage: string; frequency: string }[]) || [],
          blood_type: data.blood_type || "",
          family_history: (data.family_history as Record<string, boolean>) || {},
        });
      }
    };
    fetchMedicalHistory();
  }, [userId]);

  const addItem = (field: "chronic_illnesses" | "allergies", value: string) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });
    }
  };

  const removeItem = (field: "chronic_illnesses" | "allergies", index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const addSurgery = () => {
    if (newSurgery.name.trim()) {
      setFormData({
        ...formData,
        past_surgeries: [...formData.past_surgeries, newSurgery],
      });
      setNewSurgery({ name: "", year: "" });
    }
  };

  const addMedication = () => {
    if (newMedication.name.trim()) {
      setFormData({
        ...formData,
        current_medications: [...formData.current_medications, newMedication],
      });
      setNewMedication({ name: "", dosage: "", frequency: "" });
    }
  };

  const toggleFamilyHistory = (condition: string) => {
    setFormData({
      ...formData,
      family_history: {
        ...formData.family_history,
        [condition]: !formData.family_history[condition],
      },
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const { error } = await supabase
      .from("medical_history")
      .update({
        chronic_illnesses: formData.chronic_illnesses,
        past_surgeries: formData.past_surgeries,
        allergies: formData.allergies,
        current_medications: formData.current_medications,
        blood_type: formData.blood_type || null,
        family_history: formData.family_history,
      })
      .eq("user_id", userId);

    if (!error) {
      await supabase
        .from("profiles")
        .update({ onboarding_step: 3 })
        .eq("user_id", userId);
    }

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error saving medical history",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Medical History</h2>
        <p className="text-muted-foreground mt-1">
          Share your health background for better care
        </p>
      </div>

      <div className="space-y-6">
        {/* Blood Type */}
        <div>
          <Label className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-destructive" />
            Blood Type
          </Label>
          <Select
            value={formData.blood_type}
            onValueChange={(value) => setFormData({ ...formData, blood_type: value })}
          >
            <SelectTrigger className="mt-1.5 w-full md:w-48">
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              {bloodTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chronic Illnesses */}
        <div>
          <Label className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            Chronic Illnesses
          </Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              placeholder="e.g., Diabetes, Hypertension"
              value={newIllness}
              onChange={(e) => setNewIllness(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addItem("chronic_illnesses", newIllness);
                  setNewIllness("");
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                addItem("chronic_illnesses", newIllness);
                setNewIllness("");
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.chronic_illnesses.map((illness, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {illness}
                <button onClick={() => removeItem("chronic_illnesses", index)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <Label className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Allergies
          </Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              placeholder="e.g., Penicillin, Peanuts"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addItem("allergies", newAllergy);
                  setNewAllergy("");
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                addItem("allergies", newAllergy);
                setNewAllergy("");
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.allergies.map((allergy, index) => (
              <Badge key={index} variant="outline" className="gap-1 border-warning/50 text-warning">
                {allergy}
                <button onClick={() => removeItem("allergies", index)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Past Surgeries */}
        <div>
          <Label className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-info" />
            Past Surgeries
          </Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              placeholder="Surgery name"
              value={newSurgery.name}
              onChange={(e) => setNewSurgery({ ...newSurgery, name: e.target.value })}
              className="flex-1"
            />
            <Input
              placeholder="Year"
              type="number"
              value={newSurgery.year}
              onChange={(e) => setNewSurgery({ ...newSurgery, year: e.target.value })}
              className="w-24"
            />
            <Button type="button" variant="outline" size="icon" onClick={addSurgery}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {formData.past_surgeries.map((surgery, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
              >
                <span>
                  {surgery.name} {surgery.year && `(${surgery.year})`}
                </span>
                <Button
                  variant="ghost"
                  size="iconSm"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      past_surgeries: formData.past_surgeries.filter((_, i) => i !== index),
                    })
                  }
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Medications */}
        <div>
          <Label className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-accent" />
            Current Medications
          </Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              placeholder="Medication name"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              className="flex-1"
            />
            <Input
              placeholder="Dosage"
              value={newMedication.dosage}
              onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
              className="w-24"
            />
            <Input
              placeholder="Frequency"
              value={newMedication.frequency}
              onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
              className="w-28"
            />
            <Button type="button" variant="outline" size="icon" onClick={addMedication}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {formData.current_medications.map((med, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
              >
                <span>
                  {med.name}
                  {med.dosage && ` - ${med.dosage}`}
                  {med.frequency && ` (${med.frequency})`}
                </span>
                <Button
                  variant="ghost"
                  size="iconSm"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      current_medications: formData.current_medications.filter((_, i) => i !== index),
                    })
                  }
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Family History */}
        <div>
          <Label className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            Family Medical History
          </Label>
          <p className="text-xs text-muted-foreground mt-1 mb-3">
            Select conditions that run in your family
          </p>
          <div className="flex flex-wrap gap-2">
            {familyConditions.map((condition) => (
              <Badge
                key={condition}
                variant={formData.family_history[condition] ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => toggleFamilyHistory(condition)}
              >
                {condition}
              </Badge>
            ))}
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
