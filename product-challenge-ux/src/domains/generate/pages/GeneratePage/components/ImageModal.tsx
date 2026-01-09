import { useTranslation } from "react-i18next";
import { Download, Heart, MoreHorizontal, Trash2, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import type { IGeneratedCreative } from "@/domains/generate/api/generateApi";

interface ImageModalProps {
  creative: IGeneratedCreative | null;
  isOpen: boolean;
  onClose: () => void;
  onUseAsReference?: (imageUrl: string) => void;
}

export function ImageModal({ creative, isOpen, onClose, onUseAsReference }: ImageModalProps) {
  const { t } = useTranslation("generate");
  const { t: tCommon } = useTranslation("common");

  if (!creative) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-none h-[90vh] flex flex-col shadow-2xl" showCloseButton={false}>
        <DialogTitle className="sr-only">{creative.prompt}</DialogTitle>
        <div className="absolute top-4 right-4 z-50">
          <DialogClose asChild>
            <Button variant="secondary" size="icon" className="rounded-full shadow-lg hover:bg-secondary/80 cursor-pointer">
              <X className="w-4 h-4" />
            </Button>
          </DialogClose>
        </div>

        <div className="flex-1 flex items-center justify-center bg-black/5 relative overflow-hidden p-8">
           <img
            src={creative.imageUrl}
            alt={creative.prompt}
            className="w-full h-full object-contain shadow-2xl rounded-lg"
          />
        </div>

        <div className="p-6 border-t bg-background shrink-0">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-muted-foreground flex-1 line-clamp-2">
              {creative.prompt}
            </p>
            
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="outline" className="h-9 cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                {tCommon("save")}
              </Button>
              <Button size="sm" variant="outline" className="h-9 w-9 p-0 cursor-pointer">
                <Heart className="w-4 h-4" />
              </Button>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="h-9 w-9 p-0 cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <Download className="w-4 h-4 mr-2" />
                    {t("downloadHd")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                        onUseAsReference?.(creative.imageUrl);
                        onClose();
                    }}
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
      </DialogContent>
    </Dialog>
  );
}

