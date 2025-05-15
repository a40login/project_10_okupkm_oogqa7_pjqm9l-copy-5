import React, { useState } from 'react';
import { ExpertPageShell } from '@/components/layout/ExpertPageShell';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ExpertPageShellProps } from '@/types/expertPageShell.types';

// Definiert die Props spezifisch für SourceDrivenTextGeneratorPage
// und wählt die passenden Props von ExpertPageShellProps aus.
export interface SourceDrivenTextGeneratorPageProps {
  // Eigene Props für das Template
  pageTitle: string;
  pageDescription?: React.ReactNode;
  sourceOptions: Array<{ value: string; label: string; icon?: React.ReactNode }>;
  sourceSelectionLabel?: string;
  fieldsForSourceSlot: (selectedSource: string | undefined) => React.ReactNode;
  commonFieldsSlot?: React.ReactNode;
  primaryActionLabel: string;
  onGenerate: (data: {
    selectedSource?: string;
    sourceSpecificData?: Record<string, any>;
    commonData?: Record<string, any>;
    knowledgeBaseText?: string; // Text aus der Wissensdatenbank, falls aktiv
  }) => Promise<void>;

  // Props, die direkt an ExpertPageShell weitergegeben werden (müssen in ExpertPageShellProps existieren)
  isLoading: boolean; // Für den allgemeinen Ladezustand der Seite/Generierung
  error?: string | null; // Für Fehlermeldungen
  savedContentType: string; // Gemäß Anforderung & ExpertPageShellProps
  expertIdentifier: string; // Gemäß Anforderung & ExpertPageShellProps
  savedContentLinkText?: string; // Aus ExpertPageShellProps

  // KnowledgeBase-Props, die von ExpertPageShell unterstützt werden
  showKnowledgeBase?: boolean; // Wird zu showKnowledgeBaseToggle
  knowledgeBaseTitle?: string; // Wird zu knowledgeBaseLabel
  initialKnowledgeBaseText?: string; // Initialer Text für die Wissensdatenbank
  // onKnowledgeBaseTextChange wird intern vom Template gehandhabt, um den Text an onGenerate weiterzugeben
  // isKnowledgeBaseActive wird intern vom Template gehandhabt
  // onKnowledgeBaseToggle wird intern vom Template gehandhabt

  // Props für sekundäre Aktion, die von ExpertPageShell unterstützt wird
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;

  // Die folgenden Props werden NICHT von der Basis-ExpertPageShell unterstützt und müssen
  // von der konsumierenden Seite gehandhabt werden, falls benötigt:
  // isGenerating, generatedContent, onRegenerate, isRegenerating, onClearGeneratedContent,
  // onSave, showSavedContent, savedContentTitle, savedContentDisplay,
  // primaryActionIcon, tertiaryAction, pageActions, pageHeaderActions,
  // contentContainerClassName, formContainerClassName, sidebarContainerClassName,
  // showSidebar, sidebarContent, knowledgeBaseDescription (außerhalb von title/label),
  // onKnowledgeBaseUpload, onKnowledgeBaseDelete, isKnowledgeBaseLoading, knowledgeBaseError.
}

export const SourceDrivenTextGeneratorPage: React.FC<SourceDrivenTextGeneratorPageProps> = ({
  pageTitle,
  pageDescription,
  sourceOptions,
  sourceSelectionLabel = "Wähle eine Datenquelle:",
  fieldsForSourceSlot,
  commonFieldsSlot,
  primaryActionLabel,
  onGenerate,
  isLoading,
  error,
  savedContentType,
  expertIdentifier,
  savedContentLinkText,
  showKnowledgeBase = true,
  knowledgeBaseTitle,
  initialKnowledgeBaseText,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  const [selectedSource, setSelectedSource] = useState<string | undefined>(
    sourceOptions.length > 0 ? sourceOptions[0].value : undefined
  );
  const [currentKnowledgeBaseText, setCurrentKnowledgeBaseText] = useState<string | undefined>(initialKnowledgeBaseText);
  const [isKbActive, setIsKbActive] = useState<boolean>(false);

  const handleKbTextChange = (text: string) => {
    setCurrentKnowledgeBaseText(text);
  };

  const handleKbToggle = (isActive: boolean) => {
    setIsKbActive(isActive);
  };

  const handlePrimaryAction = async () => {
    await onGenerate({
      selectedSource,
      // sourceSpecificData und commonData müssen von der konsumierenden Seite
      // in der onGenerate Implementierung gesammelt werden.
      knowledgeBaseText: isKbActive ? currentKnowledgeBaseText : undefined,
    });
  };

  return (
    <ExpertPageShell
      title={pageTitle}
      description={pageDescription}
      primaryActionLabel={primaryActionLabel}
      onPrimaryAction={handlePrimaryAction}
      isLoading={isLoading}
      error={error}
      savedContentType={savedContentType}
      // expertIdentifier wird in der aktuellen ExpertPageShell nicht verwendet,
      // aber in den Props für Konsistenz mit der Anforderung belassen.
      // savedContentLinkText wird direkt weitergegeben.
      savedContentLinkText={savedContentLinkText}

      // KnowledgeBase Props für ExpertPageShell
      showKnowledgeBaseToggle={showKnowledgeBase}
      knowledgeBaseLabel={knowledgeBaseTitle}
      knowledgeBaseText={currentKnowledgeBaseText}
      onKnowledgeBaseTextChange={handleKbTextChange}
      isKnowledgeBaseActive={isKbActive}
      onKnowledgeBaseToggle={handleKbToggle}

      // Sekundäre Aktion
      secondaryActionLabel={secondaryActionLabel}
      onSecondaryAction={onSecondaryAction}
    >
      <div className="space-y-6">
        {sourceOptions && sourceOptions.length > 0 && (
          <div className="space-y-2">
            <Label>{sourceSelectionLabel}</Label>
            <RadioGroup
              value={selectedSource}
              onValueChange={setSelectedSource}
              className="flex flex-col space-y-1"
            >
              {sourceOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`sdg_source_${option.value}`} />
                  <Label htmlFor={`sdg_source_${option.value}`} className="font-normal cursor-pointer">
                    {option.icon && <span className="mr-2 inline-block align-middle">{option.icon}</span>}
                    <span className="inline-block align-middle">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Quellenspezifische Felder */}
        {fieldsForSourceSlot(selectedSource)}

        {/* Gemeinsame Felder */}
        {commonFieldsSlot}
      </div>
    </ExpertPageShell>
  );
};