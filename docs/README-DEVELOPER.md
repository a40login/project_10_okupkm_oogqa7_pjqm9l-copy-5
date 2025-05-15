# FlowHeroBot - Entwickler Readme

Dieses Dokument dient als zentraler Einstiegspunkt für Entwickler, die am FlowHeroBot-Projekt arbeiten. Es bietet einen Überblick über das Projekt, die verwendeten Technologien, Setup-Anweisungen und Links zu detaillierteren Dokumentationen.

## 1. Projektübersicht

**FlowHeroBot** ist eine Webanwendung, die Nutzern hilft, verschiedene Arten von Inhalten (z.B. Marketingstrategien, Social Media Posts, KI-Bilder) zu generieren, zu verwalten und zu optimieren. Die Anwendung integriert sich mit Supabase für das Backend und Datenbankmanagement sowie potenziell mit externen APIs (z.B. OpenAI für Textgenerierung und -verbesserung, n8n für Workflows).

**Kernziele:**
*   Bereitstellung einer intuitiven Benutzeroberfläche zur Inhaltserstellung und -verwaltung.
*   Automatisierung und Unterstützung bei der Content-Optimierung durch KI-Funktionen.
*   Effiziente Speicherung und Organisation von benutzergenerierten Inhalten.

## 2. Verwendete Technologien

*   **Frontend:**
    *   **Framework:** React (mit Vite als Build-Tool)
    *   **Sprache:** TypeScript
    *   **UI-Komponenten:** shadcn/ui
    *   **Styling:** Tailwind CSS
    *   **State Management:** React Context API (z.B. `AuthContext`)
    *   **Routing:** (Wahrscheinlich `react-router-dom`, muss ggf. geprüft werden)
    *   **Icons:** lucide-react
    *   **Markdown Rendering:** `react-markdown`, `remark-gfm`
*   **Backend & Datenbank:**
    *   **Supabase:**
        *   PostgreSQL Datenbank
        *   Authentifizierung
        *   Storage (potenziell für Bild-Uploads etc.)
        *   Edge Functions (Deno Runtime, TypeScript)
*   **Abhängigkeiten (wichtige npm-Pakete):**
    *   `react`, `react-dom`, `typescript`
    *   `vite`
    *   `tailwindcss`
    *   `lucide-react`
    *   `@supabase/supabase-js`
    *   `react-markdown`, `remark-gfm`
    *   `sonner` (für Toasts)
    *   (Weitere spezifische Pakete siehe `package.json`)
*   **Entwicklungstools:**
    *   Node.js & npm
    *   Supabase CLI
    *   Docker Desktop (für Supabase Edge Functions lokale Entwicklung/Deployment)
    *   ESLint (für Code-Linting)

## 3. Voraussetzungen

*   Node.js (empfohlene LTS-Version, z.B. v18.x oder höher - aktuelle Projekt-Warnungen deuten auf v18.17.0 hin, idealerweise eine Version, die von allen `@eslint` Paketen unterstützt wird)
*   npm (wird mit Node.js installiert)
*   Supabase CLI: `npm install supabase --save-dev` (oder global)
*   Docker Desktop: Installiert und laufend (für Edge Functions).
*   Git

## 4. Setup-Anleitung

1.  **Projekt klonen:**
    ```bash
    git clone <repository-url>
    cd <projekt-verzeichnis>
    ```
