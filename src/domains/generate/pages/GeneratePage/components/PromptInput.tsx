import { useTranslation } from "react-i18next";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  placeholder?: string;
  onClick?: () => void;
}

const PROMPT_SUGGESTIONS = [
  "Minimalist product on clean white background",
  "Lifestyle shot with model holding product",
  "Bold colors with dynamic composition",
  "Aesthetic flat lay with props",
];

export function PromptInput({
  value,
  onChange,
  onGenerate,
  isGenerating,
  placeholder,
  onClick,
}: PromptInputProps) {
  const { t } = useTranslation("generate");

  return (
    <div className="space-y-3">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={onClick}
          onFocus={onClick}
          placeholder={placeholder || t("placeholderNative")}
          className="min-h-[120px] pr-24 resize-none"
        />
        <Button
          onClick={onGenerate}
          disabled={!value.trim() || isGenerating}
          className="absolute bottom-3 right-3"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              {t("generating")}
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              {t("generate")}
            </>
          )}
        </Button>
      </div>

      {!value && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Try:</span>
          {PROMPT_SUGGESTIONS.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => {
                onChange(suggestion);
                onClick?.();
              }}
              className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
