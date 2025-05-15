import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const BrandStoryPage: React.FC = () => {
  const [gruendung, setGruendung] = useState('');
  const [werte, setWerte] = useState('');
  const [herausforderungen, setHerausforderungen] = useState('');
  const [held, setHeld] = useState('');
  const [wandel, setWandel] = useState('');
  const [emotionen, setEmotionen] = useState('');
  const [zentraleBotschaft, setZentraleBotschaft] = useState('');
  const [zukunftsvision, setZukunftsvision] = useState('');

  const handleGenerate = async () => {
    const formData = {
      gruendung,
      werte,
      herausforderungen,
      held,
      wandel,
      emotionen,
      zentraleBotschaft,
      zukunftsvision,
    };
    console.log('Formulardaten für Markengeschichte:', formData);
    toast.success('Markengeschichte (simuliert) generiert!');
    // Hier würde die eigentliche Generierungslogik aufgerufen werden
  };

  const configSections = [
    {
      id: 'ursprungMotivation',
      title: 'Ursprung und Motivation',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="gruendung">Gründung Ihrer Marke (Wie & Warum)?</Label>
            <Textarea id="gruendung" value={gruendung} onChange={(e) => setGruendung(e.target.value)} placeholder="Beschreiben Sie, wie und warum Ihre Marke gegründet wurde..." />
          </div>
          <div>
            <Label htmlFor="werte">Werte und Überzeugungen Ihrer Marke</Label>
            <Textarea id="werte" value={werte} onChange={(e) => setWerte(e.target.value)} placeholder="Welche Kernwerte und Überzeugungen treiben Ihre Marke an?" />
          </div>
          <div>
            <Label htmlFor="herausforderungen">Besondere Herausforderungen/Wendepunkte</Label>
            <Textarea id="herausforderungen" value={herausforderungen} onChange={(e) => setHerausforderungen(e.target.value)} placeholder="Gab es wichtige Herausforderungen oder Wendepunkte in Ihrer Markengeschichte?" />
          </div>
        </div>
      ),
    },
    {
      id: 'verbindungZielgruppe',
      title: 'Verbindung zur Zielgruppe',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="held">Für wen existiert Ihre Marke (Held der Geschichte)?</Label>
            <Textarea id="held" value={held} onChange={(e) => setHeld(e.target.value)} placeholder="Wer ist der Held Ihrer Geschichte (Ihre Zielgruppe)?" />
          </div>
          <div>
            <Label htmlFor="wandel">Wandel/Transformation für Ihre Zielgruppe</Label>
            <Textarea id="wandel" value={wandel} onChange={(e) => setWandel(e.target.value)} placeholder="Welchen positiven Wandel oder welche Transformation ermöglichen Sie Ihrer Zielgruppe?" />
          </div>
          <div>
            <Label htmlFor="emotionen">Gewünschte Emotionen der Geschichte</Label>
            <Select value={emotionen} onValueChange={setEmotionen}>
              <SelectTrigger id="emotionen">
                <SelectValue placeholder="Emotion auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freude">Freude</SelectItem>
                <SelectItem value="vertrauen">Vertrauen</SelectItem>
                <SelectItem value="inspiration">Inspiration</SelectItem>
                <SelectItem value="empathie">Empathie</SelectItem>
                <SelectItem value="begeisterung">Begeisterung</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      id: 'kernbotschaftZukunft',
      title: 'Kernbotschaft und Zukunft',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="zentraleBotschaft">Zentrale Botschaft Ihrer Markengeschichte</Label>
            <Input id="zentraleBotschaft" value={zentraleBotschaft} onChange={(e) => setZentraleBotschaft(e.target.value)} placeholder="Was ist die eine zentrale Botschaft, die hängen bleiben soll?" />
          </div>
          <div>
            <Label htmlFor="zukunftsvision">Zukunftsvision Ihrer Marke</Label>
            <Textarea id="zukunftsvision" value={zukunftsvision} onChange={(e) => setZukunftsvision(e.target.value)} placeholder="Wie sieht die Zukunftsvision Ihrer Marke aus?" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Markengeschichte erzählen"
      pageDescription="Formen Sie eine emotionale Verbindung zu Ihrer Zielgruppe durch die authentische Geschichte Ihrer Marke."
      primaryActionLabel="Markengeschichte generieren"
      configSections={configSections}
      onGenerate={handleGenerate}
      savedContentType="brand-story"
      expertIdentifier="brand-story-generator"
      isLoading={false} // Beispielwert, später an echten Ladezustand anpassen
      // knowledgeBaseSources={[]} // Optional: Quellen für Wissensdatenbank
      // onKnowledgeBaseSourcesChange={() => {}} // Optional: Handler für Wissensdatenbank
      // showKnowledgeBaseToggle={true} // Standard ist true
    />
  );
};

export default BrandStoryPage;
