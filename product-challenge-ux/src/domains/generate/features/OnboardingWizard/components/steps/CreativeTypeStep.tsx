import { useStore } from "@nanostores/react";
import { useTranslation } from "react-i18next";
import { Image, Copy, Video, Mic, UserCircle } from "lucide-react";
import { $wizard, wizardActions, type TCreativeType } from "@/shared/stores/wizard";
import { SelectionTile } from "../SelectionTile";
import { Badge } from "@/shared/ui/badge";

export function CreativeTypeStep() {
  const { t } = useTranslation("wizard");
  const wizard = useStore($wizard);
  const selectedTypes = wizard.data.creativeTypes;

  const creativeTypes: Array<{
    id: TCreativeType;
    title: string;
    description: string;
    icon: React.ReactNode;
    comingSoon?: boolean;
  }> = [
    {
      id: "native_story",
      title: t("format.nativeStory"),
      description: t("format.nativeStoryDesc"),
      icon: <Image className="w-5 h-5" />,
    },
    {
      id: "competitor_based",
      title: t("format.competitorBased"),
      description: t("format.competitorBasedDesc"),
      icon: <Copy className="w-5 h-5" />,
    },
    {
      id: "video_podcast",
      title: t("format.videoPodcast"),
      description: t("format.videoPodcastDesc"),
      icon: <Mic className="w-5 h-5" />,
      comingSoon: true,
    },
    {
      id: "ai_ugc",
      title: t("format.aiUgc"),
      description: t("format.aiUgcDesc"),
      icon: <UserCircle className="w-5 h-5" />,
      comingSoon: true,
    },
    {
      id: "ugc_story",
      title: t("format.ugcStory"),
      description: t("format.ugcStoryDesc"),
      icon: <Video className="w-5 h-5" />,
      comingSoon: true,
    },
  ];

  const toggleType = (typeId: TCreativeType) => {
    const current = wizard.data.creativeTypes;
    const newTypes = current.includes(typeId)
      ? current.filter((t) => t !== typeId)
      : [...current, typeId];
    wizardActions.updateData({ creativeTypes: newTypes });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("format.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("format.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
        {creativeTypes.map((type) => (
          <div key={type.id} className="relative h-full">
            {type.comingSoon && (
              <Badge 
                variant="secondary" 
                className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 text-[10px] whitespace-nowrap px-2"
              >
                {t("format.comingSoon")}
              </Badge>
            )}
            <SelectionTile
              title={type.title}
              description={type.description}
              icon={type.icon}
              selected={selectedTypes.includes(type.id)}
              onClick={() => toggleType(type.id)}
              disabled={type.comingSoon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
