import { atom, map } from "nanostores";
import { EStorageKeys } from "@/shared/constants/storage";

/**
 * User goal types
 */
export type TUserGoal = "testing" | "scale_winning" | "new_persona" | "expand_audience";

/**
 * Creative types
 */
export type TCreativeType =
  | "native_story"
  | "competitor_based"
  | "video_podcast"
  | "ai_ugc"
  | "ugc_story";

/**
 * User business stage
 */
export type TBusinessStage = "just_started" | "testing_phase" | "found_winners" | "scaling";

/**
 * Wizard data
 */
export interface IWizardData {
  goal: TUserGoal | null;
  businessStage: TBusinessStage | null;
  creativeTypes: TCreativeType[];
  hasDefinedPersona: boolean | null;
  personaDescription: string;
  brandName: string;
  productDescription: string;
  brandTone: string;
}

export interface IWizardState {
  isCompleted: boolean;
  currentStep: number;
  totalSteps: number;
  data: IWizardData;
  isOpen: boolean;
}

const defaultData: IWizardData = {
  goal: null,
  businessStage: null,
  creativeTypes: [],
  hasDefinedPersona: null,
  personaDescription: "",
  brandName: "",
  productDescription: "",
  brandTone: "",
};

const defaultState: IWizardState = {
  isCompleted: false,
  currentStep: 0,
  totalSteps: 5,
  data: defaultData,
  isOpen: false,
};

/**
 * Load state from localStorage
 */
function loadState(): IWizardState {
  if (typeof window === "undefined") return defaultState;

  try {
    const saved = localStorage.getItem(EStorageKeys.WizardState);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed, isOpen: false };
    }
  } catch (e) {
    console.error("Failed to load wizard state:", e);
  }
  return defaultState;
}

/**
 * Save state to localStorage
 */
function saveState(state: IWizardState): void {
  if (typeof window === "undefined") return;

  try {
    const { isOpen, ...toSave } = state;
    localStorage.setItem(EStorageKeys.WizardState, JSON.stringify(toSave));
  } catch (e) {
    console.error("Failed to save wizard state:", e);
  }
}

/**
 * Main wizard store
 */
export const $wizard = map<IWizardState>(loadState());

// Subscribe to changes for auto-saving
$wizard.subscribe((state) => {
  saveState(state);
});

/**
 * Check if wizard has been seen
 */
export const $hasSeenWizard = atom<boolean>(
  typeof window !== "undefined"
    ? localStorage.getItem(EStorageKeys.HasSeenWizard) === "true"
    : false
);

/**
 * Actions
 */
export const wizardActions = {
  /** Open wizard */
  open: () => {
    $wizard.setKey("isOpen", true);
  },

  /** Close wizard */
  close: () => {
    $wizard.setKey("isOpen", false);
  },

  /** Next step */
  nextStep: () => {
    const current = $wizard.get();
    if (current.currentStep < current.totalSteps - 1) {
      $wizard.setKey("currentStep", current.currentStep + 1);
    }
  },

  /** Previous step */
  prevStep: () => {
    const current = $wizard.get();
    if (current.currentStep > 0) {
      $wizard.setKey("currentStep", current.currentStep - 1);
    }
  },

  /** Go to specific step */
  goToStep: (step: number) => {
    const current = $wizard.get();
    if (step >= 0 && step < current.totalSteps) {
      $wizard.setKey("currentStep", step);
    }
  },

  /** Update wizard data */
  updateData: (updates: Partial<IWizardData>) => {
    const current = $wizard.get();
    $wizard.setKey("data", { ...current.data, ...updates });
  },

  /** Complete wizard */
  complete: () => {
    $wizard.setKey("isCompleted", true);
    $wizard.setKey("isOpen", false);
    localStorage.setItem(EStorageKeys.HasSeenWizard, "true");
    $hasSeenWizard.set(true);
  },

  /** Skip wizard */
  skip: () => {
    $wizard.setKey("isOpen", false);
    localStorage.setItem(EStorageKeys.HasSeenWizard, "true");
    $hasSeenWizard.set(true);
  },

  /** Reset wizard */
  reset: () => {
    $wizard.set({ ...defaultState, isOpen: false });
    localStorage.removeItem(EStorageKeys.HasSeenWizard);
    $hasSeenWizard.set(false);
  },
};
