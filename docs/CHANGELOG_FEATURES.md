# Changelog und Implementierte Features

Dieses Dokument listet die wichtigsten implementierten Features und einen Ausblick auf offene TODOs oder geplante nächste Schritte für den FlowHeroBot auf.

## Feature-Checkliste (Stand: 15/05/2025, 11:50:03 pm)

### Hauptfunktionen

*   [x] **Benutzerauthentifizierung** (Supabase Auth)
    *   [x] Registrierung
    *   [x] Login
    *   [x] Logout
    *   [x] Passwort Reset (Standard Supabase Funktionalität)
*   [x] **Unternehmensprofil-Management** ([`src/pages/Profile.tsx`](src/pages/Profile.tsx), [`src/components/CompanyProfileForm.tsx`](src/components/CompanyProfileForm.tsx))
    *   [x] Erstellen und Bearbeiten des Unternehmensprofils
    *   [x] Speicherung diverser Profildetails (Kontaktdaten, Markenstimme, Zielgruppe etc.) in der `company_profiles` Tabelle.
*   [x] **Gespeicherte Inhalte (Saved Content)** ([`src/pages/SavedContent.tsx`](src/pages/SavedContent.tsx))
    *   [x] **Anzeige und Auflistung:**
        *   [x] Rendern von gespeicherten Inhalten aus der Supabase-Tabelle `saved_content`.
        *   [x] Kartenbasiertes Layout zur Darstellung der Inhalte.
        *   [x] Anzeige von Titel, Inhaltstyp, Speicherdatum und -uhrzeit.
        *   [x] Dynamische Icons basierend auf dem Inhaltstyp.
        *   [x] Markdown-Rendering für Textinhalte auf den Karten (gekürzt).
        *   [x] Bildvorschau für Inhalte vom Typ `image_url`.
    *   [x] **Filterung und Suche:**
        *   [x] Filterung der Inhalte nach Inhaltstyp über ein Dropdown-Menü.
        *   [x] Suchfunktion basierend auf dem Titel des Inhalts (debounced).
    *   [x] **Aktionen pro Inhalt:**
        *   [x] Inhalt in die Zwischenablage kopieren.
        *   [x] Inhalt löschen (mit Bestätigung/Toast).
        *   [x] Inhalt als Favorit markieren (Stern-Icon auf Karte sichtbar).
        *   [ ] Inhalt bearbeiten (TODO)
    *   [x] **Erstellung neuer Inhalte (Dialog):**
        *   [x] Button zum Öffnen des "Neuen Inhalt erstellen"-Dialogs.
        *   [x] Eingabefelder für:
            *   Titel (Pflichtfeld)
            *   Inhaltstyp (Auswahlliste mit Option "Anderer..." für benutzerdefinierten Typ)
            *   Favoritenstatus (Checkbox mit Stern-Icon)
        *   [x] Großes Textfeld (`Textarea`) für die Eingabe des Hauptinhalts.
            *   [x] Unterstützung für Markdown-Formatierung.
            *   [x] Live-Vorschau des gerenderten Markdown-Inhalts im Dialog.
        *   [x] **"Auto-Improve"-Funktion:**
            *   [x] Button im Dialog.
            *   [x] Sendet Titel, Typ und aktuellen Text an einen externen Webhook (`https://flowherodemo.app.n8n.cloud/webhook-test/auto-improve`).
            *   [x] Verarbeitet die Webhook-Antwort:
                *   Wenn die Antwort die Struktur `[{"output":{"improved_text":"..."}}]` hat, wird `improved_text` in das Textfeld geschrieben.
                *   Andernfalls wird der rohe Antworttext (für Debugging) in das Textfeld geschrieben.
            *   [x] UI-Feedback (Ladezustand, Toast-Nachrichten für Erfolg/Fehler).
        *   [x] **Audio-Input-Funktion ("Mic-Icon"):**
            *   [x] Button im Dialog, ausgelagert in die Komponente [`src/components/AudioInputButton.tsx`](src/components/AudioInputButton.tsx).
            *   [x] Client-seitige Audio-Aufnahme über `MediaRecorder` API.
            *   [x] Sendet aufgenommene Audio-Datei an die Supabase Edge Function `transcribe-audio`.
            *   [x] Empfängt transkribierten Text von der Edge Function.
            *   [x] Fügt den transkribierten Text in das Haupt-Textfeld ein.
            *   [x] UI-Feedback (Aufnahmestatus-Icon, Toast-Nachrichten).
        *   [x] Speichern des neuen Inhalts in der Supabase-Tabelle `saved_content`.
        *   [x] Automatische Aktualisierung der Inhaltsliste nach dem Speichern.

### Supabase Backend & Infrastruktur

*   [x] **Datenbank-Setup:**
    *   [x] Tabelle `company_profiles` für Benutzer-Unternehmensdaten.
    *   [x] Tabelle `saved_content` für gespeicherte Inhalte, inkl. `is_favorite` Spalte.
    *   [x] Notwendige Relationen und Indizes.
    *   [x] Row Level Security (RLS) Policies für Tabellenzugriff.
