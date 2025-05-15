# Überblick Storytelling-Modul

## 1. Gesamtzweck des Storytelling-Moduls

Das Storytelling-Modul zielt darauf ab, Nutzern Werkzeuge an die Hand zu geben, um konsistente und überzeugende Markengeschichten und Kommunikationsmittel zu entwickeln. Es unterstützt dabei, die Kernbotschaften einer Marke klar zu definieren und diese in verschiedenen Formaten effektiv zu kommunizieren. Das Modul hilft dem Nutzer, eine stärkere emotionale Verbindung zu seiner Zielgruppe aufzubauen und die Einzigartigkeit seines Angebots hervorzuheben.

## 2. Kernfunktionen (aktuell und geplant)

Das Storytelling-Modul umfasst eine Reihe von Tools, die den Nutzer durch verschiedene Aspekte des Storytellings führen:

*   **Story-Fundament:** Definieren und Verwalten der grundlegenden Markengeschichten und Kernbotschaften.
*   **Tagline:** Erstellen einer prägnanten Aussage, die das Unternehmen, die Marke oder das Angebot auf den Punkt bringt.
*   **Elevator-Pitch:** Entwickeln einer kurzen, überzeugenden Präsentation (30-60 Sekunden) des Unternehmens oder Produkts.
*   **Positionierungsgeschichte:** Kommunizieren des Alleinstellungsmerkmals und klare Abgrenzung von Mitbewerbern.
*   **Markengeschichte:** Formen einer emotionalen Verbindung zur Zielgruppe durch die authentische Geschichte der Marke.
*   **Produktnutzengeschichte:** Anschauliche Darstellung, wie ein Angebot Kundenprobleme löst und ihr Leben verbessert.
*   **Referenzgeschichten (Testimonial Story):** Transformieren von Kundenerfolgen in überzeugende Geschichten, die Vertrauen stärken.

**Weitere Kernfunktionen:**

*   **Wissensdatenbank-Integration:** Die meisten Tools bieten die Möglichkeit, auf eine zentrale Wissensdatenbank zuzugreifen, um relevante Informationen und bereits vorhandene Inhalte für die Generierung zu nutzen.
*   **KI-gestützte Generierung von Inhalten (geplant):** Zukünftig soll eine KI-Integration die automatische Erstellung von Textvorschlägen basierend auf den Nutzereingaben ermöglichen.
*   **Speichern und Verwalten (geplant):** Nutzer werden die Möglichkeit haben, die generierten Inhalte zu speichern, zu verwalten und später wieder darauf zuzugreifen.

## 3. Allgemeine Logik und Struktur

Die Storytelling-Seiten folgen einer einheitlichen Architektur und Struktur, um eine konsistente Nutzererfahrung zu gewährleisten.

*   **Basisarchitektur:** Alle Seiten des Storytelling-Moduls basieren auf der wiederverwendbaren Komponente [`MultiStepConfigGeneratorPage`](src/components/expert_templates/MultiStepConfigGeneratorPage.tsx:2). Diese Komponente stellt ein Grundgerüst für mehrstufige Formulare und die Generierung von Inhalten bereit.
*   **Struktur der einzelnen Seiten:**
    *   Jede Seite wird durch spezifische **Props** konfiguriert, darunter `pageTitle`, `pageDescription`, `primaryActionLabel`, `savedContentType` und `expertIdentifier`.
    *   Die Formularfelder und deren Anordnung werden über das `configSections`-Array definiert. Jede Sektion kann mehrere Eingabefelder enthalten.
    *   Die Logik zur Verarbeitung der Nutzereingaben und (zukünftig) zur Interaktion mit der KI wird in der `onGenerate`-Handler-Funktion implementiert.
