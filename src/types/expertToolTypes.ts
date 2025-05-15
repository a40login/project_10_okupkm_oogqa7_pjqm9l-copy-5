export type GenerationData = Record<string, any>;

export interface SavedContentPayload {
  title: string;
  content: any;
  content_type: string;
  source_expert: string;
  generation_params: GenerationData;
}