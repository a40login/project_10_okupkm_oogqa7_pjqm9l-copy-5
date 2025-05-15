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
    -   [ ] Prüfung der Notwendigkeit von Entwurfsspeicherung oder Exportfunktionen.# Experten-Tool-Page-Templates Dokumentation

## Einleitung

Diese Dokumentation beschreibt die verschiedenen Page-Templates, die für die Erstellung von Experten-Tools in diesem Projekt verwendet werden. Das Herzstück dieser Templates ist die [`ExpertPageShell.tsx`](../src/components/layout/ExpertPageShell.tsx:1)-Komponente, die als Haupt-Wrapper dient und grundlegende Funktionen wie Titel, Beschreibungen, Lade-/Fehlerzustände und Aktionsbuttons bereitstellt. Die Templates bieten spezialisierte Strukturen für verschiedene Arten von Experten-Tools.

## `ExpertPageShell.tsx` Komponente

Die [`ExpertPageShell.tsx`](../src/components/layout/ExpertPageShell.tsx:1) ist die Basis-UI-Komponente für alle Experten-Tool-Seiten. Sie stellt ein konsistentes Layout und Verhalten sicher.

**Beschreibung:**
Ein Haupt-Wrapper, der die Struktur für Experten-Tool-Seiten vorgibt. Er beinhaltet Header-Elemente, einen Inhaltsbereich und Aktionsbuttons sowie optionale Integration einer Wissensdatenbank.

**Wichtige Props:**

*   `title: string`: Der Haupttitel der Seite, der prominent angezeigt wird.
*   `description?: React.ReactNode`: Eine optionale Beschreibung oder einleitender Text unterhalb des Titels. Kann auch React-Komponenten enthalten.
*   `savedContentType?: string`: Definiert den Typ des Inhalts, der gespeichert wird (z.B. "Idee", "Textentwurf"). Wird verwendet, um den Link-Text für gespeicherte Inhalte zu generieren.
*   `savedContentLinkText?: string`: Optionaler Text für den Link zu "Meine gespeicherten Inhalte". Wenn nicht angegeben, wird er basierend auf `savedContentType` generiert (z.B. "Meine Ideen").
*   `isLoading: boolean`: Steuert die Anzeige eines Ladeindikators. Sollte `true` sein, während Daten geladen oder eine Aktion ausgeführt wird.
*   `error?: string | null`: Zeigt eine Fehlermeldung an, wenn ein Fehler aufgetreten ist. `null` oder `undefined` bedeutet kein Fehler.
*   `children: React.ReactNode`: Der Hauptinhaltsbereich der Seite. Hier werden die spezifischen Formulare oder Eingabeelemente des jeweiligen Templates gerendert.
*   `primaryActionLabel: string`: Der Text für den primären Aktionsbutton (z.B. "Generieren", "Speichern").
*   `onPrimaryAction: (data: { knowledgeBaseText?: string }) => void`: Callback-Funktion, die ausgeführt wird, wenn der primäre Button geklickt wird. Erhält optional den Text aus der Wissensdatenbank.
*   `secondaryActionLabel?: string`: Optionaler Text für einen sekundären Aktionsbutton.
*   `onSecondaryAction?: () => void`: Optionale Callback-Funktion für den sekundären Button.
*   **Wissensdatenbank-Props:**
    *   `showKnowledgeBaseToggle?: boolean`: Wenn `true`, wird ein Schalter angezeigt, um die Wissensdatenbank ein-/auszublenden.
    *   `knowledgeBaseLabel?: string`: Label für das Textfeld der Wissensdatenbank.
    *   `knowledgeBaseText?: string`: Der aktuelle Textinhalt der Wissensdatenbank.
    *   `onKnowledgeBaseTextChange?: (text: string) => void`: Callback, der bei Änderungen im Wissensdatenbank-Textfeld aufgerufen wird.
    *   `isKnowledgeBaseActive?: boolean`: Steuert, ob die Wissensdatenbank aktuell aktiv/sichtbar ist.
    *   `onKnowledgeBaseToggle?: (isActive: boolean) => void`: Callback, der beim Umschalten der Wissensdatenbank aufgerufen wird.
