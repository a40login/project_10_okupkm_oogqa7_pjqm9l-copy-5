# Experten-Tool-Page-Templates Dokumentation

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

Durch die Befolgung dieser Richtlinien und die Nutzung der bereitgestellten Templates kann die Entwicklung neuer Experten-Tools beschleunigt und die Konsistenz der Benutzeroberfläche gewährleistet werden.