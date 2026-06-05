'use client';

import { useState } from 'react';
import { useChildProfile } from '@/hooks/useChildProfile';
import { useUExams, UExamWithStatus } from '@/hooks/useUExams';
import { formatDateDE, addDays } from '@/lib/age';
import { UExamStatus } from '@/lib/types';

export default function UntersuchungenPage() {
  const { child } = useChildProfile();
  const uExams = useUExams(child?.birthDate ?? '2000-01-01', child?.birthTime ?? '00:00');
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  if (!child) return <Spinner />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>U-Untersuchungen</h2>

      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Die U-Untersuchungen sind Vorsorgeuntersuchungen fuer Kinder, die von den gesetzlichen
        Krankenkassen bezahlt werden. Zeitfenster und Inhalte basieren auf der G-BA Kinder-Richtlinie.
      </p>

      <div className="space-y-3">
        {uExams.examsWithStatus.map(exam => {
          const isExpanded = expandedKey === exam.key;
          const fromDate = addDays(child.birthDate, exam.ageRange.fromDays);
          const toDate = addDays(child.birthDate, exam.ageRange.toDays);

          return (
            <div
              key={exam.key}
              className="rounded-2xl border overflow-hidden transition-all"
              style={{
                background: 'var(--bg-card)',
                borderColor: exam.status === 'due' ? 'var(--accent)' : exam.status === 'overdue' ? 'var(--danger)' : 'var(--border-color)',
              }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedKey(isExpanded ? null : exam.key)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <StatusIcon status={exam.status} />
                  <div>
                    <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {exam.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {exam.ageRange.label}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={exam.status} />
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: 'var(--text-muted)', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="pt-3 space-y-3">
                    {/* Zeitfenster */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                        Zeitfenster
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {exam.ageRange.label} ({formatDateDE(fromDate)} — {formatDateDE(toDate)})
                      </div>
                    </div>

                    {/* Beschreibung */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                        Was wird untersucht?
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {exam.description}
                      </p>
                    </div>

                    {/* Untersuchungsbereiche */}
                    <Section title="Untersuchungsbereiche" items={exam.examAreas} />
                    <Section title="Messwerte" items={exam.measurements} />
                    <Section title="Entwicklung" items={exam.development} />
                    <Section title="Sinne" items={exam.senses} />

                    {/* Elternberatung */}
                    <Section title="Elternberatung" items={exam.parentAdvice} />

                    {/* Warnzeichen */}
                    {exam.warnings.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--danger)' }}>
                          Bei diesen Anzeichen bitte aerztlich abklaeren
                        </div>
                        <ul className="space-y-1">
                          {exam.warnings.map((w, i) => (
                            <li key={i} className="text-xs flex gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                              <span style={{ color: 'var(--danger)' }}>!</span>
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Vorbereitung */}
                    {exam.prepareForVisit.length > 0 && (
                      <Section title="Fuer den Termin vorbereiten" items={exam.prepareForVisit} />
                    )}

                    {/* Impfberatung */}
                    {exam.vaccineAdvice && (
                      <div className="rounded-xl p-3" style={{ background: 'var(--accent-light)' }}>
                        <div className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-text)' }}>Impfberatung</div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--accent-text)' }}>{exam.vaccineAdvice}</p>
                      </div>
                    )}

                    {/* Ergebnis */}
                    {exam.record?.status === 'completed' && (
                      <div className="rounded-xl p-3" style={{ background: 'var(--success-light)' }}>
                        <div className="text-xs font-semibold mb-1" style={{ color: 'var(--success)' }}>Ergebnis dokumentiert</div>
                        {exam.record.completedDate && (
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            Durchgefuehrt am {formatDateDE(exam.record.completedDate)}
                          </p>
                        )}
                        {exam.record.doctorNotes && (
                          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{exam.record.doctorNotes}</p>
                        )}
                        {exam.record.findings && (
                          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{exam.record.findings}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl p-3 border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Quelle: G-BA Kinder-Richtlinie, Kinderuntersuchungsheft.
          Die Ergebniseingabe und Terminplanung werden in einer zukuenftigen Version erweitert.
        </p>
      </div>
    </div>
  );
}


function Section({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
        {title}
      </div>
      <ul className="space-y-0.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs flex gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--text-muted)' }}>&middot;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusIcon({ status }: { status: UExamStatus }) {
  if (status === 'completed') {
    return (
      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--success-light)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  }
  if (status === 'due' || status === 'upcoming') {
    return (
      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)' }} />
      </div>
    );
  }
  if (status === 'overdue') {
    return (
      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--danger-light)' }}>
        <span className="text-sm" style={{ color: 'var(--danger)' }}>!</span>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
      <div className="w-2 h-2 rounded-full" style={{ background: 'var(--text-muted)' }} />
    </div>
  );
}

function StatusBadge({ status }: { status: UExamStatus }) {
  const config: Record<UExamStatus, { text: string; color: string }> = {
    completed: { text: 'erledigt', color: 'var(--success)' },
    due: { text: 'jetzt faellig', color: 'var(--accent)' },
    upcoming: { text: 'bald', color: 'var(--warning)' },
    overdue: { text: 'ueberfaellig', color: 'var(--danger)' },
    not_due: { text: 'noch nicht', color: 'var(--text-muted)' },
  };
  const c = config[status];
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: c.color, background: c.color + '15' }}>
      {c.text}
    </span>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
           style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
    </div>
  );
}
