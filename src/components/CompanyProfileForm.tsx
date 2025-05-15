import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TablesInsert } from '@/integrations/supabase/types';

// Use TablesInsert for the state type, as it includes all possible fields for insertion/update
// and make all fields optional for the initial state.
type CompanyProfileState = Partial<TablesInsert<'company_profiles'>> & { id?: string };


const brandValueOptions = [
  { id: "innovation", label: "Innovation" },
  { id: "trust", label: "Vertrauen" },
  { id: "authenticity", label: "Authentizität" },
  { id: "sustainability", label: "Nachhaltigkeit" },
  { id: "creativity", label: "Kreativität" },
  { id: "luxury", label: "Luxus & Exklusivität" },
];


const CompanyProfileForm = () => {
  const [activeTab, setActiveTab] = useState('companyProfile'); // Changed default tab
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<CompanyProfileState>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({ title: "Fehler", description: "Nicht angemeldet.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          toast({ title: "Fehler", description: "Profil konnte nicht geladen werden.", variant: "destructive" });
        } else {
          setProfile({ user_id: session.user.id });
        }
      } else if (data) {
        // Ensure array fields are initialized as arrays if null/undefined from DB
        setProfile({
          ...data,
          brand_values: Array.isArray(data.brand_values) ? data.brand_values : [],
          call_to_actions: Array.isArray(data.call_to_actions) ? data.call_to_actions : [],
        } as CompanyProfileState);
      } else {
        setProfile({ user_id: session.user.id });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({ title: "Fehler", description: "Ein unerwarteter Fehler ist beim Laden des Profils aufgetreten.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CompanyProfileState, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value === '' ? null : value // Store empty strings as null for optional fields
    }));
  };

  const handleBrandValuesChange = (valueId: string) => {
    setProfile(prev => {
      const currentValues = Array.isArray(prev.brand_values) ? prev.brand_values : [];
      const newValues = currentValues.includes(valueId)
        ? currentValues.filter(v => v !== valueId)
        : [...currentValues, valueId];
      return { ...prev, brand_values: newValues };
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({ title: "Fehler", description: "Bitte melde dich an.", variant: "destructive" });
        setLoading(false);
        return;
      }
      
      const user_id = session.user.id;
      const profileDataToSave: CompanyProfileState = { ...profile, user_id };
      
      // Ensure array fields are not undefined if empty
      if (!profileDataToSave.brand_values) profileDataToSave.brand_values = [];
      if (!profileDataToSave.call_to_actions) profileDataToSave.call_to_actions = [];

      const { id, ...dataToUpsert } = profileDataToSave;

      if (profile.id) {
        const { error } = await supabase
          .from('company_profiles')
          .update(dataToUpsert)
          .eq('id', profile.id)
          .eq('user_id', user_id);
        if (error) throw error;
        toast({ title: "Profil aktualisiert", description: "Deine Daten wurden gespeichert." });
      } else {
        // Try update first (if trigger created a row but ID wasn't fetched yet)
        const { error: updateError } = await supabase
          .from('company_profiles')
          .update(dataToUpsert)
          .eq('user_id', user_id);

        if (updateError && updateError.code !== 'PGRST116') { // PGRST116: no rows found
          throw updateError;
        } else if (updateError && updateError.code === 'PGRST116') { // No record to update, so insert
          const { error: insertError } = await supabase
            .from('company_profiles')
            .insert(dataToUpsert)
            .select()
            .single();
          if (insertError) throw insertError;
        }
        toast({ title: "Profil gespeichert", description: "Deine Daten wurden erfolgreich gespeichert." });
      }
      fetchProfile(); // Re-fetch to get latest data including any new ID
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({ title: "Fehler", description: error.message || "Profil konnte nicht gespeichert werden.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const commonInputClass = "bg-flowhero-darker border-gray-700 text-white";
  const commonTextareaClass = `${commonInputClass} min-h-[100px]`;
  const commonSelectTriggerClass = `${commonInputClass}`;
  const commonSelectContentClass = `bg-flowhero-darker border-gray-700 text-white`;

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8 bg-flowhero-darker border-gray-700">
          <TabsTrigger value="companyProfile" className="data-[state=active]:bg-flowhero-orange data-[state=active]:text-white">Unternehmensprofil</TabsTrigger>
          <TabsTrigger value="brandVoice" className="data-[state=active]:bg-flowhero-orange data-[state=active]:text-white">Markenstimme</TabsTrigger>
          <TabsTrigger value="contentGuidelines" className="data-[state=active]:bg-flowhero-orange data-[state=active]:text-white">Inhaltsrichtlinien</TabsTrigger>
        </TabsList>
        
        <TabsContent value="companyProfile">
          <Card className="bg-flowhero-card border-flowhero-card">
            <CardHeader><CardTitle className="text-white">Unternehmensprofil</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {/* Existing fields */}
              <div><Label htmlFor="company_name" className="text-white">Unternehmensname</Label><Input id="company_name" value={profile.company_name || ''} onChange={(e) => handleInputChange('company_name', e.target.value)} className={commonInputClass}/></div>
              <div><Label htmlFor="industry" className="text-white">Branche</Label><Input id="industry" value={profile.industry || ''} onChange={(e) => handleInputChange('industry', e.target.value)} className={commonInputClass}/></div>
              <div><Label htmlFor="website_url" className="text-white">Website URL (Online-Präsenz)</Label><Input id="website_url" type="url" value={profile.website_url || ''} onChange={(e) => handleInputChange('website_url', e.target.value)} className={commonInputClass}/></div>
              <div><Label htmlFor="main_product" className="text-white">Name Hauptprodukt/Dienstleistung</Label><Input id="main_product" value={profile.main_product || ''} onChange={(e) => handleInputChange('main_product', e.target.value)} className={commonInputClass}/></div>
              <div><Label htmlFor="product_url" className="text-white">Produkt URL</Label><Input id="product_url" type="url" value={profile.product_url || ''} onChange={(e) => handleInputChange('product_url', e.target.value)} className={commonInputClass}/></div>
              
              {/* New fields for Unternehmensprofil */}
              <div><Label htmlFor="main_services" className="text-white">Hauptprodukte/Dienstleistungen (Beschreibung)</Label><Textarea id="main_services" value={profile.main_services || ''} onChange={(e) => handleInputChange('main_services', e.target.value)} className={commonTextareaClass} placeholder="Beschreiben Sie Ihre Hauptprodukte oder Dienstleistungen ausführlich."/></div>
              <div><Label htmlFor="main_problem" className="text-white">Hauptproblem Deiner Kunden</Label><Textarea id="main_problem" value={profile.main_problem || ''} onChange={(e) => handleInputChange('main_problem', e.target.value)} className={commonTextareaClass} placeholder="Welche Schmerzpunkte und Herausforderungen haben Ihre Kunden?"/></div>
              <div><Label htmlFor="solution" className="text-white">Deine Lösung</Label><Textarea id="solution" value={profile.solution || ''} onChange={(e) => handleInputChange('solution', e.target.value)} className={commonTextareaClass} placeholder="Wie lösen Ihre Produkte/Dienstleistungen diese Probleme? Kurz & prägnant."/></div>
              <div><Label htmlFor="target_audience" className="text-white">Zielgruppe & Kundenavatar</Label><Textarea id="target_audience" value={profile.target_audience || ''} onChange={(e) => handleInputChange('target_audience', e.target.value)} className={commonTextareaClass} placeholder="Beschreiben Sie Ihre typischen Kunden oder erstellen Sie eine Persona."/></div>
              <div><Label htmlFor="mission_vision_values" className="text-white">Mission, Vision & Firmenwerte (Text)</Label><Textarea id="mission_vision_values" value={profile.mission_vision_values || ''} onChange={(e) => handleInputChange('mission_vision_values', e.target.value)} className={commonTextareaClass} placeholder="Was ist Ihre Mission, Vision und was sind Ihre Kernwerte als Unternehmen?"/></div>
              <div><Label htmlFor="positioning" className="text-white">Positionierung (USP)</Label><Textarea id="positioning" value={profile.positioning || ''} onChange={(e) => handleInputChange('positioning', e.target.value)} className={commonTextareaClass} placeholder="Was macht Sie einzigartig? Wie grenzen Sie sich vom Wettbewerb ab?"/></div>
              <div><Label htmlFor="benefits" className="text-white">Nutzen & Mehrwert</Label><Textarea id="benefits" value={profile.benefits || ''} onChange={(e) => handleInputChange('benefits', e.target.value)} className={commonTextareaClass} placeholder="Welche konkreten Stärken und Vorteile bieten Sie Ihren Kunden?"/></div>
              <div><Label htmlFor="achievements" className="text-white">Erfolge & Meilensteine (optional)</Label><Textarea id="achievements" value={profile.achievements || ''} onChange={(e) => handleInputChange('achievements', e.target.value)} className={commonTextareaClass} placeholder="z.B. Auszeichnungen, wichtige Projekte, Kundenerfolge, Verkaufszahlen."/></div>
              <div><Label htmlFor="seo_keywords" className="text-white">SEO-Keywords</Label><Textarea id="seo_keywords" value={profile.seo_keywords || ''} onChange={(e) => handleInputChange('seo_keywords', e.target.value)} className={commonTextareaClass} placeholder="Wichtige Keywords, mit Komma getrennt."/></div>
              <div><Label htmlFor="process_steps" className="text-white">Konkrete Schritte zur Zusammenarbeit</Label><Textarea id="process_steps" value={profile.process_steps || ''} onChange={(e) => handleInputChange('process_steps', e.target.value)} className={commonTextareaClass} placeholder="Wie läuft eine Zusammenarbeit typischerweise ab? (Bulletpoints empfohlen)"/></div>
            </CardContent>
            <CardFooter className="flex justify-end"><Button onClick={handleSave} disabled={loading} className="bg-flowhero-orange hover:bg-flowhero-orange/90">{loading ? 'Speichern...' : 'Speichern'}</Button></CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="brandVoice">
          <Card className="bg-flowhero-card border-flowhero-card">
            <CardHeader><CardTitle className="text-white">Markenstimme</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <h4 className="text-lg font-semibold text-white mt-2 mb-3">2.1 Ansprache & Tonalität</h4>
              <div><Label htmlFor="language" className="text-white">Wie sprichst du deine Kunden an? (tone_of_voice)</Label>
                <Select value={profile.language || ''} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle eine Ansprache" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}><SelectItem value="informal">Du (informell)</SelectItem><SelectItem value="formal">Sie (formell)</SelectItem><SelectItem value="mixed">Gemischt</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="tone" className="text-white">Wie ist dein genereller Sprachstil? (general_tone)</Label>
                <Select value={profile.tone || ''} onValueChange={(value) => handleInputChange('tone', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle einen Sprachstil" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}><SelectItem value="professional">Vertrauensvoll & seriös</SelectItem><SelectItem value="friendly">Freundlich & zugänglich</SelectItem><SelectItem value="dynamic">Dynamisch & motivierend</SelectItem><SelectItem value="minimal">Minimalistisch & prägnant</SelectItem><SelectItem value="humorous">Locker & humorvoll</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="use_humor" className="text-white">Darf Humor verwendet werden? (humor_usage)</Label>
                <Select value={profile.use_humor || ''} onValueChange={(value) => handleInputChange('use_humor', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle Humoreinstellungen" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}><SelectItem value="yes">Ja, gerne</SelectItem><SelectItem value="occasionally">Gelegentlich, wenn es passt</SelectItem><SelectItem value="no">Nein, bitte sachlich bleiben</SelectItem></SelectContent>
                </Select>
              </div>

              <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.2 Schreibstil & Satzstruktur</h4>
              <div><Label htmlFor="writing_style" className="text-white">Satzkomplexität (sentence_complexity)</Label>
                <Select value={profile.writing_style || ''} onValueChange={(value) => handleInputChange('writing_style', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle einen Schreibstil" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}><SelectItem value="simple">Einfach & kurz</SelectItem><SelectItem value="medium">Mittellang & ausgewogen</SelectItem><SelectItem value="complex">Elaboriert & detailliert</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="technical_terms" className="text-white">Fachsprache verwenden? (technical_language)</Label>
                <Select value={profile.technical_terms || ''} onValueChange={(value) => handleInputChange('technical_terms', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle den Fachsprache-Grad" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}><SelectItem value="no">Nein</SelectItem><SelectItem value="yes">Ja</SelectItem><SelectItem value="moderate">Mischung: Fachlich fundiert, aber verständlich</SelectItem></SelectContent>
                </Select>
              </div>

              <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.3 Markenpersönlichkeit & Werte</h4>
              <div><Label htmlFor="brand_personality" className="text-white">Markenpersönlichkeit</Label>
                <Select value={profile.brand_personality || ''} onValueChange={(value) => handleInputChange('brand_personality', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle eine Markenpersönlichkeit" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}>
                    <SelectItem value="advisor">Der Berater</SelectItem><SelectItem value="companion">Der Begleiter</SelectItem><SelectItem value="inspirator">Der Inspirator</SelectItem>
                    <SelectItem value="expert">Der Experte</SelectItem><SelectItem value="visionary">Der Visionär</SelectItem><SelectItem value="friend">Der Kumpel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div> <Label className="text-white block mb-2">Werte (brand_values)</Label>
                <div className="space-y-2">
                  {brandValueOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand_value_${option.id}`}
                        checked={(profile.brand_values || []).includes(option.id)}
                        onCheckedChange={() => handleBrandValuesChange(option.id)}
                        className="border-gray-600 data-[state=checked]:bg-flowhero-orange data-[state=checked]:text-white"
                      />
                      <Label htmlFor={`brand_value_${option.id}`} className="text-white font-normal">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.4 Inhaltliche Vorgaben & Stilrichtungen</h4>
              <div><Label htmlFor="sensitive_topics_handling" className="text-white">Umgang mit kritischen Themen</Label>
                <Select value={profile.sensitive_topics_handling || ''} onValueChange={(value) => handleInputChange('sensitive_topics_handling', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle einen Umgang" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}><SelectItem value="empathetic">Empathisch & einfühlsam</SelectItem><SelectItem value="direct">Direkt</SelectItem><SelectItem value="avoidant">Ausweichend</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="preferred_ctas_style" className="text-white">Call-to-Actions bevorzugt (Stil)</Label>
                <Select value={profile.preferred_ctas_style || ''} onValueChange={(value) => handleInputChange('preferred_ctas_style', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle CTA-Stil" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}><SelectItem value="direct">Direkt („Jetzt kaufen!“)</SelectItem><SelectItem value="gentle">Sanft („Mehr erfahren“)</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="preferred_phrases" className="text-white">Bevorzugte Redewendungen / Phrasen</Label><Textarea id="preferred_phrases" value={profile.preferred_phrases || ''} onChange={(e) => handleInputChange('preferred_phrases', e.target.value)} className={commonTextareaClass} placeholder="z.B. 'Rund-um-Sorglos-Prinzip', 'HöchstWertPrinzip' (Kommagetrennt)"/></div>
              <div><Label htmlFor="avoid_phrases" className="text-white">No-Go Phrasen oder Wörter (forbidden_phrases)</Label><Textarea id="avoid_phrases" value={profile.avoid_phrases || ''} onChange={(e) => handleInputChange('avoid_phrases', e.target.value)} className={commonTextareaClass} placeholder="z.B. 'billig', 'günstig', 'einfach mal ausprobieren'"/></div>

              <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.5 Formatierung & Medien</h4>
              <div><Label htmlFor="emoji_usage" className="text-white">Emojis verwenden?</Label>
                <Select value={profile.emoji_usage || ''} onValueChange={(value) => handleInputChange('emoji_usage', value)}>
                  <SelectTrigger className={commonSelectTriggerClass}><SelectValue placeholder="Wähle Emoji-Einstellung" /></SelectTrigger>
                  <SelectContent className={commonSelectContentClass}><SelectItem value="yes">Ja</SelectItem><SelectItem value="no">Nein</SelectItem><SelectItem value="sparingly">Sparsam</SelectItem></SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end"><Button onClick={handleSave} disabled={loading} className="bg-flowhero-orange hover:bg-flowhero-orange/90">{loading ? 'Speichern...' : 'Speichern'}</Button></CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="contentGuidelines">
          <Card className="bg-flowhero-card border-flowhero-card">
            <CardHeader><CardTitle className="text-white">Inhaltsrichtlinien</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white block mb-2">Konkrete Call-to-Actions (Liste)</Label>
                <p className="text-sm text-gray-400 mb-2">Füge hier spezifische Call-to-Action Texte hinzu, die häufig verwendet werden sollen. Bitte mit Kommas trennen.</p>
                <Textarea 
                  value={Array.isArray(profile.call_to_actions) ? profile.call_to_actions.join(', ') : ''} 
                  onChange={(e) => {
                    const value = e.target.value;
                    const callToActionsList = value ? value.split(',').map(item => item.trim()).filter(Boolean) : [];
                    handleInputChange('call_to_actions', callToActionsList);
                  }}
                  className={commonTextareaClass}
                  placeholder="z.B. Jetzt kontaktieren, Mehr erfahren, Demo anfordern"
                />
              </div>
              {/* Other content guidelines can be added here if needed in future */}
            </CardContent>
            <CardFooter className="flex justify-end"><Button onClick={handleSave} disabled={loading} className="bg-flowhero-orange hover:bg-flowhero-orange/90">{loading ? 'Speichern...' : 'Speichern'}</Button></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyProfileForm;
