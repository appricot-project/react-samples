import { useTranslation } from "react-i18next";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib/utils";
import { EAspectRatio } from "@/domains/generate/api/generateApi";
import { AspectRatioSelector } from "./AspectRatioSelector";

interface GenerationSettingsProps {
  count: number;
  onCountChange: (count: number) => void;
  aspectRatio: EAspectRatio;
  onAspectRatioChange: (ratio: EAspectRatio) => void;
}

const COUNT_OPTIONS = [1, 2, 4, 8];

export function GenerationSettings({
  count,
  onCountChange,
  aspectRatio,
  onAspectRatioChange,
}: GenerationSettingsProps) {
  const { t } = useTranslation("generate");

  return (
    <div className="flex flex-wrap gap-6">
      <div className="space-y-3 w-full">
        <Label className="text-sm font-medium">{t("batchSize")}</Label>
        <div className="flex gap-2">
          {COUNT_OPTIONS.map((num) => (
            <button
              key={num}
              onClick={() => onCountChange(num)}
              className={cn(
                "flex-1 h-10 rounded-lg font-medium transition-colors cursor-pointer border-2",
                count === num
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-muted hover:border-primary/50 text-muted-foreground"
              )}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 w-full">
        <Label className="text-sm font-medium">{t("aspectRatio")}</Label>
        <AspectRatioSelector value={aspectRatio} onChange={onAspectRatioChange} />
      </div>
    </div>
  );
}
