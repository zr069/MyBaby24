// ──────────────────────────────────────────────
// LocalStorage-basierter Datenspeicher
// Keine Cloud, keine externen Services
// ──────────────────────────────────────────────

import {
  ChildProfile,
  GrowthEntry,
  UExamRecord,
  VaccinationRecord,
  BilirubinEntry,
  MedicalArchiveEntry,
  FamilyProfile,
  CalendarEvent,
  Pediatrician,
} from './types';
import {
  SEED_CHILD,
  SEED_GROWTH,
  SEED_BILIRUBIN,
  SEED_ARCHIVE,
  SEED_UEXAMS,
} from '@/data/seedData';

const KEYS = {
  family: 'mybaby_family',
  child: 'mybaby_child',
  growth: 'mybaby_growth',
  uexams: 'mybaby_uexams',
  vaccinations: 'mybaby_vaccinations',
  bilirubin: 'mybaby_bilirubin',
  archive: 'mybaby_archive',
  calendar: 'mybaby_calendar',
  pediatrician: 'mybaby_pediatrician',
  session: 'mybaby_session',
} as const;

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Auth / Family ───────────────────────────
function hashPin(pin: string): string {
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'pin_' + Math.abs(hash).toString(36);
}

export function getFamilyProfile(): FamilyProfile | null {
  return get<FamilyProfile | null>(KEYS.family, null);
}

export function createFamily(pin: string): FamilyProfile {
  const family: FamilyProfile = {
    id: 'family-' + Date.now(),
    pin: hashPin(pin),
    createdAt: new Date().toISOString(),
  };
  set(KEYS.family, family);
  return family;
}

export function verifyPin(pin: string): boolean {
  const family = getFamilyProfile();
  if (!family) return false;
  return family.pin === hashPin(pin);
}

export function isSessionActive(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(KEYS.session) === 'active';
}

export function setSessionActive(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEYS.session, 'active');
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(KEYS.session);
}

export function isSetupComplete(): boolean {
  return getFamilyProfile() !== null && getChildProfile() !== null;
}

export function hasExistingData(): boolean {
  return getFamilyProfile() !== null;
}

// ── Child Profile ───────────────────────────
export function getChildProfile(): ChildProfile | null {
  return get<ChildProfile | null>(KEYS.child, null);
}

export function saveChildProfile(profile: ChildProfile): void {
  set(KEYS.child, { ...profile, updatedAt: new Date().toISOString() });
}

export function importArianData(): void {
  set(KEYS.child, SEED_CHILD);
  set(KEYS.growth, SEED_GROWTH);
  set(KEYS.bilirubin, SEED_BILIRUBIN);
  set(KEYS.archive, SEED_ARCHIVE);
  set(KEYS.uexams, SEED_UEXAMS);
}

// ── Growth Entries ──────────────────────────
export function getGrowthEntries(): GrowthEntry[] {
  return get<GrowthEntry[]>(KEYS.growth, []).sort((a, b) => a.date.localeCompare(b.date));
}

export function addGrowthEntry(entry: GrowthEntry): void {
  const all = getGrowthEntries();
  all.push(entry);
  set(KEYS.growth, all);
}

export function updateGrowthEntry(id: string, updates: Partial<GrowthEntry>): void {
  const all = getGrowthEntries();
  const idx = all.findIndex(e => e.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], ...updates, id, updatedAt: new Date().toISOString() };
  set(KEYS.growth, all);
}

export function deleteGrowthEntry(id: string): void {
  const all = getGrowthEntries();
  set(KEYS.growth, all.filter(e => e.id !== id));
}

// ── U-Exam Records ─────────────────────────
export function getUExamRecords(): UExamRecord[] {
  return get<UExamRecord[]>(KEYS.uexams, []);
}

export function saveUExamRecord(record: UExamRecord): void {
  const all = getUExamRecords();
  const idx = all.findIndex(r => r.examKey === record.examKey);
  if (idx >= 0) {
    all[idx] = { ...record, updatedAt: new Date().toISOString() };
  } else {
    all.push({ ...record, updatedAt: new Date().toISOString() });
  }
  set(KEYS.uexams, all);
}

// ── Vaccination Records ─────────────────────
export function getVaccinationRecords(): VaccinationRecord[] {
  return get<VaccinationRecord[]>(KEYS.vaccinations, []);
}

export function saveVaccinationRecord(record: VaccinationRecord): void {
  const all = getVaccinationRecords();
  const idx = all.findIndex(r => r.id === record.id);
  if (idx >= 0) {
    all[idx] = { ...record, updatedAt: new Date().toISOString() };
  } else {
    all.push(record);
  }
  set(KEYS.vaccinations, all);
}

// ── Bilirubin (Archiv) ─────────────────────
export function getBilirubinEntries(): BilirubinEntry[] {
  return get<BilirubinEntry[]>(KEYS.bilirubin, []).sort((a, b) => {
    const da = new Date(`${a.date}T${a.time}:00`).getTime();
    const db = new Date(`${b.date}T${b.time}:00`).getTime();
    return da - db;
  });
}

// ── Medical Archive ─────────────────────────
export function getArchiveEntries(): MedicalArchiveEntry[] {
  return get<MedicalArchiveEntry[]>(KEYS.archive, []).sort((a, b) => b.date.localeCompare(a.date));
}

export function addArchiveEntry(entry: MedicalArchiveEntry): void {
  const all = getArchiveEntries();
  all.push(entry);
  set(KEYS.archive, all);
}

// ── Calendar ────────────────────────────────
export function getCalendarEvents(): CalendarEvent[] {
  return get<CalendarEvent[]>(KEYS.calendar, []).sort((a, b) => a.date.localeCompare(b.date));
}

export function addCalendarEvent(event: CalendarEvent): void {
  const all = getCalendarEvents();
  all.push(event);
  set(KEYS.calendar, all);
}

export function updateCalendarEvent(id: string, updates: Partial<CalendarEvent>): void {
  const all = getCalendarEvents();
  const idx = all.findIndex(e => e.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
  set(KEYS.calendar, all);
}

export function deleteCalendarEvent(id: string): void {
  const all = getCalendarEvents();
  set(KEYS.calendar, all.filter(e => e.id !== id));
}

// ── Pediatrician (per child) ────────────────
export function getSelectedPediatrician(): Pediatrician | null {
  return get<Pediatrician | null>(KEYS.pediatrician, null);
}

export function saveSelectedPediatrician(doc: Pediatrician): void {
  set(KEYS.pediatrician, doc);
}

export function clearSelectedPediatrician(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEYS.pediatrician);
}
