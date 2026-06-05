'use client';

import { useEffect, useState } from 'react';
import { useChildProfile } from '@/hooks/useChildProfile';
import { useGrowthData } from '@/hooks/useGrowthData';
import { useUExams } from '@/hooks/useUExams';
import { useVaccinations } from '@/hooks/useVaccinations';
import { formatAge, getAgePhase, getAgePhaseLabel, formatDateDE, addDays } from '@/lib/age';

export default function DashboardPage() {
  const { child, age, phaseLabel } = useChildProfile();
  const { latest: latestGrowth, entries: growthEntries } = useGrowthData();
  const uExams = child ? useUExamsData(child.birthDate, child.birthTime) : null;
  const vaccinations = child ? useVaccinationsData(child.birthDate, child.birthTime) : null;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!child || !age) {
    return <LoadingSpinner />;
  }

  const birthEntry = growthEntries.find(e => e.ageInDays === 0);
  const weightChange = latestGrowth?.weight && birthEntry?.weight
    ? latestGrowth.weight - birthEntry.weight
    : null;
  const weightChangePct = weightChange !== null && birthEntry?.weight
    ? ((weightChange / birthEntry.weight) * 100).toFixed(1)
    : null;

  return (
    <div className="space-y-4">
      {/* Hero Card */}
      <div className="rounded-2xl p-5 text-center" style={{ background: 'var(--accent)', color: '#fff' }}>
        <div className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">
          {phaseLabel}
        </div>
        <div className="text-2xl font-bold mt-1">{child.name}</div>
        <div className="text-3xl font-extrabold mt-2 tabular-nums">{age.label}</div>
        <div className="text-xs opacity-70 mt-1">{age.detailLabel}</div>
        {uExams?.nextExam && (
          <div className="mt-3 text-xs font-medium px-3 py-1.5 rounded-full inline-block"
               style={{ background: 'rgba(255,255,255,0.2)' }}>
            Naechste U: {uExams.nextExam.name} ({uExams.nextExam.ageRange.label})
          </div>
        )}
      </div>

      {/* Heute relevant */}
      <Card title="Heute relevant">
        <div className="space-y-2">
          {age.days <= 14 && (
            <>
              <InfoRow icon="scale" text="Gewichtsentwicklung beobachten" />
              <InfoRow icon="ruler" text="Groesse und Kopfumfang erfassen" />
              <InfoRow icon="baby" text="Trinkverhalten und Allgemeinzustand beobachten" />
            </>
          )}
          {age.days > 14 && age.days <= 42 && (
            <>
              <InfoRow icon="scale" text="Regelmaessig Gewicht erfassen" />
              <InfoRow icon="calendar" text="U3-Termin planen" />
              <InfoRow icon="eye" text="Blickkontakt und Fixation beobachten" />
            </>
          )}
          {age.days > 42 && age.days <= 120 && (
            <>
              <InfoRow icon="syringe" text="Erste Impfungen stehen an" />
              <InfoRow icon="scale" text="Wachstum dokumentieren" />
              <InfoRow icon="smile" text="Soziales Laecheln beobachten" />
            </>
          )}
          {uExams?.nextExam && uExams.nextExam.daysUntilStart <= 14 && uExams.nextExam.status !== 'completed' && (
            <InfoRow
              icon="calendar"
              text={`${uExams.nextExam.name} steht bald an (${uExams.nextExam.ageRange.label})`}
              accent
            />
          )}
          {uExams && uExams.overdueExams.length > 0 && (
            <InfoRow
              icon="alert"
              text={`${uExams.overdueExams.map(e => e.name).join(', ')} ueberfaellig — bitte Termin vereinbaren`}
              danger
            />
          )}
          {vaccinations?.nextDue && (
            <InfoRow
              icon="syringe"
              text={`Naechste Impfung: ${vaccinations.nextDue.vaccine.diseaseDe} (${vaccinations.nextDue.dose.doseName})`}
            />
          )}
        </div>
      </Card>

      {/* Wachstumswerte */}
      <Card title="Letzte Messwerte">
        {latestGrowth ? (
          <div>
            <div className="grid grid-cols-3 gap-3">
              {latestGrowth.weight && (
                <StatBox
                  label="Gewicht"
                  value={latestGrowth.weight >= 1000 ? `${(latestGrowth.weight / 1000).toFixed(2)} kg` : `${latestGrowth.weight} g`}
                />
              )}
              {latestGrowth.length && (
                <StatBox label="Groesse" value={`${latestGrowth.length} cm`} />
              )}
              {latestGrowth.headCircumference && (
                <StatBox label="Kopfumfang" value={`${latestGrowth.headCircumference} cm`} />
              )}
            </div>
            <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Gemessen am {formatDateDE(latestGrowth.date)} (Tag {latestGrowth.ageInDays})
            </div>
            {weightChange !== null && (
              <div className="text-xs mt-1" style={{ color: weightChange >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                {weightChange >= 0 ? '+' : ''}{weightChange} g seit Geburt ({weightChangePct}%)
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Noch keine Messwerte eingetragen.
          </p>
        )}
      </Card>

      {/* U-Untersuchungen Kurzuebersicht */}
      {uExams && (
        <Card title="U-Untersuchungen">
          <div className="space-y-2">
            {uExams.examsWithStatus.slice(0, 5).map(exam => (
              <div key={exam.key} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <StatusDot status={exam.status} />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {exam.name}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {exam.ageRange.label}
                  </span>
                </div>
                <StatusLabel status={exam.status} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Impfungen Kurzuebersicht */}
      {vaccinations && vaccinations.standardDoses.length > 0 && (
        <Card title="Naechste Impfungen">
          <div className="space-y-2">
            {getUpcomingVaccineGroups(vaccinations.standardDoses).slice(0, 3).map((group, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <StatusDot status={group.status} />
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {group.label}
                  </span>
                </div>
                <StatusLabel status={group.status} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl p-4 border-2 border-dashed" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>
        <p className="text-xs leading-relaxed font-medium" style={{ color: 'var(--accent-text)' }}>
          Diese App ersetzt keine aerztliche Untersuchung. Sie dient der Information und Dokumentation
          fuer Eltern. Bei Auffaelligkeiten oder Unsicherheit bitte Kinderarzt/Kinderaerztin konsultieren.
        </p>
      </div>
    </div>
  );
}

// ── Helper Hooks (wrapper to avoid conditional hook calls) ──
function useUExamsData(birthDate: string, birthTime: string) {
  return useUExams(birthDate, birthTime);
}
function useVaccinationsData(birthDate: string, birthTime: string) {
  return useVaccinations(birthDate, birthTime);
}

// ── Subcomponents ──

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
           style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-2 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-sm font-bold mt-0.5 tabular-nums" style={{ color: 'var(--text-primary)' }}>{value}</div>
    </div>
  );
}

function InfoRow({ icon, text, accent, danger }: { icon: string; text: string; accent?: boolean; danger?: boolean }) {
  const color = danger ? 'var(--danger)' : accent ? 'var(--accent)' : 'var(--text-secondary)';
  return (
    <div className="flex items-start gap-2 text-sm" style={{ color }}>
      <span className="mt-0.5 text-xs">
        {icon === 'scale' && '\u2696'}
        {icon === 'ruler' && '\u{1F4CF}'}
        {icon === 'baby' && '\u{1F476}'}
        {icon === 'calendar' && '\u{1F4C5}'}
        {icon === 'syringe' && '\u{1FA78}'}
        {icon === 'eye' && '\u{1F441}'}
        {icon === 'smile' && '\u{1F60A}'}
        {icon === 'alert' && '\u26A0'}
      </span>
      <span>{text}</span>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  let bg = 'var(--text-muted)';
  if (status === 'completed') bg = 'var(--success)';
  if (status === 'due') bg = 'var(--accent)';
  if (status === 'upcoming') bg = 'var(--warning)';
  if (status === 'overdue') bg = 'var(--danger)';
  return <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: bg }} />;
}

function StatusLabel({ status }: { status: string }) {
  const labels: Record<string, { text: string; color: string }> = {
    completed: { text: 'erledigt', color: 'var(--success)' },
    due: { text: 'jetzt faellig', color: 'var(--accent)' },
    upcoming: { text: 'bald', color: 'var(--warning)' },
    overdue: { text: 'ueberfaellig', color: 'var(--danger)' },
    not_due: { text: 'noch nicht faellig', color: 'var(--text-muted)' },
  };
  const l = labels[status] || labels.not_due;
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: l.color, background: l.color + '15' }}>
      {l.text}
    </span>
  );
}

// Group vaccines by timing for compact display
function getUpcomingVaccineGroups(doses: Array<{ vaccine: { diseaseDe: string }; dose: { recommendedFromMonths: number; doseName: string }; status: string }>) {
  const groups: Array<{ label: string; status: string }> = [];
  const seen = new Set<string>();

  for (const d of doses) {
    if (d.status === 'completed') continue;
    const key = `${d.dose.recommendedFromMonths}-${d.dose.doseName}`;
    if (seen.has(key)) continue;

    const sameGroup = doses.filter(
      x => x.dose.recommendedFromMonths === d.dose.recommendedFromMonths
        && x.dose.doseName === d.dose.doseName
        && x.status !== 'completed'
    );
    const names = sameGroup.map(x => x.vaccine.diseaseDe).slice(0, 3);
    const label = names.length > 2
      ? `${names.slice(0, 2).join(', ')} +${names.length - 2}`
      : names.join(', ');

    groups.push({ label: `${d.dose.doseName}: ${label}`, status: d.status });
    seen.add(key);
  }
  return groups;
}
