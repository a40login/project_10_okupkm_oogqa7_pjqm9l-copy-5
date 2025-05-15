# Datenbank, Funktionen und Relationen

Dieses Dokument beschreibt das Datenbankschema der Supabase PostgreSQL-Datenbank sowie die implementierten Supabase Edge Functions und deren Beziehungen.

## 1. Datenbank (Supabase PostgreSQL)

Die Datenbank ist das Kernstück für die Datenspeicherung in FlowHeroBot. Das Schema wird durch Migrationen im Verzeichnis `supabase/migrations/` versioniert.

### 1.1 Tabelle: `users` (von Supabase Auth)

*   **Zweck:** Speichert Benutzerauthentifizierungsinformationen. Diese Tabelle wird von Supabase Auth verwaltet.
*   **Wichtige Spalten (Auszug):**
    *   `id` (uuid, Primary Key): Eindeutige ID des Benutzers.
    *   `email` (varchar): E-Mail-Adresse des Benutzers.
    *   `encrypted_password` (varchar): Gehashtes Passwort.
    *   `created_at` (timestamptz): Zeitstempel der Erstellung.
    *   `updated_at` (timestamptz): Zeitstempel der letzten Aktualisierung.
*   **RLS Policies:** Supabase Auth konfiguriert standardmäßig RLS Policies für diese Tabelle.

### 1.2 Tabelle: `company_profiles`

*   **Migrationsdatei:** (Wahrscheinlich Teil einer initialen Migration oder `20250515100000_auto_create_company_profile.sql`)
*   **Zweck:** Speichert detaillierte Unternehmensprofile, die mit Benutzern verknüpft sind.
*   **Spalten:**
    *   `id` (uuid, Primary Key, default: `gen_random_uuid()`): Eindeutige ID des Profils.
    *   `user_id` (uuid, Foreign Key zu `auth.users(id)`, ON DELETE CASCADE, UNIQUE): Verknüpfung zum Benutzer. Stellt sicher, dass jeder Benutzer nur ein Unternehmensprofil hat.
    *   `created_at` (timestamptz, default: `now()`): Zeitstempel der Erstellung.
    *   `updated_at` (timestamptz, default: `now()`): Zeitstempel der letzten Aktualisierung (wird ggf. durch einen Trigger aktualisiert).
    *   `email` (text, nullable): Kontakt-E-Mail des Unternehmens.
    *   `first_name` (text, nullable): Vorname des Ansprechpartners.
    *   `last_name` (text, nullable): Nachname des Ansprechpartners.
    *   `company_name` (text, nullable): Name des Unternehmens.
    *   `industry` (text, nullable): Branche des Unternehmens.
    *   `website_url` (text, nullable): Webseite des Unternehmens.
    *   `main_product` (text, nullable): Hauptprodukt/Dienstleistung (Kurzname).
    *   `product_url` (text, nullable): URL zum Hauptprodukt.
    *   `linkedin_url` (text, nullable): LinkedIn Profil URL.
    *   `position` (text, nullable): Position des Ansprechpartners.
    *   `twitter_url` (text, nullable): Twitter Profil URL.
    *   `tone` (text, nullable): Generelle Tonalität der Marke.
    *   `language` (text, nullable): Anredeform (Du/Sie).
    *   `use_humor` (text, nullable): Verwendung von Humor.
    *   `target_audience` (text, nullable): Zielgruppe und Kundenavatar.
    *   `writing_style` (text, nullable): Satzkomplexität.
    *   `technical_terms` (text, nullable): Verwendung von Fachbegriffen.
    *   `preferred_phrases` (text, nullable): Bevorzugte Phrasen.
    *   `avoid_phrases` (text, nullable): Zu vermeidende Phrasen.
    *   `call_to_actions` (text[], nullable): Liste von Call-to-Actions.
    *   `brand_values` (text[], nullable): Markenwerte.
    *   `main_services` (text, nullable): Detaillierte Beschreibung der Hauptprodukte/Dienstleistungen.
    *   `main_problem` (text, nullable): Hauptproblem der Kunden.
    *   `solution` (text, nullable): Lösung des Unternehmens.
    *   `mission_vision_values` (text, nullable): Mission, Vision, Firmenwerte.
    *   `positioning` (text, nullable): Positionierung (USP).
    *   `benefits` (text, nullable): Nutzen und Mehrwert.
    *   `achievements` (text, nullable): Erfolge und Meilensteine.
    *   `seo_keywords` (text, nullable): SEO-Keywords.
    *   `process_steps` (text, nullable): Schritte zur Zusammenarbeit.
    *   `brand_personality` (text, nullable): Markenpersönlichkeit.
    *   `sensitive_topics_handling` (text, nullable): Umgang mit kritischen Themen.
    *   `preferred_ctas_style` (text, nullable): Bevorzugter Stil für Call-to-Actions.
    *   `emoji_usage` (text, nullable): Verwendung von Emojis.
