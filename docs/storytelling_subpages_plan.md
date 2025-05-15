# Plan und To-Do-Liste für Storytelling-Unterseiten

## 1. Einleitung

Dieses Dokument beschreibt den Plan zur Erstellung der neuen Storytelling-Unterseiten. Ziel ist es, für jede definierte Storytelling-Funktion eine eigene Seite im Stil der bestehenden Strategie-Unterseiten zu implementieren.

## 2. Allgemeine Architektur und Basiskomponente

Alle Storytelling-Seiten basieren auf der wiederverwendbaren Komponente [`MultiStepConfigGeneratorPage`](src/components/expert_templates/MultiStepConfigGeneratorPage.tsx:2).

**Wichtige Eigenschaften der Basiskomponente, die pro Seite angepasst werden:**
*   `pageTitle`: Titel der Seite.
*   `pageDescription`: Kurze Beschreibung der Seitenfunktion.
*   `primaryActionLabel`: Beschriftung des Haupt-Aktionsbuttons.
*   `configSections`: Array von Konfigurationsschritten mit jeweiligen Eingabefeldern ([`Input`](src/components/ui/input.tsx:3), [`Textarea`](src/components/ui/textarea.tsx:4), [`Select`](src/components/ui/select.tsx:6)).
*   `onGenerate`: Handler-Funktion für die Generierungslogik.
*   `savedContentType`: Eindeutiger Bezeichner für den generierten Inhaltstyp.
*   `expertIdentifier`: Eindeutiger Bezeichner für das Generierungs-Tool.
*   `showKnowledgeBaseToggle`: (Standard: `true`) Aktiviert/Deaktiviert die Wissensdatenbank-Option.
*   `knowledgeBaseLabel`: Beschriftung für den Wissensdatenbank-Umschalter.

**Gemeinsame Features:**
*   Mehrstufige Formulare.
*   Zustandsmanagement mit [`useState`](src/pages/strategy/PositionierungsstrategiePage.tsx:1) für Formularfelder.
*   Anzeige von Lade- und Fehlerzuständen.
*   Toast-Benachrichtigungen ([`useToast`](src/components/ui/use-toast.ts:7)).
*   Optionale Wissensdatenbank-Integration.

## 3. Definitionen der Storytelling-Seiten

### 3.1. Story-Fundament
*   **Beschreibung:** Verwalte deine grundlegenden Markengeschichten und Kernbotschaften.
*   **`pageTitle`:** "Story-Fundament definieren"
*   **`pageDescription`:** "Definieren Sie hier die grundlegenden Markengeschichten und Kernbotschaften als Basis für Ihre Kommunikation."
*   **`primaryActionLabel`:** "Story-Fundament generieren"
*   **`savedContentType`:** "story-fundament"
*   **`expertIdentifier`:** "story-fundament-generator"
*   **`configSections`:**
    *   **Sektion 1: Kernmarkenidentität**
        *   Input 1: `Label`: "Kernidentität Ihrer Marke/Ihres Unternehmens", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 2: `Label`: "Primäre Zielgruppe", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Einzigartiges Wertversprechen (UVP)", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
    *   **Sektion 2: Kernbotschaften**
        *   Input 1: `Label`: "Hauptkernbotschaft", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 2: `Label`: "Unterstützende Kernbotschaften", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Gewünschte Tonalität und Stimme", `Element`: [`Select`](src/components/ui/select.tsx:6)

### 3.2. Tagline
*   **Beschreibung:** Erstelle eine prägnante Aussage, die dein Unternehmen, deine Marke oder dein Angebot auf den Punkt bringt.
*   **`pageTitle`:** "Tagline entwickeln"
*   **`pageDescription`:** "Erstellen Sie eine prägnante Tagline, die Ihr Unternehmen, Ihre Marke oder Ihr Angebot auf den Punkt bringt."
*   **`primaryActionLabel`:** "Tagline generieren"
*   **`savedContentType`:** "tagline"
*   **`expertIdentifier`:** "tagline-generator"
*   **`configSections`:**
    *   **Sektion 1: Basisinformationen für die Tagline**
        *   Input 1: `Label`: "Name (Unternehmen/Marke/Produkt)", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 2: `Label`: "Hauptangebot/Hauptnutzen", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Kernzielgruppe", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 4: `Label`: "Gewünschtes Gefühl/Assoziation", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 5: `Label`: "Keywords (optional)", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 6: `Label`: "Gewünschte Länge/Stil", `Element`: [`Select`](src/components/ui/select.tsx:6)