2.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```
3.  **Supabase Setup (Lokal oder Verknüpfung mit existierendem Projekt):**
    *   **Lokales Supabase (empfohlen für isolierte Entwicklung):**
        *   Stelle sicher, dass Docker läuft.
        *   Initialisiere Supabase lokal (falls noch nicht geschehen): `npx supabase init`
        *   Starte die lokalen Supabase-Dienste: `npx supabase start`
        *   Die lokalen API-URLs und den `anon key` findest du in der Ausgabe von `npx supabase status`.
    *   **Verknüpfung mit einem existierenden Supabase Cloud-Projekt:**
        *   Melde dich bei der Supabase CLI an: `npx supabase login`
        *   Verknüpfe das Projekt: `npx supabase link --project-ref <dein-projekt-ref>`
        *   (Optional, aber empfohlen) Lade die Remote-Datenbankschema-Änderungen herunter: `npx supabase db pull`
4.  **Environment-Variablen erstellen:**
    *   Erstelle eine `.env`-Datei im Projektwurzelverzeichnis basierend auf der `.env.example` (falls vorhanden) oder den benötigten Variablen.
    *   Trage die Supabase URL und den `anon key` ein:
        ```env
        VITE_SUPABASE_URL=http://localhost:54321 # Für lokale Supabase Instanz
        VITE_SUPABASE_ANON_KEY=dein-lokaler-anon-key

        # Oder für ein Cloud-Projekt:
        # VITE_SUPABASE_URL=https://<dein-projekt-ref>.supabase.co
        # VITE_SUPABASE_ANON_KEY=dein-cloud-anon-key
        ```
    *   **Wichtig für Edge Functions:** Wenn du Funktionen deployen möchtest, die API-Keys benötigen (z.B. `OPENAI_API_KEY`), müssen diese als Secrets in deinem Supabase Projekt-Dashboard unter "Edge Functions" -> (deine Funktion) -> "Secrets" gesetzt werden. Sie werden NICHT in die `.env`-Datei eingetragen.
5.  **Datenbank-Migrationen anwenden (für lokales Supabase oder nach `db pull`):**
    *   Wenn du ein lokales Supabase Setup verwendest oder das Schema von einem Remote-Projekt gepullt hast und es lokale Migrationsdateien gibt:
        ```bash
        npx supabase db reset # Setzt die lokale DB zurück und wendet alle Migrationen an
        # ODER, um nur neue Migrationen anzuwenden:
        # npx supabase migration up
        ```

## 5. Starten der Entwicklungsumgebung

*   **Frontend (Vite Dev Server):**
    ```bash
    npm run dev
    ```
    Die Anwendung ist dann normalerweise unter `http://localhost:5173` (oder einem ähnlichen Port) erreichbar.

*   **Supabase Services (falls lokal):**
    Müssen bereits mit `npx supabase start` laufen.

*   **Supabase Edge Functions (lokal testen):**
    ```bash
    npx supabase functions serve --env-file ./supabase/.env.local # (oder Pfad zu deiner .env Datei)
    ```
    Dies startet einen lokalen Server für deine Edge Functions.

## 6. Wichtige Skripte (`package.json`)

*   `npm run dev`: Startet den Vite Entwicklungsserver.
*   `npm run build`: Erstellt einen Produktions-Build der Anwendung.
*   `npm run lint`: Führt ESLint aus, um Code-Qualität zu prüfen.
*   `npm run preview`: Startet einen lokalen Server, um den Produktions-Build zu testen.
*   (Weitere Skripte können in `package.json` definiert sein)

## 7. Verzeichnisstruktur (Überblick)

*   **`public/`**: Statische Assets, die direkt ausgeliefert werden.
*   **`src/`**: Haupt-Quellcode der Anwendung.
    *   **`components/`**: Wiederverwendbare UI-Komponenten.
        *   **`ui/`**: Von shadcn/ui generierte Basis-UI-Komponenten.
    *   **`contexts/`**: React Contexts für globales State Management (z.B. `AuthContext`).
    *   **`hooks/`**: Benutzerdefinierte React Hooks.
    *   **`integrations/`**: Integrationen mit externen Diensten (z.B. `supabase/`).
    *   **`layouts/`**: Layout-Komponenten für verschiedene Seitentypen.
    *   **`lib/`**: Hilfsfunktionen und Utilities (z.B. `utils.ts`).
    *   **`pages/`**: Seitenkomponenten, die Routen entsprechen.
    *   **`App.tsx`**: Haupt-Applikationskomponente, Routing-Setup.
    *   **`main.tsx`**: Einstiegspunkt der Anwendung.
