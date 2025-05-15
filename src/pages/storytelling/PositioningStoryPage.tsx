import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ConfigSection } from '@/types/expertTemplateTypes';
import { Label } from '@/components/ui/label'; // Hinzugefügt für die Verwendung mit Eingabefeldern

const PositioningStoryPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Section 1: Grundlage der Positionierung
  const [definiertePositionierung, setDefiniertePositionierung] = useState('');
  const [primaeresAlleinstellungsmerkmal, setPrimaeresAlleinstellungsmerkmal] = useState('');
  const [hauptzielgruppeProblem, setHauptzielgruppeProblem] = useState('');
  const [hauptwettbewerber, setHauptwettbewerber] = useState('');
  const [fundamentaleUnterscheidung, setFundamentaleUnterscheidung] = useState('');

  // Section 2: Elemente der Geschichte
  const [ahaMomente, setAhaMomente] = useState('');
  const [einzigartigerWertNutzen, setEinzigartigerWertNutzen] = useState('');
  const [kernbotschaftGeschichte, setKernbotschaftGeschichte] = useState('');

  const configSections: ConfigSection[] = [
    {
      id: 'grundlagePositionierung',
      title: 'Grundlage der Positionierung',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="definiertePositionierung">Ihre definierte Positionierung</Label>
            <Textarea
              id="definiertePositionierung"
              value={definiertePositionierung}
              onChange={(e) => setDefiniertePositionierung(e.target.value)}
              placeholder="Beschreiben Sie Ihre aktuelle Positionierung..."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="primaeresAlleinstellungsmerkmal">Ihr primäres Alleinstellungsmerkmal (USP)</Label>
            <Textarea
              id="primaeresAlleinstellungsmerkmal"
              value={primaeresAlleinstellungsmerkmal}
              onChange={(e) => setPrimaeresAlleinstellungsmerkmal(e.target.value)}
              placeholder="Was macht Sie einzigartig?"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="hauptzielgruppeProblem">Hauptzielgruppe & deren Problem/Bedürfnis</Label>
            <Textarea
              id="hauptzielgruppeProblem"
              value={hauptzielgruppeProblem}
              onChange={(e) => setHauptzielgruppeProblem(e.target.value)}
              placeholder="Wer ist Ihre Zielgruppe und was sind ihre dringendsten Probleme oder Bedürfnisse?"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="hauptwettbewerber">Hauptwettbewerber</Label>
            <Textarea
              id="hauptwettbewerber"
              value={hauptwettbewerber}
              onChange={(e) => setHauptwettbewerber(e.target.value)}
              placeholder="Nennen Sie Ihre wichtigsten Wettbewerber."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="fundamentaleUnterscheidung">Fundamentale Unterscheidung von Wettbewerbern</Label>
            <Textarea
              id="fundamentaleUnterscheidung"
              value={fundamentaleUnterscheidung}
              onChange={(e) => setFundamentaleUnterscheidung(e.target.value)}
              placeholder="Wie unterscheiden Sie sich grundlegend von Ihren Wettbewerbern?"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'elementeGeschichte',
      title: 'Elemente der Geschichte',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="ahaMomente">"'Aha!'-Momente/Erkenntnisse zur Positionierung"</Label>
            <Textarea
              id="ahaMomente"
              value={ahaMomente}
              onChange={(e) => setAhaMomente(e.target.value)}
              placeholder="Gab es Schlüsselmomente oder Erkenntnisse, die zu Ihrer Positionierung geführt haben?"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="einzigartigerWertNutzen">Einzigartiger Wert/Nutzen</Label>
            <Textarea
              id="einzigartigerWertNutzen"
              value={einzigartigerWertNutzen}
              onChange={(e) => setEinzigartigerWertNutzen(e.target.value)}
              placeholder="Welchen einzigartigen Wert oder Nutzen bieten Sie, der aus Ihrer Positionierung resultiert?"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="kernbotschaftGeschichte">Gewünschte Kernbotschaft der Geschichte</Label>
            <Input
              id="kernbotschaftGeschichte"
              value={kernbotschaftGeschichte}
              onChange={(e) => setKernbotschaftGeschichte(e.target.value)}
              placeholder="Was ist die zentrale Botschaft, die Ihre Geschichte vermitteln soll?"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    const formData = {
      definiertePositionierung,
      primaeresAlleinstellungsmerkmal,
      hauptzielgruppeProblem,
      hauptwettbewerber,
      fundamentaleUnterscheidung,
      ahaMomente,
      einzigartigerWertNutzen,
      kernbotschaftGeschichte,
    };

    console.log('Formulardaten für Positionierungsgeschichte:', formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    toast({
      title: 'Positionierungsgeschichte generiert (Simulation)',
      description: 'Die Daten wurden in der Konsole ausgegeben.',
    });
  };

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Positionierungsgeschichte formulieren"
      pageDescription="Entwickeln Sie eine überzeugende Geschichte, die Ihr Alleinstellungsmerkmal kommuniziert."
      primaryActionLabel="Positionierungsgeschichte generieren"
      configSections={configSections}
      onGenerate={handleGenerate}
      savedContentType="positioning-story"
      expertIdentifier="positioning-story-generator"
      isLoading={isLoading}
      // showKnowledgeBaseToggle={true} // Standardwert ist true, kann bei Bedarf explizit gesetzt werden
      // knowledgeBaseLabel="Wissensdatenbank für Positionierung nutzen" // Optional, wenn Standard nicht passt
    />
  );
};

export default PositioningStoryPage;
