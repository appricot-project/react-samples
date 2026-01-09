import { useTranslation } from "react-i18next";
import { Image, Copy } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { EGenerationMode } from "@/domains/generate/api/generateApi";

interface ModeSelectorProps {
  value: EGenerationMode;
  onChange: (mode: EGenerationMode) => void;
}

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  const { t } = useTranslation("generate");

  const modes = [
    {
      id: EGenerationMode.NativeStory,
      label: t("nativeStory"),
      description: t("nativeStoryDesc"),
      icon: Image,
    },
    {
      id: EGenerationMode.CompetitorBased,
      label: t("competitorBased"),
      description: t("competitorBasedDesc"),
      icon: Copy,
    },
  ];

  return (
    <div className="flex gap-3">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = value === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={cn(
              "flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left cursor-pointer",
              isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className={cn("font-medium", isSelected && "text-primary")}>{mode.label}</p>
              <p className="text-sm text-muted-foreground">{mode.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