### 3.3. Elevator-Pitch
*   **Beschreibung:** Präsentiere dein Unternehmen oder Produkt prägnant und überzeugend in 30-60 Sekunden.
*   **`pageTitle`:** "Elevator-Pitch erstellen"
*   **`pageDescription`:** "Entwickeln Sie einen prägnanten Elevator-Pitch (30-60 Sek.), um Ihr Unternehmen oder Produkt zu präsentieren."
*   **`primaryActionLabel`:** "Elevator-Pitch generieren"
*   **`savedContentType`:** "elevator-pitch"
*   **`expertIdentifier`:** "elevator-pitch-generator"
*   **`configSections`:**
    *   **Sektion 1: Kerninformationen für den Pitch**
        *   Input 1: `Label`: "Wer sind Sie / Was ist Ihr Unternehmen/Produkt?", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 2: `Label`: "Welches Problem lösen Sie?", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Ihre Lösung?", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 4: `Label`: "Ihr Alleinstellungsmerkmal (USP)?", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 5: `Label`: "Ziel des Pitches (Call to Action)?", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 6: `Label`: "Zielgruppe des Pitches", `Element`: [`Input`](src/components/ui/input.tsx:3)

### 3.4. Positionierungsgeschichte
*   **Beschreibung:** Kommuniziere dein Alleinstellungsmerkmal überzeugend und hebe dich klar von Mitbewerbern ab.
*   **`pageTitle`:** "Positionierungsgeschichte formulieren"
*   **`pageDescription`:** "Entwickeln Sie eine überzeugende Geschichte, die Ihr Alleinstellungsmerkmal kommuniziert."
*   **`primaryActionLabel`:** "Positionierungsgeschichte generieren"
*   **`savedContentType`:** "positioning-story"
*   **`expertIdentifier`:** "positioning-story-generator"
*   **`configSections`:**
    *   **Sektion 1: Grundlage der Positionierung**
        *   Input 1: `Label`: "Ihre definierte Positionierung", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 2: `Label`: "Ihr primäres Alleinstellungsmerkmal (USP)", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Hauptzielgruppe & deren Problem/Bedürfnis", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 4: `Label`: "Hauptwettbewerber", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 5: `Label`: "Fundamentale Unterscheidung von Wettbewerbern", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
    *   **Sektion 2: Elemente der Geschichte**
        *   Input 1: `Label`: "'Aha!'-Momente/Erkenntnisse zur Positionierung", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 2: `Label`: "Einzigartiger Wert/Nutzen", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Gewünschte Kernbotschaft der Geschichte", `Element`: [`Input`](src/components/ui/input.tsx:3)

### 3.5. Markengeschichte
*   **Beschreibung:** Forme eine emotionale Verbindung zu deiner Zielgruppe durch die authentische Geschichte deiner Marke.
*   **`pageTitle`:** "Markengeschichte erzählen"
*   **`pageDescription`:** "Formen Sie eine emotionale Verbindung zu Ihrer Zielgruppe durch die authentische Geschichte Ihrer Marke."
*   **`primaryActionLabel`:** "Markengeschichte generieren"
*   **`savedContentType`:** "brand-story"
*   **`expertIdentifier`:** "brand-story-generator"
*   **`configSections`:**
    *   **Sektion 1: Ursprung und Motivation**
        *   Input 1: `Label`: "Gründung Ihrer Marke (Wie & Warum)?", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 2: `Label`: "Werte und Überzeugungen Ihrer Marke", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Besondere Herausforderungen/Wendepunkte", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
    *   **Sektion 2: Verbindung zur Zielgruppe**
        *   Input 1: `Label`: "Für wen existiert Ihre Marke (Held der Geschichte)?", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 2: `Label`: "Wandel/Transformation für Ihre Zielgruppe", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Gewünschte Emotionen der Geschichte", `Element`: [`Select`](src/components/ui/select.tsx:6)
    *   **Sektion 3: Kernbotschaft und Zukunft**
        *   Input 1: `Label`: "Zentrale Botschaft Ihrer Markengeschichte", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 2: `Label`: "Zukunftsvision Ihrer Marke", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)

### 3.6. Produktnutzengeschichte
*   **Beschreibung:** Zeige anschaulich, wie dein Angebot die Probleme deiner Kunden löst und ihr Leben verbessert.
*   **`pageTitle`:** "Produktnutzengeschichte erstellen"
*   **`pageDescription`:** "Zeigen Sie anschaulich, wie Ihr Produkt/Ihre Dienstleistung Kundenprobleme löst und Leben verbessert."
*   **`primaryActionLabel`:** "Produktnutzengeschichte generieren"
*   **`savedContentType`:** "product-usage-story"
*   **`expertIdentifier`:** "product-usage-story-generator"
*   **`configSections`:**
    *   **Sektion 1: Produkt und Problem**
        *   Input 1: `Label`: "Name des Produkts/Dienstleistung", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 2: `Label`: "Spezifisches Problem, das gelöst wird", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Idealer Zielkunde", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 4: `Label`: "Leben/Arbeit des Kunden VOR dem Produkt (Schmerzpunkte)", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
    *   **Sektion 2: Lösung und Nutzen**
        *   Input 1: `Label`: "Wie löst Ihr Produkt das Problem (Hauptmerkmale)?", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 2: `Label`: "Konkreter Nutzen & positive Ergebnisse NACH Nutzung", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Besonders hervorzuhebendes Feature (optional)", `Element`: [`Input`](src/components/ui/input.tsx:3)
    *   **Sektion 3: Story-Elemente**
        *   Input 1: `Label`: "Gewünschter Ton der Geschichte", `Element`: [`Select`](src/components/ui/select.tsx:6)
        *   Input 2: `Label`: "Kernbotschaft dieser Nutzengeschichte", `Element`: [`Input`](src/components/ui/input.tsx:3)

