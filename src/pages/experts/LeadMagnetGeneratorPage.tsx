import React, { useState } from 'react';
import { ProductFocusedGeneratorPage } from '@/components/expert_templates/ProductFocusedGeneratorPage';
import type { ProductFocusedGeneratorPageProps } from '@/components/expert_templates/ProductFocusedGeneratorPage';

const sampleUserProducts = [
  { value: 'prod1', label: 'Produkt Alpha' },
  { value: 'prod2', label: 'Dienstleistung Beta' },
  { value: 'prod3', label: 'Software Gamma' },
];

const LeadMagnetGeneratorPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Example state for knowledge base, if needed by the page itself
  // const [knowledgeBaseId, setKnowledgeBaseId] = useState<string | undefined>('kb-marketing-general');
  // const [knowledgeBaseContent, setKnowledgeBaseContent] = useState<string | undefined>('Initial marketing knowledge...');

  const handleGenerateLeadMagnet: ProductFocusedGeneratorPageProps['onGenerate'] = async (data) => {
    setIsLoading(true);
    setError(null);
    console.log("Lead Magnet Generierungsdaten:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Example: setError("Ein Fehler ist aufgetreten.");
    // return Promise.resolve(); // Already returns promise due to async
  };

  const handleKbDataChange: ProductFocusedGeneratorPageProps['onKnowledgeBaseDataChange'] = (kbData) => {
    console.log('Knowledge Base Data Changed:', kbData);
    // Here you could, for example, save the kbData.text to a backend if kbData.isActive
    // or update local state if needed for other parts of this specific page.
    // For this example, we'll just log it.
    // if (kbData.isActive && kbData.id) {
    //   setKnowledgeBaseId(kbData.id);
    //   setKnowledgeBaseContent(kbData.text);
    // } else {
    //   setKnowledgeBaseId(undefined);
    //   setKnowledgeBaseContent(undefined);
    // }
  };

  return (
    <ProductFocusedGeneratorPage
      pageTitle="Lead Magnet Generator"
      pageDescription="Erstelle überzeugende Lead Magnets basierend auf deinen Produkten und spezifischen Anweisungen."
      stepIndicator={{ current: 1, total: 3 }}
      productSelectLabel="Wähle ein Produkt/Dienstleistung für den Lead Magnet"
      userProducts={sampleUserProducts}
      // onProductChange={(productId) => console.log('Selected product ID:', productId)}
      mainInstructionsTextareaLabel="Spezifische Details und Anweisungen für diesen Lead Magnet"
      mainInstructionsTextareaPlaceholder="z.B. Zielgruppe, Hauptvorteile, gewünschter Call-to-Action, Tonalität..."
      primaryActionLabel="Lead Magnet generieren"
      onGenerate={handleGenerateLeadMagnet}
      savedContentType="lead-magnet"
      expertIdentifier="lead-magnet-generator"
      isLoading={isLoading}
      error={error}
      // Knowledge Base related props
      initialKnowledgeBaseId="global-marketing-kb" // Example: Pre-select a KB
      knowledgeBaseSectionLabel="Marketing-Wissensbasis für Lead Magnets"
      onKnowledgeBaseDataChange={handleKbDataChange}
      // Example of passing other ExpertPageShellProps if needed
      savedContentLinkText="Meine Lead Magnets"
    />
  );
};

export default LeadMagnetGeneratorPage;