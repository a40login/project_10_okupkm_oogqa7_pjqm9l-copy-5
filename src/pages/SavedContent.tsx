import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Trash2, Copy, Search, Loader2, Edit3, Clock, Lightbulb, Users, Magnet, MousePointer, Mail, Megaphone, Image as ImageIcon, PlusCircle, Star, Sparkles } from 'lucide-react'; // Mic entfernt, da es in AudioInputButton ist
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SavedContent as SavedContentType } from '@/integrations/supabase/types';
import { AuthContext } from '@/contexts/AuthContext';
import AudioInputButton from '@/components/AudioInputButton'; // Import der neuen Komponente

const DIALOG_CONTENT_TYPES = ["Strategie", "Expertenseite", "Lead Magnet", "Landingpage", "E-Mail Sequenz", "Facebook Anzeige", "KI Bild", "Anderer..."];
const CONTENT_TYPES = ["Alle", ...DIALOG_CONTENT_TYPES.filter(ct => ct !== "Anderer...")];

const getContentTypeIcon = (contentType: string | undefined) => {
  switch (contentType) {
    case "Strategie":
      return <Lightbulb size={20} className="text-flowhero-orange flex-shrink-0" />;
    case "Expertenseite":
      return <Users size={20} className="text-flowhero-orange flex-shrink-0" />;
    case "Lead Magnet":
      return <Magnet size={20} className="text-flowhero-orange flex-shrink-0" />;
    case "Landingpage":
      return <MousePointer size={20} className="text-flowhero-orange flex-shrink-0" />;
    case "E-Mail Sequenz":
      return <Mail size={20} className="text-flowhero-orange flex-shrink-0" />;
    case "Facebook Anzeige":
      return <Megaphone size={20} className="text-flowhero-orange flex-shrink-0" />; // Oder Facebook Icon, falls verfügbar
    case "KI Bild":
      return <ImageIcon size={20} className="text-flowhero-orange flex-shrink-0" />;
    default:
      return <FileText size={20} className="text-flowhero-orange flex-shrink-0" />;
  }
};

