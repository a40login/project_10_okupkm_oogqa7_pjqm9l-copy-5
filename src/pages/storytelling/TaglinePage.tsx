import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ConfigSection } from '@/types/expertTemplateTypes'; // Nur ConfigSection importieren

const TaglinePage: React.FC = () => {
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [angebotNutzen, setAngebotNutzen] = useState('');
  const [kernzielgruppe, setKernzielgruppe] = useState('');
  const [gefuehlAssoziation, setGefuehlAssoziation] = useState('');
  const [keywords, setKeywords] = useState('');
  const [laengeStil, setLaengeStil] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    // setIsLoading(true);
    // setError(null);
    const formData = {
      name,
      angebotNutzen,
      kernzielgruppe,
      gefuehlAssoziation,
      keywords,
      laengeStil,
    };
    console.log('Formulardaten für Tagline:', formData);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Tagline Generierung",
      description: "Tagline wurde erfolgreich (simuliert) generiert!",
      duration: 5000,
    });
    // setIsLoading(false);
  };

  const configSections: ConfigSection[] = [
    {
      id: 'tagline-basis',
      title: 'Basisinformationen für die Tagline',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name (Unternehmen/Marke/Produkt)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. Innovatech Solutions"
            />
          </div>
          <div>
            <Label htmlFor="angebotNutzen">Hauptangebot/Hauptnutzen</Label>
            <Textarea
              id="angebotNutzen"
              value={angebotNutzen}
              onChange={(e) => setAngebotNutzen(e.target.value)}
              placeholder="z.B. Wir revolutionieren Datenanalyse mit KI."
            />
          </div>
          <div>
            <Label htmlFor="kernzielgruppe">Kernzielgruppe</Label>
            <Input
              id="kernzielgruppe"
              value={kernzielgruppe}
              onChange={(e) => setKernzielgruppe(e.target.value)}
              placeholder="z.B. KMUs im Technologiesektor"
            />
          </div>
          <div>
            <Label htmlFor="gefuehlAssoziation">Gewünschtes Gefühl/Assoziation</Label>
            <Input
              id="gefuehlAssoziation"
              value={gefuehlAssoziation}
              onChange={(e) => setGefuehlAssoziation(e.target.value)}
              placeholder="z.B. Vertrauen, Innovation, Einfachheit"
            />
          </div>
          <div>
            <Label htmlFor="keywords">Keywords (optional)</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="z.B. KI, Daten, Effizienz"
            />
          </div>
          <div>
            <Label htmlFor="laengeStil">Gewünschte Länge/Stil</Label>
            <Select value={laengeStil} onValueChange={setLaengeStil}>
              <SelectTrigger id="laengeStil">
                <SelectValue placeholder="Wählen Sie Länge und Stil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kurz-praegnant">Kurz und prägnant</SelectItem>
                <SelectItem value="laenger-beschreibend">Etwas länger und beschreibend</SelectItem>
                <SelectItem value="modern-edgy">Modern und edgy</SelectItem>
                <SelectItem value="klassisch-serioes">Klassisch und seriös</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Tagline entwickeln"
      pageDescription="Erstellen Sie eine prägnante Tagline, die Ihr Unternehmen, Ihre Marke oder Ihr Angebot auf den Punkt bringt."
      primaryActionLabel="Tagline generieren"
      configSections={configSections}
      onGenerate={handleGenerate}
      savedContentType="tagline"
      expertIdentifier="tagline-generator"
      isLoading={false} // Hier ggf. isLoading state verwenden
      error={null} // Hier ggf. error state verwenden
      showKnowledgeBaseToggle={true}
      knowledgeBaseLabel="Wissensdatenbank für Taglines nutzen"
    />
  );
};

export default TaglinePage;
