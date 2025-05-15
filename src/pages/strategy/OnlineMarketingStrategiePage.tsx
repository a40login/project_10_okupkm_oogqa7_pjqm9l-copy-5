import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ConfigSection } from '@/types/expertTemplateTypes';

const OnlineMarketingStrategiePage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for Knowledge Base
  const [isKnowledgeBaseActive, setIsKnowledgeBaseActive] = useState(false);
  const [knowledgeBaseText, setKnowledgeBaseText] = useState('');


  // States for Section 1: Ziele und Zielgruppe
  const [marketingGoals, setMarketingGoals] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [budget, setBudget] = useState('');

  // States for Section 2: Kanäle und Inhalte
  const [preferredChannels, setPreferredChannels] = useState<string[]>([]);
  const [contentFormats, setContentFormats] = useState<string[]>([]);
  const [existingPresences, setExistingPresences] = useState('');

  // States for Section 3: Analyse und KPIs
  const [competitors, setCompetitors] = useState('');
  const [kpis, setKpis] = useState('');
  const [analysisTools, setAnalysisTools] = useState('');

  const handleChannelChange = (channel: string) => {
    setPreferredChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleContentFormatChange = (format: string) => {
    setContentFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  const configSections: ConfigSection[] = [
    {
      id: 'goalsAudience',
      title: '1. Marketingziele und Zielgruppe',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="marketingGoals">Hauptmarketingziele</Label>
            <Textarea
              id="marketingGoals"
              value={marketingGoals}
              onChange={(e) => setMarketingGoals(e.target.value)}
              placeholder="z.B. Lead-Generierung, Umsatzsteigerung, Markenbekanntheit"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="targetAudience">Spezifische Zielgruppe für Online-Marketing</Label>
            <Textarea
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Demografie, Online-Verhalten, bevorzugte Plattformen"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="budget">Budgetrahmen (optional)</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger id="budget" className="mt-1">
                <SelectValue placeholder="Bitte auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500">500€ / Monat</SelectItem>
                <SelectItem value="500-1000">500€ - 1.000€ / Monat</SelectItem>
                <SelectItem value="1000-5000">1.000€ - 5.000€ / Monat</SelectItem>
                <SelectItem value="5000">5.000€ / Monat</SelectItem>
                <SelectItem value="flexibel">Flexibel / Projektbasiert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      id: 'channelsContent',
      title: '2. Bevorzugte Kanäle und Inhaltsformate',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label>Bevorzugte Online-Marketing Kanäle</Label>
            <div className="mt-2 space-y-2">
              {['SEO', 'SEA', 'Social Media', 'E-Mail-Marketing', 'Content Marketing', 'Affiliate Marketing', 'Influencer Marketing'].map(channel => (
                <div key={channel} className="flex items-center space-x-2">
                  <Checkbox
                    id={`channel-${channel}`}
                    checked={preferredChannels.includes(channel)}
                    onCheckedChange={() => handleChannelChange(channel)}
                  />
                  <Label htmlFor={`channel-${channel}`} className="font-normal">{channel}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>Geplante Inhaltsformate</Label>
            <div className="mt-2 space-y-2">
              {['Blogartikel', 'Videos', 'Infografiken', 'Podcasts', 'Webinare', 'Case Studies', 'Whitepaper'].map(format => (
                <div key={format} className="flex items-center space-x-2">
                  <Checkbox
                    id={`format-${format}`}
                    checked={contentFormats.includes(format)}
                    onCheckedChange={() => handleContentFormatChange(format)}
                  />
                  <Label htmlFor={`format-${format}`} className="font-normal">{format}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="existingPresences">Bestehende Online-Präsenzen</Label>
            <Textarea
              id="existingPresences"
              value={existingPresences}
              onChange={(e) => setExistingPresences(e.target.value)}
              placeholder="Links zu Webseiten, Social Media Profilen etc."
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'analysisKpis',
      title: '3. Wettbewerb und Erfolgsmessung (KPIs)',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="competitors">Hauptwettbewerber online</Label>
            <Textarea
              id="competitors"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="Namen oder Webseiten Ihrer Hauptkonkurrenten"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="kpis">Wichtige Key Performance Indicators (KPIs)</Label>
            <Textarea
              id="kpis"
              value={kpis}
              onChange={(e) => setKpis(e.target.value)}
              placeholder="z.B. Conversion Rate, Click-Through Rate, Website Traffic, Engagement Rate"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="analysisTools">Tools für Analyse und Reporting (optional)</Label>
            <Input
              id="analysisTools"
              value={analysisTools}
              onChange={(e) => setAnalysisTools(e.target.value)}
              placeholder="z.B. Google Analytics, Matomo, SEMrush"
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
  ];

  const handleGenerateStrategy = async ({ knowledgeBaseText, sourceSelectorData }: { knowledgeBaseText?: string; sourceSelectorData?: Record<string, any> }) => {
    setIsLoading(true);
    setError(null);

    const currentSectionData = {
      goalsAudience: {
        marketingGoals,
        targetAudience,
        budget,
      },
      channelsContent: {
        preferredChannels,
        contentFormats,
        existingPresences,
      },
      analysisKpis: {
        competitors,
        kpis,
        analysisTools,
      },
    };

    const fullDataPayload = {
      sectionData: currentSectionData,
      knowledgeBaseText: isKnowledgeBaseActive ? knowledgeBaseText : undefined,
      sourceSelectorData,
    }

    console.log('Generiere Online Marketing Strategie mit folgenden Daten:', fullDataPayload);

    console.log('Generiere Online Marketing Strategie mit folgenden Daten:', currentSectionData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Hier würde der eigentliche API-Call zur Strategiegenerierung stattfinden
      // Für dieses Beispiel simulieren wir nur einen Erfolg
      toast({
        title: "Strategie generiert (Simulation)",
        description: "Ihre Online Marketing Strategie wurde erfolgreich simuliert.",
        variant: "default", // "success" ist keine Standardvariante, ggf. anpassen falls vorhanden
      });
    } catch (err) {
      console.error("Fehler bei der Strategiegenerierung:", err);
      setError("Fehler bei der Generierung der Strategie.");
      toast({
        title: "Fehler",
        description: "Es gab einen Fehler bei der Generierung Ihrer Strategie.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    return Promise.resolve();
  };

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Online Marketing Strategie entwickeln"
      pageDescription="Erhalte maßgeschneiderte Ratschläge und Strategien für dein Online-Marketing, die auf deine Branche und Zielgruppe zugeschnitten sind."
      primaryActionLabel="Online Marketing Strategie generieren"
      configSections={configSections}
      onGenerate={handleGenerateStrategy}
      isLoading={isLoading}
      error={error}
      savedContentType="online-marketing-strategy"
      expertIdentifier="online-marketing-strategy-generator"
      showKnowledgeBaseToggle={true}
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={() => setIsKnowledgeBaseActive(!isKnowledgeBaseActive)}
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={setKnowledgeBaseText}
      knowledgeBaseLabel="Wissensdatenbank für Online Marketing"
    />
  );
};

export default OnlineMarketingStrategiePage;
