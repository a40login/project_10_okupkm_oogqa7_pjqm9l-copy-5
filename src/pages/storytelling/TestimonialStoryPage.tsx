import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const TestimonialStoryPage: React.FC = () => {
  // Section 1: Kunde und Ausgangslage
  const [customerName, setCustomerName] = useState('');
  const [customerIndustry, setCustomerIndustry] = useState('');
  const [customerChallenge, setCustomerChallenge] = useState('');
  const [customerConcerns, setCustomerConcerns] = useState('');

  // Section 2: Lösung und Ergebnisse
  const [implementedSolution, setImplementedSolution] = useState('');
  const [measurableResults, setMeasurableResults] = useState('');
  const [qualitativeBenefits, setQualitativeBenefits] = useState('');
  const [customerQuote, setCustomerQuote] = useState('');

  // Section 3: Storytelling-Aspekte
  const [storyMessage, setStoryMessage] = useState('');
  const [collaborationAspect, setCollaborationAspect] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  // Error state (optional, but good practice)
  const [error, setError] = useState<string | null>(null);


  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    const formData = {
      customerName,
      customerIndustry,
      customerChallenge,
      customerConcerns,
      implementedSolution,
      measurableResults,
      qualitativeBenefits,
      customerQuote,
      storyMessage,
      collaborationAspect,
    };
    console.log('Form Data:', formData);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Referenzgeschichte generiert (Simulation)!', {
        description: 'Die Daten wurden in der Konsole ausgegeben.',
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Ein unbekannter Fehler ist aufgetreten.';
      setError(errorMessage);
      toast.error('Fehler bei der Generierung.', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const configSections = [
    {
      id: 'customer-context',
      title: 'Kunde und Ausgangslage',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="customerName">Name des Kunden/Unternehmens</Label>
            <Input id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="z.B. Mustermann GmbH" />
          </div>
          <div>
            <Label htmlFor="customerIndustry">Branche/Hintergrund des Kunden</Label>
            <Input id="customerIndustry" value={customerIndustry} onChange={(e) => setCustomerIndustry(e.target.value)} placeholder="z.B. Softwareentwicklung" />
          </div>
          <div>
            <Label htmlFor="customerChallenge">Herausforderung/Problem des Kunden VOR Ihrer Lösung</Label>
            <Textarea id="customerChallenge" value={customerChallenge} onChange={(e) => setCustomerChallenge(e.target.value)} placeholder="Beschreiben Sie die ursprüngliche Situation..." />
          </div>
          <div>
            <Label htmlFor="customerConcerns">Mögliche Bedenken des Kunden VOR Entscheidung (optional)</Label>
            <Textarea id="customerConcerns" value={customerConcerns} onChange={(e) => setCustomerConcerns(e.target.value)} placeholder="z.B. Preis, Implementierungsaufwand..." />
          </div>
        </div>
      ),
    },
    {
      id: 'solution-results',
      title: 'Lösung und Ergebnisse',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="implementedSolution">Implementierte Lösung (Ihr Produkt/Service)</Label>
            <Textarea id="implementedSolution" value={implementedSolution} onChange={(e) => setImplementedSolution(e.target.value)} placeholder="Beschreiben Sie, wie Ihre Lösung geholfen hat..." />
          </div>
          <div>
            <Label htmlFor="measurableResults">Konkrete, messbare Ergebnisse</Label>
            <Textarea id="measurableResults" value={measurableResults} onChange={(e) => setMeasurableResults(e.target.value)} placeholder="z.B. Umsatzsteigerung um 20%, Zeitersparnis von 10 Std./Woche..." />
          </div>
          <div>
            <Label htmlFor="qualitativeBenefits">Qualitative Vorteile/positive Effekte</Label>
            <Textarea id="qualitativeBenefits" value={qualitativeBenefits} onChange={(e) => setQualitativeBenefits(e.target.value)} placeholder="z.B. Verbessertes Team-Moral, höhere Kundenzufriedenheit..." />
          </div>
          <div>
            <Label htmlFor="customerQuote">Direktes Zitat des Kunden (Kern-Testimonial)</Label>
            <Textarea id="customerQuote" value={customerQuote} onChange={(e) => setCustomerQuote(e.target.value)} placeholder="'Ihr Produkt hat unser Geschäft revolutioniert!' - Max Mustermann" />
          </div>
        </div>
      ),
    },
    {
      id: 'storytelling-aspects',
      title: 'Storytelling-Aspekte',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="storyMessage">Wichtigste Botschaft der Referenzgeschichte</Label>
            <Input id="storyMessage" value={storyMessage} onChange={(e) => setStoryMessage(e.target.value)} placeholder="Was soll der Leser mitnehmen?" />
          </div>
          <div>
            <Label htmlFor="collaborationAspect">Hervorzuhebender Aspekt der Zusammenarbeit (optional)</Label>
            <Input id="collaborationAspect" value={collaborationAspect} onChange={(e) => setCollaborationAspect(e.target.value)} placeholder="z.B. Exzellenter Support, schnelle Umsetzung..." />
          </div>
        </div>
      ),
    },
  ];

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Referenzgeschichte (Testimonial) aufbereiten"
      pageDescription="Transformieren Sie Kundenerfolge in überzeugende Geschichten, die Vertrauen potenzieller Kunden stärken."
      primaryActionLabel="Referenzgeschichte generieren"
      configSections={configSections}
      onGenerate={handleGenerate}
      savedContentType="testimonial-story"
      expertIdentifier="testimonial-story-generator"
      isLoading={isLoading}
      error={error} // Pass error state as well
    />
  );
};

export default TestimonialStoryPage;