*   `expertIdentifier: string`: Eine eindeutige Kennung für das Experten-Tool, die für das Speichern und Abrufen von Inhalten verwendet wird.

## Template: `SimpleFormGeneratorPage.tsx`

**Pfad:** [`src/components/expert_templates/SimpleFormGeneratorPage.tsx`](../src/components/expert_templates/SimpleFormGeneratorPage.tsx:1)

**Zweck:**
Dieses Template eignet sich für einfache Tools, die eine Reihe von Standard-Formularfeldern benötigen, um Daten vom Benutzer zu sammeln und daraus etwas zu generieren.

**Wichtige Props:**

*   `pageTitle: string`: Titel der Seite.
*   `pageDescription?: React.ReactNode`: Beschreibung der Seite.
*   `formFields: FormFieldConfig[]`: Ein Array von Konfigurationsobjekten, das die zu rendernden Formularfelder definiert. Jedes Objekt spezifiziert Typ, Name, Label, Platzhalter etc. des Feldes. (Siehe Typdefinition in [`src/types/expertTemplateTypes.ts`](../src/types/expertTemplateTypes.ts:1))
*   `onGenerate: (data: Record<string, any> & { knowledgeBaseText?: string }) => Promise<void>`: Asynchrone Funktion, die aufgerufen wird, wenn der primäre Aktionsbutton geklickt wird. Erhält ein Objekt mit den Formulardaten (Schlüssel sind die `name`-Attribute der `formFields`) und optional den `knowledgeBaseText`.
*   `primaryActionLabel: string`: Label für den Generieren-Button.
*   `savedContentType: string`: Typ des gespeicherten Inhalts (für "Meine..." Link).
*   `expertIdentifier: string`: Eindeutige Kennung des Experten-Tools.
*   Wissensdatenbank-Props (wie bei `ExpertPageShell.tsx` beschrieben).

**Verwendung:**
Die `formFields`-Prop ist ein Array, wobei jedes Element ein Formularfeld beschreibt. Zum Beispiel:
```typescript
const formFields: FormFieldConfig[] = [
  { name: "topic", label: "Thema", type: "text", placeholder: "Geben Sie ein Thema ein" },
  { name: "tone", label: "Tonalität", type: "select", options: [{value: "formal", label: "Formell"}, {value: "casual", label: "Locker"}] }
];
```
Die `onGenerate`-Funktion erhält ein Datenobjekt, das die Werte dieser Felder enthält:
```typescript
// Beispiel für onGenerate Datenstruktur
{
  topic: "Künstliche Intelligenz",
  tone: "formal",
  knowledgeBaseText: "Zusätzliche Informationen..." // falls Wissensdatenbank aktiv und befüllt
}
```
Ein Beispiel für die Implementierung dieses Templates findet sich in [`src/pages/experts/SimpleIdeaGeneratorPage.tsx`](../src/pages/experts/SimpleIdeaGeneratorPage.tsx:1).

## Template: `FreeInputWithEnhancementsPage.tsx`

**Pfad:** [`src/components/expert_templates/FreeInputWithEnhancementsPage.tsx`](../src/components/expert_templates/FreeInputWithEnhancementsPage.tsx:1)

**Zweck:**
Ideal für Tools, bei denen der Benutzer einen längeren Text in ein Haupt-Textfeld eingibt, ergänzt durch optionale Steuerelemente oder "Enhancements" (z.B. Tonalitätsauswahl, Längenbeschränkung).

**Wichtige Props:**

