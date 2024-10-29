# CMS-Rezepte_ohne_Grenzen
## Beschreibung
Dieses Projekt ist ein einfaches Content-Management-System (CMS) für eine Rezept-Webseite. Es ermöglicht das Hinzufügen, Suchen und Filtern von Rezepten. Die Rezeptdaten werden in einer JSON-Datei gespeichert und dynamisch auf der Webseite gerendert.
Administratoren können über ein Formular neue Rezepte hinzufügen, wodurch die JSON-Datei aktualisiert und der Inhalt automatisch gerendert wird. Besucher der Seite können nach Rezepten suchen oder sie anhand von Kategorien filtern.

## Technologien
- **JavaScript (Node.js)**: Serverlogik und Verwaltung der Rezeptdaten.
- **JSON**: Speicherung der Rezepte.
- **CSS**: Gestaltung und Layout der Seite.
- **HTML**: Grundstruktur, wobei der Hauptinhalt dynamisch mit JavaScript generiert wird.

## Funktionen
- **Filter und Suche**: Besucher können Rezepte nach Kategorien filtern oder direkt nach Namen suchen.
- **Rezeptformular**: Administratoren können neue Rezepte über ein Formular hinzufügen, das die JSON-Datei aktualisiert und den neuen Inhalt anzeigt.
- **Dynamisches Rendering**: Die Seite wird durch JavaScript basierend auf der JSON-Datei aktualisiert.
- **Server mit Node.js**: Basisserverfunktionalität.

## Installation
1. Klone das Repository:
2. Installiere die Abhängigkeiten:
   npm install
3. Starte den Server:
   node server.js
4. Greife auf die Seite unter http://localhost:3000 zu.
