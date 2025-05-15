import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ConfigSection } from '@/types/expertTemplateTypes';

const PositionierungsstrategiePage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States for Knowledge Base
  const [isKnowledgeBaseActive, setIsKnowledgeBaseActive] = useState(false);
  const [knowledgeBaseText, setKnowledgeBaseText] = useState('');

  // States for Section 1: Grundlagen & Zielgruppe
  const [branche, setBranche] = useState('');
  const [hauptzielgruppe, setHauptzielgruppe] = useState('');
  const [aktuelleHerausforderungen, setAktuelleHerausforderungen] = useState('');

  // States for Section 2: Alleinstellungsmerkmale & Werte
  const [uspMerkmale, setUspMerkmale] = useState('');
  const [kernwerteMarke, setKernwerteMarke] = useState('');
  const [abgrenzungWettbewerb, setAbgrenzungWettbewerb] = useState('');

  // States for Section 3: Kernbotschaften & Tonalität
  const [hauptbotschaft, setHauptbotschaft] = useState('');
  const [unterstuetzendeBotschaften, setUnterstuetzendeBotschaften] = useState('');
  const [markentonalitaet, setMarkentonalitaet] = useState('');

  const configSections: ConfigSection[] = [
    {
      id: 'basics',
      title: '1. Grundlagen und Zielgruppe definieren',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="branche">Branche</Label>
            <Input
              id="branche"
              value={branche}
              onChange={(e) => setBranche(e.target.value)}
              placeholder="z.B. Softwareentwicklung, Einzelhandel, Beratung"
            />
          </div>
          <div>
            <Label htmlFor="hauptzielgruppe">Hauptzielgruppe</Label>
            <Textarea
              id="hauptzielgruppe"
              value={hauptzielgruppe}
              onChange={(e) => setHauptzielgruppe(e.target.value)}
              placeholder="Beschreiben Sie Demografie, Psychografie, Bedürfnisse Ihrer Zielgruppe..."
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="aktuelleHerausforderungen">Aktuelle Herausforderungen in der Positionierung</Label>
            <Textarea
              id="aktuelleHerausforderungen"
              value={aktuelleHerausforderungen}
              onChange={(e) => setAktuelleHerausforderungen(e.target.value)}
              placeholder="Welche Schwierigkeiten gibt es aktuell bei der Positionierung?"
              rows={3}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'usp',
      title: '2. Alleinstellungsmerkmale (USPs) und Markenwerte',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="uspMerkmale">Einzigartige Produkt-/Dienstleistungsmerkmale</Label>
            <Textarea
              id="uspMerkmale"
              value={uspMerkmale}
              onChange={(e) => setUspMerkmale(e.target.value)}
              placeholder="Was macht Ihr Angebot einzigartig?"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="kernwerteMarke">Kernwerte der Marke</Label>
            <Textarea
              id="kernwerteMarke"
              value={kernwerteMarke}
              onChange={(e) => setKernwerteMarke(e.target.value)}
              placeholder="z.B. Innovation, Nachhaltigkeit, Kundenservice"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="abgrenzungWettbewerb">Abgrenzung zum Wettbewerb</Label>
            <Textarea
              id="abgrenzungWettbewerb"
              value={abgrenzungWettbewerb}
              onChange={(e) => setAbgrenzungWettbewerb(e.target.value)}
              placeholder="Wie unterscheiden Sie sich von Ihren Mitbewerbern?"
              rows={3}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'messaging',
      title: '3. Kernbotschaften und Tonalität festlegen',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="hauptbotschaft">Hauptbotschaft an die Zielgruppe</Label>
            <Input
              id="hauptbotschaft"
              value={hauptbotschaft}
              onChange={(e) => setHauptbotschaft(e.target.value)}
              placeholder="Die eine zentrale Botschaft, die hängen bleiben soll."
            />
          </div>
          <div>
            <Label htmlFor="unterstuetzendeBotschaften">Unterstützende Botschaften</Label>
            <Textarea
              id="unterstuetzendeBotschaften"
              value={unterstuetzendeBotschaften}
              onChange={(e) => setUnterstuetzendeBotschaften(e.target.value)}
              placeholder="Weitere Botschaften, die die Hauptbotschaft stützen."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="markentonalitaet">Gewünschte Markentonalität</Label>
            <Select value={markentonalitaet} onValueChange={setMarkentonalitaet}>
              <SelectTrigger id="markentonalitaet">
                <SelectValue placeholder="Wählen Sie eine Tonalität" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professionell">Professionell</SelectItem>
                <SelectItem value="freundlich">Freundlich</SelectItem>
                <SelectItem value="inspirierend">Inspirierend</SelectItem>
                <SelectItem value="humorvoll">Humorvoll</SelectItem>
                <SelectItem value="informativ">Informativ</SelectItem>
                <SelectItem value="direkt">Direkt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
  ];

  const handleGenerateStrategy = async ({
    knowledgeBaseText: kbText,
    sourceSelectorData,
  }: {
    knowledgeBaseText?: string;
    sourceSelectorData?: any;
  }) => {
    setIsLoading(true);
    setError(null);

    const currentSectionData = {
      basics: {
        branche,
        hauptzielgruppe,
        aktuelleHerausforderungen,
      },
      usp: {
        uspMerkmale,
        kernwerteMarke,
        abgrenzungWettbewerb,
      },
      messaging: {
        hauptbotschaft,
        unterstuetzendeBotschaften,
        markentonalitaet,
      },
    };

    console.log('Generiere Positionierungsstrategie mit folgenden Daten:');
    console.log('Sektionsdaten:', currentSectionData);
    console.log('Wissensdatenbank Text:', kbText);
    console.log('Source Selector Daten:', sourceSelectorData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Hier würde der eigentliche API-Call zur Generierung stattfinden
      // z.B. const response = await api.generatePositioningStrategy(currentSectionData, kbText, sourceSelectorData);
      // if (!response.ok) throw new Error("Fehler bei der Generierung");
      // const result = await response.json();
      // console.log("Ergebnis der Generierung:", result);

      toast({
        title: 'Strategie generiert (Simulation)',
        description: 'Ihre Positionierungsstrategie wurde erfolgreich simuliert.',
        variant: 'default',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten.';
      setError(errorMessage);
      toast({
        title: 'Fehler',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('Fehler bei der Generierung:', err);
    } finally {
      setIsLoading(false);
    }
    return Promise.resolve(); // Gemäß Anforderung
  };

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Positionierungsstrategie entwickeln"
      pageDescription="Erhalte maßgeschneiderte Ratschläge und Strategien für deine Positionierung und dein Storytelling, die auf deine Branche und Zielgruppe zugeschnitten sind."
      primaryActionLabel="Positionierungsstrategie generieren"
      configSections={configSections}
      onGenerate={handleGenerateStrategy}
      isLoading={isLoading}
      error={error}
      savedContentType="positioning-strategy"
      expertIdentifier="positioning-strategy-generator"
      showKnowledgeBaseToggle
      knowledgeBaseLabel="Wissensdatenbank für Positionierung nutzen"
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={setIsKnowledgeBaseActive}
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={setKnowledgeBaseText}
    />
  );
};

export default PositionierungsstrategiePage;
