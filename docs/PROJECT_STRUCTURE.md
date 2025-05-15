# Projektstruktur im Detail

Dieses Dokument beschreibt die Verzeichnisstruktur und die wichtigsten Dateien des FlowHeroBot-Projekts.

## Hauptverzeichnisse

*   **`.vscode/`**: Enthält VSCode-spezifische Einstellungen (z.B. `settings.json` zur Aktivierung der Deno-Integration für Edge Functions).
*   **`docs/`**: Beinhaltet alle detaillierten Dokumentationsdateien des Projekts (wie diese hier).
*   **`node_modules/`**: Enthält alle npm-Abhängigkeiten des Projekts (wird von `npm install` generiert und nicht versioniert).
*   **`public/`**: Statische Assets, die direkt vom Webserver ausgeliefert werden.
    *   `favicon.ico`: Das Favicon der Anwendung.
    *   `placeholder.svg`: Ein Platzhalterbild.
    *   `robots.txt`: Anweisungen für Web-Crawler.
*   **`src/`**: Der Hauptquellcode der React/TypeScript-Anwendung.
*   **`supabase/`**: Konfiguration und Code für die Supabase-Integration.

## `src/` - Frontend Quellcode

Das `src`-Verzeichnis ist das Herzstück der Frontend-Anwendung und wie folgt strukturiert:

*   **`App.css`**: Globale CSS-Stile (sollte idealerweise minimal sein, da Tailwind CSS primär genutzt wird).
*   **`App.tsx`**: Die Wurzelkomponente der React-Anwendung. Hier wird typischerweise das Hauptlayout und das Routing (z.B. mit `react-router-dom`) definiert.
*   **`index.css`**: Haupt-CSS-Datei, die Tailwind CSS-Direktiven und eventuell benutzerdefinierte Basisstile importiert.
*   **`main.tsx`**: Der Haupteinstiegspunkt der React-Anwendung. Hier wird die `App`-Komponente in das DOM gerendert.
*   **`vite-env.d.ts`**: Typdefinitionen für Umgebungsvariablen, die von Vite bereitgestellt werden (z.B. `import.meta.env`).

*   **`components/`**: Enthält wiederverwendbare UI-Komponenten.
    *   **`ui/`**: Basis-UI-Komponenten, die mit `shadcn/ui` generiert wurden (z.B. `Button.tsx`, `Card.tsx`, `Input.tsx`, `Dialog.tsx` etc.). Diese sollten im Allgemeinen nicht direkt stark modifiziert werden, sondern eher durch eigene Komponenten in `components/` gewrappt oder erweitert werden.
    *   `AudioInputButton.tsx`: Eine benutzerdefinierte Komponente für die Audioaufnahme und -transkription.
    *   `CompanyProfileForm.tsx`: Formular zur Erfassung von Unternehmensprofildaten.
    *   `ExpertCard.tsx`: Komponente zur Darstellung einer Experten-Karte.
    *   `Header.tsx`: Die Kopfzeilenkomponente der Anwendung.
    *   `ProtectedRouteElement.tsx`: Komponente zur Absicherung von Routen, die eine Authentifizierung erfordern.
    *   `Sidebar.tsx`: Die Navigationsseitenleiste der Anwendung.
    *   `WelcomeBanner.tsx`: Eine Willkommensbanner-Komponente.

*   **`contexts/`**: Beinhaltet React Contexts für das globale State Management.
    *   `AuthContext.tsx`: Verwaltet den Authentifizierungsstatus des Benutzers und stellt Benutzerinformationen bereit.

*   **`hooks/`**: Enthält benutzerdefinierte React Hooks zur Kapselung wiederverwendbarer Logik.
    *   `use-mobile.tsx`: Ein Hook zur Erkennung, ob die Anwendung auf einem mobilen Gerät angezeigt wird.
    *   `use-toast.ts`: Ein Hook, der die `toast`-Funktion von `shadcn/ui` (oder `sonner`) für Benachrichtigungen bereitstellt.

*   **`integrations/`**: Code für die Integration mit externen Diensten.
    *   **`supabase/`**:
        *   `client.ts`: Initialisiert und exportiert den Supabase JavaScript-Client.
        *   `types.ts`: Enthält TypeScript-Typdefinitionen für die Supabase-Datenbanktabellen und -funktionen (teilweise automatisch generiert, teilweise manuell erweitert).

