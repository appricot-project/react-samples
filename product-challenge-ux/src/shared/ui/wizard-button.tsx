import { useStore } from "@nanostores/react";
import { useTranslation } from "react-i18next";
import { Settings2, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { $wizard, wizardActions } from "@/shared/stores/wizard";
import { cn } from "@/shared/lib/utils";

export function WizardButton() {
  const { t } = useTranslation("wizard");
  const wizard = useStore($wizard);
  const isCompleted = wizard.isCompleted;

  return (
    <Button
      variant={isCompleted ? "outline" : "default"}
      size="sm"
      onClick={() => wizardActions.open()}
      className={cn(
        "relative overflow-hidden gap-2 transition-all duration-300",
        !isCompleted && 
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105"
      )}
    >
      {!isCompleted && (
        <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      )}
      
      <span className="relative flex items-center gap-2">
        {isCompleted ? (
          <>
            <Settings2 className="w-4 h-4" />
            {t("editPreferences")}
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {t("setupWizard")}
          </>
        )}
      </span>
    </Button>
  );
}