*   `pageTitle: string`: Titel der Seite.
*   `pageDescription?: React.ReactNode`: Beschreibung der Seite.
*   `controlFieldsSlot?: React.ReactNode`: Ein Slot, in den zusätzliche Steuerelemente (z.B. Select-Felder, Checkboxen) über dem Haupt-Textfeld eingefügt werden können.
*   `mainTextareaLabel: string`: Label für das Haupt-Textfeld.
*   `mainTextareaPlaceholder?: string`: Platzhaltertext für das Haupt-Textfeld.
*   `enableAudioInput?: boolean`: Aktiviert die Möglichkeit der Spracheingabe für das Haupt-Textfeld.
*   `onIdeate?: () => Promise<string | undefined>`: Optionale Funktion, um Ideen oder Vorschläge für das Haupt-Textfeld zu generieren.
*   `ideateButtonLabel?: string`: Label für den Ideen-Button, falls `onIdeate` verwendet wird.
*   `onGenerate: (data: { mainInput: string; knowledgeBaseText?: string; [key: string]: any }) => Promise<void>`: Asynchrone Funktion, die beim Klick auf den primären Button aufgerufen wird. Erhält ein Objekt mit dem Inhalt des Haupt-Textfelds (`mainInput`), optional dem `knowledgeBaseText` und ggf. Werten aus `controlFieldsSlot`.
*   `primaryActionLabel: string`: Label für den Generieren-Button.
*   `savedContentType: string`: Typ des gespeicherten Inhalts.
*   `expertIdentifier: string`: Eindeutige Kennung des Experten-Tools.
*   Wissensdatenbank-Props.

**Verwendung:**
Der `controlFieldsSlot` kann genutzt werden, um spezifische Einstellungsfelder für das Tool bereitzustellen. Diese Felder müssen separat verwaltet und ihre Werte manuell in der `onGenerate`-Funktion zusammen mit `mainInput` verarbeitet werden.
Die `onGenerate`-Datenstruktur sieht typischerweise so aus:
```typescript
// Beispiel für onGenerate Datenstruktur
{
  mainInput: "Der vom Benutzer eingegebene Text...",
  // Werte aus controlFieldsSlot, falls vorhanden und entsprechend übergeben
  someControlField: "wert",
  knowledgeBaseText: "Zusätzliche Informationen..."
}
```
Ein Beispiel für die Implementierung dieses Templates findet sich in [`src/pages/experts/TextRewriterPage.tsx`](../src/pages/experts/TextRewriterPage.tsx:1).

## Template: `SourceDrivenTextGeneratorPage.tsx`

**Pfad:** [`src/components/expert_templates/SourceDrivenTextGeneratorPage.tsx`](../src/components/expert_templates/SourceDrivenTextGeneratorPage.tsx:1)

**Zweck:**
Entwickelt für Tools, die Text basierend auf einer primären Datenquelle generieren, die der Benutzer auswählt (z.B. ein Blogartikel, eine Produktbeschreibung). Es können quellenspezifische und allgemeine Eingabefelder vorhanden sein.

**Wichtige Props:**

*   `pageTitle: string`: Titel der Seite.
*   `pageDescription?: React.ReactNode`: Beschreibung der Seite.
*   `sourceOptions: Array<{ value: string; label: string }>`: Optionen für die Auswahl der Datenquelle.
*   `sourceSelectionLabel?: string`: Label für das Auswahlfeld der Datenquelle.
*   `fieldsForSourceSlot: (selectedSourceValue: string | undefined) => React.ReactNode`: Eine Funktion, die React-Knoten zurückgibt. Diese rendert spezifische Eingabefelder basierend auf der ausgewählten `selectedSourceValue`.
*   `commonFieldsSlot?: React.ReactNode`: Ein Slot für Eingabefelder, die unabhängig von der gewählten Quelle immer angezeigt werden.
*   `onGenerate: (data: { selectedSource?: string; sourceSpecificData?: Record<string, any>; commonData?: Record<string, any>; knowledgeBaseText?: string }) => Promise<void>`: Asynchrone Funktion. Erhält die ausgewählte Quelle, Daten aus den quellenspezifischen Feldern, Daten aus den allgemeinen Feldern und optional den `knowledgeBaseText`.
*   `primaryActionLabel: string`: Label für den Generieren-Button.
*   `savedContentType: string`: Typ des gespeicherten Inhalts.
*   `expertIdentifier: string`: Eindeutige Kennung des Experten-Tools.
*   Wissensdatenbank-Props.

