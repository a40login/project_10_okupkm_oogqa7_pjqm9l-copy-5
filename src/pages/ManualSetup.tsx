import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, ChevronRight, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ManualSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState('brand-voice');
  const [progress, setProgress] = useState(20);
  const [loading, setLoading] = useState(false);

  // Form values
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('');
  const [language, setLanguage] = useState('formal');
  const [useHumor, setUseHumor] = useState('occasionally');
  const [targetAudience, setTargetAudience] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [technicalTerms, setTechnicalTerms] = useState('');
  const [brandValues, setBrandValues] = useState<string[]>([]);
  const [callToActions, setCallToActions] = useState<string[]>([]);
  const [preferredPhrases, setPreferredPhrases] = useState('');
  const [avoidPhrases, setAvoidPhrases] = useState('');

  // Handle step navigation
  const handleNextStep = (step: string) => {
    setCurrentStep(step);
    
    // Update progress based on step
    switch (step) {
      case 'brand-voice':
        setProgress(20);
        break;
      case 'writing-style':
        setProgress(40);
        break;
      case 'brand-values':
        setProgress(60);
        break;
      case 'content-guidelines':
        setProgress(80);
        break;
      case 'confirmation':
        setProgress(100);
        break;
    }

    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Fehler",
          description: "Bitte melde dich an, um dein Profil zu speichern.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      const user_id = session.user.id;
      
      // Save all the form data to the company_profiles table
      const { error } = await supabase
        .from('company_profiles')
        .insert({
          user_id,
          company_name: companyName,
          industry,
          tone,
          language,
          use_humor: useHumor,
          target_audience: targetAudience,
          writing_style: writingStyle,
          technical_terms: technicalTerms,
          brand_values: brandValues,
          call_to_actions: callToActions,
          preferred_phrases: preferredPhrases,
          avoid_phrases: avoidPhrases
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Fehler",
          description: "Dein Profil konnte nicht gespeichert werden.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profil-Einrichtung abgeschlossen",
          description: "Ihr Unternehmensprofil wurde erfolgreich erstellt."
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error during profile completion:', error);
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-flowhero-darker">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Manuelle Ersteinrichtung</h1>
        <p className="text-gray-300 mb-6">
          Passen Sie Ihr Unternehmensprofil und Ihre Marken-Stimme nach Ihren Vorstellungen an.
        </p>
        
        {/* Progress indicator */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-flowhero-card" />
          
          <div className="flex justify-between mt-4">
            <div 
              className={`flex flex-col items-center ${currentStep === 'brand-voice' ? 'text-flowhero-orange' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'brand-voice' || progress >= 20 ? 'bg-flowhero-orange' : 'bg-flowhero-card'}`}>
                <span className="text-white">1</span>
              </div>
              <span className="mt-1 text-xs">Marken-Stimme</span>
            </div>
            
            <div 
              className={`flex flex-col items-center ${currentStep === 'writing-style' ? 'text-flowhero-orange' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${progress >= 40 ? 'bg-flowhero-orange' : 'bg-flowhero-card'}`}>
                <span className="text-white">2</span>
              </div>
              <span className="mt-1 text-xs">Schreibstil</span>
            </div>
            
            <div 
              className={`flex flex-col items-center ${currentStep === 'brand-values' ? 'text-flowhero-orange' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${progress >= 60 ? 'bg-flowhero-orange' : 'bg-flowhero-card'}`}>
                <span className="text-white">3</span>
              </div>
              <span className="mt-1 text-xs">Markenwerte</span>
            </div>
            
            <div 
              className={`flex flex-col items-center ${currentStep === 'content-guidelines' ? 'text-flowhero-orange' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${progress >= 80 ? 'bg-flowhero-orange' : 'bg-flowhero-card'}`}>
                <span className="text-white">4</span>
              </div>
              <span className="mt-1 text-xs">Inhaltsrichtlinien</span>
            </div>
            
            <div 
              className={`flex flex-col items-center ${currentStep === 'confirmation' ? 'text-flowhero-orange' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${progress >= 100 ? 'bg-flowhero-orange' : 'bg-flowhero-card'}`}>
                <span className="text-white">5</span>
              </div>
              <span className="mt-1 text-xs">Bestätigung</span>
            </div>
          </div>
        </div>
        
        {/* Step 1: Brand Voice */}
        {currentStep === 'brand-voice' && (
          <Card className="bg-flowhero-card border-flowhero-card mb-6">
            <CardHeader>
              <CardTitle className="text-white">1. Ansprache & Tonalität</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-white">Wie heißt dein Unternehmen?</Label>
                <Input 
                  id="companyName" 
                  placeholder="Dein Unternehmensname" 
                  value={companyName} 
                  onChange={e => setCompanyName(e.target.value)} 
                  className="bg-flowhero-darker border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-white">In welcher Branche bist du tätig?</Label>
                <Input 
                  id="industry" 
                  placeholder="z.B. Marketing, IT, Beratung" 
                  value={industry} 
                  onChange={e => setIndustry(e.target.value)} 
                  className="bg-flowhero-darker border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Wie sprichst du deine Kunden an?</Label>
                <p className="text-sm text-gray-400">Diese Wahl beeinflusst die gesamte Kommunikation</p>
                <Select defaultValue={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectValue placeholder="Wähle eine Ansprache" />
                  </SelectTrigger>
                  <SelectContent className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectItem value="informal">Du (informell) – Locker, nahbar, ideal für B2C, Startups, jüngere Zielgruppen</SelectItem>
                    <SelectItem value="formal">Sie (formell) – Professionell, respektvoll, ideal für B2B, Finanzsektor</SelectItem>
                    <SelectItem value="mixed">Gemischt – Je nach Kontext unterschiedlich</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Wie ist dein genereller Sprachstil?</Label>
                <p className="text-sm text-gray-400">Hier kann der User bestimmen, wie die AI klingt</p>
                <Select defaultValue={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectValue placeholder="Wähle einen Sprachstil" />
                  </SelectTrigger>
                  <SelectContent className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectItem value="professional">Vertrauensvoll & seriös – Beruhigend, mit Fokus auf Glaubwürdigkeit</SelectItem>
                    <SelectItem value="friendly">Freundlich & zugänglich – Warm, einladend, konversationell</SelectItem>
                    <SelectItem value="dynamic">Dynamisch & motivierend – Energisch, inspirierend, aktivierend</SelectItem>
                    <SelectItem value="minimal">Minimalistisch & prägnant – Auf den Punkt, ohne Füllwörter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Darf Humor verwendet werden?</Label>
                <p className="text-sm text-gray-400">Bestimmt, ob Christian.AI humorvoll antworten darf</p>
                <Select defaultValue={useHumor} onValueChange={setUseHumor}>
                  <SelectTrigger className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectValue placeholder="Humoreinstellungen wählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectItem value="yes">Ja, gerne – Der Bot darf witzige, spielerische Elemente einbauen</SelectItem>
                    <SelectItem value="occasionally">Gelegentlich, wenn es passt – Subtiler Humor, aber mit Feingefühl</SelectItem>
                    <SelectItem value="no">Nein, bitte sachlich bleiben – Kein Humor, reine Sachlichkeit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience" className="text-white">Wer ist deine Zielgruppe?</Label>
                <Textarea 
                  id="targetAudience" 
                  placeholder="Beschreibe deine typischen Kunden oder Zielgruppen" 
                  value={targetAudience} 
                  onChange={e => setTargetAudience(e.target.value)} 
                  className="bg-flowhero-darker border-gray-700 text-white min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={() => handleNextStep('writing-style')} 
                className="bg-flowhero-orange hover:bg-flowhero-orange/90"
              >
                Weiter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Step 2: Writing Style */}
        {currentStep === 'writing-style' && (
          <Card className="bg-flowhero-card border-flowhero-card mb-6">
            <CardHeader>
              <CardTitle className="text-white">2. Schreibstil & Satzstruktur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="space-y-2">
                <Label className="text-white">Wie komplex sollen die Sätze sein?</Label>
                <p className="text-sm text-gray-400">Beeinflusst, wie leicht verständlich oder anspruchsvoll die Texte sind</p>
                <Select defaultValue={writingStyle} onValueChange={setWritingStyle}>
                  <SelectTrigger className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectValue placeholder="Wähle einen Schreibstil" />
                  </SelectTrigger>
                  <SelectContent className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectItem value="simple">Einfach & kurz – Kurze, leicht verständliche Sätze</SelectItem>
                    <SelectItem value="medium">Mittellang & ausgewogen – Gut lesbare, natürliche Sätze</SelectItem>
                    <SelectItem value="complex">Elaboriert & detailliert – Komplexere Satzstrukturen für anspruchsvolle Inhalte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Soll Fachsprache verwendet werden?</Label>
                <p className="text-sm text-gray-400">Bestimmt, wie technisch oder allgemeinverständlich der KI-Agent antwortet</p>
                <Select defaultValue={technicalTerms} onValueChange={setTechnicalTerms}>
                  <SelectTrigger className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectValue placeholder="Wähle den Fachsprache-Grad" />
                  </SelectTrigger>
                  <SelectContent className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectItem value="none">Keine Fachsprache – Einfache, allgemeinverständliche Sprache</SelectItem>
                    <SelectItem value="moderate">Mischung: Fachlich fundiert, aber verständlich</SelectItem>
                    <SelectItem value="high">Hoher Fachsprachenanteil – Expertenlevel, spezifische Terminologie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label className="text-white block">Sprachliche Besonderheiten</Label>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="active-voice" />
                  <label
                    htmlFor="active-voice"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                  >
                    Bevorzugt Aktivform verwenden (statt Passivform)
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="short-sentences" />
                  <label
                    htmlFor="short-sentences"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                  >
                    Kurze, prägnante Sätze bevorzugen
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="storytelling" />
                  <label
                    htmlFor="storytelling"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                  >
                    Storytelling-Elemente einbauen
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="metaphors" />
                  <label
                    htmlFor="metaphors"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                  >
                    Metaphern und Vergleiche nutzen
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customWritingNotes" className="text-white">Weitere Hinweise zum gewünschten Schreibstil</Label>
                <Textarea 
                  id="customWritingNotes"
                  placeholder="Gibt es weitere sprachliche Besonderheiten, die berücksichtigt werden sollen?" 
                  className="bg-flowhero-darker border-gray-700 text-white min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleNextStep('brand-voice')} 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
              </Button>
              <Button 
                onClick={() => handleNextStep('brand-values')} 
                className="bg-flowhero-orange hover:bg-flowhero-orange/90"
              >
                Weiter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Step 3: Brand Values */}
        {currentStep === 'brand-values' && (
          <Card className="bg-flowhero-card border-flowhero-card mb-6">
            <CardHeader>
              <CardTitle className="text-white">3. Markenpersönlichkeit & Werte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="space-y-2">
                <Label className="text-white">Welche Markenpersönlichkeit möchtest Du verwenden?</Label>
                <p className="text-sm text-gray-400">Hier geht's um den Charakter der Ansprache</p>
                <Select>
                  <SelectTrigger className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectValue placeholder="Wähle eine Markenpersönlichkeit" />
                  </SelectTrigger>
                  <SelectContent className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectItem value="advisor">Der Berater – Kompetent, sachlich, gibt fundierte Antworten</SelectItem>
                    <SelectItem value="friend">Der Freund – Nahbar, warmherzig, unterstützend</SelectItem>
                    <SelectItem value="expert">Der Experte – Detailorientiert, tiefgründig, analytisch</SelectItem>
                    <SelectItem value="innovator">Der Innovator – Zukunftsorientiert, technologiebegeistert, visionär</SelectItem>
                    <SelectItem value="motivator">Der Motivator – Inspirierend, energiegeladen, motivierend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-white mb-3 block">Welche Werte soll die Kommunikation vermitteln?</Label>
                <p className="text-sm text-gray-400 mb-4">Diese Werte beeinflussen die Wortwahl und den Stil</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="value-innovation" 
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setBrandValues([...brandValues, "innovation"]);
                        } else {
                          setBrandValues(brandValues.filter(value => value !== "innovation"));
                        }
                      }} 
                    />
                    <label
                      htmlFor="value-innovation"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      Innovation
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="value-trust"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setBrandValues([...brandValues, "trust"]);
                        } else {
                          setBrandValues(brandValues.filter(value => value !== "trust"));
                        }
                      }}
                    />
                    <label
                      htmlFor="value-trust"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      Vertrauen
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="value-authenticity"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setBrandValues([...brandValues, "authenticity"]);
                        } else {
                          setBrandValues(brandValues.filter(value => value !== "authenticity"));
                        }
                      }}
                    />
                    <label
                      htmlFor="value-authenticity"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      Authentizität
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="value-creativity"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setBrandValues([...brandValues, "creativity"]);
                        } else {
                          setBrandValues(brandValues.filter(value => value !== "creativity"));
                        }
                      }}
                    />
                    <label
                      htmlFor="value-creativity"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      Kreativität
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="value-sustainability"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setBrandValues([...brandValues, "sustainability"]);
                        } else {
                          setBrandValues(brandValues.filter(value => value !== "sustainability"));
                        }
                      }}
                    />
                    <label
                      htmlFor="value-sustainability"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      Nachhaltigkeit
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="value-luxury"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setBrandValues([...brandValues, "luxury"]);
                        } else {
                          setBrandValues(brandValues.filter(value => value !== "luxury"));
                        }
                      }}
                    />
                    <label
                      htmlFor="value-luxury"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      Luxus & Exklusivität
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brandStory" className="text-white">Was ist deine Markengeschichte?</Label>
                <Textarea 
                  id="brandStory"
                  placeholder="Erzähle kurz, wie dein Unternehmen entstanden ist und was deine Mission ist" 
                  className="bg-flowhero-darker border-gray-700 text-white min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uniqueSellingPoints" className="text-white">Was macht dein Unternehmen einzigartig?</Label>
                <Textarea 
                  id="uniqueSellingPoints"
                  placeholder="Beschreibe deine USPs und was dich von der Konkurrenz unterscheidet" 
                  className="bg-flowhero-darker border-gray-700 text-white min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleNextStep('writing-style')} 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
              </Button>
              <Button 
                onClick={() => handleNextStep('content-guidelines')} 
                className="bg-flowhero-orange hover:bg-flowhero-orange/90"
              >
                Weiter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Step 4: Content Guidelines */}
        {currentStep === 'content-guidelines' && (
          <Card className="bg-flowhero-card border-flowhero-card mb-6">
            <CardHeader>
              <CardTitle className="text-white">4. Inhaltliche Vorgaben & Stilrichtungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="space-y-2">
                <Label className="text-white">Wie soll Christian.AI mit kritischen Themen umgehen?</Label>
                <p className="text-sm text-gray-400">Falls sensible Themen behandelt werden</p>
                <Select>
                  <SelectTrigger className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectValue placeholder="Wähle einen Umgang mit kritischen Themen" />
                  </SelectTrigger>
                  <SelectContent className="bg-flowhero-darker border-gray-700 text-white">
                    <SelectItem value="empathetic">Empathisch & einfühlsam – Rücksichtsvoll und diplomatisch</SelectItem>
                    <SelectItem value="factual">Sachlich & informativ – Neutrale Faktendarstellung</SelectItem>
                    <SelectItem value="constructive">Konstruktiv & lösungsorientiert – Mit Fokus auf praktische Lösungen</SelectItem>
                    <SelectItem value="avoiding">Vermeidend – Kritische Themen ausklammern oder umleiten</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Welche Call-to-Actions (CTAs) bevorzugst du?</Label>
                <p className="text-sm text-gray-400">Wichtige Vorgabe für Landingpages, Marketingtexte etc.</p>
                
                <div className="space-y-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cta-contact" 
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCallToActions([...callToActions, "contact"]);
                        } else {
                          setCallToActions(callToActions.filter(cta => cta !== "contact"));
                        }
                      }} 
                    />
                    <label
                      htmlFor="cta-contact"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      "Jetzt kontaktieren"
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cta-buy" 
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCallToActions([...callToActions, "buy"]);
                        } else {
                          setCallToActions(callToActions.filter(cta => cta !== "buy"));
                        }
                      }} 
                    />
                    <label
                      htmlFor="cta-buy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      "Jetzt kaufen!"
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cta-learn" 
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCallToActions([...callToActions, "learn"]);
                        } else {
                          setCallToActions(callToActions.filter(cta => cta !== "learn"));
                        }
                      }} 
                    />
                    <label
                      htmlFor="cta-learn"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      "Mehr erfahren"
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cta-demo" 
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCallToActions([...callToActions, "demo"]);
                        } else {
                          setCallToActions(callToActions.filter(cta => cta !== "demo"));
                        }
                      }} 
                    />
                    <label
                      htmlFor="cta-demo"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      "Demo anfordern"
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cta-register" 
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCallToActions([...callToActions, "register"]);
                        } else {
                          setCallToActions(callToActions.filter(cta => cta !== "register"));
                        }
                      }} 
                    />
                    <label
                      htmlFor="cta-register"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                      "Jetzt registrieren"
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredPhrases" className="text-white">Bevorzugte Redewendungen oder Phrasen</Label>
                <p className="text-sm text-gray-400">Hier kannst du Phrasen definieren, die genutzt werden sollen</p>
                <Textarea 
                  id="preferredPhrases"
                  placeholder="z.B. 'Rund-um-Sorglos-Prinzip', 'HöchstWertPrinzip', 'SchnellStartPrinzip', '360° rund-um-Prinzip'" 
                  value={preferredPhrases}
                  onChange={e => setPreferredPhrases(e.target.value)}
                  className="bg-flowhero-darker border-gray-700 text-white min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avoidPhrases" className="text-white">No-Go-Phrasen oder Wörter</Label>
                <p className="text-sm text-gray-400">Hier kannst du Phrasen definieren, die vermieden werden sollen</p>
                <Textarea 
                  id="avoidPhrases"
                  placeholder="z.B. 'billig', 'günstig', 'einfach mal ausprobieren'" 
                  value={avoidPhrases}
                  onChange={e => setAvoidPhrases(e.target.value)}
                  className="bg-flowhero-darker border-gray-700 text-white min-h-[100px]"
                />
              </div>
              
              <div className="space-y-4">
                <Label className="text-white block">Weitere Stilrichtungen</Label>
                
                <div className="flex items-center space-x-2">
                  <Switch id="emoji-use" />
                  <Label htmlFor="emoji-use" className="text-white">Verwendung von Emojis erlauben</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="conversational-tone" />
                  <Label htmlFor="conversational-tone" className="text-white">Konversationellen, lockeren Ton bevorzugen</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="gender-neutral" />
                  <Label htmlFor="gender-neutral" className="text-white">Genderneutrale Sprache verwenden</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="bullet-points" />
                  <Label htmlFor="bullet-points" className="text-white">Häufig Aufzählungspunkte für bessere Übersicht verwenden</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleNextStep('brand-values')} 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
              </Button>
              <Button 
                onClick={() => handleNextStep('confirmation')} 
                className="bg-flowhero-orange hover:bg-flowhero-orange/90"
              >
                Weiter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Step 5: Confirmation */}
        {currentStep === 'confirmation' && (
          <Card className="bg-flowhero-card border-flowhero-card mb-6">
            <CardHeader>
              <CardTitle className="text-white">5. Bestätigung</CardTitle>
              <p className="text-gray-300">Überprüfe deine Einstellungen und bestätige dein Unternehmensprofil.</p>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="bg-flowhero-darker rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Zusammenfassung</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Unternehmen:</p>
                      <p className="text-white">{companyName || "Nicht angegeben"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Branche:</p>
                      <p className="text-white">{industry || "Nicht angegeben"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Tonalität:</p>
                    <p className="text-white">{
                      tone === 'professional' ? 'Vertrauensvoll & seriös' : 
                      tone === 'friendly' ? 'Freundlich & zugänglich' :
                      tone === 'dynamic' ? 'Dynamisch & motivierend' :
                      tone === 'minimal' ? 'Minimalistisch & prägnant' : 'Nicht angegeben'
                    }</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Kundenansprache:</p>
                    <p className="text-white">{
                      language === 'informal' ? 'Du (informell)' : 
                      language === 'formal' ? 'Sie (formell)' :
                      language === 'mixed' ? 'Gemischt' : 'Nicht angegeben'
                    }</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Humorverwendung:</p>
                    <p className="text-white">{
                      useHumor === 'yes' ? 'Ja, gerne' : 
                      useHumor === 'occasionally' ? 'Gelegentlich, wenn es passt' :
                      useHumor === 'no' ? 'Nein, bitte sachlich bleiben' : 'Nicht angegeben'
                    }</p>
                  </div>
                  
                  {brandValues.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400">Markenwerte:</p>
                      <p className="text-white">{brandValues.join(', ')}</p>
                    </div>
                  )}
                  
                  {callToActions.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400">Bevorzugte Call-to-Actions:</p>
                      <p className="text-white">{callToActions.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-flowhero-darker/50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Check className="text-green-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Dein Christian.AI spricht jetzt in deinem Unternehmenston</p>
                    <p className="text-gray-400 text-sm mt-1">Die KI übernimmt ab sofort deine definierten Einstellungen für alle Ausgaben.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-flowhero-darker/50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Check className="text-green-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Jederzeit anpassbar</p>
                    <p className="text-gray-400 text-sm mt-1">Du kannst diese Einstellungen jederzeit in den Profileinstellungen ändern.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleNextStep('content-guidelines')} 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
              </Button>
              <Button 
                onClick={handleComplete} 
                disabled={loading}
                className="bg-flowhero-orange hover:bg-flowhero-orange/90"
              >
                {loading ? 'Wird gespeichert...' : 'Profil bestätigen'} <Check className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManualSetup;
