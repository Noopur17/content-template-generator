import { ProductInput, RetailGenerationResponse } from "../types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001";

export async function generateRetailContent(
  payload: ProductInput
): Promise<RetailGenerationResponse> {
  const response = await fetch(`${API_BASE_URL}/api/products/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to generate retail content");
  }

  return response.json();
}