*   **Zustandsmanagement:** Der Zustand der Formularfelder auf jeder Seite wird typischerweise mit dem React-Hook [`useState`](src/pages/strategy/PositionierungsstrategiePage.tsx:1) verwaltet.
*   **UI-Komponenten:** Für die Darstellung der Formulare und Interaktionselemente werden Standard-UI-Komponenten aus dem Projekt verwendet, wie z.B.:
    *   [`Input`](src/components/ui/input.tsx:3) für einzeilige Texteingaben.
    *   [`Textarea`](src/components/ui/textarea.tsx:4) für mehrzeilige Texteingaben.
    *   [`Select`](src/components/ui/select.tsx:6) für Auswahlmöglichkeiten.
    *   [`Label`](src/components/ui/label.tsx:1) zur Beschriftung von Formularfeldern.
    *   [`Button`](src/components/ui/button.tsx:1) für Aktionen wie das Absenden des Formulars.
    *   [`useToast`](src/components/ui/use-toast.ts:7) zur Anzeige von Benachrichtigungen.

## 4. Datenfluss (konzeptionell)

Der grundlegende Datenfluss im Storytelling-Modul ist wie folgt konzipiert:

1.  **Nutzereingabe:** Der Nutzer gibt die erforderlichen Informationen in die dafür vorgesehenen Formularfelder auf der jeweiligen Storytelling-Seite ein.
2.  **Datenverarbeitung (aktuell):** Beim Klick auf den "Generieren"-Button werden die Formulardaten gesammelt. Aktuell erfolgt eine Konsolenausgabe der Daten und eine Toast-Nachricht als Bestätigung.
3.  **KI-Interaktion (geplant):** Die gesammelten Formulardaten werden an eine KI-Schnittstelle gesendet.
4.  **KI-Generierung (geplant):** Die KI analysiert die Eingaben und generiert Textvorschläge oder vollständige Inhalte gemäß der spezifischen Aufgabe des Tools.
5.  **Anzeige der Ergebnisse (geplant):** Die vom Nutzer eingegebenen oder von der KI generierten Inhalte werden dem Nutzer auf der Seite angezeigt, idealerweise in einem bearbeitbaren Bereich (z.B. Texteditor).
6.  **Bearbeitung und Speicherung (geplant):** Der Nutzer hat die Möglichkeit, die generierten Inhalte zu überprüfen, zu bearbeiten und die finale Version zu speichern.

## 5. Detaillierte Nutzerflüsse für jede Storytelling-Seite

Die folgenden Abschnitte beschreiben die spezifischen Nutzerflüsse für jede der sieben Storytelling-Seiten. Die Details zu den Formularfeldern basieren auf den Definitionen in [`docs/storytelling_subpages_plan.md`](docs/storytelling_subpages_plan.md).

### 5.1. Story-Fundament ([`StoryFundamentPage.tsx`](src/pages/storytelling/StoryFundamentPage.tsx))

*   **Ziel der Seite:** Definition und Verwaltung der grundlegenden Markengeschichten und Kernbotschaften als Basis für die gesamte Kommunikation.
*   **Interaktionsschritte:**
    1.  Nutzer navigiert zur Seite "Story-Fundament definieren".
    2.  Nutzer füllt die Formularfelder aus:
        *   **Sektion 1: Kernmarkenidentität**
            *   "Kernidentität Ihrer Marke/Ihres Unternehmens": Beschreibung der Markenidentität.
            *   "Primäre Zielgruppe": Beschreibung der Hauptzielgruppe.
            *   "Einzigartiges Wertversprechen (UVP)": Formulierung des UVPs.
        *   **Sektion 2: Kernbotschaften**
            *   "Hauptkernbotschaft": Die zentrale Botschaft.
            *   "Unterstützende Kernbotschaften": Weitere wichtige Botschaften.
            *   "Gewünschte Tonalität und Stimme": Auswahl aus vordefinierten Optionen oder freie Eingabe.
    3.  Nutzer klickt auf den Button "Story-Fundament generieren".
    4.  (Aktuell) Die eingegebenen Daten werden in der Konsole ausgegeben und eine Toast-Nachricht bestätigt die Aktion.
    5.  (Geplant) Anzeige der zusammengefassten oder KI-optimierten Story-Fundament-Elemente.
    6.  (Geplant) Möglichkeit zur Bearbeitung der Elemente.
    7.  (Geplant) Möglichkeit zum Speichern des Story-Fundaments (Typ: `story-fundament`).
