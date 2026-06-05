# MyBaby

Baby-Gesundheitsbegleiter fuer Eltern -- als Ergaenzung zu Kinderarztbesuchen, nicht als Ersatz.

## Hintergrund

MyBaby basiert auf dem frueheren **Arian Bili Tracker**, der waehrend der Neugeborenenphase
zur Dokumentation des Bilirubin-Verlaufs und der Phototherapie entwickelt wurde.
Die Bilirubin-Thematik ist medizinisch abgeschlossen und als Archiv in der App erhalten.

## Module

- **Dashboard** -- Alter, aktuelle Themen, naechste Termine
- **Wachstum** -- Gewicht, Groesse, Kopfumfang mit Verlaufskurven
- **U-Untersuchungen** -- U1 bis U9 mit Zeitfenstern, Inhalten und Status
- **Impfungen** -- STIKO-Impfkalender mit Statusverfolgung und Elterninformation
- **Archiv** -- Bilirubin-Verlauf, Phototherapie-Historie, Screenings
- **Profil** -- Kind-Stammdaten

## Starten

```bash
cd /Users/nik/Documents/Claude/Projects/MyBaby
npm install
npm run dev
```

Die App ist dann unter http://localhost:3000 erreichbar.

## Tech-Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4
- Recharts (Diagramme)
- LocalStorage (alle Daten lokal auf dem Geraet)

## Datenquellen

- **G-BA Kinder-Richtlinie** -- U-Untersuchungen (U1-U9)
- **RKI / STIKO Impfkalender** -- Impfempfehlungen
- **Kinderuntersuchungsheft** -- Struktur und Inhalte der Vorsorgen
- **kindergesundheit-info.de (BZgA)** -- Elterninformationen

Details: [docs/data-sources.md](docs/data-sources.md)

## Medizinischer Disclaimer

Diese App ersetzt keine aerztliche Untersuchung oder Beratung.
Sie dient ausschliesslich der Information und Dokumentation fuer Eltern.
Bei Auffaelligkeiten, Unsicherheit oder medizinischen Fragen bitte immer
den Kinderarzt / die Kinderaerztin konsultieren.

Details: [docs/medical-safety.md](docs/medical-safety.md)

## Datenschutz

- Alle Daten werden ausschliesslich lokal auf dem Geraet gespeichert (LocalStorage).
- Keine Cloud-Anbindung, keine externen Analytics, keine Tracking-Tools.
- Vor Produktivbetrieb mit echten Nutzern: DSGVO-Pruefung, aerztlicher Review und Sicherheitskonzept erforderlich.

## Roadmap

Siehe [docs/roadmap.md](docs/roadmap.md)
