import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { WizardButton } from "./wizard-button";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export function Header({ title, subtitle }: HeaderProps) {
  const { t, i18n } = useTranslation("generate");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50;

      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const currentLanguage = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
        "bg-background/40 dark:bg-background/30 backdrop-blur-2xl backdrop-saturate-150",
        "border-b border-white/10 dark:border-white/5",
        "shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]",
        !isVisible && "-translate-y-full"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <div>
          <h1 className="text-xl font-semibold">{title || t("title")}</h1>
          {subtitle !== undefined ? (
            subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : (
            <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLanguage.flag}</span>
                <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn("gap-2 cursor-pointer", i18n.language === lang.code && "bg-accent")}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <WizardButton />
        </div>
      </div>
    </header>
  );
}