**Verwendung:**
Der `fieldsForSourceSlot` ist entscheidend, um dynamisch Formularfelder anzuzeigen, die nur für die aktuell gewählte Datenquelle relevant sind. Die `onGenerate`-Funktion erhält die Daten strukturiert:
```typescript
// Beispiel für onGenerate Datenstruktur
{
  selectedSource: "blog_article_url",
  sourceSpecificData: { articleUrl: "http://example.com/article" },
  commonData: { targetAudience: "Developers" },
  knowledgeBaseText: "Zusätzliche Informationen..."
}
```
Ein Beispiel für die Implementierung dieses Templates findet sich in [`src/pages/experts/MarketingStrategyGeneratorPage.tsx`](../src/pages/experts/MarketingStrategyGeneratorPage.tsx:1).

## Template: `ProductFocusedGeneratorPage.tsx`

**Pfad:** [`src/components/expert_templates/ProductFocusedGeneratorPage.tsx`](../src/components/expert_templates/ProductFocusedGeneratorPage.tsx:1)

**Zweck:**
Speziell für Tools, die Inhalte basierend auf den Produkten oder Dienstleistungen des Nutzers generieren. Bietet eine Auswahlmöglichkeit für existierende Produkte des Nutzers.

**Wichtige Props:**

*   `pageTitle: string`: Titel der Seite.
*   `pageDescription?: React.ReactNode`: Beschreibung der Seite.
*   `stepIndicator?: React.ReactNode`: Optionaler Slot für eine Schrittanzeige, falls der Prozess mehrstufig ist.
*   `productSelectLabel: string`: Label für das Dropdown zur Produktauswahl.
*   `userProducts: Array<{ id: string; name: string; description?: string }>`: Eine Liste der Produkte des Nutzers, die zur Auswahl stehen.
*   `mainInstructionsTextareaLabel: string`: Label für ein Textfeld, in das der Nutzer spezifische Anweisungen oder Kontext eingeben kann.
*   `mainInstructionsTextareaPlaceholder?: string`: Platzhalter für das Anweisungs-Textfeld.
*   `onGenerate: (data: { selectedProductId?: string; mainInstructions?: string; knowledgeBaseText?: string }) => Promise<void>`: Asynchrone Funktion. Erhält die ID des ausgewählten Produkts, die eingegebenen Anweisungen und optional den `knowledgeBaseText`.
*   `primaryActionLabel: string`: Label für den Generieren-Button.
*   `savedContentType: string`: Typ des gespeicherten Inhalts.
*   `expertIdentifier: string`: Eindeutige Kennung des Experten-Tools.
*   Wissensdatenbank-Props.

**Verwendung:**
Der Nutzer wählt ein Produkt aus der `userProducts`-Liste aus. Die `onGenerate`-Funktion erhält dann die ID dieses Produkts:
```typescript
// Beispiel für onGenerate Datenstruktur
{
  selectedProductId: "prod_123xyz",
  mainInstructions: "Erstelle einen kurzen Werbetext für Social Media.",
  knowledgeBaseText: "Zusätzliche Informationen..."
}
```
Ein Beispiel für die Implementierung dieses Templates findet sich in [`src/pages/experts/LeadMagnetGeneratorPage.tsx`](../src/pages/experts/LeadMagnetGeneratorPage.tsx:1).

## Template: `MultiStepConfigGeneratorPage.tsx`

