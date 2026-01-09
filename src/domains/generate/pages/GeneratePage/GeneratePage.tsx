import { useState } from "react";
import { useStore } from "@nanostores/react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/shared/ui/separator";
import { Header } from "@/shared/ui/header";
import { $wizard, $hasSeenWizard, wizardActions } from "@/shared/stores/wizard";
import { OnboardingWizard } from "@/domains/generate/features/OnboardingWizard/OnboardingWizard";
import {
  type IGeneratedCreative,
  EAspectRatio,
  EGenerationMode,
  generateApi,
} from "@/domains/generate/api/generateApi";
import { ModeSelector } from "./components/ModeSelector";
import { GenerationMainContent } from "./components/GenerationMainContent";
import { GenerationSidebar } from "./components/GenerationSidebar";
import { ResultsSection } from "./components/ResultsSection";

export function GeneratePage() {
  const { t } = useTranslation("generate");
  const hasSeenWizard = useStore($hasSeenWizard);
  const wizard = useStore($wizard);

  const [mode, setMode] = useState<EGenerationMode>(EGenerationMode.NativeStory);
  const [prompt, setPrompt] = useState("");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [count, setCount] = useState(4);
  const [aspectRatio, setAspectRatio] = useState<EAspectRatio>(EAspectRatio.Square);
  const [isGenerating, setIsGenerating] = useState(false);
  const [creatives, setCreatives] = useState<IGeneratedCreative[]>([]);

  const handleInputInteraction = () => {
    if (!hasSeenWizard) {
      wizardActions.open();
    }
  };

  const handleResetWizard = () => {
    wizardActions.reset();
  };

  const handleUseAsReference = (imageUrl: string) => {
    setMode(EGenerationMode.CompetitorBased);
    setReferenceImage(imageUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (mode === EGenerationMode.CompetitorBased && !referenceImage) return;

    setIsGenerating(true);

    try {
      const response = await generateApi.generate({
        mode,
        prompt,
        referenceImage: referenceImage || undefined,
        count,
        aspectRatio,
        brandName: wizard.isCompleted ? wizard.data.brandName : undefined,
        productDescription: wizard.isCompleted ? wizard.data.productDescription : undefined,
      });

      setCreatives((prev) => [...response.creatives, ...prev]);
    } catch (error) {
      console.error("Failed to generate creatives:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <OnboardingWizard />

      <div className="min-h-screen bg-background">
        <Header />

        <div className="h-20" />

        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-card rounded-2xl border p-6 space-y-6">
            <div>
              <h2 className="text-sm font-medium mb-3">{t("mode")}</h2>
              <ModeSelector value={mode} onChange={setMode} />
            </div>

            <Separator />

            <div className="grid gap-6 md:grid-cols-2">
              <GenerationMainContent
                mode={mode}
                prompt={prompt}
                onPromptChange={setPrompt}
                referenceImage={referenceImage}
                onReferenceImageChange={setReferenceImage}
                onGenerate={handleGenerate}
                onInputInteraction={handleInputInteraction}
                isGenerating={isGenerating}
              />

              <GenerationSidebar
                mode={mode}
                count={count}
                onCountChange={setCount}
                aspectRatio={aspectRatio}
                onAspectRatioChange={setAspectRatio}
                onResetWizard={handleResetWizard}
              />
            </div>
          </div>

          <ResultsSection
            creatives={creatives}
            isGenerating={isGenerating}
            onUseAsReference={handleUseAsReference}
          />
        </main>
      </div>
    </>
  );
}
