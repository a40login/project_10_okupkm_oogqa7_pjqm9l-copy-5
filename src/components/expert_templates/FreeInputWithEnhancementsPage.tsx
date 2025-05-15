import React, { useState } from 'react';
import { ExpertPageShell } from '@/components/layout/ExpertPageShell';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import AudioInputButton from '@/components/AudioInputButton';
import type { ExpertPageShellProps } from '@/types/expertPageShell.types';

export interface FreeInputWithEnhancementsPageProps extends Omit<ExpertPageShellProps, 'onPrimaryAction' | 'children' | 'title' | 'description'> {
  title: string;
  description?: React.ReactNode;
  controlFieldsSlot?: React.ReactNode;
  mainTextareaLabel: string;
  mainTextareaPlaceholder?: string;
  enableAudioInput?: boolean;
  onIdeate?: (currentText: string) => Promise<string>;
  ideateButtonLabel?: string;
  primaryActionLabel: string;
  onGenerate: (data: { mainInput: string; knowledgeBaseText?: string }) => Promise<void>;
  savedContentType: string;
  expertIdentifier: string;
}

export const FreeInputWithEnhancementsPage: React.FC<FreeInputWithEnhancementsPageProps> = ({
  title,
  description,
  controlFieldsSlot,
  mainTextareaLabel,
  mainTextareaPlaceholder,
  enableAudioInput = false,
  onIdeate,
  ideateButtonLabel = "Text verbessern",
  primaryActionLabel,
  onGenerate,
  savedContentType,
  expertIdentifier,
  isLoading,
  error,
  showKnowledgeBaseToggle,
  knowledgeBaseLabel,
  knowledgeBaseText,
  onKnowledgeBaseTextChange,
  isKnowledgeBaseActive,
  onKnowledgeBaseToggle,
}) => {
  const [mainInput, setMainInput] = useState('');

  const handlePrimaryAction = async () => {
    await onGenerate({
      mainInput,
      knowledgeBaseText: isKnowledgeBaseActive ? knowledgeBaseText : undefined,
    });
  };

  const handleIdeateClick = async () => {
    if (onIdeate) {
      const improvedText = await onIdeate(mainInput);
      setMainInput(improvedText);
    }
  };

  return (
    <ExpertPageShell
      title={title}
      description={description}
      onPrimaryAction={handlePrimaryAction}
      primaryActionLabel={primaryActionLabel}
      isLoading={isLoading}
      error={error}
      showKnowledgeBaseToggle={showKnowledgeBaseToggle}
      knowledgeBaseLabel={knowledgeBaseLabel}
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={onKnowledgeBaseTextChange}
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={onKnowledgeBaseToggle}
      savedContentType={savedContentType}
      expertIdentifier={expertIdentifier}
    >
      {controlFieldsSlot && <div className="mb-4">{controlFieldsSlot}</div>}

      <div className="mb-4">
        <Label htmlFor="main-input">{mainTextareaLabel}</Label>
        <Textarea
          id="main-input"
          value={mainInput}
          onChange={(e) => setMainInput(e.target.value)}
          placeholder={mainTextareaPlaceholder}
          rows={10}
          className="mt-1"
        />
      </div>

      <div className="flex items-center space-x-2 mb-4">
        {enableAudioInput && (
          <AudioInputButton
            onTextReceived={(transcript) =>
              setMainInput((prev) => prev + transcript)
            }
          />
        )}
        {onIdeate && (
          <Button variant="outline" onClick={handleIdeateClick} disabled={isLoading}>
            {ideateButtonLabel}
          </Button>
        )}
      </div>
    </ExpertPageShell>
  );
};