### 3.7. Referenzgeschichten (Testimonial Story)
*   **Beschreibung:** Transformiere Kundenerfolge in überzeugende Geschichten, die Vertrauen stärken.
*   **`pageTitle`:** "Referenzgeschichte (Testimonial) aufbereiten"
*   **`pageDescription`:** "Transformieren Sie Kundenerfolge in überzeugende Geschichten, die Vertrauen potenzieller Kunden stärken."
*   **`primaryActionLabel`:** "Referenzgeschichte generieren"
*   **`savedContentType`:** "testimonial-story"
*   **`expertIdentifier`:** "testimonial-story-generator"
*   **`configSections`:**
    *   **Sektion 1: Kunde und Ausgangslage**
        *   Input 1: `Label`: "Name des Kunden/Unternehmens", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 2: `Label`: "Branche/Hintergrund des Kunden", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 3: `Label`: "Herausforderung/Problem des Kunden VOR Ihrer Lösung", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 4: `Label`: "Mögliche Bedenken des Kunden VOR Entscheidung (optional)", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
    *   **Sektion 2: Lösung und Ergebnisse**
        *   Input 1: `Label`: "Implementierte Lösung (Ihr Produkt/Service)", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 2: `Label`: "Konkrete, messbare Ergebnisse", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 3: `Label`: "Qualitative Vorteile/positive Effekte", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
        *   Input 4: `Label`: "Direktes Zitat des Kunden (Kern-Testimonial)", `Element`: [`Textarea`](src/components/ui/textarea.tsx:4)
    *   **Sektion 3: Storytelling-Aspekte**
        *   Input 1: `Label`: "Wichtigste Botschaft der Referenzgeschichte", `Element`: [`Input`](src/components/ui/input.tsx:3)
        *   Input 2: `Label`: "Hervorzuhebender Aspekt der Zusammenarbeit (optional)", `Element`: [`Input`](src/components/ui/input.tsx:3)

## 4. To-Do-Liste für die Implementierung

-   [ ] **Verzeichnisstruktur erstellen:**
    -   [ ] Sicherstellen, dass `src/pages/storytelling/` existiert.
-   [ ] **Komponentendateien erstellen für jede Storytelling-Seite:**
    -   [ ] `src/pages/storytelling/StoryFundamentPage.tsx`
    -   [ ] `src/pages/storytelling/TaglinePage.tsx`
    -   [ ] `src/pages/storytelling/ElevatorPitchPage.tsx`
    -   [ ] `src/pages/storytelling/PositioningStoryPage.tsx` (Hinweis: Datei existiert evtl. schon, prüfen und ggf. anpassen)
    -   [ ] `src/pages/storytelling/BrandStoryPage.tsx` (Hinweis: Datei existiert evtl. schon, prüfen und ggf. anpassen)
    *   [ ] `src/pages/storytelling/ProductUsageStoryPage.tsx` (Hinweis: Datei existiert evtl. schon, prüfen und ggf. anpassen)
    *   [ ] `src/pages/storytelling/TestimonialStoryPage.tsx` (Hinweis: Datei existiert evtl. schon, prüfen und ggf. anpassen)
-   [ ] **Implementierung der [`MultiStepConfigGeneratorPage`](src/components/expert_templates/MultiStepConfigGeneratorPage.tsx:2) für jede Seite:**
    -   [ ] Props (`pageTitle`, `pageDescription`, `configSections`, etc.) gemäß obigen Definitionen setzen.
    -   [ ] Notwendiges State-Management ([`useState`](src/pages/strategy/PositionierungsstrategiePage.tsx:1)) für alle Eingabefelder jeder Seite hinzufügen.
    -   [ ] `onGenerate` Handler-Funktion für jede Seite implementieren (zunächst ggf. als Simulation mit `console.log` der gesammelten Daten und einer Toast-Nachricht).
-   [ ] **Navigation/Routing hinzufügen:**
    -   [ ] Die neuen Seiten in die Hauptnavigation und das Routing-System der Anwendung integrieren.
-   [ ] **Styling und UI-Anpassungen:**
    -   [ ] Sicherstellen, dass das Erscheinungsbild konsistent mit den Strategie-Seiten ist.
-   [ ] **Testen:**
    -   [ ] Jede Seite auf Funktionalität der Eingabefelder testen.
    -   [ ] Testen der `onGenerate`-Funktion (simulierter API-Call).
    -   [ ] Testen der Wissensdatenbank-Funktionalität.
    -   [ ] Responsive Tests.
-   [ ] **(Optional) Erweiterte Features:**
    -   [ ] Implementierung von Zeichen-/Wortzählern, wo sinnvoll.
    -   [ ] Prüfung der Notwendigkeit von Entwurfsspeicherung oder Exportfunktionen.