import React, { useState } from 'react';
import { ExpertPageShell } from '@/components/layout/ExpertPageShell';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const DummyExpertToolPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [knowledgeBaseText, setKnowledgeBaseText] = useState('');
  const [isKnowledgeBaseActive, setIsKnowledgeBaseActive] = useState(false);

  const handleToggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  const handleSetError = () => {
    setError('Dies ist eine Test-Fehlermeldung.');
  };

  const handleClearError = () => {
    setError(null);
  };

  const handlePrimaryAction = () => {
    console.log('Primäre Aktion ausgeführt');
  };

  const handleSecondaryAction = () => {
    console.log('Sekundäre Aktion ausgeführt');
  };

  return (
    <ExpertPageShell
      title="Dummy Experten-Tool"
      description="Dies ist eine Testseite für den ExpertPageShell."
      isLoading={isLoading}
      error={error}
      primaryActionLabel="Primäre Aktion Test"
      onPrimaryAction={handlePrimaryAction}
      secondaryActionLabel="Sekundäre Aktion Test"
      onSecondaryAction={handleSecondaryAction}
      savedContentType="dummy-content"
      savedContentLinkText="Meine Dummy-Inhalte"
      showKnowledgeBaseToggle={true}
      knowledgeBaseLabel="Meine Dummy Wissensdatenbank"
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={setKnowledgeBaseText}
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={setIsKnowledgeBaseActive}
    >
      <div className="space-y-4 p-4">
        <h2 className="text-xl font-semibold">Test-Steuerelemente</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={handleToggleLoading}>
            {isLoading ? 'Laden stoppen' : 'Laden simulieren'}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSetError} variant="destructive">
            Fehler simulieren
          </Button>
          {error && (
            <Button onClick={handleClearError} variant="outline">
              Fehler löschen
            </Button>
          )}
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="kb-text-area">Wissensdatenbank Text:</Label>
            <Textarea 
                id="kb-text-area"
                value={knowledgeBaseText}
                onChange={(e) => setKnowledgeBaseText(e.target.value)}
                placeholder="Text für die Wissensdatenbank eingeben..."
                disabled={!isKnowledgeBaseActive}
            />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="kb-toggle"
            checked={isKnowledgeBaseActive}
            onCheckedChange={setIsKnowledgeBaseActive}
          />
          <Label htmlFor="kb-toggle">Wissensdatenbank aktiv</Label>
        </div>

        <p>
          Dies ist der Inhaltsbereich der Dummy-Seite. Hier können weitere Tests oder
          Demonstrationen platziert werden.
        </p>
      </div>
    </ExpertPageShell>
  );
};

export default DummyExpertToolPage;