*   **Erwartetes Ergebnis/Output:** Ein klar definiertes Set an Kernidentitätsmerkmalen und Kernbotschaften.

### 5.2. Tagline ([`TaglinePage.tsx`](src/pages/storytelling/TaglinePage.tsx))

*   **Ziel der Seite:** Erstellung einer prägnanten Tagline, die das Unternehmen, die Marke oder ein spezifisches Angebot auf den Punkt bringt.
*   **Interaktionsschritte:**
    1.  Nutzer navigiert zur Seite "Tagline entwickeln".
    2.  Nutzer füllt die Formularfelder aus:
        *   **Sektion 1: Basisinformationen für die Tagline**
            *   "Name (Unternehmen/Marke/Produkt)": Der Name, für den die Tagline entwickelt wird.
            *   "Hauptangebot/Hauptnutzen": Kurze Beschreibung des Kernangebots oder -nutzens.
            *   "Kernzielgruppe": Die primäre Zielgruppe.
            *   "Gewünschtes Gefühl/Assoziation": Emotionen oder Assoziationen, die die Tagline hervorrufen soll.
            *   "Keywords (optional)": Relevante Schlüsselwörter.
            *   "Gewünschte Länge/Stil": Auswahlmöglichkeiten (z.B. kurz, prägnant, humorvoll).
    3.  Nutzer klickt auf den Button "Tagline generieren".
    4.  (Aktuell) Konsolenausgabe der Daten und Toast-Nachricht.
    5.  (Geplant) Anzeige von KI-generierten Tagline-Vorschlägen.
    6.  (Geplant) Möglichkeit zur Bearbeitung der Vorschläge.
    7.  (Geplant) Möglichkeit zum Speichern der finalen Tagline (Typ: `tagline`).
*   **Erwartetes Ergebnis/Output:** Eine oder mehrere prägnante Taglines.

### 5.3. Elevator-Pitch ([`ElevatorPitchPage.tsx`](src/pages/storytelling/ElevatorPitchPage.tsx))

*   **Ziel der Seite:** Entwicklung eines kurzen (30-60 Sekunden), prägnanten und überzeugenden Elevator-Pitches.
*   **Interaktionsschritte:**
    1.  Nutzer navigiert zur Seite "Elevator-Pitch erstellen".
    2.  Nutzer füllt die Formularfelder aus:
        *   **Sektion 1: Kerninformationen für den Pitch**
            *   "Wer sind Sie / Was ist Ihr Unternehmen/Produkt?": Vorstellung.
            *   "Welches Problem lösen Sie?": Problembeschreibung.
            *   "Ihre Lösung?": Lösungsbeschreibung.
            *   "Ihr Alleinstellungsmerkmal (USP)?": Herausstellung des USPs.
            *   "Ziel des Pitches (Call to Action)?": Was soll der Zuhörer tun?
            *   "Zielgruppe des Pitches": An wen richtet sich der Pitch?
    3.  Nutzer klickt auf den Button "Elevator-Pitch generieren".
    4.  (Aktuell) Konsolenausgabe der Daten und Toast-Nachricht.
    5.  (Geplant) Anzeige eines oder mehrerer KI-generierter Elevator-Pitch-Entwürfe.
    6.  (Geplant) Möglichkeit zur Bearbeitung der Entwürfe.
    7.  (Geplant) Möglichkeit zum Speichern des finalen Elevator-Pitches (Typ: `elevator-pitch`).
*   **Erwartetes Ergebnis/Output:** Ein ausformulierter Elevator-Pitch.

### 5.4. Positionierungsgeschichte ([`PositioningStoryPage.tsx`](src/pages/storytelling/PositioningStoryPage.tsx))

