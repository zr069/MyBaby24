// ──────────────────────────────────────────────
// Kinderaerzte-Beispieldatenbank
// Hinweis: Dies ist eine BEISPIEL-Datenbank mit
// fiktiven Eintraegen fuer die Prototyp-Phase.
// Fuer den Produktivbetrieb wird eine echte Datenquelle
// benoetigt (z.B. KBV Arztsuche API, Gelbe Seiten API).
// ──────────────────────────────────────────────

import { Pediatrician } from '@/lib/types';

export const SAMPLE_PEDIATRICIANS: Pediatrician[] = [
  // Frankfurt am Main
  { id: 'doc-1', name: 'Dr. med. Sarah Mueller', practice: 'Kinderarztpraxis am Palmengarten', street: 'Bockenheimer Landstr. 42', zip: '60325', city: 'Frankfurt am Main', phone: '069 12345678' },
  { id: 'doc-2', name: 'Dr. med. Thomas Weber', practice: 'Praxis fuer Kinder- und Jugendmedizin', street: 'Schweizer Str. 18', zip: '60594', city: 'Frankfurt am Main', phone: '069 23456789' },
  { id: 'doc-3', name: 'Dr. med. Anna Schmidt', practice: 'Kinderaerzte Hoechst', street: 'Kurhessenstr. 7', zip: '65929', city: 'Frankfurt am Main', phone: '069 34567890' },
  { id: 'doc-4', name: 'Dr. med. Michael Bauer', practice: 'Kinderarztpraxis Nordend', street: 'Berger Str. 155', zip: '60385', city: 'Frankfurt am Main', phone: '069 45678901' },
  { id: 'doc-5', name: 'Dr. med. Lisa Hoffmann', practice: 'Kinderarztpraxis Sachsenhausen', street: 'Darmstaedter Landstr. 25', zip: '60594', city: 'Frankfurt am Main', phone: '069 56789012' },
  // Offenbach
  { id: 'doc-6', name: 'Dr. med. Kemal Yilmaz', practice: 'Kinderarzt Offenbach', street: 'Frankfurter Str. 50', zip: '63065', city: 'Offenbach am Main', phone: '069 67890123' },
  // Wiesbaden
  { id: 'doc-7', name: 'Dr. med. Julia Braun', practice: 'Kinderaerzte Wiesbaden-Mitte', street: 'Wilhelmstr. 30', zip: '65183', city: 'Wiesbaden', phone: '0611 1234567' },
  // Darmstadt
  { id: 'doc-8', name: 'Dr. med. Peter Fischer', practice: 'Kinderarztpraxis Darmstadt', street: 'Rheinstr. 12', zip: '64283', city: 'Darmstadt', phone: '06151 234567' },
  // Berlin
  { id: 'doc-9', name: 'Dr. med. Claudia Richter', practice: 'Kinderaerzte Prenzlauer Berg', street: 'Schoenhauser Allee 80', zip: '10439', city: 'Berlin', phone: '030 12345678' },
  { id: 'doc-10', name: 'Dr. med. Martin Klein', practice: 'Kinderarzt Charlottenburg', street: 'Kantstr. 45', zip: '10625', city: 'Berlin', phone: '030 23456789' },
  // Muenchen
  { id: 'doc-11', name: 'Dr. med. Stefanie Wagner', practice: 'Kinderaerzte Schwabing', street: 'Leopoldstr. 77', zip: '80802', city: 'Muenchen', phone: '089 12345678' },
  { id: 'doc-12', name: 'Dr. med. Andreas Meier', practice: 'Kinderarztpraxis Sendling', street: 'Goetheplatz 3', zip: '80337', city: 'Muenchen', phone: '089 23456789' },
  // Hamburg
  { id: 'doc-13', name: 'Dr. med. Franziska Schulz', practice: 'Kinderaerzte Eimsbuettel', street: 'Osterstr. 20', zip: '20259', city: 'Hamburg', phone: '040 12345678' },
  // Koeln
  { id: 'doc-14', name: 'Dr. med. David Koch', practice: 'Kinderarzt Koeln-Ehrenfeld', street: 'Venloer Str. 100', zip: '50823', city: 'Koeln', phone: '0221 1234567' },
  // Stuttgart
  { id: 'doc-15', name: 'Dr. med. Katharina Wolf', practice: 'Kinderaerzte Stuttgart-West', street: 'Rotebuehlstr. 55', zip: '70178', city: 'Stuttgart', phone: '0711 1234567' },
];

// Search pediatricians by name, city, or ZIP
export function searchPediatricians(query: string): Pediatrician[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  return SAMPLE_PEDIATRICIANS.filter(doc =>
    doc.name.toLowerCase().includes(q) ||
    doc.practice.toLowerCase().includes(q) ||
    doc.city.toLowerCase().includes(q) ||
    doc.zip.startsWith(q) ||
    doc.street.toLowerCase().includes(q)
  ).slice(0, 10);
}

// Search by ZIP prefix (for "Kinderarzt in der Naehe")
export function searchByZip(zip: string): Pediatrician[] {
  if (zip.length < 2) return [];
  return SAMPLE_PEDIATRICIANS.filter(doc => doc.zip.startsWith(zip)).slice(0, 10);
}
