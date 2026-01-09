export const EStorageKeys = {
  WizardState: "wizard_state",
  HasSeenWizard: "has_seen_wizard",
  Theme: "vite-ui-theme",
  I18nextLng: "i18nextLng",
} as const;

export type EStorageKeys = (typeof EStorageKeys)[keyof typeof EStorageKeys];