*   **Ziel der Seite:** Entwicklung einer überzeugenden Geschichte, die das Alleinstellungsmerkmal kommuniziert und die Marke klar von Mitbewerbern abhebt.
*   **Interaktionsschritte:**
    1.  Nutzer navigiert zur Seite "Positionierungsgeschichte formulieren".
    2.  Nutzer füllt die Formularfelder aus:
        *   **Sektion 1: Grundlage der Positionierung**
            *   "Ihre definierte Positionierung": Bestehende Positionierungsaussage.
            *   "Ihr primäres Alleinstellungsmerkmal (USP)": Der Kern-USP.
            *   "Hauptzielgruppe & deren Problem/Bedürfnis": Details zur Zielgruppe.
            *   "Hauptwettbewerber": Wichtigste Konkurrenten.
            *   "Fundamentale Unterscheidung von Wettbewerbern": Klare Abgrenzungsmerkmale.
        *   **Sektion 2: Elemente der Geschichte**
            *   "'Aha!'-Momente/Erkenntnisse zur Positionierung": Wichtige Einsichten.
            *   "Einzigartiger Wert/Nutzen": Der spezifische Wert für den Kunden.
            *   "Gewünschte Kernbotschaft der Geschichte": Die zentrale Aussage der Story.
    3.  Nutzer klickt auf den Button "Positionierungsgeschichte generieren".
    4.  (Aktuell) Konsolenausgabe der Daten und Toast-Nachricht.
    5.  (Geplant) Anzeige einer oder mehrerer KI-generierter Positionierungsgeschichten.
    6.  (Geplant) Möglichkeit zur Bearbeitung der Geschichten.
    7.  (Geplant) Möglichkeit zum Speichern der finalen Positionierungsgeschichte (Typ: `positioning-story`).
*   **Erwartetes Ergebnis/Output:** Eine ausformulierte Positionierungsgeschichte.

### 5.5. Markengeschichte ([`BrandStoryPage.tsx`](src/pages/storytelling/BrandStoryPage.tsx))

*   **Ziel der Seite:** Formen einer emotionalen Verbindung zur Zielgruppe durch die authentische Geschichte der Marke.
*   **Interaktionsschritte:**
    1.  Nutzer navigiert zur Seite "Markengeschichte erzählen".
    2.  Nutzer füllt die Formularfelder aus:
        *   **Sektion 1: Ursprung und Motivation**
            *   "Gründung Ihrer Marke (Wie & Warum)?": Entstehungsgeschichte.
            *   "Werte und Überzeugungen Ihrer Marke": Markenwerte.
            *   "Besondere Herausforderungen/Wendepunkte": Wichtige Momente in der Markenhistorie.
        *   **Sektion 2: Verbindung zur Zielgruppe**
            *   "Für wen existiert Ihre Marke (Held der Geschichte)?": Identifikation des "Helden".
            *   "Wandel/Transformation für Ihre Zielgruppe": Der positive Impact auf die Zielgruppe.
            *   "Gewünschte Emotionen der Geschichte": Angestrebte emotionale Wirkung.
        *   **Sektion 3: Kernbotschaft und Zukunft**
            *   "Zentrale Botschaft Ihrer Markengeschichte": Die Hauptaussage.
            *   "Zukunftsvision Ihrer Marke": Ausblick.
    3.  Nutzer klickt auf den Button "Markengeschichte generieren".
    4.  (Aktuell) Konsolenausgabe der Daten und Toast-Nachricht.
    5.  (Geplant) Anzeige einer oder mehrerer KI-generierter Markengeschichten.
    6.  (Geplant) Möglichkeit zur Bearbeitung der Geschichten.
    7.  (Geplant) Möglichkeit zum Speichern der finalen Markengeschichte (Typ: `brand-story`).
*   **Erwartetes Ergebnis/Output:** Eine authentische und emotionale Markengeschichte.

### 5.6. Produktnutzengeschichte ([`ProductUsageStoryPage.tsx`](src/pages/storytelling/ProductUsageStoryPage.tsx))