**Pfad:** [`src/components/expert_templates/MultiStepConfigGeneratorPage.tsx`](../src/components/expert_templates/MultiStepConfigGeneratorPage.tsx:1)

**Zweck:**
Geeignet für komplexere Generatoren, die eine Konfiguration in mehreren logischen Schritten oder Abschnitten erfordern. Jeder Abschnitt kann eigene Formularfelder enthalten.

**Wichtige Props:**

*   `pageTitle: string`: Titel der Seite.
*   `pageDescription?: React.ReactNode`: Beschreibung der Seite.
*   `configSections: ConfigSection[]`: Ein Array von Konfigurationsobjekten für jeden Schritt/Abschnitt. Jede `ConfigSection` enthält einen Titel, eine optionale Beschreibung und ein Array von `FormFieldConfig` für diesen Abschnitt. (Siehe Typdefinition in [`src/types/expertTemplateTypes.ts`](../src/types/expertTemplateTypes.ts:1))
*   `optionalSourceSelectorSlot?: React.ReactNode`: Ein optionaler Slot, um z.B. eine Quellenauswahl (wie bei `SourceDrivenTextGeneratorPage`) vor den Konfigurationsschritten zu platzieren.
*   `onGenerate: (data: { sectionData: Record<string, Record<string, any>>; knowledgeBaseText?: string; sourceSelectorData?: Record<string, any> }) => Promise<void>`: Asynchrone Funktion. Erhält ein Objekt `sectionData`, das die Daten aller Abschnitte enthält (geschachtelt nach `section.name`), optional den `knowledgeBaseText` und Daten aus dem `optionalSourceSelectorSlot`.
*   `primaryActionLabel: string`: Label für den Generieren-Button.
*   `savedContentType: string`: Typ des gespeicherten Inhalts.
*   `expertIdentifier: string`: Eindeutige Kennung des Experten-Tools.
*   Wissensdatenbank-Props.

**Verwendung:**
Die `configSections` definieren die Struktur der mehrstufigen Konfiguration. Jede Sektion hat einen eindeutigen `name`, der als Schlüssel im `sectionData`-Objekt dient:
```typescript
// Beispiel für configSections
const configSections: ConfigSection[] = [
  {
    name: "audience",
    title: "Zielgruppe definieren",
    fields: [ { name: "ageGroup", label: "Altersgruppe", type: "text" } ]
  },
  {
    name: "content",
    title: "Inhalt festlegen",
    fields: [ { name: "mainTopic", label: "Hauptthema", type: "text" } ]
  }
];

// Beispiel für onGenerate sectionData Struktur
{
  sectionData: {
    audience: { ageGroup: "25-35" },
    content: { mainTopic: "Nachhaltigkeit" }
  },
  knowledgeBaseText: "Zusätzliche Informationen...",
  sourceSelectorData: { /* ... */ } // falls optionalSourceSelectorSlot verwendet wird
}
```
Ein Beispiel für die Implementierung dieses Templates findet sich in [`src/pages/experts/VideoScriptGeneratorPage.tsx`](../src/pages/experts/VideoScriptGeneratorPage.tsx:1).

## Allgemeine Hinweise zur Verwendung

### Neue Expertenseite mit einem Template erstellen

1.  **Template auswählen:** Wähle das Template aus, das am besten zu den Anforderungen deines neuen Experten-Tools passt.
2.  **Seite erstellen:** Erstelle eine neue `.tsx`-Datei im Verzeichnis [`src/pages/experts/`](../src/pages/experts/:1) (oder einem thematisch passenden Unterordner).
3.  **Template importieren:** Importiere das gewählte Template und die [`ExpertPageShell.tsx`](../src/components/layout/ExpertPageShell.tsx:1) (obwohl das Template dies meist intern schon tut).
4.  **Props konfigurieren:**
    *   Definiere `pageTitle`, `pageDescription`, `primaryActionLabel`, `savedContentType` und einen eindeutigen `expertIdentifier`.
    *   Konfiguriere die spezifischen Props des Templates (z.B. `formFields` für `SimpleFormGeneratorPage`, `configSections` für `MultiStepConfigGeneratorPage`).
    *   Implementiere die `onGenerate`-Funktion.
