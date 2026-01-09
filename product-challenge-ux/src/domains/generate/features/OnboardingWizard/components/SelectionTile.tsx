import { cn } from "@/shared/lib/utils";

interface SelectionTileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function SelectionTile({
  title,
  description,
  icon,
  selected,
  onClick,
  disabled = false,
}: SelectionTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "min-h-[180px] h-full w-full flex flex-col items-center justify-start gap-3 p-5 rounded-xl border-2 transition-all text-center cursor-pointer",
        selected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50",
        disabled && "opacity-50 cursor-not-allowed hover:border-border"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-2",
          selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </div>
      <div className="space-y-2 min-w-0 w-full flex-1 flex flex-col justify-start">
        <p className={cn("font-semibold text-sm leading-tight", selected && "text-primary")}>{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </button>
  );
}
