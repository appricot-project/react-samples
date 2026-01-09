import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, Heart, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import type { IGeneratedCreative } from "@/domains/generate/api/generateApi";
import { ImageModal } from "./ImageModal";

export interface ResultsGridProps {
  creatives: IGeneratedCreative[];
  isLoading?: boolean;
  onUseAsReference?: (imageUrl: string) => void;
}

function CreativeCard({
  creative,
  onUseAsReference,
  onClick,
}: {
  creative: IGeneratedCreative;
  onUseAsReference?: (url: string) => void;
  onClick: () => void;
}) {
  const { t } = useTranslation("generate");
  const { t: tCommon } = useTranslation("common");

  return (
    <div
      onClick={onClick}
      className="group relative rounded-xl overflow-hidden bg-muted/50 backdrop-blur-sm border border-border/30 aspect-square cursor-pointer shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow"
    >
      <img
        src={creative.imageUrl}
        alt={creative.prompt}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-3" onClick={(e) => e.stopPropagation()}>
          <p className="text-white text-sm line-clamp-2 mb-2">{creative.prompt}</p>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" className="h-8">
              <Download className="w-3 h-3 mr-1" />
              {tCommon("save")}
            </Button>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <Heart className="w-3 h-3" />
            </Button>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  {t("downloadHd")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onUseAsReference?.(creative.imageUrl)}
                  className="cursor-pointer"
                >
                  {t("useAsReference")}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {tCommon("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingCard() {
  const { t } = useTranslation("generate");

  return (
<div className="rounded-xl bg-muted/50 backdrop-blur-sm border border-border/30 aspect-square animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">{t("generating")}</p>
      </div>
    </div>
  );
}

export function ResultsGrid({ creatives, isLoading, onUseAsReference }: ResultsGridProps) {
  const { t } = useTranslation("generate");
  const [selectedCreative, setSelectedCreative] = useState<IGeneratedCreative | null>(null);

  if (creatives.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>{t("emptyResults")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading && Array.from({ length: 4 }).map((_, i) => <LoadingCard key={`loading-${i}`} />)}
        {creatives.map((creative) => (
          <CreativeCard
            key={creative.id}
            creative={creative}
            onUseAsReference={onUseAsReference}
            onClick={() => setSelectedCreative(creative)}
          />
        ))}
      </div>

      <ImageModal
        creative={selectedCreative}
        isOpen={!!selectedCreative}
        onClose={() => setSelectedCreative(null)}
        onUseAsReference={onUseAsReference}
      />
    </>
  );
}
