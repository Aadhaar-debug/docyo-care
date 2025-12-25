import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface OnboardingProgressProps {
  steps: Step[];
  currentStep: number;
}

export const OnboardingProgress = ({ steps, currentStep }: OnboardingProgressProps) => {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 text-right">
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isCurrent = index + 1 === currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isCurrent
                  ? "bg-primary/10 border border-primary/30"
                  : isCompleted
                  ? "bg-accent/10"
                  : "opacity-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted
                    ? "bg-accent text-accent-foreground"
                    : isCurrent
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
