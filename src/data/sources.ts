// ──────────────────────────────────────────────
// Quellenverzeichnis fuer medizinische Daten
// ──────────────────────────────────────────────

export type SourceType =
  | 'LocalPDF_UHeft_Digi'
  | 'GBA_KinderRichtlinie'
  | 'RKI_STIKO_Impfkalender'
  | 'BIOG_kindergesundheit_info'
  | 'Manual_ParentEntry';

export interface DataSource {
  key: SourceType;
  name: string;
  description: string;
  url?: string;
  lastReviewed: string;
  version?: string;
  extractedFromPDF: boolean;
}

export const DATA_SOURCES: DataSource[] = [
  {
    key: 'LocalPDF_UHeft_Digi',
    name: 'Kinderuntersuchungsheft (U-Heft, digitale Kopie)',
    description:
      'Persoenliche digitale Kopie des gelben Kinderuntersuchungsheftes (U-Heft_Digi.pdf). Enthalt U1–U9, Screening-Ergebnisse und Messwerte.',
    lastReviewed: '2026-06',
    extractedFromPDF: true,
  },
  {
    key: 'GBA_KinderRichtlinie',
    name: 'G-BA Kinder-Richtlinie',
    description:
      'Richtlinie des Gemeinsamen Bundesausschusses ueber die Frueherkennung von Krankheiten bei Kindern (Kinder-Richtlinie). Definiert Inhalt und Zeitfenster der U-Untersuchungen.',
    url: 'https://www.g-ba.de/richtlinien/15/',
    lastReviewed: '2026-01',
    version: 'Fassung vom 18.06.2015, zuletzt geaendert',
    extractedFromPDF: false,
  },
  {
    key: 'RKI_STIKO_Impfkalender',
    name: 'RKI / STIKO Impfkalender',
    description:
      'Empfehlungen der Staendigen Impfkommission (STIKO) am Robert Koch-Institut. Standardimpfprogramm fuer Saeuglinge, Kinder und Jugendliche.',
    url: 'https://www.rki.de/DE/Content/Kommissionen/STIKO/Empfehlungen/Aktuelles/Impfkalender.html',
    lastReviewed: '2026-01',
    extractedFromPDF: false,
  },
  {
    key: 'BIOG_kindergesundheit_info',
    name: 'kindergesundheit-info.de (BZgA)',
    description:
      'Elterninformationen der Bundeszentrale fuer gesundheitliche Aufklaerung zu U-Untersuchungen, Impfungen und Kindergesundheit.',
    url: 'https://www.kindergesundheit-info.de',
    lastReviewed: '2026-01',
    extractedFromPDF: false,
  },
  {
    key: 'Manual_ParentEntry',
    name: 'Elterneingabe',
    description:
      'Manuell von Eltern eingetragene Messwerte und Beobachtungen. Keine medizinisch validierte Quelle.',
    lastReviewed: '-',
    extractedFromPDF: false,
  },
];
