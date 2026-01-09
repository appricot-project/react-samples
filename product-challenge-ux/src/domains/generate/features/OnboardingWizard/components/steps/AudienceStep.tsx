import { useStore } from "@nanostores/react";
import { useTranslation } from "react-i18next";
import { UserCheck, UserX } from "lucide-react";
import { $wizard, wizardActions } from "@/shared/stores/wizard";
import { SelectionTile } from "../SelectionTile";
import { Textarea } from "@/shared/ui/textarea";

export function AudienceStep() {
  const { t } = useTranslation("wizard");
  const wizard = useStore($wizard);
  const { hasDefinedPersona, personaDescription } = wizard.data;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("audience.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("audience.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto items-stretch">
        <SelectionTile
          title={t("audience.yesKnow")}
          description={t("audience.yesKnowDesc")}
          icon={<UserCheck className="w-5 h-5" />}
          selected={hasDefinedPersona === true}
          onClick={() => wizardActions.updateData({ hasDefinedPersona: true })}
        />
        <SelectionTile
          title={t("audience.stillFiguring")}
          description={t("audience.stillFiguringDesc")}
          icon={<UserX className="w-5 h-5" />}
          selected={hasDefinedPersona === false}
          onClick={() => wizardActions.updateData({ hasDefinedPersona: false })}
        />
      </div>

      {hasDefinedPersona === true && (
        <div className="max-w-3xl mx-auto space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="text-sm font-medium">
            {t("audience.describeCustomer")}
          </label>
          <Textarea
            value={personaDescription}
            onChange={(e) => wizardActions.updateData({ personaDescription: e.target.value })}
            placeholder={t("audience.personaPlaceholder")}
            className="min-h-[120px] resize-none"
          />
        </div>
      )}

      {hasDefinedPersona === false && (
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-muted/50 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-sm text-muted-foreground">
            {t("audience.noWorriesMessage")}
          </p>
        </div>
      )}
    </div>
  );
}
