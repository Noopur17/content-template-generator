export type ProductInput = {
  product_name: string;
  brand: string;
  category: string;
  sport?: string;
  audience?: string;
  color?: string;
  material?: string;
  features: string[];
  market: string;
  language: string;
  tone: string;
  template_id: string;
  output_types: string[];
};

export type RetailContentOutput = {
  title: string;
  short_description: string;
  long_description: string;
  bullets: string[];
  seo_title?: string;
  seo_description?: string;
};

export type RetailGenerationResponse = {
  success: boolean;
  data: RetailContentOutput;
};