import React, { useState } from 'react';
import { SimpleFormGeneratorPage } from '@/components/expert_templates/SimpleFormGeneratorPage';
import { FormFieldConfig } from '@/types/expertTemplateTypes';
import { GenerationData } from '@/types/expertToolTypes';

const ideaFormFields: FormFieldConfig[] = [
  { id: 'ideaTopic', label: 'Thema der Idee', type: 'text', placeholder: 'z.B. Nachhaltige Verpackungen', required: true },
  { id: 'ideaDetails', label: 'Weitere Details (optional)', type: 'textarea', placeholder: 'Beschreibe deine Idee genauer...' },
];

const SimpleIdeaGeneratorPage: React.FC = () => {
  const [knowledgeBaseText, setKnowledgeBaseText] = useState('');
  const [isKnowledgeBaseActive, setIsKnowledgeBaseActive] = useState(false);

  const handleGenerateIdea = async (data: Record<string, any> & { knowledgeBase?: string }) => {
    console.log("Generierungsdaten:", data);
    // Hier könnte die Logik zum Speichern oder Weiterverarbeiten der Idee stehen
    // Für dieses Beispiel geben wir nur ein Promise.resolve() zurück
    return Promise.resolve();
  };

  return (
    <SimpleFormGeneratorPage
      title="Ideen Generator"
      description="Generiere neue Ideen basierend auf einem Thema und optionalen Details."
      formFields={ideaFormFields}
      primaryActionLabel="Idee generieren"
      onGenerate={handleGenerateIdea}
      savedContentType="simple-idea"
      expertIdentifier="SimpleIdeaGeneratorPage"
      // Wissensdatenbank Props
      showKnowledgeBaseToggle={true}
      knowledgeBaseText={knowledgeBaseText}
      onKnowledgeBaseTextChange={setKnowledgeBaseText}
      isKnowledgeBaseActive={isKnowledgeBaseActive}
      onKnowledgeBaseToggle={() => setIsKnowledgeBaseActive(!isKnowledgeBaseActive)}
      knowledgeBaseLabel="Wissensdatenbank für Ideenfindung nutzen"
      // Props für den ExpertPageShell, die nicht direkt von SimpleFormGeneratorPage benötigt werden
      // aber für die korrekte Funktionsweise des Shells wichtig sein könnten (z.B. Links)
      savedContentLinkText="Meine generierten Ideen" // Beispiel
    />
  );
};

export default SimpleIdeaGeneratorPage;