*   **Ziel der Seite:** Anschauliche Darstellung, wie ein Produkt oder eine Dienstleistung Kundenprobleme löst und deren Leben verbessert.
*   **Interaktionsschritte:**
    1.  Nutzer navigiert zur Seite "Produktnutzengeschichte erstellen".
    2.  Nutzer füllt die Formularfelder aus:
        *   **Sektion 1: Produkt und Problem**
            *   "Name des Produkts/Dienstleistung": Produktname.
            *   "Spezifisches Problem, das gelöst wird": Problemdefinition.
            *   "Idealer Zielkunde": Beschreibung des idealen Kunden.
            *   "Leben/Arbeit des Kunden VOR dem Produkt (Schmerzpunkte)": Ausgangssituation.
        *   **Sektion 2: Lösung und Nutzen**
            *   "Wie löst Ihr Produkt das Problem (Hauptmerkmale)?": Funktionsweise und Features.
            *   "Konkreter Nutzen & positive Ergebnisse NACH Nutzung": Vorteile und Resultate.
            *   "Besonders hervorzuhebendes Feature (optional)": Ein spezielles Merkmal.
        *   **Sektion 3: Story-Elemente**
            *   "Gewünschter Ton der Geschichte": Tonalität der Geschichte.
            *   "Kernbotschaft dieser Nutzengeschichte": Hauptaussage.
    3.  Nutzer klickt auf den Button "Produktnutzengeschichte generieren".
    4.  (Aktuell) Konsolenausgabe der Daten und Toast-Nachricht.
    5.  (Geplant) Anzeige einer oder mehrerer KI-generierter Produktnutzengeschichten.
    6.  (Geplant) Möglichkeit zur Bearbeitung der Geschichten.
    7.  (Geplant) Möglichkeit zum Speichern der finalen Produktnutzengeschichte (Typ: `product-usage-story`).
*   **Erwartetes Ergebnis/Output:** Eine überzeugende Geschichte, die den Nutzen eines Produkts/einer Dienstleistung darstellt.

### 5.7. Referenzgeschichten (Testimonial Story) ([`TestimonialStoryPage.tsx`](src/pages/storytelling/TestimonialStoryPage.tsx))

*   **Ziel der Seite:** Transformation von Kundenerfolgen in überzeugende Geschichten (Testimonials), die Vertrauen bei potenziellen Kunden aufbauen.
*   **Interaktionsschritte:**
    1.  Nutzer navigiert zur Seite "Referenzgeschichte (Testimonial) aufbereiten".
    2.  Nutzer füllt die Formularfelder aus:
        *   **Sektion 1: Kunde und Ausgangslage**
            *   "Name des Kunden/Unternehmens": Kundenname.
            *   "Branche/Hintergrund des Kunden": Kontext zum Kunden.
            *   "Herausforderung/Problem des Kunden VOR Ihrer Lösung": Ursprüngliches Problem.
            *   "Mögliche Bedenken des Kunden VOR Entscheidung (optional)": Eventuelle Vorbehalte.
        *   **Sektion 2: Lösung und Ergebnisse**
            *   "Implementierte Lösung (Ihr Produkt/Service)": Beschreibung der eingesetzten Lösung.
            *   "Konkrete, messbare Ergebnisse": Quantifizierbare Erfolge.
            *   "Qualitative Vorteile/positive Effekte": Nicht-messbare Verbesserungen.
            *   "Direktes Zitat des Kunden (Kern-Testimonial)": Das eigentliche Testimonial.
        *   **Sektion 3: Storytelling-Aspekte**
            *   "Wichtigste Botschaft der Referenzgeschichte": Kernaussage des Testimonials.
            *   "Hervorzuhebender Aspekt der Zusammenarbeit (optional)": Besondere Punkte der Kooperation.
    3.  Nutzer klickt auf den Button "Referenzgeschichte generieren".
    4.  (Aktuell) Konsolenausgabe der Daten und Toast-Nachricht.
    5.  (Geplant) Anzeige einer oder mehrerer KI-aufbereiteter Referenzgeschichten.
    6.  (Geplant) Möglichkeit zur Bearbeitung der Geschichten.
    7.  (Geplant) Möglichkeit zum Speichern der finalen Referenzgeschichte (Typ: `testimonial-story`).
