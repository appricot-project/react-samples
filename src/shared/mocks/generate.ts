import { type IGeneratedCreative, EGenerationMode } from "@/domains/generate/api/generateTypes";

// Mock data for demo
export const mockGeneratedCreatives: IGeneratedCreative[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    prompt: "Minimalist product shot",
    mode: EGenerationMode.NativeStory,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    prompt: "Headphones lifestyle",
    mode: EGenerationMode.NativeStory,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    prompt: "Sunglasses on yellow",
    mode: EGenerationMode.NativeStory,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
    prompt: "Sneakers floating",
    mode: EGenerationMode.CompetitorBased,
    createdAt: new Date().toISOString(),
  },
];
