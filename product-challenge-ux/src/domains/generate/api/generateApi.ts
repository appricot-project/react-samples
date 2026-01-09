import { apiClient } from "@/shared/api/client";
import { mockGeneratedCreatives } from "@/shared/mocks/generate";
import {
  type IGeneratedCreative,
  type IGenerationRequest,
  type IGenerationResponse,
} from "./generateTypes";

// Re-export types for convenience
export * from "./generateTypes";

// Helper function to simulate API delay
const mockGenerate = async (request: IGenerationRequest): Promise<IGenerationResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!mockGeneratedCreatives || mockGeneratedCreatives.length === 0) {
    throw new Error("Mock creatives not found");
  }

  // Generate full prompt for display
  const context =
    request.brandName || request.productDescription
      ? `${request.brandName ? `[${request.brandName}] ` : ""}${request.productDescription || ""}\n`
      : "";
  const fullPrompt = `${context}${request.prompt}`;

  const creatives: IGeneratedCreative[] = Array.from({ length: request.count }).map((_, i) => ({
    id: `${Date.now()}-${i}`,
    imageUrl: mockGeneratedCreatives[i % mockGeneratedCreatives.length].imageUrl,
    prompt: fullPrompt,
    mode: request.mode,
    createdAt: new Date().toISOString(),
  }));

  return {
    creatives,
    creditsUsed: request.count,
  };
};

export const generateApi = {
  // Use mock implementation instead of real API call
  generate: (request: IGenerationRequest) => mockGenerate(request),

  // Real API call would be:
  // generate: (request: IGenerationRequest) =>
  //   apiClient.post<IGenerationResponse>("/generate", request),

  getHistory: () => apiClient.get<IGeneratedCreative[]>("/generate/history"),
};