const SavedContent = () => {
  const { toast } = useToast();
  const authContext = useContext(AuthContext);
  const user = authContext?.user ?? null; // Default to null if undefined

  const [savedContents, setSavedContents] = useState<SavedContentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Alle");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showNewContentDialog, setShowNewContentDialog] = useState<boolean>(false);
  const [newContentTitle, setNewContentTitle] = useState<string>("");
  const [newContentType, setNewContentType] = useState<string>(DIALOG_CONTENT_TYPES[0]);
  const [newCustomContentType, setNewCustomContentType] = useState<string>("");
  const [newContentIsFavorite, setNewContentIsFavorite] = useState<boolean>(false);
  const [newContentText, setNewContentText] = useState<string>(""); // State für das Textfeld
  const [isSavingNewContent, setIsSavingNewContent] = useState<boolean>(false);
  const [isAutoImproving, setIsAutoImproving] = useState<boolean>(false);

  const fetchSavedContents = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      setError("Benutzer nicht authentifiziert.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('saved_content')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (activeFilter !== "Alle") {
        query = query.eq('content_type', activeFilter);
      }

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        throw supabaseError;
      }

      setSavedContents(data || []);
    } catch (err: any) {
      console.error("Error fetching saved content:", err);
      setError(err.message || "Inhalte konnten nicht geladen werden.");
      toast({
        title: "Fehler",
        description: err.message || "Gespeicherte Inhalte konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, activeFilter, searchTerm, toast]);

  useEffect(() => {
    fetchSavedContents();
  }, [fetchSavedContents]);

  const handleDelete = async (id: string) => {
    if (!user?.id) {
      toast({ title: "Fehler", description: "Benutzer nicht authentifiziert.", variant: "destructive" });
      return;
    }
    try {
      const { error: deleteError } = await supabase
        .from('saved_content')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      setSavedContents(prevContents => prevContents.filter(content => content.id !== id));
      toast({
        title: "Erfolg",
        description: "Inhalt erfolgreich gelöscht.",
      });
    } catch (err: any) {
      console.error("Error deleting content:", err);
      toast({
        title: "Fehler beim Löschen",
        description: err.message || "Inhalt konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = (content: any) => {
    let textToCopy = "";
    if (content && typeof content === 'object' && 'type' in content) {
      if (content.type === 'text' && typeof content.value === 'string') {
        textToCopy = content.value;
      } else if (content.type === 'image_url' && typeof content.url === 'string') {
        textToCopy = content.url;
      } else {
        textToCopy = JSON.stringify(content, null, 2);
      }
    } else if (typeof content === 'string') {
      textToCopy = content;
    } else {
      textToCopy = JSON.stringify(content, null, 2);
    }

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast({
          title: "Kopiert!",
          description: "Inhalt wurde in die Zwischenablage kopiert.",
        });
      })
      .catch(err => {
        console.error("Error copying content:", err);
        toast({
          title: "Fehler beim Kopieren",
          description: "Inhalt konnte nicht kopiert werden.",
          variant: "destructive",
        });
      });
  };
  
  // Debounce search term changes
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSavedContents();
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, fetchSavedContents]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // fetchSavedContents will be called by the useEffect listening to searchTerm
  };


  const handleSaveNewContent = async () => {
    if (!user?.id) {
      toast({ title: "Fehler", description: "Benutzer nicht authentifiziert.", variant: "destructive" });
      return;
    }
    if (!newContentTitle.trim()) {
      toast({ title: "Fehler", description: "Bitte gib einen Titel ein.", variant: "destructive" });
      return;
    }

    const finalContentType = newContentType === "Anderer..." ? newCustomContentType.trim() : newContentType;
    if (!finalContentType) {
      toast({ title: "Fehler", description: "Bitte gib einen Inhaltstyp an.", variant: "destructive" });
      return;
    }

    setIsSavingNewContent(true);
    try {
      const { data, error } = await supabase
        .from('saved_content')
        .insert([
          {
            user_id: user.id,
            title: newContentTitle.trim(),
            content: { type: "text", value: newContentText },
            content_type: finalContentType,
            is_favorite: newContentIsFavorite,
            // source_expert und generation_params könnten hier null oder Standardwerte sein
          },
        ])
        .select();

      if (error) throw error;

      if (data) {
        // @ts-ignore TODO: fix type issue with supabase response
        setSavedContents(prev => [data[0] as SavedContentType, ...prev]);
      }
      toast({ title: "Erfolg", description: "Inhalt erfolgreich erstellt." });
      setShowNewContentDialog(false);
      setNewContentTitle("");
      setNewContentType(DIALOG_CONTENT_TYPES[0]);
      setNewCustomContentType("");
      setNewContentIsFavorite(false);
      setNewContentText("");
    } catch (err: any) {
      console.error("Error saving new content:", err);
      toast({
        title: "Fehler beim Speichern",
        description: err.message || "Neuer Inhalt konnte nicht erstellt werden.",
        variant: "destructive",
      });
    } finally {
      setIsSavingNewContent(false);
    }
  };

  const handleAutoImprove = async () => {
    if (!newContentTitle.trim()) {
      toast({ title: "Fehler", description: "Bitte gib zuerst einen Titel ein, um den Inhalt zu verbessern.", variant: "destructive" });
      return;
    }

    setIsAutoImproving(true);
    toast({ title: "Info", description: "Verbessere Inhalt..." });

    const webhookUrl = "https://flowherodemo.app.n8n.cloud/webhook/auto-improve";
    const payload = {
      title: newContentTitle.trim(),
      type: newContentType === "Anderer..." ? newCustomContentType.trim() : newContentType,
      current_text: newContentText,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Klonen der Antwort, um den Body mehrmals lesen zu können (einmal für Text, einmal für JSON)
      const responseCloneForText = response.clone();
      const rawResponseText = await responseCloneForText.text();
      
      // Setze den newContentText direkt mit dem rohen Antworttext.
      // Der vorherige Inhalt wird überschrieben.
      setNewContentText(rawResponseText);

      if (!response.ok) {
        // Wenn die Antwort nicht ok ist, zeige trotzdem den Text an, aber werfe auch einen Fehler für den Toast.
        let parsedErrorMessage;
        try {
          const errorJson = JSON.parse(rawResponseText); // Versuche, die Fehlermeldung aus JSON zu extrahieren
          parsedErrorMessage = errorJson.message;
        } catch (e) {
          // Wenn rawResponseText kein JSON ist, wird der rawResponseText selbst als Fehlermeldung verwendet.
          console.warn("Antwort im Fehlerfall war kein valides JSON:", rawResponseText);
        }
        toast({ title: "Fehler vom Webhook", description: parsedErrorMessage || rawResponseText || `Status: ${response.status}`, variant: "destructive" });
        // Wir werfen hier keinen Error mehr, da der Text ja angezeigt wird.
        // Stattdessen wird der Toast für den Benutzerfeedback verwendet.
      } else {
        // Erfolgsfall: Versuche, die spezifische Struktur zu parsen
        try {
          const result = JSON.parse(rawResponseText);
          if (Array.isArray(result) && result.length > 0 &&
              result[0].output && typeof result[0].output.improved_text === 'string') {
            setNewContentText(result[0].output.improved_text); // Nur den verbesserten Text setzen
            toast({ title: "Erfolg", description: "Inhalt erfolgreich verbessert!" });
          } else {
            // Spezifische Struktur nicht gefunden, zeige rohen Text (bereits in setNewContentText(rawResponseText) oben geschehen)
            toast({ title: "Info", description: "Antwort erhalten, aber 'improved_text' nicht in erwarteter Struktur gefunden. Rohe Antwort wird angezeigt." });
          }
        } catch (e) {
          // Parsen als JSON fehlgeschlagen, obwohl response.ok true war. Zeige rohen Text.
          // (rawResponseText wurde bereits oben in setNewContentText gesetzt)
          console.warn("Antwort war response.ok, aber kein valides JSON:", rawResponseText, e);
          toast({ title: "Info", description: "Antwort vom Webhook als Rohdaten im Textfeld angezeigt (kein valides JSON)." });
        }
      }
    } catch (error: any) {
      // Dieser Catch-Block ist für Netzwerkfehler oder wenn response.text() / response.clone() fehlschlägt.
      // In diesem Fall setzen wir die Fehlermeldung als Textinhalt.
      const errorMessage = `**Webhook System/Netzwerk Fehler Log (${new Date().toLocaleString()}):**\n${error.message}`;
      setNewContentText(errorMessage);
      console.error("Error during auto-improve (catch block):", error);
      toast({ title: "Fehler", description: `Fehler beim Verbessern: ${error.message}`, variant: "destructive", duration: 5000 });
    } finally {
      setIsAutoImproving(false);
    }
  };

  const handleTextFromAudio = (text: string) => {
    setNewContentText(prev => prev + text); // Hängt den Text an den bestehenden Inhalt an
    // Alternativ: setNewContentText(text); // Ersetzt den bestehenden Inhalt
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Deine gespeicherten Inhalte</h1>
        <Dialog open={showNewContentDialog} onOpenChange={setShowNewContentDialog}>
          <DialogTrigger asChild>
            <Button className="bg-flowhero-orange hover:bg-flowhero-orange/90 text-black">
              <PlusCircle size={20} className="mr-2" />
              Neuen Inhalt erstellen
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-flowhero-card border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Neuen Inhalt erstellen</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-title" className="text-right">
                  Titel
                </Label>
                <Input
                  id="new-title"
                  value={newContentTitle}
                  onChange={(e) => setNewContentTitle(e.target.value)}
                  className="col-span-3 bg-gray-700 border-gray-600 focus:ring-flowhero-orange focus:border-flowhero-orange"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-content-type" className="text-right">
                  Typ
                </Label>
                <Select value={newContentType} onValueChange={setNewContentType}>
                  <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600 focus:ring-flowhero-orange focus:border-flowhero-orange">
                    <SelectValue placeholder="Typ auswählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    {DIALOG_CONTENT_TYPES.map(type => (
                      <SelectItem key={type} value={type} className="hover:bg-flowhero-orange/20 focus:bg-flowhero-orange">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {newContentType === "Anderer..." && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-custom-content-type" className="text-right">
                    Eigener Typ
                  </Label>
                  <Input
                    id="new-custom-content-type"
                    value={newCustomContentType}
                    onChange={(e) => setNewCustomContentType(e.target.value)}
                    placeholder="z.B. Blog Artikel"
                    className="col-span-3 bg-gray-700 border-gray-600 focus:ring-flowhero-orange focus:border-flowhero-orange"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-is-favorite" className="text-right">
                  Favorit
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                   <Checkbox
                      id="new-is-favorite"
                      checked={newContentIsFavorite}
                      onCheckedChange={(checked) => setNewContentIsFavorite(checked as boolean)}
                      className="data-[state=checked]:bg-flowhero-orange border-gray-600"
                   />
                   <Star size={20} className={newContentIsFavorite ? "text-yellow-400" : "text-gray-500"} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="new-content-text">
                  Inhalt (Markdown wird unterstützt)
                </Label>
                <Textarea
                  id="new-content-text"
                  value={newContentText}
                  onChange={(e) => setNewContentText(e.target.value)}
                  placeholder="Schreibe hier deinen Inhalt... Nutze Markdown für Formatierungen (z.B. # Überschrift, *fett*)."
                  className="col-span-3 bg-gray-700 border-gray-600 focus:ring-flowhero-orange focus:border-flowhero-orange min-h-[200px] text-sm"
                />
              </div>
              {newContentText && (
                <div className="grid grid-cols-1 gap-2">
                  <Label>Vorschau</Label>
                  <Card className="bg-gray-800 p-4 border-gray-700 max-h-60 overflow-y-auto prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {newContentText}
                    </ReactMarkdown>
                  </Card>
                </div>
              )}
              {/* Auto-Improve and Mic Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={handleAutoImprove}
                  disabled={isAutoImproving || isSavingNewContent}
                  className="text-white border-gray-600 hover:bg-gray-700 w-full flex items-center justify-center"
                >
                  {isAutoImproving ? (
                    <Loader2 size={18} className="mr-2 animate-spin text-flowhero-orange" />
                  ) : (
                    <Sparkles size={18} className="mr-2 text-flowhero-orange" />
                  )}
                  Auto-Improve
                </Button>
                <AudioInputButton
                  onTextReceived={handleTextFromAudio}
                  className="text-white border-gray-600 hover:bg-gray-700 w-full flex items-center justify-center"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-700">Abbrechen</Button>
              </DialogClose>
              <Button onClick={handleSaveNewContent} disabled={isSavingNewContent} className="bg-flowhero-orange hover:bg-flowhero-orange/90 text-black">
                {isSavingNewContent && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Suche nach Inhalten..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full bg-flowhero-card border-gray-600 text-white placeholder-gray-400 focus:ring-flowhero-orange focus:border-flowhero-orange"
          />
        </div>
        <Select value={activeFilter} onValueChange={setActiveFilter}>
          <SelectTrigger className="w-full md:w-[280px] bg-flowhero-card border-gray-600 text-white placeholder-gray-400 focus:ring-flowhero-orange focus:border-flowhero-orange">
            <SelectValue placeholder="Alle Inhaltstypen" />
          </SelectTrigger>
          <SelectContent className="bg-flowhero-card border-gray-600 text-white">
            {CONTENT_TYPES.map(type => (
              <SelectItem key={type} value={type} className="hover:bg-flowhero-orange/20 focus:bg-flowhero-orange">
                {type === "Alle" ? "Alle Inhaltstypen" : type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-flowhero-orange" />
        </div>
      ) : error ? (
        <Card className="bg-red-900/30 border-red-700">
          <CardContent className="pt-6">
            <p className="text-center text-red-400">{error}</p>
          </CardContent>
        </Card>
      ) : savedContents.length === 0 ? (
        <Card className="bg-flowhero-card border-flowhero-card">
          <CardContent className="pt-6">
            <p className="text-center text-gray-300">
              {activeFilter === "Alle" && !searchTerm ? "Du hast noch keine Inhalte gespeichert." : "Keine Inhalte für die aktuellen Filter gefunden."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedContents.map(item => (
            <Card key={item.id} className="bg-flowhero-card border-flowhero-card flex flex-col">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2 truncate">
                    {getContentTypeIcon(item.content_type)}
                    <span className="truncate" title={item.title}>{item.title}</span>
                  </div>
                  {item.is_favorite && <Star size={18} className="text-yellow-400 flex-shrink-0" />}
                </CardTitle>

                <CardDescription className="text-gray-400 text-sm space-y-1">
                  <div>Typ: {item.content_type}</div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(item.created_at).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })} Uhr
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                {item.content && typeof item.content === 'object' && 'type' in item.content ? (
                  <>
                    {item.content.type === 'image_url' && typeof item.content.url === 'string' ? (
                      <img
                        src={item.content.url}
                        alt={item.title ?? 'Gespeicherter Inhalt'}
                        className="rounded-md max-h-48 w-full object-contain"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : item.content.type === 'text' && typeof item.content.value === 'string' ? (
                      <div className="text-gray-300 text-sm line-clamp-3 prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content.value || ""}</ReactMarkdown>
                      </div>
                    ) : (
                       <p className="text-gray-400 text-sm italic">Vorschau nicht verfügbar.</p>
                    )}
                  </>
                ) : typeof item.content === 'string' ? ( // Fallback für ältere Daten ohne Struktur
                  <div className="text-gray-300 text-sm line-clamp-3 prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content || ""}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic">Kein Inhalt vorhanden oder Format unbekannt.</p>
                )}
              </CardContent>
              <CardContent className="flex justify-end gap-2 pt-4 border-t border-gray-700/50 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(item.content)}
                  className="border-flowhero-lightBlue text-flowhero-lightBlue hover:bg-flowhero-lightBlue/10 hover:text-flowhero-lightBlue"
                  title="Inhalt kopieren"
                >
                  <Copy size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { /* TODO: Implement Edit Functionality */ toast({ title: "Info", description: "Bearbeiten-Funktion noch nicht implementiert."}) }}
                  className="border-gray-500 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  title="Bearbeiten"
                >
                  <Edit3 size={16} />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600/80 hover:bg-red-600"
                  title="Löschen"
                >
                  <Trash2 size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedContent;
