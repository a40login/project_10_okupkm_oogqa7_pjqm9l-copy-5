import React from 'react';
import { ExpertPageShell } from '@/components/layout/ExpertPageShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ConfigSection } from '@/types/expertTemplateTypes';
import type { ExpertPageShellProps } from '@/types/expertPageShell.types';

export interface MultiStepConfigGeneratorPageProps extends Omit<ExpertPageShellProps, 'onPrimaryAction' | 'children' | 'title' | 'description'> {
  pageTitle: string; // Wird zu 'title' für ExpertPageShell
  pageDescription?: React.ReactNode; // Wird zu 'description' für ExpertPageShell
  configSections: ConfigSection[];
  optionalSourceSelectorSlot?: React.ReactNode;
  primaryActionLabel: string; // Bleibt für ExpertPageShell
  onGenerate: (data: {
    sectionData: Record<string, Record<string, any>>;
    knowledgeBaseText?: string;
    sourceSelectorData?: Record<string, any>;
  }) => Promise<void>; // Wird zu 'onPrimaryAction' für ExpertPageShell (nach Transformation)
  // Props, die direkt an ExpertPageShell weitergegeben werden:
  // isLoading, error, savedContentType, expertIdentifier
  // showKnowledgeBaseToggle, knowledgeBaseLabel, knowledgeBaseText, onKnowledgeBaseTextChange,
  // isKnowledgeBaseActive, onKnowledgeBaseToggle
  // secondaryActionLabel, onSecondaryAction, savedContentLinkText
}

export const MultiStepConfigGeneratorPage: React.FC<MultiStepConfigGeneratorPageProps> = ({
  pageTitle,
  pageDescription,
  configSections,
  optionalSourceSelectorSlot,
  primaryActionLabel,
  onGenerate,
  // Destrukturieren der Props, die direkt an ExpertPageShell gehen
  isLoading,
  error,
  savedContentType,
  expertIdentifier,
  showKnowledgeBaseToggle,
  knowledgeBaseLabel,
  knowledgeBaseText,
  onKnowledgeBaseTextChange,
  isKnowledgeBaseActive,
  onKnowledgeBaseToggle,
  secondaryActionLabel,
  onSecondaryAction,
  savedContentLinkText,
  ...rest // Alle anderen Props, die nicht explizit behandelt werden
}) => {
  const handlePrimaryAction = async (knowledgeBaseText?: string) => {
    // Die Logik zum Sammeln der sectionData und sourceSelectorData
    // wird von der konsumierenden Seite in onGenerate gehandhabt.
    // Hier rufen wir onGenerate direkt auf und übergeben knowledgeBaseText.
    // Die konsumierende Seite muss dann sectionData und sourceSelectorData hinzufügen.
    // Dies ist ein Kompromiss, da das Template die States der Sektionen nicht kennt.
    // Eine alternative Implementierung könnte Refs oder ein Formular-Context sein.
    await onGenerate({
      sectionData: {}, // Wird von der konsumierenden Seite befüllt
      knowledgeBaseText,
      sourceSelectorData: {}, // Wird von der konsumierenden Seite befüllt, falls optionalSourceSelectorSlot genutzt wird
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
      expertIdentifier={expertIdentifier}
      showKnowledgeBaseToggle={showKnowledgeBaseToggle}
      knowledgeBaseLabel={knowledgeBaseLabel}
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={onKnowledgeBaseTextChange}
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={onKnowledgeBaseToggle}
      secondaryActionLabel={secondaryActionLabel}
      onSecondaryAction={onSecondaryAction}
      savedContentLinkText={savedContentLinkText}
      {...rest} // Übergabe der restlichen Props
    >
      {optionalSourceSelectorSlot}
      <div className="space-y-6">
        {configSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>{section.contentSlot}</CardContent>
          </Card>
        ))}
      </div>
    </ExpertPageShell>
  );
};