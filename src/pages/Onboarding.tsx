import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { PersonalInfoStep } from "@/components/onboarding/steps/PersonalInfoStep";
import { MedicalHistoryStep } from "@/components/onboarding/steps/MedicalHistoryStep";
import { LifestyleStep } from "@/components/onboarding/steps/LifestyleStep";
import { VitalsStep } from "@/components/onboarding/steps/VitalsStep";
import { supabase } from "@/integrations/supabase/client";

const steps = [
  { id: 1, title: "Personal Info", description: "Basic details & measurements" },
  { id: 2, title: "Medical History", description: "Conditions & medications" },
  { id: 3, title: "Lifestyle", description: "Habits & activity level" },
  { id: 4, title: "Vitals", description: "Current health metrics" },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }
      setUserId(session.user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_step, onboarding_completed")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (profile?.onboarding_completed) {
        navigate("/dashboard");
      } else if (profile?.onboarding_step) {
        setCurrentStep(profile.onboarding_step);
      }
    };
    checkAuth();
  }, [navigate]);

  if (!userId) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Progress */}
      <div className="hidden lg:flex w-80 flex-shrink-0 border-r border-border bg-card p-8 flex-col">
        <Logo size="lg" className="mb-12" />
        <OnboardingProgress steps={steps} currentStep={currentStep} />
        <div className="mt-auto">
          <p className="text-xs text-muted-foreground">
            Your data is encrypted and protected. We never share your health information
            without your consent.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="lg:hidden mb-8">
            <Logo size="md" />
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full gradient-primary transition-all duration-500"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentStep} of {steps.length}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <PersonalInfoStep userId={userId} onNext={() => setCurrentStep(2)} />
            )}
            {currentStep === 2 && (
              <MedicalHistoryStep
                userId={userId}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <LifestyleStep
                userId={userId}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 4 && (
              <VitalsStep
                userId={userId}
                onComplete={() => navigate("/dashboard")}
                onBack={() => setCurrentStep(3)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
