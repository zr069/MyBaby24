'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChildProfile } from '@/hooks/useChildProfile';
import { useGrowthData } from '@/hooks/useGrowthData';
import { useUExams } from '@/hooks/useUExams';
import { useVaccinations } from '@/hooks/useVaccinations';
import { formatDateDE } from '@/lib/age';
import { getSelectedPediatrician } from '@/lib/storage';
import ExplanationSheet, { ExplanationItem } from '@/components/ExplanationSheet';
import { DEVELOPMENT_TIPS } from '@/data/developmentTips';

export default function DashboardPage() {
  const router = useRouter();
  const { child, age, phaseLabel } = useChildProfile();
  const { latest: latestGrowth, entries: growthEntries } = useGrowthData();
  const uExams = useUExams(child?.birthDate ?? '2000-01-01', child?.birthTime ?? '00:00');
  const vaccinations = useVaccinations(child?.birthDate ?? '2000-01-01', child?.birthTime ?? '00:00');
  const [tick, setTick] = useState(0);
  const [explanation, setExplanation] = useState<ExplanationItem | null>(null);
  const [hasDoctor, setHasDoctor] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHasDoctor(getSelectedPediatrician() !== null);
  }, []);

  if (!child || !age) return <LoadingSpinner />;

  const birthEntry = growthEntries.find(e => e.ageInDays === 0);
  const weightChange = latestGrowth?.weight && birthEntry?.weight ? latestGrowth.weight - birthEntry.weight : null;
  const weightChangePct = weightChange !== null && birthEntry?.weight ? ((weightChange / birthEntry.weight) * 100).toFixed(1) : null;

  const relevantTips = DEVELOPMENT_TIPS.filter(t => age.days >= t.ageFromDays && age.days <= t.ageToDays);

  function tipToExplanation(tipId: string): ExplanationItem | undefined {
    const tip = relevantTips.find(t => t.id === tipId);
    if (!tip) return undefined;
    return {
      title: tip.title,
      content: tip.fullDescription + (tip.steps ? '\n\nSo geht\'s:\n' + tip.steps.map((s, i) => `${i + 1}. ${s}`).join('\n') : '')
        + (tip.duration ? `\n\nDauer: ${tip.duration}` : '')
        + (tip.frequency ? `\nHaeufigkeit: ${tip.frequency}` : ''),
      action: 'Alle Foerdertipps anzeigen',
      actionHref: '/foerderung',
    };
  }

  return (
    <div className="space-y-4">
      {/* Hero Card */}
      <div className="rounded-2xl p-5 text-center" style={{ background: 'var(--accent)', color: '#fff' }}>
        <div className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">{phaseLabel}</div>
        <div className="text-2xl font-bold mt-1">{child.name}</div>
        <div className="text-3xl font-extrabold mt-2 tabular-nums">{age.label}</div>
        <div className="text-xs opacity-70 mt-1">{age.detailLabel}</div>
        {uExams.nextExam && (
          <button onClick={() => router.push('/untersuchungen')}
            className="mt-3 text-xs font-medium px-3 py-1.5 rounded-full inline-block cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.2)' }}>
            Naechste U: {uExams.nextExam.name} ({uExams.nextExam.ageRange.label}) &rarr;
          </button>
        )}
      </div>

      {/* Kinderarzt-Hinweis */}
      {!hasDoctor && (
        <button onClick={() => router.push('/kinderarzt')} className="w-full text-left rounded-2xl p-4 border"
          style={{ background: 'var(--warning-light)', borderColor: 'var(--warning)' }}>
          <div className="text-sm font-semibold" style={{ color: 'var(--warning)' }}>Kinderarzt hinterlegen</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Fuer Termine und Erinnerungen einen Kinderarzt auswaehlen &rarr;
          </div>
        </button>
      )}

      {/* Heute relevant */}
      <Card title="Heute relevant">
        <div className="space-y-1">
          {age.days <= 14 && (
            <>
              <ClickableRow text="Gewichtsentwicklung beobachten"
                onClick={() => setExplanation({
                  title: 'Gewichtsentwicklung beobachten',
                  content: 'In den ersten Lebenstagen verlieren Neugeborene etwas Gewicht (bis zu 7-10% des Geburtsgewichts ist normal). Ab Tag 5-7 sollte das Gewicht wieder steigen. Das Geburtsgewicht wird normalerweise bis Tag 10-14 wieder erreicht.\n\nWichtig:\n- Regelmaessig wiegen (alle 2-3 Tage reicht)\n- Gewichtsverlust > 10% oder keine Zunahme ab Tag 5: bitte Kinderarzt informieren\n- Gut gestillte Babys nehmen ca. 20-30 g pro Tag zu',
                  action: 'Wachstum erfassen',
                  actionHref: '/wachstum',
                })} />
              <ClickableRow text="Groesse und Kopfumfang erfassen"
                onClick={() => setExplanation({
                  title: 'Groesse und Kopfumfang',
                  content: 'Groesse und Kopfumfang werden bei den U-Untersuchungen gemessen. Du kannst sie auch selbst erfassen, um den Verlauf zu dokumentieren.\n\nKopfumfang: Wird gemessen, um das Gehirnwachstum zu beurteilen. Ein zu schnelles oder zu langsames Wachstum sollte aerztlich abgeklaert werden.\n\nGroesse: Neugeborene wachsen im ersten Monat ca. 3-4 cm.',
                  action: 'Werte eintragen',
                  actionHref: '/wachstum',
                })} />
              <ClickableRow text="Trinkverhalten und Allgemeinzustand beobachten"
                onClick={() => setExplanation({
                  title: 'Trinkverhalten und Allgemeinzustand',
                  content: 'In den ersten Wochen sollte dein Baby:\n\n- Mind. 6-8 nasse Windeln pro Tag haben\n- Regelmaessig trinken (alle 2-3 Stunden)\n- Aktiv und wach wirken, wenn es nicht schlaeft\n- Die Haut sollte rosig und elastisch sein\n\nWarnzeichen — bitte zeitnah aerztlich abklaeren:\n- Weniger als 4 nasse Windeln pro Tag\n- Baby trinkt nicht oder verweigert die Brust/Flasche\n- Starke Schlaefrigkeit, Kind ist kaum weckbar\n- Fieber (> 38 Grad C rektal)\n- Gelbe Hautfarbe nimmt zu statt ab',
                })} />
            </>
          )}
          {age.days > 14 && age.days <= 42 && (
            <>
              <ClickableRow text="Regelmaessig Gewicht erfassen"
                onClick={() => setExplanation({
                  title: 'Gewicht erfassen',
                  content: 'In den ersten Wochen ist die Gewichtszunahme der wichtigste Indikator dafuer, dass die Ernaehrung gut funktioniert.\n\nRichtwerte:\n- Ca. 150-200 g pro Woche in den ersten 3 Monaten\n- Mind. 20-30 g pro Tag\n- Dein Kinderarzt wiegt bei jeder U-Untersuchung\n\nDu kannst auch zu Hause wiegen (Babywaage) oder in der Apotheke.',
                  action: 'Gewicht eintragen',
                  actionHref: '/wachstum',
                })} />
              <ClickableRow text="U3-Termin planen" accent onClick={() => router.push('/kalender')} />
              <ClickableRow text="Blickkontakt und Fixation beobachten"
                onClick={() => {
                  const tip = tipToExplanation('eye-contact');
                  if (tip) setExplanation(tip);
                }} />
            </>
          )}
          {age.days > 42 && age.days <= 120 && (
            <>
              <ClickableRow text="Erste Impfungen stehen an" onClick={() => router.push('/impfungen')} />
              <ClickableRow text="Wachstum dokumentieren" onClick={() => router.push('/wachstum')} />
              <ClickableRow text="Soziales Laecheln beobachten"
                onClick={() => setExplanation({
                  title: 'Soziales Laecheln',
                  content: 'Ab ca. 6-8 Wochen beginnen Babys, gezielt auf Gesichter zu laecheln. Das ist ein wichtiger sozialer Meilenstein.\n\nWas du tun kannst:\n- Viel Augenkontakt halten\n- Dein Baby anlaecheln und mit ihm sprechen\n- Auf sein Laecheln reagieren — das staerkt die Bindung\n\nJedes Kind ist anders — manche laecheln frueher, manche spaeter. Bei Sorgen bitte beim naechsten U-Termin ansprechen.',
                })} />
            </>
          )}
          {age.days > 120 && (
            <>
              <ClickableRow text="Koerperliche Foerderung entdecken" onClick={() => router.push('/foerderung')} />
              <ClickableRow text="Wachstum dokumentieren" onClick={() => router.push('/wachstum')} />
            </>
          )}
          {child && uExams.nextExam && uExams.nextExam.daysUntilStart <= 14 && uExams.nextExam.status !== 'completed' && (
            <ClickableRow
              text={`${uExams.nextExam.name} steht bald an (${uExams.nextExam.ageRange.label})`}
              accent onClick={() => router.push('/untersuchungen')} />
          )}
          {child && uExams.overdueExams.length > 0 && (
            <ClickableRow
              text={`${uExams.overdueExams.map(e => e.name).join(', ')} ueberfaellig — bitte Termin vereinbaren`}
              danger onClick={() => router.push('/kalender')} />
          )}
          {child && vaccinations.nextDue && (
            <ClickableRow
              text={`Naechste Impfung: ${vaccinations.nextDue.vaccine.diseaseDe}`}
              onClick={() => router.push('/impfungen')} />
          )}
        </div>
      </Card>

      {/* Wachstumswerte */}
      <button onClick={() => router.push('/wachstum')} className="w-full text-left">
        <Card title="Letzte Messwerte">
          {latestGrowth ? (
            <div>
              <div className="grid grid-cols-3 gap-3">
                {latestGrowth.weight && (
                  <StatBox label="Gewicht" value={latestGrowth.weight >= 1000 ? `${(latestGrowth.weight / 1000).toFixed(2)} kg` : `${latestGrowth.weight} g`} />
                )}
                {latestGrowth.length && <StatBox label="Groesse" value={`${latestGrowth.length} cm`} />}
                {latestGrowth.headCircumference && <StatBox label="Kopfumfang" value={`${latestGrowth.headCircumference} cm`} />}
              </div>
              <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                Gemessen am {formatDateDE(latestGrowth.date)} (Tag {latestGrowth.ageInDays}) &rarr;
              </div>
              {weightChange !== null && (
                <div className="text-xs mt-1" style={{ color: weightChange >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                  {weightChange >= 0 ? '+' : ''}{weightChange} g seit Geburt ({weightChangePct}%)
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Noch keine Messwerte. Tippen zum Eintragen &rarr;</p>
          )}
        </Card>
      </button>

      {/* U-Untersuchungen */}
      {child && (
        <button onClick={() => router.push('/untersuchungen')} className="w-full text-left">
          <Card title="U-Untersuchungen">
            <div className="space-y-2">
              {uExams.examsWithStatus.slice(0, 4).map(exam => (
                <div key={exam.key} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <StatusDot status={exam.status} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{exam.name}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{exam.ageRange.label}</span>
                  </div>
                  <StatusLabel status={exam.status} />
                </div>
              ))}
              <div className="text-xs pt-1" style={{ color: 'var(--accent)' }}>Alle anzeigen &rarr;</div>
            </div>
          </Card>
        </button>
      )}

      {/* Disclaimer */}
      <div className="rounded-2xl p-4 border-2 border-dashed" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>
        <p className="text-xs leading-relaxed font-medium" style={{ color: 'var(--accent-text)' }}>
          Diese App ersetzt keine aerztliche Untersuchung. Bei Auffaelligkeiten oder Unsicherheit bitte
          Kinderarzt/Kinderaerztin konsultieren.
        </p>
      </div>

      {explanation && <ExplanationSheet item={explanation} onClose={() => setExplanation(null)} />}
    </div>
  );
}

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
      <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{title}</h3>
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

function ClickableRow({ text, accent, danger, onClick }: {
  text: string; accent?: boolean; danger?: boolean; onClick?: () => void;
}) {
  const dotColor = danger ? 'var(--danger)' : accent ? 'var(--accent)' : 'var(--accent)';
  const textColor = danger ? 'var(--danger)' : accent ? 'var(--accent)' : 'var(--text-secondary)';
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-2.5 text-sm text-left py-2 px-2 rounded-xl transition-all active:opacity-70"
      style={{ color: textColor }}>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dotColor }} />
      <span className="flex-1">{text}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0" style={{ opacity: 0.3 }}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
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
    not_due: { text: 'noch nicht', color: 'var(--text-muted)' },
  };
  const l = labels[status] || labels.not_due;
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: l.color, background: l.color + '15' }}>{l.text}</span>
  );
}
