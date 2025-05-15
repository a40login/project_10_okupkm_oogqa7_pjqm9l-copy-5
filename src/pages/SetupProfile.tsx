import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { MainLayout } from '@/layouts/MainLayout'; // Not used here
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
// import { Textarea } from '@/components/ui/textarea'; // Not used directly here
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Not used here
import { Check, ChevronRight } from 'lucide-react'; // User, Building, Globe, ArrowRight removed as not used
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

const SetupProfile = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [setupType, setSetupType] = useState<'auto' | 'manual' | null>(null);
  const [progressValue, setProgressValue] = useState(0); // Renamed from progress to avoid conflict
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form values
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState(''); // Renamed from productDesc

  const [companyProfile, setCompanyProfile] = useState<Tables<'company_profiles'> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching company profile:', error);
          toast({ title: "Fehler", description: "Unternehmensprofil konnte nicht geladen werden.", variant: "destructive" });
        } else if (data) {
          setCompanyProfile(data);
          if (data.website_url) setWebsiteUrl(data.website_url);
          if (data.main_product) setProductName(data.main_product);
          if (data.product_url) setProductUrl(data.product_url);
        }
      }
    };
    if (setupType === 'auto') { // Only fetch if auto setup is chosen and we are past welcome
        fetchCompanyProfile();
    }
  }, [toast, setupType]);


  const updateProgress = (step: string) => {
    switch (step) {
      case 'welcome':
        setProgressValue(0);
        break;
      case 'website':
        setProgressValue(33);
        break;
      case 'product':
        setProgressValue(66);
        break;
      case 'completion':
        setProgressValue(100);
        break;
      default:
        setProgressValue(0);
    }
  };
  
  const saveStepData = async (dataToSave: Partial<TablesInsert<'company_profiles'>>) => {
    setIsSaving(true);
    if (!companyProfile || !companyProfile.id) {
      // Attempt to fetch profile again if not available, might be due to race condition with auto-creation
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (currentSession?.user) {
        const { data: profileData, error: fetchError } = await supabase
          .from('company_profiles')
          .select('id')
          .eq('user_id', currentSession.user.id)
          .single();

        if (fetchError || !profileData) {
          toast({ title: "Fehler", description: "Kein Unternehmensprofil zum Aktualisieren gefunden.", variant: "destructive" });
          setIsSaving(false);
          return false;
        }
        // Update local companyProfile state with at least the ID
        setCompanyProfile(prev => ({ ...prev, ...profileData } as Tables<'company_profiles'>));
         // If companyProfile was null/undefined before, now it has an id.
         // The actual companyProfile.id used in .eq('id', companyProfile.id) below will be from this fetch.
         // This is a bit tricky; ideally companyProfile is always populated from useEffect.
         // For robustness, we use profileData.id directly in the update if companyProfile.id is still missing.
         const profileIdToUpdate = companyProfile?.id || profileData.id;


        const { error } = await supabase
          .from('company_profiles')
          .update(dataToSave)
          .eq('id', profileIdToUpdate)
          .eq('user_id', currentSession.user.id);

        if (error) {
          console.error('Error saving step data after re-fetch:', error);
          toast({ title: "Fehler beim Speichern", description: "Daten konnten nicht gespeichert werden.", variant: "destructive" });
          setIsSaving(false);
          return false;
        }
      } else {
        toast({ title: "Fehler", description: "Nicht angemeldet.", variant: "destructive" });
        setIsSaving(false);
        return false;
      }
    } else { // companyProfile and companyProfile.id exist
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            toast({ title: "Fehler", description: "Nicht angemeldet.", variant: "destructive" });
            setIsSaving(false);
            return false;
        }
        const { error } = await supabase
            .from('company_profiles')
            .update(dataToSave)
            .eq('id', companyProfile.id)
            .eq('user_id', session.user.id);

        if (error) {
            console.error('Error saving step data:', error);
            toast({ title: "Fehler beim Speichern", description: "Daten für diesen Schritt konnten nicht gespeichert werden.", variant: "destructive" });
            setIsSaving(false);
            return false;
        }
    }
    
    toast({ title: "Gespeichert!", description: "Deine Eingaben wurden gespeichert." });
    setCompanyProfile(prev => prev ? { ...prev, ...dataToSave } : null);
    setIsSaving(false);
    return true;
  };


  const handleNextStep = async (nextStep: string) => {
    let dataToSave: Partial<TablesInsert<'company_profiles'>> = {};
    let canProceed = true;

    if (currentStep === 'website') {
      dataToSave = { website_url: websiteUrl };
    } else if (currentStep === 'product') {
      dataToSave = { main_product: productName, product_url: productUrl };
    }

    if (Object.keys(dataToSave).length > 0) {
      canProceed = await saveStepData(dataToSave);
    }

    if (canProceed) {
      setCurrentStep(nextStep);
      updateProgress(nextStep);
    }
  };

  const handleSetupStart = (type: 'auto' | 'manual') => {
    setSetupType(type);
    
    if (type === 'manual') {
      navigate('/setup/manual');
      toast({
        title: "Manuelle Einrichtung",
        description: "Sie richten Ihr Profil manuell ein."
      });
    } else {
      setCurrentStep('website'); // Start auto setup from website step
      updateProgress('website');
      toast({
        title: "Automatische Einrichtung",
        description: "Die KI unterstützt Sie bei der Einrichtung."
      });
    }
  };

  const handleProfileComplete = () => {
    // Data should have been saved by the last call to handleNextStep (when moving to 'completion')
    toast({
      title: "Einrichtung abgeschlossen",
      description: "Ihr Profil wurde erfolgreich eingerichtet und gespeichert."
    });
    navigate('/');
  };

  return <div className="min-h-screen bg-flowhero-darker">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {currentStep !== 'welcome' && <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 text-white">Ersteinrichtung</h1>
            <p className="text-gray-300 mb-6">In wenigen Schritten richten wir dein Profil ein, damit du sofort mit FlowHero.AI arbeiten kannst.</p>
            
            <div className="mb-8">
              <Progress value={progressValue} className="h-2 bg-flowhero-card" />
              
              <div className="flex justify-between mt-4">
                {['Website', 'Produkt', 'Einrichtung'].map((label, index) => {
                  const stepName = ['website', 'product', 'completion'][index];
                  const isActive = currentStep === stepName || 
                                   (currentStep === 'product' && index === 0) ||
                                   (currentStep === 'completion' && index <= 1);
                  const isCompleted = (currentStep === 'product' && index < 1) ||
                                      (currentStep === 'completion' && index < 2) ||
                                      (progressValue === 100 && index < 3);

                  return (
                    <div className="flex items-center" key={label}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted || isActive ? 'bg-flowhero-orange' : 'bg-flowhero-card'}`}>
                        <span className="text-white">{index + 1}</span>
                      </div>
                      <span className="ml-2 text-white">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>}
        
        {currentStep === 'welcome' && <div>
            <h1 className="text-3xl font-bold mb-6 text-white text-center">Willkommen zur Ersteinrichtung</h1>
            <p className="text-xl text-center mb-8 text-gray-300">Wie möchtest du dein Unternehmensprofil erstellen?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-flowhero-card border-flowhero-card">
                <CardHeader>
                  <CardTitle className="text-white">Automatisierte Ersteinrichtung mit FlowHero.AI</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">Wenn du bereits eine Website hast, analysieren wir sie automatisch. Hast du keine Website, dann lässt du FlowHero.AI ein Profil für dich erstellen, das du danach anpassen kannst.</p>
                  
                  <ul className="list-disc pl-5 space-y-2 mt-6">
                    <li>Schnelle Einrichtung in wenigen Minuten</li>
                    <li>Automatische Analyse deiner Website</li>
                    <li>Jederzeit manuell anpassbar</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex">
                      <span className="bg-gray-800 px-2 py-1 rounded text-sm text-white">2-3 Minuten</span>
                    </div>
                    <Button onClick={() => handleSetupStart('auto')} className="bg-flowhero-orange hover:bg-flowhero-orange/90 flex gap-2">
                      Automatische Einrichtung <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="bg-flowhero-card border-flowhero-card">
                <CardHeader>
                  <CardTitle className="text-white">Manuelle Ersteinrichtung</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4">Du hast bereits klare Vorstellungen über deinen Stil und möchtest alle Angaben genau selbst definiert? Kein Problem!</p>
                  <p>Trage die wichtigen Daten zu deinem Geschäft hier ein und starte direkt mit der vollständigen Nutzung von FlowHero.AI.</p>
                  
                  <ul className="list-disc pl-5 space-y-2 mt-6">
                    <li>So bestimmst du komplett selbst</li>
                    <li>Ideal für Unternehmen ohne eigene Website</li>
                    <li>Mehr Kontrolle über alle Eingaben</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex">
                      <span className="bg-gray-800 px-2 py-1 rounded text-sm text-white">5-10 Minuten</span>
                    </div>
                    <Button onClick={() => handleSetupStart('manual')} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 flex gap-2">
                      Manuell starten <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>}
        
        {currentStep === 'website' && <Card className="bg-flowhero-card border-flowhero-card">
            <CardHeader>
              <CardTitle className="text-white">Deine Webseite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p className="mb-4">Der Flow-Hero erstellt dir automatisch aus Deiner Webseite ein Unternehmens-Profil und eine Marken-Stimme. Das spart Dir viel Zeit. Du kannst die Informationen nachher bearbeiten.</p>
              
              <div className="space-y-2">
                <Label htmlFor="websiteUrl" className="text-white">Deine Webseite URL:</Label>
                <Input id="websiteUrl" placeholder="https://..." value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} className="bg-flowhero-darker border-gray-700 text-white" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => { setCurrentStep('welcome'); updateProgress('welcome'); }} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Zurück
              </Button>
              <Button onClick={() => handleNextStep('product')} disabled={isSaving} className="bg-flowhero-orange hover:bg-flowhero-orange/90">
                {isSaving ? 'Speichern...' : 'Weiter'}
              </Button>
            </CardFooter>
          </Card>}
        
        {currentStep === 'product' && <Card className="bg-flowhero-card border-flowhero-card">
            <CardHeader>
              <CardTitle className="text-white">Dein Produkt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                Gib die Details zu Deinem Hauptprodukt oder Deiner Hauptdienstleistung ein. Wir erstellen daraus automatisch ein Produkt für Dich. Du kannst nachher weitere Produkte anlegen.
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-white">Name Deines Haupt-Produkts / Deiner Haupt-Dienstleistung:</Label>
                <Input id="productName" placeholder="z.B. Consulting Paket, Marketing Service, etc." value={productName} onChange={e => setProductName(e.target.value)} className="bg-flowhero-darker border-gray-700 text-white" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productUrl" className="text-white">URL zur Produkt-Seite:</Label>
                <Input id="productUrl" placeholder="https://..." value={productUrl} onChange={e => setProductUrl(e.target.value)} className="bg-flowhero-darker border-gray-700 text-white" />
              </div>
              
              <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400">
                Falls Du keine eigene Produktseite hast, kannst Du hier auch Deine Homepage angeben.
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => { setCurrentStep('website'); updateProgress('website');}} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Zurück
              </Button>
              <Button onClick={() => handleNextStep('completion')} disabled={isSaving} className="bg-flowhero-orange hover:bg-flowhero-orange/90">
                {isSaving ? 'Speichern...' : 'Weiter'}
              </Button>
            </CardFooter>
          </Card>}
        
        {currentStep === 'completion' && <Card className="bg-flowhero-card border-flowhero-card">
            <CardHeader>
              <CardTitle className="text-white">Wir richten alles für Dich ein</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>Dein persönlicher Flow-Hero richtet nun dein Profil ein. Das kann einen Moment dauern.</p>
              
              <div className="my-6">
                {/* This progress bar is now illustrative as saving is incremental */}
                <div className="flex justify-between text-sm mb-1">
                  <span>Fortschritt</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-2 bg-gray-700" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="text-green-500" size={18} />
                  <p>Dein Unternehmens-Profil wird erstellt...</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500" size={18} />
                  <p>Deine Marken-Stimme wird analysiert...</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500" size={18} />
                  <p>Dein Produkt wird angelegt...</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500" size={18} />
                  <p>Deine Daten werden optimiert...</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-green-500" size={18} /> {/* Changed from spinner */}
                  <p>Dein Dashboard wird vorbereitet...</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProfileComplete} className="w-full bg-flowhero-orange hover:bg-flowhero-orange/90">
                Zur Übersicht
              </Button>
            </CardFooter>
          </Card>}
      </div>
    </div>;
};

export default SetupProfile;
