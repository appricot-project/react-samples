import { useStore } from "@nanostores/react";
import { useTranslation } from "react-i18next";
import { Rocket, FlaskConical, Trophy, Zap } from "lucide-react";
import { $wizard, wizardActions, type TBusinessStage } from "@/shared/stores/wizard";
import { SelectionTile } from "../SelectionTile";

export function BusinessStageStep() {
  const { t } = useTranslation("wizard");
  const wizard = useStore($wizard);
  const selectedStage = wizard.data.businessStage;

  const stages: Array<{
    id: TBusinessStage;
    title: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "just_started",
      title: t("stage.justStarted"),
      description: t("stage.justStartedDesc"),
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      id: "testing_phase",
      title: t("stage.testing"),
      description: t("stage.testingDesc"),
      icon: <FlaskConical className="w-5 h-5" />,
    },
    {
      id: "found_winners",
      title: t("stage.foundWinners"),
      description: t("stage.foundWinnersDesc"),
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: "scaling",
      title: t("stage.scaling"),
      description: t("stage.scalingDesc"),
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("stage.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("stage.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {stages.map((stage) => (
          <SelectionTile
            key={stage.id}
            title={stage.title}
            description={stage.description}
            icon={stage.icon}
            selected={selectedStage === stage.id}
            onClick={() => wizardActions.updateData({ businessStage: stage.id })}
          />
        ))}
      </div>
    </div>
  );
}