*   **`layouts/`**: Komponenten, die das Grundgerüst für verschiedene Seitentypen definieren.
    *   `MainLayout.tsx`: Standardlayout für die meisten Seiten (z.B. mit Sidebar und Header).
    *   `ProtectedMainLayout.tsx`: Eine Variante des `MainLayout`, die den Zugriff auf geschützte Inhalte sicherstellt.

*   **`lib/`**: Allgemeine Hilfsfunktionen und Utility-Module.
    *   `utils.ts`: Enthält Hilfsfunktionen, die von `shadcn/ui` verwendet werden (z.B. `cn` zum Zusammenführen von Klassen).

*   **`pages/`**: Komponenten, die ganze Seiten der Anwendung darstellen und typischerweise mit Routen verknüpft sind.
    *   Diverse `*Page.tsx` und `*Expert.tsx` Dateien (z.B. `Dashboard.tsx`, `SavedContent.tsx`, `MarketingExpertPage.tsx`).
    *   Unterverzeichnisse für gruppierte Seiten, z.B.:
        *   `copywriter/`
        *   `funnel/`
        *   `social/`
        *   `storytelling/`
        *   `strategy/`

## `supabase/` - Supabase Backend und Konfiguration

Dieses Verzeichnis enthält alles, was für die Supabase-Integration und das Backend benötigt wird:

*   **`config.toml`**: Die Hauptkonfigurationsdatei für die Supabase CLI. Definiert Projekt-ID, lokale Entwicklungseinstellungen etc.
*   **`functions/`**: Enthält den Quellcode für Supabase Edge Functions. Jede Funktion befindet sich in einem eigenen Unterverzeichnis.
    *   **`transcribe-audio/`**:
        *   `index.ts`: Die TypeScript-Datei mit der Logik für die Audio-Transkriptionsfunktion (Kommunikation mit OpenAI Whisper API).
        *   `.npmrc`, `deno.json`: Konfigurationsdateien für die Deno-Umgebung der Funktion (können Import Maps etc. enthalten).
*   **`migrations/`**: Enthält SQL-Dateien, die die Datenbankmigrationen definieren. Jede Datei repräsentiert eine Änderung am Datenbankschema und wird von der Supabase CLI verwaltet.
    *   Beispiel: `20250515211402_create_saved_content_table.sql`, `20250515194103_add_is_favorite_to_saved_content.sql`.

## Wichtige Konfigurationsdateien im Projektwurzelverzeichnis

*   **`.env`**: (Nicht versioniert) Enthält Umgebungsvariablen für die lokale Entwicklung (z.B. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
*   **`.gitignore`**: Definiert Dateien und Verzeichnisse, die von Git ignoriert werden sollen (z.B. `node_modules/`, `.env`, `.DS_Store`).
*   **`bun.lockb`**: Lock-Datei für den Bun Package Manager (alternativ zu `package-lock.json` für npm).
*   **`components.json`**: Konfigurationsdatei für `shadcn/ui`, definiert z.B. den Pfad zu den UI-Komponenten und Utilities.
*   **`eslint.config.js`**: Konfiguration für ESLint, das Werkzeug zur statischen Code-Analyse und zum Finden von Problemen im TypeScript/JavaScript-Code.
*   **`index.html`**: Das HTML-Grundgerüst der Single-Page Application. Vite injiziert hier die gebündelten JavaScript- und CSS-Dateien.
*   **`package.json`**: Definiert Projektmetadaten, Abhängigkeiten (npm-Pakete) und Skripte (`npm run ...`).
*   **`package-lock.json`**: Sperrt die Versionen der installierten npm-Pakete für konsistente Builds.
*   **`postcss.config.js`**: Konfiguration für PostCSS (wird oft zusammen mit Tailwind CSS verwendet).
*   **`tailwind.config.ts`**: Konfigurationsdatei für Tailwind CSS, hier werden Design-Tokens, Plugins etc. definiert.
*   **`tsconfig.json`**: Hauptkonfigurationsdatei für den TypeScript-Compiler.
*   **`tsconfig.app.json`**: TypeScript-Konfiguration speziell für den App-Code (kann `tsconfig.json` erweitern).
*   **`tsconfig.node.json`**: TypeScript-Konfiguration für Node.js-spezifische Umgebungen im Projekt (z.B. für Vite-Konfigurationsdateien selbst).
*   **`vite.config.ts`**: Konfigurationsdatei für Vite, das Build-Tool und den Entwicklungsserver.

---
Zuletzt aktualisiert: 15/05/2025, 11:47:41 pm