import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import type { ConfigSection } from '@/types/expertTemplateTypes';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label'; // Label importieren

const ProductUsageStoryPage: React.FC = () => {
  const { toast } = useToast();

  // State für Sektion 1: Produkt und Problem
  const [productName, setProductName] = useState('');
  const [specificProblem, setSpecificProblem] = useState('');
  const [idealCustomer, setIdealCustomer] = useState('');
  const [customerLifeBefore, setCustomerLifeBefore] = useState('');

  // State für Sektion 2: Lösung und Nutzen
  const [howProductSolves, setHowProductSolves] = useState('');
  const [benefitsAfterUse, setBenefitsAfterUse] = useState('');
  const [highlightFeature, setHighlightFeature] = useState('');

  // State für Sektion 3: Story-Elemente
  const [storyTone, setStoryTone] = useState('');
  const [coreMessage, setCoreMessage] = useState('');

  // Hilfsfunktion zum Rendern der Felder
  const renderField = (field: { label: string; id: string; element: React.ReactNode; description: string }) => (
    <div key={field.id} className="space-y-2 mb-4">
      <Label htmlFor={field.id}>{field.label}</Label>
      {field.element}
      <p className="text-sm text-muted-foreground">{field.description}</p>
    </div>
  );

  const configSections: ConfigSection[] = [
    {
      id: 'productAndProblem',
      title: 'Produkt und Problem',
      contentSlot: (
        <>
          {renderField({
            label: 'Name des Produkts/Dienstleistung',
            id: 'productName',
            element: <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="z.B. SuperCleaner X" />,
            description: 'Geben Sie den Namen Ihres Produkts oder Ihrer Dienstleistung ein.',
          })}
          {renderField({
            label: 'Spezifisches Problem, das gelöst wird',
            id: 'specificProblem',
            element: <Textarea id="specificProblem" value={specificProblem} onChange={(e) => setSpecificProblem(e.target.value)} placeholder="Beschreiben Sie das Kernproblem, das Ihr Produkt adressiert." />,
            description: 'Welches konkrete Problem Ihrer Zielgruppe löst Ihr Produkt?',
          })}
          {renderField({
            label: 'Idealer Zielkunde',
            id: 'idealCustomer',
            element: <Textarea id="idealCustomer" value={idealCustomer} onChange={(e) => setIdealCustomer(e.target.value)} placeholder="Beschreiben Sie Ihren idealen Kunden." />,
            description: 'Wer ist die Hauptzielgruppe für dieses Produkt?',
          })}
          {renderField({
            label: 'Leben/Arbeit des Kunden VOR dem Produkt (Schmerzpunkte)',
            id: 'customerLifeBefore',
            element: <Textarea id="customerLifeBefore" value={customerLifeBefore} onChange={(e) => setCustomerLifeBefore(e.target.value)} placeholder="Welche Herausforderungen und Frustrationen hatte der Kunde?" />,
            description: 'Beschreiben Sie die Situation und die Schmerzpunkte des Kunden, bevor er Ihr Produkt kannte.',
          })}
        </>
      ),
    },
    {
      id: 'solutionAndBenefit',
      title: 'Lösung und Nutzen',
      contentSlot: (
        <>
          {renderField({
            label: 'Wie löst Ihr Produkt das Problem (Hauptmerkmale)?',
            id: 'howProductSolves',
            element: <Textarea id="howProductSolves" value={howProductSolves} onChange={(e) => setHowProductSolves(e.target.value)} placeholder="Erklären Sie, wie Ihr Produkt das beschriebene Problem löst." />,
            description: 'Beschreiben Sie die Funktionsweise und die wichtigsten Merkmale Ihres Produkts.',
          })}
          {renderField({
            label: 'Konkreter Nutzen & positive Ergebnisse NACH Nutzung',
            id: 'benefitsAfterUse',
            element: <Textarea id="benefitsAfterUse" value={benefitsAfterUse} onChange={(e) => setBenefitsAfterUse(e.target.value)} placeholder="Welche positiven Veränderungen erlebt der Kunde?" />,
            description: 'Welche konkreten Vorteile und Verbesserungen erfährt der Kunde durch die Nutzung?',
          })}
          {renderField({
            label: 'Besonders hervorzuhebendes Feature (optional)',
            id: 'highlightFeature',
            element: <Input id="highlightFeature" value={highlightFeature} onChange={(e) => setHighlightFeature(e.target.value)} placeholder="z.B. KI-gestützte Analyse" />,
            description: 'Gibt es ein einzigartiges Merkmal, das besonders betont werden soll?',
          })}
        </>
      ),
    },
    {
      id: 'storyElements',
      title: 'Story-Elemente',
      contentSlot: (
        <>
          {renderField({
            label: 'Gewünschter Ton der Geschichte',
            id: 'storyTone',
            element: (
              <Select value={storyTone} onValueChange={setStoryTone}>
                <SelectTrigger id="storyTone">
                  <SelectValue placeholder="Wählen Sie einen Ton" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inspirierend">Inspirierend</SelectItem>
                  <SelectItem value="informativ">Informativ</SelectItem>
                  <SelectItem value="humorvoll">Humorvoll</SelectItem>
                  <SelectItem value="einfuehlsam">Einfühlsam</SelectItem>
                  <SelectItem value="direkt">Direkt</SelectItem>
                </SelectContent>
              </Select>
            ),
            description: 'Wählen Sie die Tonalität, die Ihre Geschichte haben soll.',
          })}
          {renderField({
            label: 'Kernbotschaft dieser Nutzengeschichte',
            id: 'coreMessage',
            element: <Input id="coreMessage" value={coreMessage} onChange={(e) => setCoreMessage(e.target.value)} placeholder="Was ist die wichtigste Aussage?" />,
            description: 'Formulieren Sie die zentrale Botschaft, die beim Leser ankommen soll.',
          })}
        </>
      ),
    },
  ];

  const handleGenerateProductUsageStory = async () => {
    const formData = {
      productName,
      specificProblem,
      idealCustomer,
      customerLifeBefore,
      howProductSolves,
      benefitsAfterUse,
      highlightFeature,
      storyTone,
      coreMessage,
    };

    console.log('Formulardaten für Produktnutzengeschichte:', formData);

    toast({
      title: 'Produktnutzengeschichte generiert (Simulation)',
      description: 'Die Daten wurden erfolgreich in der Konsole ausgegeben.',
      duration: 5000,
    });
  };

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Produktnutzengeschichte erstellen"
      pageDescription="Zeigen Sie anschaulich, wie Ihr Produkt/Ihre Dienstleistung Kundenprobleme löst und Leben verbessert."
      primaryActionLabel="Produktnutzengeschichte generieren"
      configSections={configSections}
      onGenerate={handleGenerateProductUsageStory}
      savedContentType="product-usage-story"
      expertIdentifier="product-usage-story-generator"
      isLoading={false}
    />
  );
};

export default ProductUsageStoryPage;
