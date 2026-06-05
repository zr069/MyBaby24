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
} from './types';
import {
  SEED_CHILD,
  SEED_GROWTH,
  SEED_BILIRUBIN,
  SEED_ARCHIVE,
  SEED_UEXAMS,
} from '@/data/seedData';

const KEYS = {
  child: 'mybaby_child',
  growth: 'mybaby_growth',
  uexams: 'mybaby_uexams',
  vaccinations: 'mybaby_vaccinations',
  bilirubin: 'mybaby_bilirubin',
  archive: 'mybaby_archive',
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

// ── Child Profile ───────────────────────────
export function getChildProfile(): ChildProfile {
  const stored = get<ChildProfile | null>(KEYS.child, null);
  if (!stored) {
    set(KEYS.child, SEED_CHILD);
    return SEED_CHILD;
  }
  return stored;
}

export function saveChildProfile(profile: ChildProfile): void {
  set(KEYS.child, { ...profile, updatedAt: new Date().toISOString() });
}

// ── Growth Entries ──────────────────────────
export function getGrowthEntries(): GrowthEntry[] {
  const stored = get<GrowthEntry[] | null>(KEYS.growth, null);
  if (!stored) {
    set(KEYS.growth, SEED_GROWTH);
    return SEED_GROWTH;
  }
  return stored.sort((a, b) => a.date.localeCompare(b.date));
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
  const stored = get<UExamRecord[] | null>(KEYS.uexams, null);
  if (!stored) {
    set(KEYS.uexams, SEED_UEXAMS);
    return SEED_UEXAMS;
  }
  return stored;
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
  const stored = get<BilirubinEntry[] | null>(KEYS.bilirubin, null);
  if (!stored) {
    set(KEYS.bilirubin, SEED_BILIRUBIN);
    return SEED_BILIRUBIN;
  }
  return stored.sort((a, b) => {
    const da = new Date(`${a.date}T${a.time}:00`).getTime();
    const db = new Date(`${b.date}T${b.time}:00`).getTime();
    return da - db;
  });
}

// ── Medical Archive ─────────────────────────
export function getArchiveEntries(): MedicalArchiveEntry[] {
  const stored = get<MedicalArchiveEntry[] | null>(KEYS.archive, null);
  if (!stored) {
    set(KEYS.archive, SEED_ARCHIVE);
    return SEED_ARCHIVE;
  }
  return stored.sort((a, b) => b.date.localeCompare(a.date));
}

export function addArchiveEntry(entry: MedicalArchiveEntry): void {
  const all = getArchiveEntries();
  all.push(entry);
  set(KEYS.archive, all);
}
