import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { SavedContent } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

// --- Helper Components ---

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  labelClassName?: string;
}

const MemoizedInputField = React.memo<InputFieldProps>(
  ({ id, label, value, onChange, type = "text", placeholder, className, disabled, labelClassName = "text-lg mb-2 block" }) => (
    <div>
      <Label htmlFor={id} className={labelClassName}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-flowhero-darker border-flowhero-dark text-white placeholder:text-gray-500 ${className}`}
        disabled={disabled}
      />
    </div>
  )
);
MemoizedInputField.displayName = 'MemoizedInputField';


interface GenerationResultProps {
  content: string | null;
}

const MemoizedGenerationResult = React.memo<GenerationResultProps>(({ content }) => {
  if (!content) return null;

  // Heuristik zur Fehlererkennung, kann verfeinert werden
  const isError = typeof content === 'string' && content.toLowerCase().startsWith('fehler:');
  const isImageUrl = !isError && (content.startsWith('http') || content.startsWith('blob:') || content.startsWith('data:'));

  return (
    <div className={`mt-6 p-4 border rounded-md ${isError ? 'border-red-500 bg-red-900/20' : 'border-flowhero-dark bg-flowhero-darker'}`}>
      <h3 className="text-lg font-semibold mb-2">{isError ? "Fehlerdetails:" : "Ergebnis:"}</h3>
      {isImageUrl ? (
        <img src={content} alt="Generiertes Bild" className="rounded-md max-w-full h-auto" />
      ) : (
        <p className={`whitespace-pre-wrap ${isError ? 'text-red-300' : 'text-gray-300'}`}>{content}</p>
      )}
    </div>
  );
});
MemoizedGenerationResult.displayName = 'MemoizedGenerationResult';


const MemoizedWebhookInfo = React.memo(function WebhookInfo() {
  return (
    <div className="text-xs text-gray-400 mt-1 space-y-1">
      <p>Der Webhook sollte eine POST-Anfrage (JSON-Body: `prompt`, `apiKey`) akzeptieren.</p>
      <p>Antwortmöglichkeiten für erfolgreiche Anfragen (Status 2xx):</p>
      <ul className="list-disc list-inside pl-4">
        <li>Direkte Bilddaten (z.B. `Content-Type: image/png`).</li>
        <li>JSON: `{'{'}"imageUrl": "http://..."{'}'}`.</li>
        <li>JSON: `{'{'}"imageBase64": "...", "imageType": "image/jpeg"{'}'}` (imageType optional, default: image/png).</li>
        <li>JSON: `{'{'}"b64_json": "...", "imageType": "image/jpeg"{'}'}` (Base64 im Feld `b64_json`).</li>
        <li>JSON: `{'{'}"data": "...", "imageType": "image/jpeg"{'}'}` (Base64 im Feld `data`).</li>
        <li>JSON: `{'{'}"data": ["...", ...], "imageType": "image/jpeg"{'}'}` (Base64 im ersten Element von `data`).</li>
        <li>JSON (verschachtelt): `[{'{'}"data": [{'{'}"b64_json": "...", "imageType": "image/jpeg"{'}'}]{'}'}]` (imageType optional).</li>
        <li>JSON: `{'{'}"message": "Ihre Nachricht"{'}'}` (für Textnachrichten).</li>
      </ul>
      <p className="mt-1">Fehlerantworten (Status 4xx, 5xx) können JSON (`{'{'}"message": "..."{'}'}`) oder Text sein.</p>
    </div>
  );
});
MemoizedWebhookInfo.displayName = 'MemoizedWebhookInfo';

// --- Main Component ---

const ImageGeneratorPage = () => {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const storedApiKey = localStorage.getItem('imageGenApiKey');
    const storedWebhookUrl = localStorage.getItem('imageGenWebhookUrl');
    if (storedApiKey) setApiKey(storedApiKey);
    if (storedWebhookUrl) setWebhookUrl(storedWebhookUrl);
  }, []);

  useEffect(() => {
    if (apiKey) localStorage.setItem('imageGenApiKey', apiKey);
  }, [apiKey]);

  useEffect(() => {
    if (webhookUrl) localStorage.setItem('imageGenWebhookUrl', webhookUrl);
  }, [webhookUrl]);

  useEffect(() => {
    return () => {
      if (generatedContent && generatedContent.startsWith('blob:')) {
        URL.revokeObjectURL(generatedContent);
      }
    };
  }, [generatedContent]);

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  }, []);

  const handleApiKeyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  }, []);

  const handleWebhookUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value);
  }, []);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      toast({ title: "Fehler", description: "Bitte geben Sie einen Prompt ein.", variant: "destructive" });
      return;
    }
    if (!apiKey.trim()) {
      toast({ title: "Fehler", description: "Bitte geben Sie einen API-Key ein.", variant: "destructive" });
      return;
    }
    if (!webhookUrl.trim()) {
      toast({ title: "Fehler", description: "Bitte geben Sie eine Webhook-URL ein.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    if (generatedContent && generatedContent.startsWith('blob:')) {
      URL.revokeObjectURL(generatedContent);
    }
    setGeneratedContent(null); // Reset previous content/error

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, apiKey }),
      });

      if (!response.ok) {
        const errorContentType = response.headers.get('content-type');
        let errorMessage = `HTTP-Fehler: ${response.status}`;
        if (errorContentType && errorContentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || JSON.stringify(errorData);
          } catch (e) {
            errorMessage = `HTTP-Fehler: ${response.status}. Fehler-Antwort ist kein valides JSON. Ursprünglicher Fehler: ${ (e as Error).message }`;
          }
        } else {
          try {
            const errorText = await response.text();
            errorMessage = `HTTP-Fehler: ${response.status}. Server-Antwort: ${errorText.substring(0, 200)}`;
          } catch (e) {
            errorMessage = `HTTP-Fehler: ${response.status}. Fehler-Antwort konnte nicht als Text gelesen werden. Ursprünglicher Fehler: ${ (e as Error).message }`;
          }
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        let imageType = 'image/png';
        if (result.imageType) imageType = result.imageType;
        else if (Array.isArray(result) && result.length > 0 && result[0].imageType) imageType = result[0].imageType;
        else if (Array.isArray(result) && result.length > 0 && result[0].data && Array.isArray(result[0].data) && result[0].data.length > 0 && result[0].data[0].imageType) imageType = result[0].data[0].imageType;

        if (Array.isArray(result) && result.length > 0 && result[0].data && Array.isArray(result[0].data) && result[0].data.length > 0 && result[0].data[0].b64_json) {
          setGeneratedContent(`data:${imageType};base64,${result[0].data[0].b64_json}`);
          toast({ title: "Erfolg", description: "Bild erfolgreich als Base64 (verschachteltes b64_json) erhalten!" });
        } else if (result.imageUrl) {
          setGeneratedContent(result.imageUrl);
          toast({ title: "Erfolg", description: "Bild-URL erfolgreich erhalten!" });
        } else if (result.imageBase64) {
          setGeneratedContent(`data:${imageType};base64,${result.imageBase64}`);
          toast({ title: "Erfolg", description: "Bild erfolgreich als Base64 (imageBase64) erhalten!" });
        } else if (result.b64_json) {
          setGeneratedContent(`data:${imageType};base64,${result.b64_json}`);
          toast({ title: "Erfolg", description: "Bild erfolgreich als Base64 (b64_json) erhalten!" });
        } else if (result.data) {
          if (typeof result.data === 'string') {
            setGeneratedContent(`data:${imageType};base64,${result.data}`);
            toast({ title: "Erfolg", description: "Bild erfolgreich als Base64 (data String) erhalten!" });
          } else if (Array.isArray(result.data) && result.data.length > 0 && typeof result.data[0] === 'string') {
            setGeneratedContent(`data:${imageType};base64,${result.data[0]}`);
            toast({ title: "Erfolg", description: "Bild erfolgreich als Base64 (data[0] String) erhalten!" });
          } else {
            setGeneratedContent(result.message || "JSON-Antwort erhalten, aber Bilddaten nicht im erwarteten Format.");
            toast({ title: "Info", description: "Unerwartete Struktur im JSON-Datenfeld." });
          }
        } else if (result.message) {
          setGeneratedContent(result.message);
          toast({ title: "Info", description: result.message });
        } else {
          setGeneratedContent("Webhook erfolgreich aufgerufen, aber keine verwertbaren Daten in JSON erhalten.");
          toast({ title: "Info", description: "Webhook erfolgreich aufgerufen, aber unerwartete JSON-Struktur." });
        }
      } else if (contentType && contentType.startsWith('image/')) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setGeneratedContent(imageUrl);
        toast({ title: "Erfolg", description: "Bild erfolgreich als Binärdaten geladen!" });
      } else {
        const textResponse = await response.text();
        setGeneratedContent(`Unerwarteter Antworttyp: ${contentType || 'Nicht spezifiziert'}. Antwort: ${textResponse.substring(0,100)}...`);
        toast({
          title: "Warnung",
          description: `Unerwarteter Antworttyp vom Webhook: ${contentType || 'Nicht spezifiziert'}.`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Webhook Fehler:", error);
      const errorMessage = error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten.";
      setGeneratedContent(`Fehler: ${errorMessage}`); // Fehler wird im `generatedContent` für `MemoizedGenerationResult` gesetzt
      toast({
        title: "Webhook Fehler",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [prompt, apiKey, webhookUrl, toast, generatedContent]); // Dependencies für useCallback

  const handleSaveContent = useCallback(async () => {
    if (!generatedContent || !user) {
      toast({ title: "Fehler", description: "Kein Inhalt zum Speichern oder Benutzer nicht angemeldet.", variant: "destructive" });
      return;
    }

    // Heuristik zur Fehlererkennung, sollte mit der in MemoizedGenerationResult übereinstimmen
    const isError = typeof generatedContent === 'string' && generatedContent.toLowerCase().startsWith('fehler:');
    if (isError) {
        toast({ title: "Fehler", description: "Fehlerhafter Inhalt kann nicht gespeichert werden.", variant: "destructive" });
        return;
    }
    const isImageUrl = !isError && (generatedContent.startsWith('http') || generatedContent.startsWith('blob:') || generatedContent.startsWith('data:'));

    setIsSaving(true);

    const title = `KI Bild: ${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''}`;
    const contentToSave: SavedContent['content'] = isImageUrl
      ? { type: "image_url", url: generatedContent }
      : { type: "text", value: generatedContent };

    const newSavedContent: Omit<SavedContent, 'id' | 'created_at' | 'updated_at'> = {
      user_id: user.id,
      title,
      content: contentToSave,
      content_type: "KI Bild",
      source_expert: "ImageGeneratorPage",
      generation_params: { prompt, webhookUrl },
      is_favorite: false, // Standardmäßig nicht als Favorit markieren
    };

    try {
      const { error } = await supabase.from('saved_content').insert(newSavedContent);
      if (error) throw error;
      toast({ title: "Erfolg", description: "Bild erfolgreich gespeichert!" });
    } catch (error) {
      console.error("Fehler beim Speichern des Inhalts:", error);
      const errorMessage = error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten.";
      toast({
        title: "Fehler beim Speichern",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [generatedContent, prompt, webhookUrl, user, toast]);

  return (
    <div className="p-6 text-white max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">KI Bild-Generator</h1>

      <div className="space-y-6 bg-flowhero-card p-6 rounded-lg shadow-xl">
        <MemoizedInputField
          id="prompt"
          label="Prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="z.B. Ein Astronaut, der auf einem Einhorn reitet, digital art"
          disabled={isLoading}
        />

        <Button
          onClick={handleGenerateImage}
          disabled={isLoading}
          className="w-full bg-flowhero-orange hover:bg-flowhero-orange/90 text-white py-3 text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generiere...
            </>
          ) : (
            "Bild generieren"
          )}
        </Button>

        <MemoizedGenerationResult content={generatedContent} />

        {generatedContent && !(typeof generatedContent === 'string' && generatedContent.toLowerCase().startsWith('fehler:')) && (
          <Button
            onClick={handleSaveContent}
            disabled={isSaving || isLoading}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Speichert...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Bild speichern
              </>
            )}
          </Button>
        )}

        <div className="pt-6 mt-6 border-t border-flowhero-dark">
          <h2 className="text-2xl font-semibold mb-4">Einstellungen</h2>
          <div className="space-y-4">
            <MemoizedInputField
              id="apiKey"
              label="API-Key"
              type="password"
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder="Ihr API-Key"
              disabled={isLoading}
            />
            <div> {/* Behält die Struktur für das Webhook-Inputfeld und die Info darunter */}
              <MemoizedInputField
                id="webhookUrl"
                label="Webhook-URL"
                type="url"
                value={webhookUrl}
                onChange={handleWebhookUrlChange}
                placeholder="Ihre Webhook-URL"
                disabled={isLoading}
              />
              <MemoizedWebhookInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneratorPage;
