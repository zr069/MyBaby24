// ──────────────────────────────────────────────
// Altersberechnung und Formatierung
// ──────────────────────────────────────────────

import type { AgePhase } from './types';

export function getBirthDateTime(birthDate: string, birthTime: string): Date {
  return new Date(`${birthDate}T${birthTime}:00`);
}

export function getAgeInDays(birthDate: string, birthTime: string, atDate?: Date): number {
  const birth = getBirthDateTime(birthDate, birthTime);
  const now = atDate || new Date();
  return Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
}

export function getAgeInHours(birthDate: string, birthTime: string, atDate?: Date): number {
  const birth = getBirthDateTime(birthDate, birthTime);
  const now = atDate || new Date();
  return (now.getTime() - birth.getTime()) / (1000 * 60 * 60);
}

export interface FormattedAge {
  days: number;
  weeks: number;
  remainingDays: number;
  months: number;
  remainingDaysInMonth: number;
  label: string;
  shortLabel: string;
  detailLabel: string;
}

export function formatAge(birthDate: string, birthTime: string, atDate?: Date): FormattedAge {
  const days = getAgeInDays(birthDate, birthTime, atDate);
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  const months = Math.floor(days / 30.44);
  const remainingDaysInMonth = days - Math.round(months * 30.44);

  let label: string;
  let shortLabel: string;

  if (days === 0) {
    label = 'Heute geboren';
    shortLabel = 'Tag 0';
  } else if (days === 1) {
    label = '1 Tag alt';
    shortLabel = '1 Tag';
  } else if (days < 14) {
    label = `${days} Tage alt`;
    shortLabel = `${days} Tage`;
  } else if (days < 60) {
    label = `${weeks} ${weeks === 1 ? 'Woche' : 'Wochen'}${remainingDays > 0 ? ` + ${remainingDays} ${remainingDays === 1 ? 'Tag' : 'Tage'}` : ''} alt`;
    shortLabel = `${weeks}W ${remainingDays}T`;
  } else {
    label = `${months} ${months === 1 ? 'Monat' : 'Monate'} alt`;
    shortLabel = `${months} Mon.`;
  }

  const detailLabel = days < 14
    ? `${days} ${days === 1 ? 'Tag' : 'Tage'}`
    : `${weeks} ${weeks === 1 ? 'Woche' : 'Wochen'} + ${remainingDays} ${remainingDays === 1 ? 'Tag' : 'Tage'} (${days} Tage)`;

  return { days, weeks, remainingDays, months, remainingDaysInMonth, label, shortLabel, detailLabel };
}

export function getAgePhase(days: number): AgePhase {
  if (days <= 28) return 'Neugeborenes';
  if (days <= 365) return 'Saeugling';
  if (days <= 1095) return 'Kleinkind';
  return 'Vorschulkind';
}

export function getAgePhaseLabel(phase: AgePhase): string {
  switch (phase) {
    case 'Neugeborenes': return 'Neugeborenenphase';
    case 'Saeugling': return 'Saeuglingsphase';
    case 'Kleinkind': return 'Kleinkindphase';
    case 'Vorschulkind': return 'Vorschulalter';
  }
}

export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

export function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function formatDateDE(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}
