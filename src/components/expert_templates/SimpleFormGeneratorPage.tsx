import React, { useState } from 'react';
import { ExpertPageShell } from '@/components/layout/ExpertPageShell';
import { ExpertPageShellProps } from '@/types/expertPageShell.types';
import { FormFieldConfig } from '@/types/expertTemplateTypes';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export interface SimpleFormGeneratorPageProps extends Omit<ExpertPageShellProps, 'onPrimaryAction' | 'primaryActionLabel' | 'title' | 'description' | 'isLoading' | 'children'> {
  title: string;
  description?: React.ReactNode;
  formFields: FormFieldConfig[];
  knowledgeBaseLabel?: string; // Wird an ExpertPageShell weitergegeben, falls benötigt
  primaryActionLabel: string;
  onGenerate: (data: Record<string, any> & { knowledgeBase?: string }) => Promise<void>;
  savedContentType: string; // Wird an ExpertPageShell weitergegeben
  expertIdentifier: string; // Wird an ExpertPageShell weitergegeben

  // Props für die Wissensdatenbank, die direkt an ExpertPageShell gehen
  knowledgeBaseText?: string;
  onKnowledgeBaseTextChange?: (text: string) => void;
  isKnowledgeBaseActive?: boolean;
  onKnowledgeBaseToggle?: () => void;
  showKnowledgeBaseToggle?: boolean;
  // isLoading wird von dieser Komponente verwaltet und an ExpertPageShell weitergegeben
}

export const SimpleFormGeneratorPage: React.FC<SimpleFormGeneratorPageProps> = ({
  title,
  description,
  formFields,
  knowledgeBaseLabel,
  primaryActionLabel,
  onGenerate,
  savedContentType,
  expertIdentifier,
  knowledgeBaseText,
  onKnowledgeBaseTextChange,
  isKnowledgeBaseActive,
  onKnowledgeBaseToggle,
  showKnowledgeBaseToggle,
  ...expertPageShellRestProps // Alle anderen Props für ExpertPageShell
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePrimaryAction = async () => {
    setIsGenerating(true);
    const dataToGenerate: Record<string, any> & { knowledgeBase?: string } = { ...formData };
    if (showKnowledgeBaseToggle && isKnowledgeBaseActive && knowledgeBaseText) {
      dataToGenerate.knowledgeBase = knowledgeBaseText;
    }
    try {
      await onGenerate(dataToGenerate);
    } catch (error) {
      console.error("Error during generation:", error);
      // Hier könnte eine Fehlerbehandlung für den Benutzer erfolgen (z.B. Toast-Nachricht)
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ExpertPageShell
      title={title}
      description={description}
      primaryActionLabel={primaryActionLabel}
      onPrimaryAction={handlePrimaryAction}
      isLoading={isGenerating}
      savedContentType={savedContentType}
      expertIdentifier={expertIdentifier}
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={onKnowledgeBaseTextChange}
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={onKnowledgeBaseToggle}
      showKnowledgeBaseToggle={showKnowledgeBaseToggle}
      knowledgeBaseLabel={knowledgeBaseLabel}
      {...expertPageShellRestProps}
    >
      <div className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            {field.type === 'text' && (
              <Input
                id={field.id}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
            {field.type === 'textarea' && (
              <Textarea
                id={field.id}
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
            {field.type === 'select' && field.options && (
              <Select
                value={formData[field.id] || ''}
                onValueChange={(value) => handleInputChange(field.id, value)}
                required={field.required}
              >
                <SelectTrigger id={field.id}>
                  <SelectValue placeholder={field.placeholder || 'Bitte auswählen'} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </div>
    </ExpertPageShell>
  );
};