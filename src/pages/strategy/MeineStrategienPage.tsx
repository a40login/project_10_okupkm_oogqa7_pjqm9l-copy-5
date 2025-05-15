import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SavedContent as SavedContentType } from '@/integrations/supabase/types';
import { AuthContext } from '@/contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Trash2, Copy, Loader2, Edit3, Clock, Lightbulb, Users, Magnet, MousePointer, Mail, Megaphone, Image as ImageIcon, Star } from 'lucide-react';

const STRATEGY_CONTENT_TYPES = [
  "positioning-strategy",
  "online-marketing-strategy",
  "social-media-strategy",
  "competitor-analysis",
  "trend-research"
];

// Wiederverwendet von SavedContent.tsx, ggf. anpassen oder zentralisieren
const getContentTypeIcon = (contentType: string | undefined) => {
  switch (contentType) {
    case "positioning-strategy":
    case "online-marketing-strategy":
    case "social-media-strategy":
    case "competitor-analysis":
    case "trend-research":
    case "Strategie": // Fallback für ältere oder generische "Strategie" Typen
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
      return <Megaphone size={20} className="text-flowhero-orange flex-shrink-0" />;
    case "KI Bild":
      return <ImageIcon size={20} className="text-flowhero-orange flex-shrink-0" />;
    default:
      return <FileText size={20} className="text-flowhero-orange flex-shrink-0" />;
  }
};

const MeineStrategienPage = () => {
  const { toast } = useToast();
  const authContext = useContext(AuthContext);
  const user = authContext?.user ?? null;

  const [savedStrategies, setSavedStrategies] = useState<SavedContentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedStrategies = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      setError("Benutzer nicht authentifiziert.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('saved_content')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        const filteredStrategies = data.filter(item => 
          item.content_type && STRATEGY_CONTENT_TYPES.includes(item.content_type)
        );
        setSavedStrategies(filteredStrategies);
      } else {
        setSavedStrategies([]);
      }

    } catch (err: any) {
      console.error("Error fetching saved strategies:", err);
      setError(err.message || "Strategien konnten nicht geladen werden.");
      toast({
        title: "Fehler",
        description: err.message || "Gespeicherte Strategien konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, toast]);

  useEffect(() => {
    fetchSavedStrategies();
  }, [fetchSavedStrategies]);

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

      setSavedStrategies(prevStrategies => prevStrategies.filter(strategy => strategy.id !== id));
      toast({
        title: "Erfolg",
        description: "Strategie erfolgreich gelöscht.",
      });
    } catch (err: any) {
      console.error("Error deleting strategy:", err);
      toast({
        title: "Fehler beim Löschen",
        description: err.message || "Strategie konnte nicht gelöscht werden.",
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

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Meine gespeicherten Strategien</h1>
          <p className="text-gray-400 mt-1">
            Hier findest du alle Strategien, die du mit unseren Experten-Tools erstellt und gespeichert hast.
          </p>
        </div>
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
      ) : savedStrategies.length === 0 ? (
        <Card className="bg-flowhero-card border-flowhero-card">
          <CardContent className="pt-6">
            <p className="text-center text-gray-300">
              Du hast noch keine passenden Strategien gespeichert oder es konnten keine Strategien geladen werden.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedStrategies.map(item => (
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
                ) : typeof item.content === 'string' ? ( 
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

export default MeineStrategienPage;
