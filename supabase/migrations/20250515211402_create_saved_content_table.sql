-- Erstelle die Tabelle saved_content
CREATE TABLE public.saved_content (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    title text NOT NULL,
    content jsonb NOT NULL,
    content_type text NOT NULL,
    source_expert text NULL,
    generation_params jsonb NULL,
    CONSTRAINT saved_content_pkey PRIMARY KEY (id),
    CONSTRAINT saved_content_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Füge Kommentare zu den Spalten hinzu (optional, aber gute Praxis)
COMMENT ON COLUMN public.saved_content.id IS 'Eindeutiger Identifikator für den gespeicherten Inhalt';
COMMENT ON COLUMN public.saved_content.user_id IS 'ID des Benutzers, dem dieser Inhalt gehört';
COMMENT ON COLUMN public.saved_content.created_at IS 'Zeitstempel der Erstellung des Inhalts';
COMMENT ON COLUMN public.saved_content.title IS 'Titel des gespeicherten Inhalts (z.B. "LinkedIn Post Entwurf")';
COMMENT ON COLUMN public.saved_content.content IS 'Der eigentliche Inhalt, gespeichert als JSONB für Flexibilität';
COMMENT ON COLUMN public.saved_content.content_type IS 'Art des Inhalts (z.B. "Strategie", "Expertenseite")';
COMMENT ON COLUMN public.saved_content.source_expert IS 'Optional: Der Experten-Agent, der diesen Inhalt generiert hat';
COMMENT ON COLUMN public.saved_content.generation_params IS 'Optional: Parameter, die zur Generierung des Inhalts verwendet wurden';

-- Aktiviere Row Level Security (RLS) für die Tabelle
ALTER TABLE public.saved_content ENABLE ROW LEVEL SECURITY;

-- Erstelle RLS Policies
-- Benutzer können ihre eigenen Inhalte sehen
CREATE POLICY "Benutzer können eigene Inhalte sehen"
ON public.saved_content
FOR SELECT
USING (auth.uid() = user_id);

-- Benutzer können eigene Inhalte erstellen
CREATE POLICY "Benutzer können eigene Inhalte erstellen"
ON public.saved_content
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Benutzer können eigene Inhalte aktualisieren
CREATE POLICY "Benutzer können eigene Inhalte aktualisieren"
ON public.saved_content
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Benutzer können eigene Inhalte löschen
CREATE POLICY "Benutzer können eigene Inhalte löschen"
ON public.saved_content
FOR DELETE
USING (auth.uid() = user_id);

-- Erstelle Indizes
CREATE INDEX idx_saved_content_user_id ON public.saved_content(user_id);
CREATE INDEX idx_saved_content_content_type ON public.saved_content(content_type);