import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { ConfigSection } from '@/types/expertTemplateTypes';

const SocialMediaStrategiePage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Section 1: Ziele und Zielgruppen
  const [smGoals, setSmGoals] = useState('');
  const [smAudiencePlatforms, setSmAudiencePlatforms] = useState('');
  const [smExistingProfiles, setSmExistingProfiles] = useState('');

  // Section 2: Plattformen und Content-Säulen
  const [smFocusPlatforms, setSmFocusPlatforms] = useState<string[]>([]);
  const [smContentPillars, setSmContentPillars] = useState('');
  const [smPreferredFormats, setSmPreferredFormats] = useState('');

  // Section 3: Tonalität, Frequenz und KPIs
  const [smTone, setSmTone] = useState('');
  const [smPostingFrequency, setSmPostingFrequency] = useState('');
  const [smKpis, setSmKpis] = useState('');

  const platformOptions = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'x', label: 'X (Twitter)' },
    { id: 'pinterest', label: 'Pinterest' },
  ];

  const handlePlatformChange = (platformId: string) => {
    setSmFocusPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const configSections: ConfigSection[] = [
    {
      id: 'smGoalsAudience',
      title: '1. Social Media Ziele und Zielgruppen',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="smGoals">Hauptziele für Social Media</Label>
            <Textarea
              id="smGoals"
              value={smGoals}
              onChange={(e) => setSmGoals(e.target.value)}
              placeholder="z.B. Community-Aufbau, Brand Engagement, Traffic-Generierung"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="smAudiencePlatforms">Zielgruppen auf spezifischen Plattformen</Label>
            <Textarea
              id="smAudiencePlatforms"
              value={smAudiencePlatforms}
              onChange={(e) => setSmAudiencePlatforms(e.target.value)}
              placeholder="Welche Plattformen nutzt deine Zielgruppe primär? Wie interagieren sie dort?"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="smExistingProfiles">Bestehende Social Media Profile (Links)</Label>
            <Textarea
              id="smExistingProfiles"
              value={smExistingProfiles}
              onChange={(e) => setSmExistingProfiles(e.target.value)}
              placeholder="Links zu bestehenden Profilen, jeweils eine pro Zeile"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'smPlatformsContent',
      title: '2. Plattformauswahl und Content-Strategie',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label>Fokus-Plattformen</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {platformOptions.map(platform => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`platform-${platform.id}`}
                    checked={smFocusPlatforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformChange(platform.id)}
                  />
                  <Label htmlFor={`platform-${platform.id}`}>{platform.label}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="smContentPillars">Haupt-Content-Säulen/Themen</Label>
            <Textarea
              id="smContentPillars"
              value={smContentPillars}
              onChange={(e) => setSmContentPillars(e.target.value)}
              placeholder="Welche übergeordneten Themen sollen bespielt werden?"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="smPreferredFormats">Bevorzugte Content-Formate pro Plattform</Label>
            <Textarea
              id="smPreferredFormats"
              value={smPreferredFormats}
              onChange={(e) => setSmPreferredFormats(e.target.value)}
              placeholder="z.B. Instagram: Reels, Stories, Carousels; LinkedIn: Fachartikel, Unternehmensupdates"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'smToneFrequencyKpis',
      title: '3. Tonalität, Posting-Frequenz und Erfolgsmessung',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="smTone">Gewünschte Tonalität auf Social Media</Label>
            <Select value={smTone} onValueChange={setSmTone}>
              <SelectTrigger id="smTone" className="mt-1">
                <SelectValue placeholder="Tonalität auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="locker_unterhaltsam">Locker & unterhaltsam</SelectItem>
                <SelectItem value="informativ_serioes">Informativ & seriös</SelectItem>
                <SelectItem value="inspirierend_persoenlich">Inspirierend & persönlich</SelectItem>
                <SelectItem value="provokant_diskursiv">Provokant & diskursiv</SelectItem>
                <SelectItem value="experten_fokus">Expertenfokus & tiefgründig</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="smPostingFrequency">Geplante Posting-Frequenz pro Plattform</Label>
            <Input
              id="smPostingFrequency"
              value={smPostingFrequency}
              onChange={(e) => setSmPostingFrequency(e.target.value)}
              placeholder="z.B. Instagram: 3x Woche, LinkedIn: 1x Woche"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="smKpis">Wichtige Social Media KPIs</Label>
            <Textarea
              id="smKpis"
              value={smKpis}
              onChange={(e) => setSmKpis(e.target.value)}
              placeholder="z.B. Engagement Rate, Follower-Wachstum, Reichweite, Klicks, Conversions"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
  ];

  const handleGenerateStrategy = async ({ knowledgeBaseText, sourceSelectorData }: { knowledgeBaseText?: string; sourceSelectorData?: any }) => {
    setIsLoading(true);
    setError(null);

    const currentSectionData = {
      smGoals,
      smAudiencePlatforms,
      smExistingProfiles,
      smFocusPlatforms,
      smContentPillars,
      smPreferredFormats,
      smTone,
      smPostingFrequency,
      smKpis,
      knowledgeBaseText, // Wissensdatenbank-Text integrieren
      sourceSelectorData, // Daten aus dem SourceSelector integrieren
    };

    console.log('Generiere Social Media Strategie mit folgenden Daten:', currentSectionData);

    // Simulierte API-Anfrage
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simuliert Netzwerklatenz
      // Hier würde die eigentliche Logik zur Strategiegenerierung stehen
      // z.B. ein API-Aufruf an ein Backend oder eine KI
      toast({
        title: "Social Media Strategie generiert!",
        description: "Deine Strategie wurde erfolgreich (simuliert) erstellt.",
        variant: "default",
      });
    } catch (err) {
      console.error("Fehler bei der Strategiegenerierung:", err);
      const errorMessage = err instanceof Error ? err.message : "Ein unbekannter Fehler ist aufgetreten.";
      setError(errorMessage);
      toast({
        title: "Fehler bei der Generierung",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    return Promise.resolve(); // Entspricht der Anforderung
  };

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Social Media Strategie entwickeln"
      pageDescription="Entwickle eine maßgeschneiderte Social-Media-Strategie, die deine Unternehmensziele unterstützt."
      primaryActionLabel="Social Media Strategie generieren"
      configSections={configSections}
      onGenerate={handleGenerateStrategy}
      isLoading={isLoading}
      error={error}
      savedContentType="social-media-strategy"
      expertIdentifier="social-media-strategy-generator"
      // enableKnowledgeBaseIntegration // Diese Prop aktivieren, falls benötigt und im Template vorhanden
      // enableSourceSelector // Diese Prop aktivieren, falls benötigt und im Template vorhanden
    />
  );
};

export default SocialMediaStrategiePage;
