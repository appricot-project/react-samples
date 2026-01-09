import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { EGenerationMode } from "@/domains/generate/api/generateApi";
import { ImageUploader } from "./ImageUploader";
import { PromptInput } from "./PromptInput";

interface GenerationMainContentProps {
  mode: EGenerationMode;
  prompt: string;
  onPromptChange: (value: string) => void;
  referenceImage: string | null;
  onReferenceImageChange: (value: string | null) => void;
  onGenerate: () => void;
  onInputInteraction: () => void;
  isGenerating: boolean;
}

export function GenerationMainContent({
  mode,
  prompt,
  onPromptChange,
  referenceImage,
  onReferenceImageChange,
  onGenerate,
  onInputInteraction,
  isGenerating,
}: GenerationMainContentProps) {
  const { t } = useTranslation("generate");

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {mode === EGenerationMode.CompetitorBased && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div>
              <h3 className="text-sm font-medium mb-3">{t("referenceImage")}</h3>
              <ImageUploader value={referenceImage} onChange={onReferenceImageChange} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
        <motion.h3
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium mb-3"
        >
          {mode === EGenerationMode.CompetitorBased
            ? t("describeModifications")
            : t("describeCreative")}
        </motion.h3>
        <PromptInput
          value={prompt}
          onChange={onPromptChange}
          onGenerate={onGenerate}
          onClick={onInputInteraction}
          isGenerating={isGenerating}
          placeholder={
            mode === EGenerationMode.CompetitorBased
              ? t("placeholderCompetitor")
              : t("placeholderNative")
          }
        />
      </motion.div>
    </div>
  );
}

