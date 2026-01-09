import { useStore } from "@nanostores/react";
import { useTranslation } from "react-i18next";
import { Target, TrendingUp, Users, Sparkles } from "lucide-react";
import { $wizard, wizardActions, type TUserGoal } from "@/shared/stores/wizard";
import { SelectionTile } from "../SelectionTile";

export function GoalStep() {
  const { t } = useTranslation("wizard");
  const wizard = useStore($wizard);
  const selectedGoal = wizard.data.goal;

  const goals: Array<{
    id: TUserGoal;
    title: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "testing",
      title: t("goal.testing"),
      description: t("goal.testingDesc"),
      icon: <Target className="w-5 h-5" />,
    },
    {
      id: "scale_winning",
      title: t("goal.scaleWinning"),
      description: t("goal.scaleWinningDesc"),
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "new_persona",
      title: t("goal.newPersona"),
      description: t("goal.newPersonaDesc"),
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "expand_audience",
      title: t("goal.expandAudience"),
      description: t("goal.expandAudienceDesc"),
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("goal.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("goal.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {goals.map((goal) => (
          <SelectionTile
            key={goal.id}
            title={goal.title}
            description={goal.description}
            icon={goal.icon}
            selected={selectedGoal === goal.id}
            onClick={() => wizardActions.updateData({ goal: goal.id })}
          />
        ))}
      </div>
    </div>
  );
}
