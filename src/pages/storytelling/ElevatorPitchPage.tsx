import React, { useState } from 'react';
import { MultiStepConfigGeneratorPage } from '@/components/expert_templates/MultiStepConfigGeneratorPage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast'; // Korrekter Importpfad für toast

const ElevatorPitchPage: React.FC = () => {
  const [companyOrProduct, setCompanyOrProduct] = useState('');
  const [problemToSolve, setProblemToSolve] = useState('');
  const [solution, setSolution] = useState('');
  const [usp, setUsp] = useState('');
  const [pitchGoal, setPitchGoal] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const handleGenerate = async () => {
    const formData = {
      companyOrProduct,
      problemToSolve,
      solution,
      usp,
      pitchGoal,
      targetAudience,
    };
    console.log('Formulardaten für Elevator-Pitch:', formData);
    // Hier würde normalerweise der API-Aufruf zur Generierung erfolgen
    // Fürs Erste simulieren wir die Generierung
    toast({
      title: "Elevator-Pitch Generierung",
      description: "Ihr Elevator-Pitch wird simuliert generiert.",
      variant: "default", // oder "success"
    });
  };

  const configSections = [
    {
      id: 'coreInfoPitch',
      title: 'Kerninformationen für den Pitch',
      contentSlot: (
        <div className="space-y-4">
          <div>
            <label htmlFor="companyOrProduct" className="block text-sm font-medium text-gray-300">Wer sind Sie / Was ist Ihr Unternehmen/Produkt?</label>
            <Textarea
              id="companyOrProduct"
              value={companyOrProduct}
              onChange={(e) => setCompanyOrProduct(e.target.value)}
              placeholder="Beschreiben Sie Ihr Unternehmen oder Produkt."
              className="text-white mt-1"
            />
          </div>
          <div>
            <label htmlFor="problemToSolve" className="block text-sm font-medium text-gray-300">Welches Problem lösen Sie?</label>
            <Textarea
              id="problemToSolve"
              value={problemToSolve}
              onChange={(e) => setProblemToSolve(e.target.value)}
              placeholder="Welches spezifische Problem adressieren Sie?"
              className="text-white mt-1"
            />
          </div>
          <div>
            <label htmlFor="solution" className="block text-sm font-medium text-gray-300">Ihre Lösung?</label>
            <Textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Wie sieht Ihre Lösung aus?"
              className="text-white mt-1"
            />
          </div>
          <div>
            <label htmlFor="usp" className="block text-sm font-medium text-gray-300">Ihr Alleinstellungsmerkmal (USP)?</label>
            <Textarea
              id="usp"
              value={usp}
              onChange={(e) => setUsp(e.target.value)}
              placeholder="Was macht Ihre Lösung einzigartig?"
              className="text-white mt-1"
            />
          </div>
          <div>
            <label htmlFor="pitchGoal" className="block text-sm font-medium text-gray-300">Ziel des Pitches (Call to Action)?</label>
            <Input
              id="pitchGoal"
              value={pitchGoal}
              onChange={(e) => setPitchGoal(e.target.value)}
              placeholder="Was soll der Zuhörer als Nächstes tun?"
              className="text-white mt-1"
            />
          </div>
          <div>
            <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-300">Zielgruppe des Pitches</label>
            <Input
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="An wen richtet sich der Pitch?"
              className="text-white mt-1"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <MultiStepConfigGeneratorPage
      pageTitle="Elevator-Pitch erstellen"
      pageDescription="Entwickeln Sie einen prägnanten Elevator-Pitch (30-60 Sek.), um Ihr Unternehmen oder Produkt zu präsentieren."
      primaryActionLabel="Elevator-Pitch generieren"
      configSections={configSections}
      onGenerate={handleGenerate}
      savedContentType="elevator-pitch"
      expertIdentifier="elevator-pitch-generator"
      isLoading={false} // Beispielwert, sollte dynamisch sein
      // showKnowledgeBaseToggle={true} // Standardwert ist true, kann explizit gesetzt werden
      // knowledgeBaseLabel="Wissensdatenbank für Pitch-Elemente nutzen" // Optional
    />
  );
};

export default ElevatorPitchPage;
