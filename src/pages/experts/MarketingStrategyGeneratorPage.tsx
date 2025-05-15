import React, { useState } from 'react';
import { SourceDrivenTextGeneratorPage } from '@/components/expert_templates/SourceDrivenTextGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const MarketingStrategyGeneratorPage: React.FC = () => {
  // Definiere die Quellenoptionen für die Marketingstrategie
  const strategySourceOptions = [
    { value: 'companyProfile', label: 'Unternehmensprofil' },
    { value: 'productService', label: 'Produkt/Dienstleistung' },
    { value: 'otherTopic', label: 'Anderes Thema' },
  ];

  // Zustandsverwaltung für die Eingabefelder
  const [otherTopicValue, setOtherTopicValue] = useState<string>('');
  const [strategyGoal, setStrategyGoal] = useState<string>('');
  const [currentReason, setCurrentReason] = useState<string>('');

  // Render-Logik für quellenspezifische Felder
  const renderFieldsForSource = (selectedSource: string | undefined) => {
    if (selectedSource === 'otherTopic') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="other-topic">Thema</Label>
            <Input
              id="other-topic"
              placeholder="Gib dein Thema ein"
              value={otherTopicValue}
              onChange={(e) => setOtherTopicValue(e.target.value)}
            />
          </div>
        </div>
      );
    }

    // Für andere Quellen (companyProfile, productService) werden keine zusätzlichen Felder benötigt
    // Diese würden in einer vollständigen Implementierung spezifische Felder für diese Quellen enthalten
    return null;
  };

  // Render-Logik für gemeinsame Felder
  const renderCommonFields = () => {
    return (
      <div className="space-y-4 mt-6">
        <div>
          <Label htmlFor="strategy-goal">Ziel der Strategie</Label>
          <Input
            id="strategy-goal"
            placeholder="Was möchtest du mit dieser Marketingstrategie erreichen?"
            value={strategyGoal}
            onChange={(e) => setStrategyGoal(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="current-reason">Aktueller Anlass</Label>
          <Textarea
            id="current-reason"
            placeholder="Warum benötigst du jetzt eine Marketingstrategie?"
            value={currentReason}
            onChange={(e) => setCurrentReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    );
  };

  // Handler für die Generierung der Strategie
  const handleGenerateStrategy = async ({
    selectedSource,
    knowledgeBaseText,
  }: {
    selectedSource?: string;
    sourceSpecificData?: Record<string, any>;
    commonData?: Record<string, any>;
    knowledgeBaseText?: string;
  }) => {
    // Erstelle sourceSpecificData basierend auf der ausgewählten Quelle
    const sourceSpecificData: Record<string, any> = {};
    if (selectedSource === 'otherTopic') {
      sourceSpecificData.topic = otherTopicValue;
    }
    // Für andere Quellen könnten hier weitere Daten hinzugefügt werden

    // Erstelle commonData mit den gemeinsamen Feldern
    const commonData = {
      goal: strategyGoal,
      reason: currentReason,
    };

    // Gib die kombinierten Daten aus (in einer echten Implementierung würde hier die API aufgerufen werden)
    console.log('Generiere Marketingstrategie mit folgenden Daten:', {
      selectedSource,
      sourceSpecificData,
      commonData,
      knowledgeBaseText,
    });

    // Simuliere eine asynchrone Operation (in einer echten Implementierung würde hier die API aufgerufen werden)
    return Promise.resolve();
  };

  return (
    <SourceDrivenTextGeneratorPage
      pageTitle="Marketing-Strategie Generator"
      pageDescription="Erstelle eine maßgeschneiderte Marketingstrategie basierend auf deinen Eingaben."
      sourceOptions={strategySourceOptions}
      sourceSelectionLabel="Wähle die Basis für deine Marketingstrategie:"
      fieldsForSourceSlot={renderFieldsForSource}
      commonFieldsSlot={renderCommonFields()}
      primaryActionLabel="Strategie generieren"
      onGenerate={handleGenerateStrategy}
      isLoading={false} // In einer echten Implementierung würde hier der Ladezustand verwaltet
      error={null} // In einer echten Implementierung würde hier der Fehlerzustand verwaltet
      savedContentType="marketing-strategy" // Typ für gespeicherte Inhalte
      expertIdentifier="marketing-strategy-generator" // Eindeutiger Bezeichner für dieses Tool
      savedContentLinkText="Meine Marketingstrategien" // Text für den Link zu gespeicherten Inhalten
      showKnowledgeBase={true} // Wissensdatenbank aktivieren
      knowledgeBaseTitle="Wissensdatenbank für Marketingstrategie" // Titel für die Wissensdatenbank
    />
  );
};

export default MarketingStrategyGeneratorPage;