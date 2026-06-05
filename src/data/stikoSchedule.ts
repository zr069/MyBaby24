// ──────────────────────────────────────────────
// STIKO-Impfkalender fuer Saeuglinge und Kleinkinder
// Quelle: RKI / STIKO Empfehlungen, Stand 2025/2026
// Hinweis: Vereinfachte Darstellung fuer Eltern-Information.
// Diese Daten ersetzen KEINE aerztliche Beratung.
// Letzte Pruefung: 2026-06
// ──────────────────────────────────────────────

import { VaccinationCategory } from '@/lib/types';

export interface VaccineDefinition {
  key: string;
  disease: string;
  diseaseDe: string;
  category: VaccinationCategory;
  legallyRelevant: boolean;
  doses: VaccineDose[];
  parentInfo: string;
  source: string;
  lastReviewedAt: string;
  notes?: string;
}

export interface VaccineDose {
  doseNumber: number;
  doseName: string;
  recommendedFromMonths: number;
  recommendedToMonths: number;
  recommendedFromDays: number;
  recommendedToDays: number;
}

function months(m: number): number {
  return Math.round(m * 30.44);
}

export const STIKO_VACCINES: VaccineDefinition[] = [
  // ── 6-fach-Impfung ──────────────────────────
  {
    key: 'diphtherie',
    disease: 'Diphtheria',
    diseaseDe: 'Diphtherie',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 2, recommendedToMonths: 2, recommendedFromDays: months(2), recommendedToDays: months(3) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 4, recommendedToMonths: 4, recommendedFromDays: months(4), recommendedToDays: months(5) },
      { doseNumber: 3, doseName: '3. Grundimmunisierung + Auffrischung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
    ],
    parentInfo:
      'Diphtherie ist eine schwere bakterielle Infektion der Atemwege. Die Impfung ist Teil der 6-fach-Impfung und wird von der STIKO als Standardimpfung empfohlen.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },
  {
    key: 'tetanus',
    disease: 'Tetanus',
    diseaseDe: 'Tetanus (Wundstarrkrampf)',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 2, recommendedToMonths: 2, recommendedFromDays: months(2), recommendedToDays: months(3) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 4, recommendedToMonths: 4, recommendedFromDays: months(4), recommendedToDays: months(5) },
      { doseNumber: 3, doseName: '3. Grundimmunisierung + Auffrischung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
    ],
    parentInfo:
      'Tetanus (Wundstarrkrampf) kann bei Verletzungen durch Bakterien ausgeloest werden. Die Impfung ist Teil der 6-fach-Impfung und wird als Standardimpfung empfohlen.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },
  {
    key: 'pertussis',
    disease: 'Pertussis',
    diseaseDe: 'Keuchhusten (Pertussis)',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 2, recommendedToMonths: 2, recommendedFromDays: months(2), recommendedToDays: months(3) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 4, recommendedToMonths: 4, recommendedFromDays: months(4), recommendedToDays: months(5) },
      { doseNumber: 3, doseName: '3. Grundimmunisierung + Auffrischung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
    ],
    parentInfo:
      'Keuchhusten ist besonders fuer Saeuglinge gefaehrlich. Die Impfung ist Teil der 6-fach-Impfung. Die STIKO empfiehlt diese Impfung standardmaessig.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },
  {
    key: 'polio',
    disease: 'Poliomyelitis',
    diseaseDe: 'Kinderlaehmung (Polio)',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 2, recommendedToMonths: 2, recommendedFromDays: months(2), recommendedToDays: months(3) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 4, recommendedToMonths: 4, recommendedFromDays: months(4), recommendedToDays: months(5) },
      { doseNumber: 3, doseName: '3. Grundimmunisierung + Auffrischung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
    ],
    parentInfo:
      'Kinderlaehmung ist eine schwere Viruserkrankung mit moeglichen Laehmungen. Die Impfung ist Teil der 6-fach-Impfung. Die STIKO empfiehlt diese Impfung standardmaessig.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },
  {
    key: 'hib',
    disease: 'Haemophilus influenzae Typ b',
    diseaseDe: 'Haemophilus influenzae Typ b (Hib)',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 2, recommendedToMonths: 2, recommendedFromDays: months(2), recommendedToDays: months(3) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 4, recommendedToMonths: 4, recommendedFromDays: months(4), recommendedToDays: months(5) },
      { doseNumber: 3, doseName: '3. Grundimmunisierung + Auffrischung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
    ],
    parentInfo:
      'Hib kann Hirnhautentzuendung und Kehldeckelentzuendung verursachen. Die Impfung ist Teil der 6-fach-Impfung. Die STIKO empfiehlt diese Impfung standardmaessig.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },
  {
    key: 'hepatitis_b',
    disease: 'Hepatitis B',
    diseaseDe: 'Hepatitis B',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 2, recommendedToMonths: 2, recommendedFromDays: months(2), recommendedToDays: months(3) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 4, recommendedToMonths: 4, recommendedFromDays: months(4), recommendedToDays: months(5) },
      { doseNumber: 3, doseName: '3. Grundimmunisierung + Auffrischung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
    ],
    parentInfo:
      'Hepatitis B ist eine Leberentzuendung durch Viren. Die Impfung ist Teil der 6-fach-Impfung. Die STIKO empfiehlt diese Impfung standardmaessig.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },

  // ── Pneumokokken ──────────────────────────
  {
    key: 'pneumokokken',
    disease: 'Pneumococcal disease',
    diseaseDe: 'Pneumokokken',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 2, recommendedToMonths: 2, recommendedFromDays: months(2), recommendedToDays: months(3) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 4, recommendedToMonths: 4, recommendedFromDays: months(4), recommendedToDays: months(5) },
      { doseNumber: 3, doseName: 'Auffrischung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
    ],
    parentInfo:
      'Pneumokokken koennen Lungenentzuendung, Hirnhautentzuendung und Mittelohrentzuendung verursachen. Die STIKO empfiehlt diese Impfung standardmaessig.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },

  // ── Rotaviren ──────────────────────────
  {
    key: 'rotaviren',
    disease: 'Rotavirus',
    diseaseDe: 'Rotaviren',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Impfung (Schluckimpfung)', recommendedFromMonths: 1.5, recommendedToMonths: 2, recommendedFromDays: months(1.5), recommendedToDays: months(2) },
      { doseNumber: 2, doseName: '2. Impfung (Schluckimpfung)', recommendedFromMonths: 2, recommendedToMonths: 4, recommendedFromDays: months(2), recommendedToDays: months(4) },
      { doseNumber: 3, doseName: '3. Impfung (je nach Impfstoff)', recommendedFromMonths: 3, recommendedToMonths: 4, recommendedFromDays: months(3), recommendedToDays: months(4) },
    ],
    parentInfo:
      'Rotaviren verursachen starke Durchfallerkrankungen bei Saeuglingen. Die Schluckimpfung muss frueh begonnen werden (ab 6. Lebenswoche). Die STIKO empfiehlt diese Impfung standardmaessig. Je nach Impfstoff 2 oder 3 Dosen.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
    notes: 'Die Impfserie muss bis zur 24. (2 Dosen, Rotarix) bzw. 32. Lebenswoche (3 Dosen, RotaTeq) abgeschlossen sein.',
  },

  // ── Meningokokken C ──────────────────────────
  {
    key: 'meningokokken_c',
    disease: 'Meningococcal C',
    diseaseDe: 'Meningokokken C',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: 'Einmalige Impfung', recommendedFromMonths: 12, recommendedToMonths: 23, recommendedFromDays: months(12), recommendedToDays: months(23) },
    ],
    parentInfo:
      'Meningokokken koennen schwere Hirnhautentzuendung und Blutvergiftung verursachen. Die STIKO empfiehlt die Meningokokken-C-Impfung standardmaessig ab dem 12. Lebensmonat.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },

  // ── Meningokokken B ──────────────────────────
  {
    key: 'meningokokken_b',
    disease: 'Meningococcal B',
    diseaseDe: 'Meningokokken B',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 2, recommendedToMonths: 3, recommendedFromDays: months(2), recommendedToDays: months(3) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 4, recommendedToMonths: 5, recommendedFromDays: months(4), recommendedToDays: months(5) },
      { doseNumber: 3, doseName: 'Auffrischung', recommendedFromMonths: 12, recommendedToMonths: 15, recommendedFromDays: months(12), recommendedToDays: months(15) },
    ],
    parentInfo:
      'Meningokokken B sind die haeufigste Ursache fuer Meningokokken-Erkrankungen in Deutschland. Die STIKO empfiehlt diese Impfung seit 2024 standardmaessig fuer Saeuglinge.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
    notes: 'Seit 2024 STIKO-Standardempfehlung fuer Saeuglinge.',
  },

  // ── Masern ──────────────────────────
  {
    key: 'masern',
    disease: 'Measles',
    diseaseDe: 'Masern',
    category: 'standard',
    legallyRelevant: true,
    doses: [
      { doseNumber: 1, doseName: '1. MMR-Impfung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
      { doseNumber: 2, doseName: '2. MMR-Impfung', recommendedFromMonths: 15, recommendedToMonths: 23, recommendedFromDays: months(15), recommendedToDays: months(23) },
    ],
    parentInfo:
      'Masern sind eine hochansteckende Viruserkrankung mit moeglichen schweren Komplikationen. Die STIKO empfiehlt diese Impfung standardmaessig. Fuer Gemeinschaftseinrichtungen wie Kita/Schule ist ein Masernschutz-Nachweis relevant. Details mit Kinderarzt/Kita klaeren.',
    source: 'RKI/STIKO Impfkalender, Masernschutzgesetz',
    lastReviewedAt: '2026-01',
    notes: 'Masernschutzgesetz: Nachweis fuer Kita/Schule/Gemeinschaftseinrichtungen erforderlich.',
  },

  // ── Mumps ──────────────────────────
  {
    key: 'mumps',
    disease: 'Mumps',
    diseaseDe: 'Mumps (Ziegenpeter)',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. MMR-Impfung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
      { doseNumber: 2, doseName: '2. MMR-Impfung', recommendedFromMonths: 15, recommendedToMonths: 23, recommendedFromDays: months(15), recommendedToDays: months(23) },
    ],
    parentInfo:
      'Mumps kann zu Komplikationen wie Hoerverlust und Hodenentzuendung fuehren. Die Impfung erfolgt zusammen mit Masern und Roeteln (MMR). Die STIKO empfiehlt diese Impfung standardmaessig.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },

  // ── Roeteln ──────────────────────────
  {
    key: 'roeteln',
    disease: 'Rubella',
    diseaseDe: 'Roeteln',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. MMR-Impfung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
      { doseNumber: 2, doseName: '2. MMR-Impfung', recommendedFromMonths: 15, recommendedToMonths: 23, recommendedFromDays: months(15), recommendedToDays: months(23) },
    ],
    parentInfo:
      'Roeteln koennen in der Schwangerschaft zu schweren Schaedigungen des ungeborenen Kindes fuehren. Die Impfung erfolgt zusammen mit Masern und Mumps (MMR). Die STIKO empfiehlt diese Impfung standardmaessig.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },

  // ── Varizellen ──────────────────────────
  {
    key: 'varizellen',
    disease: 'Varicella',
    diseaseDe: 'Windpocken (Varizellen)',
    category: 'standard',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Varizellenimpfung', recommendedFromMonths: 11, recommendedToMonths: 14, recommendedFromDays: months(11), recommendedToDays: months(14) },
      { doseNumber: 2, doseName: '2. Varizellenimpfung', recommendedFromMonths: 15, recommendedToMonths: 23, recommendedFromDays: months(15), recommendedToDays: months(23) },
    ],
    parentInfo:
      'Windpocken sind hochansteckend. Bei Kindern meist mild, aber Komplikationen moeglich. Die STIKO empfiehlt diese Impfung standardmaessig.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },

  // ── Influenza ──────────────────────────
  {
    key: 'influenza',
    disease: 'Influenza',
    diseaseDe: 'Grippe (Influenza)',
    category: 'indication',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: 'Jaehrliche Impfung', recommendedFromMonths: 6, recommendedToMonths: 72, recommendedFromDays: months(6), recommendedToDays: months(72) },
    ],
    parentInfo:
      'Die Influenza-Impfung wird von der STIKO fuer Kinder mit bestimmten Grunderkrankungen empfohlen. Fuer gesunde Kinder besteht derzeit keine Standardempfehlung. Bitte mit dem Kinderarzt besprechen.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },

  // ── FSME ──────────────────────────
  {
    key: 'fsme',
    disease: 'Tick-borne encephalitis',
    diseaseDe: 'FSME (Fruehsommer-Meningoenzephalitis)',
    category: 'travel',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Grundimmunisierung', recommendedFromMonths: 12, recommendedToMonths: 72, recommendedFromDays: months(12), recommendedToDays: months(72) },
      { doseNumber: 2, doseName: '2. Grundimmunisierung', recommendedFromMonths: 12, recommendedToMonths: 72, recommendedFromDays: months(12), recommendedToDays: months(72) },
      { doseNumber: 3, doseName: '3. Grundimmunisierung', recommendedFromMonths: 12, recommendedToMonths: 72, recommendedFromDays: months(12), recommendedToDays: months(72) },
    ],
    parentInfo:
      'FSME wird durch Zecken uebertragen. Die Impfung wird fuer Personen in FSME-Risikogebieten empfohlen. Ob Ihr Wohnort ein Risikogebiet ist, koennen Sie beim RKI oder Kinderarzt erfragen.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
    notes: 'Indikationsimpfung / Reiseimpfung fuer FSME-Risikogebiete.',
  },

  // ── Hepatitis A ──────────────────────────
  {
    key: 'hepatitis_a',
    disease: 'Hepatitis A',
    diseaseDe: 'Hepatitis A',
    category: 'travel',
    legallyRelevant: false,
    doses: [
      { doseNumber: 1, doseName: '1. Impfung', recommendedFromMonths: 12, recommendedToMonths: 72, recommendedFromDays: months(12), recommendedToDays: months(72) },
      { doseNumber: 2, doseName: '2. Impfung (Auffrischung)', recommendedFromMonths: 18, recommendedToMonths: 78, recommendedFromDays: months(18), recommendedToDays: months(78) },
    ],
    parentInfo:
      'Hepatitis A ist eine Leberentzuendung, die besonders in bestimmten Reiselaendern vorkommt. Die Impfung wird als Reiseimpfung oder bei bestimmten Indikationen empfohlen. Bitte mit dem Kinderarzt besprechen.',
    source: 'RKI/STIKO Impfkalender',
    lastReviewedAt: '2026-01',
  },
];

// Helper: Get the category label in German
export function getCategoryLabel(cat: VaccinationCategory): string {
  switch (cat) {
    case 'standard':
      return 'STIKO-Standardempfehlung';
    case 'legally_relevant':
      return 'gesetzlich/nachweisrelevant';
    case 'indication':
      return 'Indikationsimpfung / bei Risikofaktoren';
    case 'travel':
      return 'Reise-/Situationsimpfung';
    case 'no_standard':
      return 'derzeit keine Standardempfehlung fuer dieses Alter';
    case 'discuss':
      return 'mit Kinderarzt besprechen';
  }
}
