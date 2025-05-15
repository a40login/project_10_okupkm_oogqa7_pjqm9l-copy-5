import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import type { ConfigSection } from '@/types/expertTemplateTypes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast'; // Annahme: useToast Hook existiert

const VideoScriptGeneratorPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States für die Eingabefelder
  const [selectedVideoType, setSelectedVideoType] = useState<string | undefined>();
  const [scriptLength, setScriptLength] = useState<string | undefined>(); // z.B. "short", "medium", "long"
  const [videoGoal, setVideoGoal] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [keyMessages, setKeyMessages] = useState<string>('');
  const [styleAndTone, setStyleAndTone] = useState<string | undefined>();
  const [callToAction, setCallToAction] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  // Wissensdatenbank-States
  const [isKnowledgeBaseActive, setIsKnowledgeBaseActive] = useState(false);
  const [knowledgeBaseText, setKnowledgeBaseText] = useState('');


  const sections: ConfigSection[] = [
    {
      id: 'videoType',
      title: '1. Video-Typ auswählen',
      contentSlot: (
        <RadioGroup onValueChange={setSelectedVideoType} value={selectedVideoType} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tutorial" id="vt-tutorial" />
            <Label htmlFor="vt-tutorial">Tutorial / How-to</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="demo" id="vt-demo" />
            <Label htmlFor="vt-demo">Produkt-/Service-Demo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="testimonial" id="vt-testimonial" />
            <Label htmlFor="vt-testimonial">Kunden-Testimonial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="explainer" id="vt-explainer" />
            <Label htmlFor="vt-explainer">Erklärvideo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="social" id="vt-social" />
            <Label htmlFor="vt-social">Social Media Video (z.B. Reel, TikTok)</Label>
          </div>
        </RadioGroup>
      ),
    },
    {
      id: 'scriptDetails',
      title: '2. Skript-Details festlegen',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="scriptLength">Skriptlänge (ungefähr)</Label>
            <Select onValueChange={setScriptLength} value={scriptLength}>
              <SelectTrigger id="scriptLength">
                <SelectValue placeholder="Länge auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Kurz (bis 1 Minute)</SelectItem>
                <SelectItem value="medium">Mittel (1-3 Minuten)</SelectItem>
                <SelectItem value="long">Lang (3+ Minuten)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="videoGoal">Was ist das Hauptziel des Videos?</Label>
            <Input
              id="videoGoal"
              placeholder="z.B. Produkt verkaufen, Markenbekanntheit steigern, informieren"
              value={videoGoal}
              onChange={(e) => setVideoGoal(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="targetAudience">Wer ist die Zielgruppe?</Label>
            <Input
              id="targetAudience"
              placeholder="z.B. Junge Berufstätige, Technik-Enthusiasten, Kleinunternehmer"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'contentStructure',
      title: '3. Inhaltliche Struktur',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="keyMessages">Was sind die Kernbotschaften? (eine pro Zeile)</Label>
            <Textarea
              id="keyMessages"
              placeholder="z.B. Unser Produkt ist einfach zu bedienen.\nEs spart Ihnen Zeit und Geld."
              value={keyMessages}
              onChange={(e) => setKeyMessages(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="styleAndTone">Stil und Ton</Label>
            <Select onValueChange={setStyleAndTone} value={styleAndTone}>
              <SelectTrigger id="styleAndTone">
                <SelectValue placeholder="Stil auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professionell & Informativ</SelectItem>
                <SelectItem value="friendly">Freundlich & Nahbar</SelectItem>
                <SelectItem value="humorous">Humorvoll & Unterhaltsam</SelectItem>
                <SelectItem value="inspirational">Inspirierend & Motivierend</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="callToAction">Call to Action (CTA)</Label>
            <Input
              id="callToAction"
              placeholder="z.B. Besuchen Sie unsere Webseite, Abonnieren Sie unseren Kanal"
              value={callToAction}
              onChange={(e) => setCallToAction(e.target.value)}
            />
          </div>
        </div>
      ),
    },
     {
      id: 'additionalContext',
      title: '4. Zusätzliche Informationen (Optional)',
      contentSlot: (
        <Textarea
          placeholder="Gibt es weitere wichtige Details, die beachtet werden sollen? (z.B. spezifische Begriffe, No-Gos, Beispiele)"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="min-h-[100px]"
        />
      ),
    },
  ];

  const handleGenerateVideoScript = async (data: {
    knowledgeBaseText?: string;
    sourceSelectorData?: Record<string, any>; // Falls optionalSourceSelectorSlot verwendet wird
  }) => {
    setIsLoading(true);
    setError(null);

    const currentSectionData = {
      videoType: { type: selectedVideoType },
      scriptDetails: {
        length: scriptLength,
        goal: videoGoal,
        audience: targetAudience,
      },
      contentStructure: {
        messages: keyMessages.split('\n').filter(m => m.trim() !== ''),
        style: styleAndTone,
        cta: callToAction,
      },
      additionalContext: {
        info: additionalInfo,
      }
    };

    console.log("Video Skript Generierungsdaten:", {
      sectionData: currentSectionData,
      knowledgeBaseText: data.knowledgeBaseText,
      sourceSelectorData: data.sourceSelectorData,
    });

    // Hier würde die eigentliche API-Anfrage zur Skriptgenerierung erfolgen
    // Für dieses Beispiel simulieren wir eine Verzögerung und einen Erfolg
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: "Skript-Anfrage gesendet (simuliert)",
      description: "Die Daten wurden in der Konsole geloggt.",
    });
    // Im Erfolgsfall:
    // setGeneratedScript("Das generierte Skript...");
    // Im Fehlerfall:
    // setError("Fehler bei der Skriptgenerierung.");

    return Promise.resolve();
  };


  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Video-Skript Generator"
      pageDescription="Erstellen Sie professionelle Video-Skripte Schritt für Schritt."
      configSections={sections}
      primaryActionLabel="Video-Skript generieren"
      onGenerate={handleGenerateVideoScript}
      isLoading={isLoading}
      error={error}
      savedContentType="video-script"
      expertIdentifier="video-script-generator"
      // Wissensdatenbank Props
      showKnowledgeBaseToggle={true}
      knowledgeBaseLabel="Eigene Informationen für das Skript verwenden"
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={setIsKnowledgeBaseActive}
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={setKnowledgeBaseText}
      // Optional: savedContentLinkText, secondaryAction etc.
    />
  );
};

export default VideoScriptGeneratorPage;