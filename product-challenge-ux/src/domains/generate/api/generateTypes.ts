export const EGenerationMode = {
  NativeStory: "native_story",
  CompetitorBased: "competitor_based",
} as const;

export type EGenerationMode = (typeof EGenerationMode)[keyof typeof EGenerationMode];

export const EAspectRatio = {
  Square: "1:1",
  Portrait: "4:5",
  Story: "9:16",
  Landscape: "16:9",
  Banner: "21:9",
} as const;

export type EAspectRatio = (typeof EAspectRatio)[keyof typeof EAspectRatio];

export interface IGenerationRequest {
  mode: EGenerationMode;
  prompt: string;
  referenceImage?: string; // base64 для competitor_based
  count: number;
  aspectRatio: EAspectRatio;
  // Wizard context
  brandName?: string;
  productDescription?: string;
}

export interface IGeneratedCreative {
  id: string;
  imageUrl: string;
  prompt: string;
  mode: EGenerationMode;
  createdAt: string;
}

export interface IGenerationResponse {
  creatives: IGeneratedCreative[];
  creditsUsed: number;
}

