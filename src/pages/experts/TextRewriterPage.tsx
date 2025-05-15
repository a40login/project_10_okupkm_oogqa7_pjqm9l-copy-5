import React, { useState } from 'react';
import { FreeInputWithEnhancementsPage } from '@/components/expert_templates/FreeInputWithEnhancementsPage';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TextRewriterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tonalitaet, setTonalitaet] = useState<string>('neutral');
  const [knowledgeBaseText, setKnowledgeBaseText] = useState('');
  const [isKnowledgeBaseActive, setIsKnowledgeBaseActive] = useState(false);

  const handleGenerateRewrite = async (data: {
    mainInput: string;
    knowledgeBaseText?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    console.log('Umschreibungsdaten:', {
      ...data,
      tonalitaet,
    });
    // Hier würde die API-Anfrage erfolgen
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simuliere API-Aufruf
    setIsLoading(false);
    // setError("Ein Fehler ist aufgetreten."); // Zum Testen von Fehlern
    return Promise.resolve();
  };

  const handleIdeate = async (text: string) => {
    console.log('Verbessere Text:', text);
    // Simuliere eine Textverbesserung
    return Promise.resolve(text + ' [verbessert durch KI]');
  };

  const controlFields = (
    <div className="space-y-2">
      <Label htmlFor="tonalitaet">Tonalität</Label>
      <Select value={tonalitaet} onValueChange={setTonalitaet}>
        <SelectTrigger id="tonalitaet">
          <SelectValue placeholder="Wähle eine Tonalität" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="neutral">Neutral</SelectItem>
          <SelectItem value="formal">Formell</SelectItem>
          <SelectItem value="informal">Informell</SelectItem>
          <SelectItem value="friendly">Freundlich</SelectItem>
          <SelectItem value="humorous">Humorvoll</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <FreeInputWithEnhancementsPage
      title="Text-Umschreiber"
      description="Formuliere Texte um, ändere die Tonalität oder lasse sie von der KI verbessern."
      mainTextareaLabel="Originaltext"
      mainTextareaPlaceholder="Gib hier deinen Text ein, den du umschreiben möchtest..."
      primaryActionLabel="Text umschreiben"
      onGenerate={handleGenerateRewrite}
      onIdeate={handleIdeate}
      ideateButtonLabel="KI-Vorschlag"
      enableAudioInput
      controlFieldsSlot={controlFields}
      isLoading={isLoading}
      error={error}
      showKnowledgeBaseToggle
      knowledgeBaseLabel="Wissensbasis (optional)"
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={setKnowledgeBaseText}
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={setIsKnowledgeBaseActive}
      savedContentType="rewritten-text"
      expertIdentifier="text-rewriter"
    />
  );
};

export default TextRewriterPage;