*   [x] **Edge Function `transcribe-audio`:**
    *   [x] Erstellt und deployed unter `supabase/functions/transcribe-audio/`.
    *   [x] Empfängt Audiodateien.
    *   [x] Ruft die OpenAI Whisper API zur Transkription auf (benötigt `OPENAI_API_KEY` als Secret).
    *   [x] Gibt transkribierten Text zurück.
    *   [x] CORS-Handling implementiert.

### UI & UX

*   [x] **Grundlegendes Layout:**
    *   [x] Seitenleiste ([`src/components/Sidebar.tsx`](src/components/Sidebar.tsx)) für Navigation.
    *   [x] Kopfzeile ([`src/components/Header.tsx`](src/components/Header.tsx)).
    *   [x] Geschützte Routen ([`src/components/ProtectedRouteElement.tsx`](src/components/ProtectedRouteElement.tsx)).
*   [x] **Styling:** Verwendung von Tailwind CSS und shadcn/ui Komponenten.
*   [x] **Benachrichtigungen:** Toast-Nachrichten für Aktionen (Erfolg, Fehler, Info).
*   [x] **Responsiveness:** (Grundlegend durch Tailwind und Hooks wie `use-mobile` angestrebt, spezifische Tests/Optimierungen ggf. noch offen).

## Offene TODOs / Nächste Schritte

*   [ ] **Gespeicherte Inhalte:**
    *   [ ] Implementierung der "Bearbeiten"-Funktionalität für bestehende gespeicherte Inhalte.
        *   Dialog zum Bearbeiten öffnen.
        *   Felder mit existierenden Daten vorbefüllen.
        *   Änderungen in Supabase speichern.
    *   [ ] Implementierung von Pagination oder Infinite Scroll für die Liste der gespeicherten Inhalte, um die Performance bei vielen Einträgen zu verbessern.
    *   [ ] Verfeinerung der Fehlerbehandlung und des UI-Feedbacks, insbesondere bei Webhook-Aufrufen.
    *   [ ] Ggf. Typ-Sicherheit für Supabase-Antwort in `handleSaveNewContent` verbessern (aktuell `@ts-ignore`).
*   [ ] **"Auto-Improve"-Funktion:**
    *   [ ] Finale Implementierung des n8n-Workflows oder einer direkten API-Anbindung für die tatsächliche Textverbesserung (aktuell wird ein Test-Webhook verwendet).
*   [ ] **Audio-Input-Funktion:**
    *   [ ] Robuste Fehlerbehandlung in der `AudioInputButton`-Komponente und der `transcribe-audio` Edge Function (z.B. für lange Aufnahmen, Netzwerkprobleme während des Uploads).
    *   [ ] UI-Verbesserungen: Visuelles Feedback während des Uploads der Audiodatei.
    *   [ ] Konfigurierbarkeit der `AudioInputButton`-Komponente (z.B. Webhook-URL als Prop, falls von verschiedenen Stellen mit unterschiedlichen Endpunkten genutzt).
*   [ ] **Lokale Entwicklungsumgebung:**
    *   [ ] Anleitung oder Skript zur einfachen Einrichtung von HTTPS für den lokalen Vite-Entwicklungsserver (um `getUserMedia`-Probleme auf Nicht-`localhost`-HTTP-URLs zu vermeiden).
*   [ ] **Testing:**
    *   [ ] Implementierung von Unit-Tests für kritische Komponenten und Hooks.
    *   [ ] Implementierung von Integrationstests für Haupt-Workflows.
*   [ ] **Dokumentation:**
    *   [ ] Regelmäßige Aktualisierung aller Dokumentationsdateien.
    *   [ ] Ggf. API-Dokumentation für die Edge Functions (z.B. mit Swagger/OpenAPI, falls komplexer werdend).
*   [ ] **Allgemein:**
    *   [ ] Überprüfung und Aktualisierung von Abhängigkeiten.
    *   [ ] Performance-Optimierungen, wo nötig.
    *   [ ] Code-Refactoring und Aufräumarbeiten.

## Changelog

*(Hier können zukünftige Änderungen versioniert festgehalten werden)*

### [0.1.0] - 15/05/2025, 11:50:03 pm (Initialer Stand nach Dokumentationserstellung)
*   **Added:**
    *   Grundfunktionen für Benutzerauthentifizierung und Profilmanagement.
    *   Kernfunktionalität für "Gespeicherte Inhalte" mit Erstellung, Anzeige, Filterung, Suche, Kopieren, Löschen und Favoriten.
    *   Markdown-Unterstützung für Textinhalte.
    *   "Auto-Improve"-Funktion mit Webhook-Anbindung (aktuelle Struktur: `[{"output":{"improved_text":"..."}}]`).
    *   Audio-Input-Funktion mit Transkription über Supabase Edge Function und OpenAI Whisper.
    *   Basis-Entwicklerdokumentation (`README-DEVELOPER.md`, `docs/PROJECT_STRUCTURE.md`, `docs/DATABASE_AND_FUNCTIONS.md`, `docs/CHANGELOG_FEATURES.md`).

---
Zuletzt aktualisiert: 15/05/2025, 11:50:03 pm