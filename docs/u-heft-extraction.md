# U-Heft PDF-Extraktion

## Datei
- `U-Heft_Digi.pdf` (113 MB, Scan-PDF)
- Speicherort: `/Users/nik/Documents/Claude/Projects/Arian/U-Heft_Digi.pdf`

## Extraktionsstatus

Die PDF ist ein hochaufloesender Scan (113 MB) und konnte nicht vollstaendig
maschinell extrahiert werden. Stattdessen wurde die Datenstruktur aus
folgenden Quellen zusammengestellt:

1. **Manuell aus der PDF abgelesen** (via `status_quo_arian.md`):
   - U1-Ergebnisse (Apgar, Masse, Vitamin-K)
   - U2-Ergebnisse (Gewicht, Laenge, KU, Bilirubin, Screenings)
   - Screening-Ergebnisse (Hoerscreening, Pulsoxymetrie, Neugeborenen-Screening)

2. **Aus offiziellen G-BA-Quellen ergaenzt**:
   - Zeitfenster aller U-Untersuchungen
   - Untersuchungsinhalte je U
   - Entwicklungsmeilensteine
   - Elternberatungsthemen
   - Warnzeichen

## Unsicherheiten
- Tabellen zur Perzentilenkurve konnten nicht aus der PDF extrahiert werden
- Genaue Formulierungen der Beratungsthemen weichen moeglicherweise vom Originaltext ab
- Vitamin-K-Schema und Screeningdetails basieren auf G-BA-Standard, nicht PDF-Wortlaut

## Empfehlung
Fuer zukuenftige Versionen:
- `poppler` installieren (`brew install poppler`) fuer bessere PDF-Extraktion
- Alternativ: offizielles digitales U-Heft-Format verwenden, sobald verfuegbar