5.  **`onGenerate`-Funktion implementieren:**
    *   **Datensammlung:** Sammle alle notwendigen Daten aus den Formularfeldern und der Wissensdatenbank (falls aktiv). Die Struktur der `data`-Parameter ist bei jedem Template dokumentiert.
    *   **API-Aufrufe:** Führe hier die notwendigen API-Aufrufe (z.B. zu OpenAI oder anderen Backend-Diensten) aus, um das gewünschte Ergebnis zu generieren. Setze `isLoading` währenddessen auf `true`.
    *   **Ergebnisse speichern:** Nutze die bereitgestellten Funktionen (z.B. `saveGeneratedContent` aus einem Kontext oder Hook), um das generierte Ergebnis zusammen mit den `generation_params` (den Eingabedaten für `onGenerate`) in der Datenbank zu speichern. Dies ist wichtig für die "Meine..."-Seiten und die Nachvollziehbarkeit.
    *   **Feedback/Anzeige:** Zeige das Ergebnis dem Nutzer an, z.B. in einem Modal, einem neuen Bereich auf der Seite oder durch Navigation zu einer Ergebnisseite. Handle auch Fehlerzustände (`error` Prop).
6.  **Typen verwenden:** Nutze die wiederverwendbaren Typen aus [`src/types/expertTemplateTypes.ts`](../src/types/expertTemplateTypes.ts:1), [`src/types/expertToolTypes.ts`](../src/types/expertToolTypes.ts:1) und [`src/types/expertPageShell.types.ts`](../src/types/expertPageShell.types.ts:1) für Typsicherheit und bessere Codequalität.
7.  **Routing:** Füge eine Route für die neue Seite in der Routing-Konfiguration der Anwendung hinzu.
8.  **Navigation:** Stelle sicher, dass die neue Expertenseite über die Navigation (z.B. Sidebar, Expertenübersicht) erreichbar ist.

### Best Practices für `onGenerate`

*   **Zustandsmanagement:** Verwende lokale State-Variablen (z.B. mit `useState`) für `isLoading` und `error`, um dem Nutzer Feedback zum Prozess zu geben. Diese werden an `ExpertPageShell` weitergegeben.
*   **Asynchronität:** Da API-Aufrufe asynchron sind, stelle sicher, dass `onGenerate` eine `async` Funktion ist und `await` korrekt verwendet wird.
*   **Fehlerbehandlung:** Implementiere eine robuste Fehlerbehandlung mit `try...catch`-Blöcken und setze die `error`-Prop im Fehlerfall.
*   **`generation_params`:** Speichere immer die Eingabeparameter, die zur Generierung geführt haben. Dies ermöglicht es dem Benutzer, frühere Generierungen nachzuvollziehen und ggf. erneut mit denselben Einstellungen zu starten. Der `expertIdentifier` ist hierbei entscheidend, um die Daten korrekt zuzuordnen.

Durch die Befolgung dieser Richtlinien und die Nutzung der bereitgestellten Templates kann die Entwicklung neuer Experten-Tools beschleunigt und die Konsistenz der Benutzeroberfläche gewährleistet werden.# Changelog und Implementierte Features

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
Zuletzt aktualisiert: 15/05/2025, 11:50:03 pm# Datenbank, Funktionen und Relationen

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
Zuletzt aktualisiert: 15/05/2025, 11:48:49 pm# Projektstruktur im Detail

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
Zuletzt aktualisiert: 15/05/2025, 11:47:41 pm# FlowHeroBot - Entwickler Readme

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
