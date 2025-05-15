import React, { useState } from 'react';
import { FreeInputWithEnhancementsPage } from '@/components/expert_templates/FreeInputWithEnhancementsPage';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EnhancementOption {
  id: string;
  label: string;
  prompt: string;
}

const WettbewerbsanalysePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [selectedEnhancementId, setSelectedEnhancementId] = useState<string | undefined>(undefined);

  const enhancementOptions: EnhancementOption[] = [
    {
      id: 'swot',
      label: 'SWOT-Analyse erstellen',
      prompt: 'Erstelle eine detaillierte SWOT-Analyse (Stärken, Schwächen, Chancen, Risiken) basierend auf den bereitgestellten Wettbewerberinformationen.',
    },
    {
      id: 'differentiation',
      label: 'Differenzierungspotenziale aufzeigen',
      prompt: 'Identifiziere basierend auf den Informationen konkrete Differenzierungspotenziale und Alleinstellungsmerkmale für meine Marke im Vergleich zu den genannten Wettbewerbern.',
    },
    {
      id: 'contentStrategy',
      label: 'Content-Strategie der Wettbewerber analysieren',
      prompt: 'Analysiere die Content-Strategie der Wettbewerber (falls URLs angegeben wurden) hinsichtlich Themen, Formaten und Kanälen.',
    },
  ];

  const handleGenerateAnalysis = async ({
    mainInput,
    knowledgeBaseText,
  }: {
    mainInput: string;
    knowledgeBaseText?: string;
  }): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const selectedEnhancement = enhancementOptions.find(opt => opt.id === selectedEnhancementId);

    console.log('Main Input:', mainInput);
    if (selectedEnhancement) {
      console.log('Selected Enhancement Prompt:', selectedEnhancement.prompt);
    }
    if (knowledgeBaseText) {
      console.log('Knowledge Base Text:', knowledgeBaseText);
    }

    // Simulierte API-Anfrage
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Analyse erfolgreich generiert',
        description: `Die Wettbewerbsanalyse mit Option "${selectedEnhancement?.label || 'Standard'}" wurde erstellt.`,
      });
      // Das Template ist für das Setzen des generierten Inhalts zuständig.
      return Promise.resolve();
    } catch (err) {
      console.error('Fehler bei der Analysegenerierung:', err);
      const errorMessage = err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.';
      setError(errorMessage);
      toast({
        title: 'Fehler bei der Analyse',
        description: errorMessage,
        variant: 'destructive',
      });
      return Promise.reject(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const controlFieldsSlotContent = (
    <div className="mb-6">
      <Label className="text-lg font-semibold mb-3 block">Analyse-Optionen</Label>
      <RadioGroup
        value={selectedEnhancementId}
        onValueChange={setSelectedEnhancementId}
        className="space-y-2"
      >
        {enhancementOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="font-normal cursor-pointer flex-1">
              {option.label}
              <p className="text-sm text-muted-foreground mt-1">{option.prompt}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );


  return (
    <FreeInputWithEnhancementsPage
      title="Wettbewerbsanalyse durchführen"
      description="Analysiere deine Konkurrenz und identifiziere Chancen zur Differenzierung deiner Marke. Gib URLs von Wettbewerbern oder beschreibende Texte ein."
      mainTextareaLabel="Wettbewerber-Informationen"
      mainTextareaPlaceholder="Gib hier URLs von Wettbewerbern (eine pro Zeile) oder eine Beschreibung der Wettbewerbssituation ein..."
      primaryActionLabel="Analyse starten"
      onGenerate={handleGenerateAnalysis}
      isLoading={isLoading}
      error={error}
      savedContentType="competitor-analysis"
      expertIdentifier="competitor-analysis-generator"
      controlFieldsSlot={controlFieldsSlotContent}
      showKnowledgeBaseToggle={true} // Wissensdatenbank-Funktionalität explizit aktivieren
    />
  );
};

export default WettbewerbsanalysePage;
