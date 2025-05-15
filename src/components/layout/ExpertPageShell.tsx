import React from 'react';
import { Link } from 'react-router-dom'; // Annahme: react-router-dom wird für Links verwendet
import { ExpertPageShellProps } from '@/types/expertPageShell.types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react'; // Beispiel für ein Lade-Icon

export const ExpertPageShell: React.FC<ExpertPageShellProps> = ({
  title,
  description,
  savedContentType,
  savedContentLinkText,
  isLoading,
  error,
  children,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  showKnowledgeBaseToggle,
  knowledgeBaseLabel = "Wissensdatenbank aktivieren",
  knowledgeBaseText,
  onKnowledgeBaseTextChange,
  isKnowledgeBaseActive,
  onKnowledgeBaseToggle,
}) => {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Header-Bereich mit Titel, Beschreibung und optionalem Link zu gespeicherten Inhalten */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          {description && (
            <div className="text-muted-foreground mb-4">{description}</div>
          )}
        </div>
        {savedContentType && savedContentLinkText && (
          <Link to={`/saved-content?type=${savedContentType}`}>
            <Button variant="outline" size="sm">
              {savedContentLinkText}
            </Button>
          </Link>
        )}
      </div>

      {/* Fehlermeldung */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Fehler</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Hauptinhaltsbereich */}
      <div className="mb-8">{children}</div>

      {/* Knowledge Base Sektion */}
      {showKnowledgeBaseToggle && (
        <div className="mb-8 p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="knowledge-base-toggle" className="font-semibold">
              {knowledgeBaseLabel}
            </label>
            <Switch
              id="knowledge-base-toggle"
              checked={isKnowledgeBaseActive}
              onCheckedChange={onKnowledgeBaseToggle}
              disabled={isLoading}
            />
          </div>
          {isKnowledgeBaseActive && (
            <Textarea
              placeholder="Füge hier Text für die Wissensdatenbank ein..."
              value={knowledgeBaseText}
              onChange={(e) => onKnowledgeBaseTextChange?.(e.target.value)}
              className="mt-2 min-h-[100px]"
              disabled={isLoading}
            />
          )}
        </div>
      )}

      {/* Aktionsbuttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => onPrimaryAction(isKnowledgeBaseActive ? knowledgeBaseText : undefined)}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {primaryActionLabel}
        </Button>
        {secondaryActionLabel && onSecondaryAction && (
          <Button
            variant="outline"
            onClick={onSecondaryAction}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};