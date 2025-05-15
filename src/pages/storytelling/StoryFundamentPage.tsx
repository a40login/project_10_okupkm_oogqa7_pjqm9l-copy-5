import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const StoryFundamentPage: React.FC = () => {
  const [kernidentitaet, setKernidentitaet] = useState('');
  const [primaereZielgruppe, setPrimaereZielgruppe] = useState('');
  const [uvp, setUvp] = useState('');
  const [hauptkernbotschaft, setHauptkernbotschaft] = useState('');
  const [unterstuetzendeKernbotschaften, setUnterstuetzendeKernbotschaften] = useState('');
  const [tonalitaet, setTonalitaet] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [knowledgeBaseText, setKnowledgeBaseText] = useState('');
  const [isKnowledgeBaseActive, setIsKnowledgeBaseActive] = useState(false);

  const configSections = [
    {
      id: 'kernmarkenidentitaet',
      title: 'Kernmarkenidentität',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="kernidentitaet">Kernidentität Ihrer Marke/Ihres Unternehmens</Label>
            <Textarea id="kernidentitaet" value={kernidentitaet} onChange={(e) => setKernidentitaet(e.target.value)} placeholder="Beschreiben Sie die Kernidentität..." />
          </div>
          <div>
            <Label htmlFor="primaereZielgruppe">Primäre Zielgruppe</Label>
            <Textarea id="primaereZielgruppe" value={primaereZielgruppe} onChange={(e) => setPrimaereZielgruppe(e.target.value)} placeholder="Wer ist Ihre primäre Zielgruppe?" />
          </div>
          <div>
            <Label htmlFor="uvp">Einzigartiges Wertversprechen (UVP)</Label>
            <Textarea id="uvp" value={uvp} onChange={(e) => setUvp(e.target.value)} placeholder="Was macht Ihr Angebot einzigartig?" />
          </div>
        </div>
      ),
    },
    {
      id: 'kernbotschaften',
      title: 'Kernbotschaften',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="hauptkernbotschaft">Hauptkernbotschaft</Label>
            <Input id="hauptkernbotschaft" value={hauptkernbotschaft} onChange={(e) => setHauptkernbotschaft(e.target.value)} placeholder="Ihre Hauptkernbotschaft..." />
          </div>
          <div>
            <Label htmlFor="unterstuetzendeKernbotschaften">Unterstützende Kernbotschaften</Label>
            <Textarea id="unterstuetzendeKernbotschaften" value={unterstuetzendeKernbotschaften} onChange={(e) => setUnterstuetzendeKernbotschaften(e.target.value)} placeholder="Weitere wichtige Botschaften..." />
          </div>
          <div>
            <Label htmlFor="tonalitaet">Gewünschte Tonalität und Stimme</Label>
            <Select value={tonalitaet} onValueChange={setTonalitaet}>
              <SelectTrigger id="tonalitaet">
                <SelectValue placeholder="Wählen Sie eine Tonalität" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freundlich">Freundlich</SelectItem>
                <SelectItem value="professionell">Professionell</SelectItem>
                <SelectItem value="informativ">Informativ</SelectItem>
                <SelectItem value="inspirierend">Inspirierend</SelectItem>
                <SelectItem value="humorvoll">Humorvoll</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    const formData = {
      kernidentitaet,
      primaereZielgruppe,
      uvp,
      hauptkernbotschaft,
      unterstuetzendeKernbotschaften,
      tonalitaet,
      // Optional: Wissensdatenbank-Text hinzufügen, falls aktiv
      ...(isKnowledgeBaseActive && { knowledgeBaseContent: knowledgeBaseText }),
    };
    console.log('Formulardaten für Story-Fundament:', formData);

    // Simulierte Generierung
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuliere API-Aufruf
      toast.success('Story-Fundament (simuliert) generiert!');
    } catch (e) {
      setError('Fehler bei der Generierung des Story-Fundaments.');
      toast.error('Fehler bei der Generierung.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Story-Fundament definieren"
      pageDescription="Definieren Sie hier die grundlegenden Markengeschichten und Kernbotschaften als Basis für Ihre Kommunikation."
      primaryActionLabel="Story-Fundament generieren"
      configSections={configSections}
      onGenerate={handleGenerate}
      savedContentType="story-fundament"
      expertIdentifier="story-fundament-generator"
      isLoading={isLoading}
      error={error}
      showKnowledgeBaseToggle={true}
      knowledgeBaseLabel="Wissensdatenbank für Story-Fundament nutzen"
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={setKnowledgeBaseText}
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={() => setIsKnowledgeBaseActive(!isKnowledgeBaseActive)}
    />
  );
};

export default StoryFundamentPage;
