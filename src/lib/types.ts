// ──────────────────────────────────────────────
// MyBaby — Zentrale Typdefinitionen
// ──────────────────────────────────────────────

export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;           // ISO date YYYY-MM-DD
  birthTime: string;           // HH:mm
  sex: 'male' | 'female' | 'diverse';
  birthWeight: number;         // grams
  birthLength: number;         // cm
  birthHeadCircumference: number; // cm
  gestationalAge?: string;     // e.g. "39+1"
  birthPlace?: string;
  apgar?: string;              // e.g. "9/10/10"
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GrowthEntry {
  id: string;
  childId: string;
  date: string;                // ISO date
  time?: string;               // HH:mm
  ageInDays: number;
  weight?: number;             // grams
  length?: number;             // cm
  headCircumference?: number;  // cm
  temperature?: number;        // celsius
  feedingNotes?: string;
  diaperNotes?: string;
  generalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type UExamStatus = 'not_due' | 'upcoming' | 'due' | 'overdue' | 'completed';

export interface UExamRecord {
  id: string;
  childId: string;
  examKey: string;             // e.g. "U1", "U2", ...
  scheduledDate?: string;
  completedDate?: string;
  status: UExamStatus;
  weight?: number;
  length?: number;
  headCircumference?: number;
  doctorNotes?: string;
  parentQuestions?: string;
  findings?: string;
  nextSteps?: string;
  createdAt: string;
  updatedAt: string;
}

export type VaccinationStatus =
  | 'not_due'
  | 'upcoming'
  | 'due'
  | 'overdue'
  | 'completed'
  | 'unclear';

export type VaccinationCategory =
  | 'standard'            // STIKO-Standardempfehlung
  | 'legally_relevant'    // gesetzlich/nachweisrelevant
  | 'indication'          // Indikationsimpfung / bei Risikofaktoren
  | 'travel'              // Reise-/Situationsimpfung
  | 'no_standard'         // derzeit keine Standardempfehlung fuer dieses Alter
  | 'discuss';            // mit Kinderarzt besprechen

export interface VaccinationRecord {
  id: string;
  childId: string;
  vaccineKey: string;
  doseNumber: number;
  status: VaccinationStatus;
  administeredDate?: string;
  vaccineName?: string;
  batchNumber?: string;
  doctor?: string;
  practice?: string;
  sideEffects?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ArchiveEntryType = 'bilirubin' | 'phototherapy' | 'hospital' | 'screening' | 'note';

export interface MedicalArchiveEntry {
  id: string;
  childId: string;
  type: ArchiveEntryType;
  title: string;
  date: string;
  time?: string;
  value?: number;
  unit?: string;
  notes?: string;
  createdAt: string;
}

// Legacy bilirubin type for archive compatibility
export type BilirubinMeasurementType = 'transkutan/Stirn' | 'transkutan/Brust' | 'Serum/Blut';

export interface BilirubinEntry {
  id: string;
  childId: string;
  date: string;
  time: string;
  value: number;              // mg/dl
  type: BilirubinMeasurementType;
  note?: string;
  createdAt: string;
}

// Age phase labels
export type AgePhase =
  | 'Neugeborenes'     // 0-28 days
  | 'Saeugling'        // 1-12 months
  | 'Kleinkind'        // 1-3 years
  | 'Vorschulkind';    // 3-6 years

// ── Auth & Family ───────────────────────────
export interface FamilyProfile {
  id: string;
  pin: string;          // hashed PIN for access
  createdAt: string;
}

// ── Pediatrician ────────────────────────────
export interface Pediatrician {
  id: string;
  name: string;
  practice: string;
  street: string;
  zip: string;
  city: string;
  phone?: string;
  email?: string;
  website?: string;
  lat?: number;
  lng?: number;
}

// ── Calendar ────────────────────────────────
export type CalendarEventType = 'u_exam' | 'vaccination' | 'doctor' | 'other';

export interface CalendarEvent {
  id: string;
  childId: string;
  title: string;
  date: string;
  time?: string;
  type: CalendarEventType;
  description?: string;
  location?: string;
  reminder?: boolean;
  completed?: boolean;
  linkedExamKey?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Development Tips ────────────────────────
export type DevelopmentCategory = 'physical' | 'cognitive' | 'social' | 'language';

export interface DevelopmentTip {
  id: string;
  title: string;
  category: DevelopmentCategory;
  ageFromDays: number;
  ageToDays: number;
  shortDescription: string;
  fullDescription: string;
  steps?: string[];
  duration?: string;
  frequency?: string;
  source?: string;
}