*   **Erwartetes Ergebnis/Output:** Eine gut strukturierte und überzeugende Referenzgeschichte.

## 6. Supabase-Integration

Für das Speichern der generierten Storytelling-Inhalte wird die Supabase-Datenbanktabelle `saved_content` genutzt.

*   **Tabellenstruktur:** Die Tabelle `saved_content` enthält unter anderem folgende relevante Spalten:
    *   `user_id`: ID des Nutzers, dem der Inhalt gehört.
    *   `title`: Ein Titel für den gespeicherten Inhalt (ggf. vom Nutzer vergeben oder automatisch generiert).
    *   `content` (JSONB): Der eigentliche Inhalt, gespeichert im JSONB-Format, um strukturierte Daten flexibel ablegen zu können.
    *   `content_type`: Ein String, der die Art des gespeicherten Inhalts kennzeichnet (z.B. 'story-fundament', 'tagline'). Dies ermöglicht die Unterscheidung und das korrekte Laden der verschiedenen Storytelling-Elemente.
    *   `source_expert`: Gibt an, welches Tool oder welcher "Experte" den Inhalt generiert hat (z.B. 'story-fundament-generator').
    *   `generation_params` (JSONB): Speichert die Eingabeparameter, die zur Generierung dieses Inhalts verwendet wurden.
*   **`content_type`-Werte für Storytelling:**
    *   `story-fundament`
    *   `tagline`
    *   `elevator-pitch`
    *   `positioning-story`
    *   `brand-story`
    *   `product-usage-story`
    *   `testimonial-story`
*   **Migrationsdatei:** Die notwendigen `content_type`-Werte wurden durch die Migrationsdatei [`supabase/migrations/20250516010736_add_storytelling_content_types.sql`](supabase/migrations/20250516010736_add_storytelling_content_types.sql) zur Datenbank hinzugefügt.

## 7. Zukünftige Erweiterungen / To-Dos (über die Grundimplementierung hinaus)

Über die initiale Implementierung der Formulare und der (simulierten) Generierungslogik hinaus sind folgende Erweiterungen und Aufgaben geplant:

*   **Vollständige Implementierung der KI-Generierungslogik:** Anbindung an eine KI-Schnittstelle für jede der sieben Storytelling-Seiten.
*   **Implementierung eines Rich-Text-Editors:** Zur besseren Anzeige und Bearbeitung der generierten Inhalte.
*   **Speichern-Funktionalität:** Vollständige Implementierung der Speicherfunktion für alle generierten Inhalte in die `saved_content`-Tabelle.
*   **Laden und Bearbeiten:** Ermöglichen des Ladens und Weiterbearbeitens von bereits gespeicherten Storytelling-Inhalten.
*   **Generierung mehrerer Varianten:** Nutzern die Option geben, mehrere Vorschläge oder Varianten eines Inhalts generieren zu lassen.
*   **Versioning:** Einführung einer Versionierung für gespeicherte Inhalte, um Änderungen nachverfolgen und frühere Versionen wiederherstellen zu können.
*   **Integration mit anderen Modulen:** Prüfung und Implementierung von Möglichkeiten, die generierten Storytelling-Inhalte in anderen Modulen der Anwendung zu verwenden (z.B. im Content Calendar, für Social Media Posts etc.).
*   **Verbesserte UI/UX:** Kontinuierliche Optimierung der Benutzeroberfläche und des Nutzererlebnisses für den gesamten Generierungsprozess.
*   **Zeichen-/Wortzähler:** Implementierung von Zählern, wo dies für die Eingabefelder sinnvoll ist.