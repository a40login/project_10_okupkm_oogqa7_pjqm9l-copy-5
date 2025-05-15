import React, { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react'; // Square Icon für Stop hinzugefügt
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AudioInputButtonProps {
  onTextReceived: (text: string) => void;
  onRecordingStart?: () => void; // Optional: Callback beim Start der Aufnahme
  onRecordingStop?: () => void;  // Optional: Callback beim Stopp der Aufnahme
  webhookUrl?: string; // Für zukünftige Konfiguration
  className?: string;
}

const AudioInputButton: React.FC<AudioInputButtonProps> = ({
  onTextReceived,
  onRecordingStart,
  onRecordingStop,
  webhookUrl, // Wird jetzt dynamisch oder über Props gesetzt, Fallback falls nicht
  className,
}) => {
  const supabaseProjectRef = 'teaqwenzylfwhsvsdoni'; // Dein Supabase Projekt-Ref
  const effectiveWebhookUrl = webhookUrl || `https://${supabaseProjectRef}.supabase.co/functions/v1/transcribe-audio`;
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Für Ladezustand während des Sendens
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleMicClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error('Audioaufnahme wird von diesem Browser nicht unterstützt.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      onRecordingStart?.();
      toast.info('Audioaufnahme gestartet...');

      audioChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        stream.getTracks().forEach(track => track.stop()); // Mikrofon-Zugriff beenden
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // oder audio/wav etc.
        audioChunksRef.current = []; // Chunks zurücksetzen
        await sendAudioToWebhook(audioBlob);
      };

      mediaRecorderRef.current.start();

    } catch (err) {
      console.error('Fehler beim Starten der Audioaufnahme:', err);
      toast.error('Mikrofonzugriff verweigert oder Fehler beim Start.');
      setIsRecording(false); // Zustand zurücksetzen
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      onRecordingStop?.();
      toast.info('Audioaufnahme beendet.');
    }
  };

  const sendAudioToWebhook = async (audioBlob: Blob) => {
    if (audioBlob.size === 0) {
      toast.error('Keine Audiodaten zum Senden vorhanden.');
      return;
    }
    setIsLoading(true);
    toast.info('Sende Audio zur Transkription...');

    const formData = new FormData();
    formData.append('audioFile', audioBlob, 'recording.webm'); // Dateiname ist optional aber gut

    try {
      const response = await fetch(effectiveWebhookUrl, {
        method: 'POST',
        body: formData,
        // Wichtig: 'Content-Type' Header wird von fetch automatisch für FormData gesetzt.
        // Manuell setzen kann zu Problemen führen (z.B. fehlende Boundary).
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unbekannter Fehler beim Verarbeiten der Antwort.' }));
        console.error('Fehler von der Edge Function:', response.status, errorData);
        toast.error(`Fehler (${response.status}): ${errorData.error || 'Audio konnte nicht transkribiert werden.'}`);
        return;
      }

      const result = await response.json();

      if (result.transcribedText) {
        onTextReceived(result.transcribedText);
        toast.success('Transkribierter Text erfolgreich empfangen!');
      } else if (result.error) {
        console.error('Fehler in der Antwort der Edge Function:', result.error);
        toast.error(`Fehler: ${result.error}`);
      } else {
        toast.error('Unerwartete Antwort vom Server erhalten.');
      }

    } catch (error) {
      setIsLoading(false);
      console.error('Netzwerkfehler oder anderer Fehler beim Senden des Audios:', error);
      toast.error('Netzwerkfehler oder Client-Fehler beim Senden des Audios.');
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleMicClick}
      disabled={isLoading} // Button deaktivieren während des Ladens
      className={className}
      aria-label={isRecording ? 'Aufnahme stoppen' : 'Audioaufnahme starten'}
    >
      {isRecording ? (
        <Square className="h-5 w-5 text-red-500 animate-pulse" />
      ) : (
        <Mic className={`h-5 w-5 ${isLoading ? 'text-gray-400' : ''}`} />
      )}
    </Button>
  );
};

export default AudioInputButton;