*   **`supabase/`**: Supabase-spezifische Konfigurationen.
    *   **`functions/`**: Quellcode für Supabase Edge Functions (z.B. `transcribe-audio/`).
    *   **`migrations/`**: SQL-Dateien für Datenbankmigrationen.
    *   **`config.toml`**: Hauptkonfigurationsdatei für Supabase CLI.
*   **`docs/`**: (Dieses Verzeichnis wird erstellt) Detaillierte Dokumentationsdateien.

Für eine detailliertere Aufschlüsselung siehe [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md).

## 8. Datenbank

Die Anwendung nutzt eine PostgreSQL-Datenbank, die von Supabase gehostet wird. Das Schema wird durch Migrationsdateien im Verzeichnis `supabase/migrations/` verwaltet.

Wichtige Tabellen umfassen:
*   `saved_content`: Speichert benutzergenerierte Inhalte.
*   `company_profiles`: Speichert Unternehmensprofile der Benutzer.
*   (Weitere Tabellen können vorhanden sein)

Für Details zum Schema, den Spalten und Relationen siehe [`docs/DATABASE_AND_FUNCTIONS.md`](docs/DATABASE_AND_FUNCTIONS.md).

## 9. Supabase Edge Functions

Serverseitige Logik wird über Supabase Edge Functions implementiert, die in TypeScript geschrieben sind und in einer Deno-Umgebung laufen.

Aktuell implementierte Funktionen:
*   `transcribe-audio`: Nimmt eine Audiodatei entgegen und gibt die Transkription über die OpenAI Whisper API zurück.

Details zu den Funktionen, ihren Endpunkten und der Verwendung finden sich in [`docs/DATABASE_AND_FUNCTIONS.md`](docs/DATABASE_AND_FUNCTIONS.md).

## 10. Coding Conventions (Beispiele)

*   TypeScript für Typsicherheit verwenden.
*   ESLint-Regeln einhalten (siehe `eslint.config.js`).
*   Komponenten und Funktionen klar und prägnant benennen.
*   Kommentare für komplexe Logik hinzufügen.
*   (Weitere Konventionen können hier ergänzt werden)

## 11. Troubleshooting

*   **Fehler: "Cannot connect to the Docker daemon..." beim `supabase functions deploy`:**
    *   Stelle sicher, dass Docker Desktop installiert ist und der Docker Daemon läuft.
*   **Fehler: "Access token not provided." beim Supabase CLI Befehl:**
    *   Führe `npx supabase login` aus, um dich zu authentifizieren.
*   **TypeScript-Fehler in `supabase/functions/**/*.ts` im Editor:**
    *   Diese sind oft Editor-spezifisch, da die Deno-Typen nicht standardmäßig erkannt werden. Installiere die Deno VSCode Extension und konfiguriere sie (siehe [Deno VSCode Setup](https://deno.land/manual@v1.43.6/getting_started/setup_your_environment#vscode)). Die Funktionen sollten trotzdem korrekt deployen.
*   **Mikrofonzugriff (`getUserMedia`) funktioniert nicht lokal:**
    *   Stelle sicher, dass die Entwicklungsumgebung über `https://localhost:<port>` (HTTPS) oder `http://localhost:<port>` läuft. Andere lokale URLs (z.B. `http://192.168.x.x`) gelten nicht als sichere Ursprünge. Erwäge die Einrichtung von HTTPS für Vite (z.B. mit `@vitejs/plugin-basic-ssl`).

## 12. Weiterführende Dokumentation

*   [Projektstruktur im Detail](docs/PROJECT_STRUCTURE.md)
*   [Datenbank, Funktionen und Relationen](docs/DATABASE_AND_FUNCTIONS.md)
*   [Changelog und implementierte Features](docs/CHANGELOG_FEATURES.md)

---
Zuletzt aktualisiert: 15/05/2025, 11:46:32 pm
