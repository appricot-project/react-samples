import { useStore } from "@nanostores/react";
import { useTranslation } from "react-i18next";
import { X, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Progress } from "@/shared/ui/progress";
import { $wizard, wizardActions, type IWizardData } from "@/shared/stores/wizard";
import { StepIndicator } from "./components/StepIndicator";
import { GoalStep } from "./components/steps/GoalStep";
import { BusinessStageStep } from "./components/steps/BusinessStageStep";
import { CreativeTypeStep } from "./components/steps/CreativeTypeStep";
import { AudienceStep } from "./components/steps/AudienceStep";
import { BrandStep } from "./components/steps/BrandStep";

interface StepConfig {
  component: React.ComponentType;
  validate: (data: IWizardData) => boolean;
}

const STEPS: StepConfig[] = [
  { component: GoalStep, validate: (data) => data.goal !== null },
  { component: BusinessStageStep, validate: (data) => data.businessStage !== null },
  { component: CreativeTypeStep, validate: (data) => data.creativeTypes.length > 0 },
  { component: AudienceStep, validate: (data) => data.hasDefinedPersona !== null },
  { component: BrandStep, validate: (data) => data.brandName.trim() !== "" },
];

export function OnboardingWizard() {
  const { t } = useTranslation("wizard");
  const { t: tCommon } = useTranslation("common");
  const wizard = useStore($wizard);
  const { isOpen, currentStep, totalSteps, data, isCompleted } = wizard;
  
  const CurrentStepComponent = STEPS[currentStep]?.component;
  const canProceed = STEPS[currentStep]?.validate(data) ?? false;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (isLastStep) {
      wizardActions.complete();
    } else {
      wizardActions.nextStep();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && wizardActions.close()}>
      <DialogContent className="max-w-6xl w-[98vw] p-0 gap-0 overflow-hidden max-h-[95vh] flex flex-col" showCloseButton={false}>
        <DialogTitle className="sr-only">{t("quickSetup")}</DialogTitle>
        
        <div className="flex items-center justify-between px-8 py-5 border-b shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-semibold">
              {isCompleted ? t("editPreferences") : t("quickSetup")}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => wizardActions.close()}
            className="text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="px-8 pt-5 shrink-0">
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="px-8 py-5 shrink-0">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepClick={(step) => step <= currentStep && wizardActions.goToStep(step)}
          />
        </div>

        <div className="px-8 py-6 flex-1 overflow-y-auto">
          {CurrentStepComponent && <CurrentStepComponent />}
        </div>

        <div className="flex items-center justify-between px-8 py-5 border-t bg-muted/30 shrink-0">
          <div>
            {!isCompleted && (
              <Button
                variant="ghost"
                onClick={() => wizardActions.skip()}
                className="text-muted-foreground"
              >
                {tCommon("skip")}
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => wizardActions.prevStep()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {tCommon("back")}
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={!canProceed}
            >
              {isLastStep ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isCompleted ? tCommon("saveChanges") : tCommon("getStarted")}
                </>
              ) : (
                <>
                  {tCommon("continue")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
