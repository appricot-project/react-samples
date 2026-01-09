import { type IGeneratedCreative, EGenerationMode } from "@/domains/generate/api/generateTypes";

// Mock data for demo
export const mockGeneratedCreatives: IGeneratedCreative[] = [
  {
    id: "1",
    imageUrl: "/data/1.jpeg",
    prompt: "Minimalist product shot",
    mode: EGenerationMode.NativeStory,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    imageUrl: "/data/2.jpeg",
    prompt: "Headphones lifestyle",
    mode: EGenerationMode.NativeStory,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    imageUrl: "/data/3.jpeg",
    prompt: "Sunglasses on yellow",
    mode: EGenerationMode.NativeStory,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    imageUrl: "/data/4.jpeg",
    prompt: "Sneakers floating",
    mode: EGenerationMode.CompetitorBased,
    createdAt: new Date().toISOString(),
  },
];
