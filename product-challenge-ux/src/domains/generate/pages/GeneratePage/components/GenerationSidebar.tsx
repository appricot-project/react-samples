import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { EAspectRatio, EGenerationMode } from "@/domains/generate/api/generateApi";
import { GenerationSettings } from "./GenerationSettings";

interface GenerationSidebarProps {
  mode: EGenerationMode;
  count: number;
  onCountChange: (value: number) => void;
  aspectRatio: EAspectRatio;
  onAspectRatioChange: (value: EAspectRatio) => void;
  onResetWizard: () => void;
}

export function GenerationSidebar({
  mode,
  count,
  onCountChange,
  aspectRatio,
  onAspectRatioChange,
  onResetWizard,
}: GenerationSidebarProps) {
  const { t } = useTranslation("generate");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium mb-3">{t("settings")}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetWizard}
          className="text-xs h-6 text-muted-foreground cursor-pointer"
        >
          Debug: Reset Wizard
        </Button>
      </div>
      <GenerationSettings
        count={count}
        onCountChange={onCountChange}
        aspectRatio={aspectRatio}
        onAspectRatioChange={onAspectRatioChange}
      />

      <div className="p-4 rounded-xl bg-muted/50 space-y-2">
        <p className="text-sm font-medium">{t("generatingCount", { count })}</p>
        <motion.p
          key={mode}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-muted-foreground"
        >
          {mode === EGenerationMode.NativeStory ? t("nativeInfo") : t("competitorInfo")}
        </motion.p>
      </div>
    </div>
  );
}
