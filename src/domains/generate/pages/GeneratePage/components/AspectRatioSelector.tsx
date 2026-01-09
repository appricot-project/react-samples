import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";
import { EAspectRatio } from "@/domains/generate/api/generateApi";

interface AspectRatioButtonProps {
  ratio: EAspectRatio;
  label: string;
  ratioClass: string;
  isSelected: boolean;
  onClick: () => void;
}

export function AspectRatioButton({
  ratio,
  label,
  ratioClass,
  isSelected,
  onClick,
}: AspectRatioButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 text-left w-full",
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-muted hover:border-primary/50 bg-background"
      )}
    >
      <div className="w-8 flex items-center justify-center shrink-0">
        <div
          className={cn(
            "rounded-[2px] border-2 bg-muted/20",
            isSelected ? "border-primary" : "border-muted-foreground/40",
            ratioClass
          )}
        />
      </div>
      <div className="flex items-start justify-center flex-col gap-2">
        <span
          className={cn(
            "block text-sm font-medium leading-none",
            isSelected ? "text-primary" : "text-foreground"
          )}
        >
          {label}
        </span>
        <span className="text-xs text-muted-foreground font-mono leading-none">{ratio}</span>
      </div>
    </button>
  );
}

interface AspectRatioSelectorProps {
  value: EAspectRatio;
  onChange: (value: EAspectRatio) => void;
}

export function AspectRatioSelector({ value, onChange }: AspectRatioSelectorProps) {
  const { t } = useTranslation("generate");

  const aspectRatios = [
    { value: EAspectRatio.Square, label: t("square"), ratioClass: "aspect-square w-5" },
    { value: EAspectRatio.Portrait, label: t("portrait"), ratioClass: "aspect-[4/5] w-4" },
    { value: EAspectRatio.Story, label: t("story"), ratioClass: "aspect-[9/16] w-3.5" },
    { value: EAspectRatio.Landscape, label: t("landscape"), ratioClass: "aspect-video w-7" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {aspectRatios.map((ratio) => (
        <AspectRatioButton
          key={ratio.value}
          ratio={ratio.value}
          label={ratio.label}
          ratioClass={ratio.ratioClass}
          isSelected={value === ratio.value}
          onClick={() => onChange(ratio.value)}
        />
      ))}
    </div>
  );
}