*   **RLS Policies:**
    *   Benutzer können ihr eigenes Profil sehen.
    *   Benutzer können ihr eigenes Profil erstellen (oft durch einen Trigger nach der Benutzerregistrierung).
    *   Benutzer können ihr eigenes Profil aktualisieren.
    *   (Kein direktes Löschen durch Benutzer vorgesehen, ggf. über Kaskadierung bei Benutzerlöschung).

### 1.3 Tabelle: `saved_content`

*   **Migrationsdateien:** `20250515211402_create_saved_content_table.sql`, `20250515194103_add_is_favorite_to_saved_content.sql`
*   **Zweck:** Speichert die von Benutzern erstellten und gespeicherten Inhalte.
*   **Spalten:**
    *   `id` (uuid, Primary Key, default: `gen_random_uuid()`): Eindeutige ID des gespeicherten Inhalts.
    *   `user_id` (uuid, NOT NULL, Foreign Key zu `auth.users(id)`, ON DELETE CASCADE): ID des Benutzers, dem dieser Inhalt gehört.
    *   `created_at` (timestamptz, NOT NULL, default: `now()`): Zeitstempel der Erstellung.
    *   `title` (text, NOT NULL): Titel des gespeicherten Inhalts.
    *   `content` (jsonb, NOT NULL): Der eigentliche Inhalt, flexibel als JSONB gespeichert (kann Text, Bild-URLs, strukturierte Daten etc. enthalten).
        *   Beispielstruktur für Text: `{"type": "text", "value": "Markdown-Inhalt..."}`
        *   Beispielstruktur für Bild: `{"type": "image_url", "url": "https://..."}`
    *   `content_type` (text, NOT NULL): Art des Inhalts (z.B. "Strategie", "KI Bild", "LinkedIn Artikel").
    *   `source_expert` (text, nullable): Optional: Der Experten-Agent oder die Seite, die diesen Inhalt generiert hat (z.B. "ImageGeneratorPage").
    *   `generation_params` (jsonb, nullable): Optional: Parameter, die zur Generierung des Inhalts verwendet wurden.
    *   `is_favorite` (boolean, NOT NULL, default: `false`): Gibt an, ob der Inhalt vom Benutzer als Favorit markiert wurde.
*   **Indizes:**
    *   `idx_saved_content_user_id` auf `user_id`.
    *   `idx_saved_content_content_type` auf `content_type`.
    *   `idx_saved_content_is_favorite` auf (`user_id`, `is_favorite`).
*   **RLS Policies:**
    *   Benutzer können ihre eigenen Inhalte sehen.
    *   Benutzer können eigene Inhalte erstellen.
    *   Benutzer können eigene Inhalte aktualisieren.
    *   Benutzer können eigene Inhalte löschen.

### 1.4 Relationen (Zusammenfassung)

*   `company_profiles.user_id` -> `auth.users.id` (Eins-zu-Eins oder Eins-zu-Null)
*   `saved_content.user_id` -> `auth.users.id` (Viele-zu-Eins)

## 2. Supabase Edge Functions

Edge Functions erweitern die Backend-Logik der Anwendung. Sie werden in TypeScript geschrieben und laufen in einer Deno-Umgebung.

### 2.1 Funktion: `transcribe-audio`

*   **Verzeichnis:** `supabase/functions/transcribe-audio/`
*   **Datei:** `index.ts`
*   **Zweck:** Nimmt eine Audiodatei vom Frontend entgegen, sendet sie an die OpenAI Whisper API zur Transkription und gibt den transkribierten Text zurück.
*   **Endpunkt (Beispiel):** `https://<project-ref>.supabase.co/functions/v1/transcribe-audio`
*   **Methode:** `POST`
*   **Eingabe:** `FormData` mit einem Feld `audioFile`, das die Audiodatei enthält.
*   **Ausgabe (Erfolg):** JSON-Objekt mit dem transkribierten Text, z.B. `{"transcribedText": "Dies ist der Text."}` (Status 200).
*   **Ausgabe (Fehler):** JSON-Objekt mit einer Fehlermeldung, z.B. `{"error": "Fehlermeldung"}` (Status 4xx oder 5xx).
*   **Secrets:**
    *   `OPENAI_API_KEY`: Erforderlich für die Authentifizierung bei der OpenAI API. Muss im Supabase Dashboard für diese Funktion gesetzt werden.
*   **Wichtige externe API-Aufrufe:**
    *   OpenAI Audio Transcriptions API (`whisper-1` Modell).
*   **Datenfluss:**
    1.  Frontend ([`src/components/AudioInputButton.tsx`](src/components/AudioInputButton.tsx)) sendet Audio-Blob als `FormData` an den Endpunkt.
    2.  Edge Function empfängt die Datei.
    3.  Edge Function ruft OpenAI Whisper API mit der Audiodatei auf.
    4.  OpenAI API gibt transkribierten Text zurück.
    5.  Edge Function sendet den Text als JSON-Antwort an das Frontend.

---
Zuletzt aktualisiert: 15/05/2025, 11:48:49 pm