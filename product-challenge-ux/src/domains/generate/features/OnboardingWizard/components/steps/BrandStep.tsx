import { useStore } from "@nanostores/react";
import { useTranslation } from "react-i18next";
import { $wizard, wizardActions } from "@/shared/stores/wizard";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Smile, Briefcase, Sparkles, Heart } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function BrandStep() {
  const { t } = useTranslation("wizard");
  const wizard = useStore($wizard);
  const { brandName, productDescription, brandTone } = wizard.data;

  const brandTones = [
    { id: "friendly", label: t("brand.friendly"), icon: <Smile className="w-5 h-5" /> },
    { id: "professional", label: t("brand.professional"), icon: <Briefcase className="w-5 h-5" /> },
    { id: "bold", label: t("brand.bold"), icon: <Sparkles className="w-5 h-5" /> },
    { id: "warm", label: t("brand.warm"), icon: <Heart className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("brand.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("brand.subtitle")}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("brand.brandName")}</label>
          <Input
            value={brandName}
            onChange={(e) => wizardActions.updateData({ brandName: e.target.value })}
            placeholder={t("brand.brandNamePlaceholder")}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("brand.whatSell")}</label>
          <Textarea
            value={productDescription}
            onChange={(e) => wizardActions.updateData({ productDescription: e.target.value })}
            placeholder={t("brand.productPlaceholder")}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">{t("brand.brandTone")}</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {brandTones.map((tone) => (
              <button
                key={tone.id}
                onClick={() => wizardActions.updateData({ brandTone: tone.id })}
                className={cn(
                  "h-[80px] flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all cursor-pointer",
                  brandTone === tone.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                )}
              >
                <span className={brandTone === tone.id ? "text-primary" : "text-muted-foreground"}>
                  {tone.icon}
                </span>
                <span className="text-sm font-medium">{tone.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
