import { cn } from "@/shared/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const STEP_LABELS = ["Goal", "Stage", "Format", "Audience", "Brand"];

export function StepIndicator({ currentStep, totalSteps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center max-w-3xl mx-auto">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <div key={index} className="flex-1 flex items-center">
            <button
              onClick={() => onStepClick?.(index)}
              disabled={index > currentStep}
              className={cn(
                "flex flex-col items-center gap-2 transition-all w-full cursor-pointer",
                index > currentStep && "opacity-40 cursor-not-allowed"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isCurrent && "text-foreground",
                  !isCurrent && "text-muted-foreground"
                )}
              >
                {STEP_LABELS[index]}
              </span>
            </button>
            
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-3 mt-[-24px]",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
