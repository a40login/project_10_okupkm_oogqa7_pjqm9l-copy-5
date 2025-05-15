import React, { useState } from 'react';
import { FreeInputWithEnhancementsPage } from '../../components/expert_templates/FreeInputWithEnhancementsPage';
import { useToast } from '../../hooks/use-toast';
import { EnhancementOption } from '../../types/expertTemplateTypes';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const TrendRecherchePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | undefined>(undefined);
  const [selectedEnhancementId, setSelectedEnhancementId] = useState<string | null>('emergingTrends'); // Default
  const { toast } = useToast();

  const enhancementOptions: EnhancementOption[] = [
    {
      id: 'emergingTrends',
      label: 'Aufkommende Trends identifizieren',
      prompt:
        'Identifiziere und beschreibe die wichtigsten aufkommenden Trends basierend auf der angegebenen Branche/den Keywords. Berücksichtige technologische, soziale und wirtschaftliche Aspekte.',
    },
    {
      id: 'impactAnalysis',
      label: 'Potenzielle Auswirkungen analysieren',
      prompt:
        'Analysiere die potenziellen Auswirkungen der identifizierten Trends auf die angegebene Branche oder das Themengebiet. Welche Chancen und Herausforderungen ergeben sich?',
    },
    {
      id: 'actionableInsights',
      label: 'Handlungsempfehlungen ableiten',
      prompt:
        'Leite basierend auf den recherchierten Trends konkrete Handlungsempfehlungen für Unternehmen in der genannten Branche ab.',
    },
  ];

  const handleEnhancementChange = (id: string) => {
    setSelectedEnhancementId(id);
  };

  const handleGenerateTrends = async ({
    mainInput,
    knowledgeBaseText,
  }: {
    mainInput: string;
    knowledgeBaseText?: string;
  }): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(undefined); 

    const currentSelectedEnhancement = enhancementOptions.find(opt => opt.id === selectedEnhancementId);

    console.log('Trend Recherche gestartet mit folgenden Daten:');
    console.log('Input Text:', mainInput);
    if (currentSelectedEnhancement) {
      console.log('Gewählte Erweiterung (Prompt):', currentSelectedEnhancement.prompt);
    }
    if (knowledgeBaseText) {
      console.log('Wissensdatenbank Text:', knowledgeBaseText);
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      
      let newContent = `Basierend auf Ihrer Eingabe "${mainInput}"`;
      if (currentSelectedEnhancement) {
        newContent += ` und der Erweiterung "${currentSelectedEnhancement.label}"`;
      }
      newContent += ` wurden folgende Trends identifiziert:\n\n`;

      if (currentSelectedEnhancement?.id === 'emergingTrends') {
        newContent += "- Trend Alpha (Technologie)\n- Trend Beta (Sozial)\n- Trend Gamma (Wirtschaft)\n";
      } else if (currentSelectedEnhancement?.id === 'impactAnalysis') {
        newContent += "Die Auswirkungen sind:\n- Auswirkung Delta auf Marktanteile\n- Auswirkung Epsilon auf Kundenverhalten\n";
      } else if (currentSelectedEnhancement?.id === 'actionableInsights') {
        newContent += "Handlungsempfehlungen:\n1. Empfehlung Zeta\n2. Empfehlung Eta\n";
      } else {
         newContent += "- Allgemeiner Trend Sigma\n- Allgemeiner Trend Tau\n";
      }

      if (knowledgeBaseText) {
        newContent += `\n\nUnter Berücksichtigung Ihrer Wissensdatenbank: "${knowledgeBaseText.substring(0,50)}..." wurden spezifische Anpassungen vorgenommen.`;
      }
      
      setGeneratedContent(newContent);
      toast({
        title: 'Trend-Recherche erfolgreich!',
        description: 'Die Ergebnisse wurden generiert.',
      });
    } catch (err) {
      console.error('Fehler bei der Trend-Recherche:', err);
      const errorMessage = err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.';
      setError(errorMessage); 
      toast({
        title: 'Fehler bei der Trend-Recherche',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const controlFieldsSlotContent = (
    <div className="mb-6">
      <Label className="text-lg font-semibold mb-2 block">Recherche-Fokus wählen:</Label>
      <RadioGroup
        value={selectedEnhancementId || ''}
        onValueChange={handleEnhancementChange}
        className="space-y-2"
      >
        {enhancementOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <>
      <FreeInputWithEnhancementsPage
        title="Trend-Recherche durchführen"
        description="Entdecke aktuelle Markttrends und Entwicklungen in deiner Branche für strategische Entscheidungen. Gib deine Branche oder spezifische Keywords ein."
        mainTextareaLabel="Branche / Keywords für Trend-Recherche"
        mainTextareaPlaceholder="z.B. Künstliche Intelligenz im Marketing, Nachhaltigkeit in der Modeindustrie, Zukunft der E-Mobilität..."
        primaryActionLabel="Trends recherchieren"
        onGenerate={handleGenerateTrends}
        isLoading={isLoading}
        error={error}
        savedContentType="trend-research"
        expertIdentifier="trend-research-generator"
        showKnowledgeBaseToggle={true} 
        controlFieldsSlot={controlFieldsSlotContent}
      />
      {generatedContent && !isLoading && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recherche-Ergebnisse</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-sans text-sm">{generatedContent}</pre>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TrendRecherchePage;
