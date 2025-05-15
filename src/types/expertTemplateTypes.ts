export interface FormFieldConfig {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
}
export interface ConfigSection {
  id: string;
  title: string;
  contentSlot: React.ReactNode;
}
export interface EnhancementOption {
  id: string;
  label: string;
  prompt: string; // Oder eine komplexere Struktur, falls benötigt
}