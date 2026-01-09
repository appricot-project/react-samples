import { useTranslation } from "react-i18next";
import { type IGeneratedCreative } from "@/domains/generate/api/generateApi";
import { ResultsGrid } from "./ResultsGrid";

interface ResultsSectionProps {
  creatives: IGeneratedCreative[];
  isGenerating: boolean;
  onUseAsReference: (imageUrl: string) => void;
}

export function ResultsSection({
  creatives,
  isGenerating,
  onUseAsReference,
}: ResultsSectionProps) {
  const { t } = useTranslation("generate");

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{t("results")}</h2>
        {creatives.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {t("creativesCount", { count: creatives.length })}
          </span>
        )}
      </div>
      <ResultsGrid
        creatives={creatives}
        isLoading={isGenerating}
        onUseAsReference={onUseAsReference}
      />
    </div>
  );
}

