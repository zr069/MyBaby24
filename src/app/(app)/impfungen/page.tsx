'use client';

import { useState } from 'react';
import { useChildProfile } from '@/hooks/useChildProfile';
import { useVaccinations, VaccineDoseWithStatus } from '@/hooks/useVaccinations';
import { getCategoryLabel } from '@/data/stikoSchedule';
import { VaccinationStatus } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export default function ImpfungenPage() {
  const { child } = useChildProfile();
  const vacc = child ? useVaccWrapper(child.birthDate, child.birthTime) : null;
  const [filter, setFilter] = useState<'all' | 'standard' | 'due'>('due');
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [recordingDose, setRecordingDose] = useState<VaccineDoseWithStatus | null>(null);

  if (!child || !vacc) return <Spinner />;

  const filteredDoses = vacc.allDoses.filter(d => {
    if (filter === 'standard') return d.vaccine.category === 'standard';
    if (filter === 'due') return d.status === 'due' || d.status === 'upcoming' || d.status === 'overdue';
    return true;
  });

  // Group by vaccine
  const grouped = new Map<string, VaccineDoseWithStatus[]>();
  for (const d of filteredDoses) {
    const key = d.vaccine.key;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(d);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Impfungen</h2>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Impfempfehlungen basierend auf dem aktuellen STIKO-Impfkalender.
        Alle Angaben dienen der Elterninformation und ersetzen keine aerztliche Beratung.
      </p>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'due' as const, label: 'Aktuell' },
          { key: 'standard' as const, label: 'Standard' },
          { key: 'all' as const, label: 'Alle' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: filter === f.key ? 'var(--accent)' : 'var(--bg-card)',
              color: filter === f.key ? '#fff' : 'var(--text-secondary)',
              borderColor: 'var(--border-color)',
              border: filter !== f.key ? '1px solid var(--border-color)' : 'none',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Overdue Warning */}
      {vacc.overdueDoses.length > 0 && filter !== 'all' && (
        <div className="rounded-xl p-3 border" style={{ borderColor: 'var(--danger)', background: 'var(--danger-light)' }}>
          <p className="text-xs font-semibold" style={{ color: 'var(--danger)' }}>
            {vacc.overdueDoses.length} Impfung(en) ueberfaellig. Bitte mit dem Kinderarzt besprechen.
          </p>
        </div>
      )}

      {/* Vaccine List */}
      <div className="space-y-3">
        {Array.from(grouped.entries()).map(([vaccineKey, doses]) => {
          const vaccine = doses[0].vaccine;
          const isExpanded = expandedKey === vaccineKey;
          const worstStatus = getWorstStatus(doses);

          return (
            <div key={vaccineKey} className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => setExpandedKey(isExpanded ? null : vaccineKey)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <ImpfStatusDot status={worstStatus} />
                    <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {vaccine.diseaseDe}
                    </span>
                  </div>
                  <div className="text-[10px] mt-0.5 ml-5" style={{ color: 'var(--text-muted)' }}>
                    {getCategoryLabel(vaccine.category)}
                    {vaccine.legallyRelevant && ' | Nachweisrelevant'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
                    {doses.filter(d => d.status === 'completed').length}/{doses.length}
                  </span>
                  <ChevronIcon expanded={isExpanded} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="pt-3">
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {vaccine.parentInfo}
                    </p>
                  </div>

                  {/* Doses */}
                  <div className="space-y-2">
                    {doses.map(dose => (
                      <div key={`${dose.vaccine.key}-${dose.dose.doseNumber}`}
                           className="rounded-xl p-3 flex items-center justify-between"
                           style={{ background: 'var(--bg-secondary)' }}>
                        <div>
                          <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {dose.dose.doseName}
                          </div>
                          <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                            ab {dose.dose.recommendedFromMonths}. Monat
                          </div>
                          {dose.record?.administeredDate && (
                            <div className="text-[10px] mt-0.5" style={{ color: 'var(--success)' }}>
                              Erhalten am {dose.record.administeredDate}
                              {dose.record.vaccineName && ` (${dose.record.vaccineName})`}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <ImpfStatusBadge status={dose.status} />
                          {dose.status !== 'completed' && dose.status !== 'not_due' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); setRecordingDose(dose); }}
                              className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                              style={{ background: 'var(--accent)', color: '#fff' }}
                            >
                              Eintragen
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {vaccine.notes && (
                    <p className="text-[10px] italic" style={{ color: 'var(--text-muted)' }}>
                      {vaccine.notes}
                    </p>
                  )}

                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    Quelle: {vaccine.source} (Stand: {vaccine.lastReviewedAt})
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredDoses.length === 0 && (
        <div className="text-center py-8 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            {filter === 'due' ? 'Aktuell keine Impfungen faellig.' : 'Keine Impfungen in dieser Kategorie.'}
          </p>
        </div>
      )}

      {/* Recording Modal */}
      {recordingDose && (
        <RecordingModal
          dose={recordingDose}
          childId={child.id}
          onSave={(data) => {
            vacc.saveRecord(data);
            setRecordingDose(null);
          }}
          onClose={() => setRecordingDose(null)}
        />
      )}

      {/* Disclaimer */}
      <div className="rounded-xl p-3 border-2 border-dashed" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--accent-text)' }}>
          Die STIKO-Empfehlungen werden regelmaessig aktualisiert. Diese App bildet den Stand
          zum Zeitpunkt der letzten Datenpruefung ab. Bei Fragen zu einzelnen Impfungen bitte
          immer den Kinderarzt / die Kinderaerztin konsultieren.
        </p>
      </div>
    </div>
  );
}

function useVaccWrapper(birthDate: string, birthTime: string) {
  return useVaccinations(birthDate, birthTime);
}

// ── Recording Modal ──
function RecordingModal({
  dose, childId, onSave, onClose,
}: {
  dose: VaccineDoseWithStatus;
  childId: string;
  onSave: (data: Parameters<ReturnType<typeof useVaccinations>['saveRecord']>[0]) => void;
  onClose: () => void;
}) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [vaccineName, setVaccineName] = useState('');
  const [batch, setBatch] = useState('');
  const [doctor, setDoctor] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [notes, setNotes] = useState('');

  function handleSave() {
    onSave({
      childId,
      vaccineKey: dose.vaccine.key,
      doseNumber: dose.dose.doseNumber,
      status: 'completed',
      administeredDate: date,
      vaccineName: vaccineName || undefined,
      batchNumber: batch || undefined,
      doctor: doctor || undefined,
      sideEffects: sideEffects || undefined,
      notes: notes || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-lg rounded-t-2xl p-5 space-y-3" style={{ background: 'var(--bg-card)' }}>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            {dose.vaccine.diseaseDe} — {dose.dose.doseName}
          </h3>
          <button onClick={onClose} className="text-sm" style={{ color: 'var(--text-muted)' }}>Schliessen</button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <InputField label="Datum erhalten" type="date" value={date} onChange={setDate} />
          <InputField label="Impfstoff (opt.)" value={vaccineName} onChange={setVaccineName} placeholder="z.B. Infanrix" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <InputField label="Charge (opt.)" value={batch} onChange={setBatch} />
          <InputField label="Arzt/Praxis (opt.)" value={doctor} onChange={setDoctor} />
        </div>
        <InputField label="Nebenwirkungen (opt.)" value={sideEffects} onChange={setSideEffects} placeholder="z.B. Roetung, Fieber..." />
        <InputField label="Notizen (opt.)" value={notes} onChange={setNotes} />

        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm active:scale-[0.98]"
          style={{ background: 'var(--accent)' }}
        >
          Impfung eintragen
        </button>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border outline-none text-sm"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      />
    </div>
  );
}

// ── Helpers ──

function getWorstStatus(doses: VaccineDoseWithStatus[]): VaccinationStatus {
  if (doses.some(d => d.status === 'overdue')) return 'overdue';
  if (doses.some(d => d.status === 'due')) return 'due';
  if (doses.some(d => d.status === 'upcoming')) return 'upcoming';
  if (doses.every(d => d.status === 'completed')) return 'completed';
  return 'not_due';
}

function ImpfStatusDot({ status }: { status: VaccinationStatus }) {
  let bg = 'var(--text-muted)';
  if (status === 'completed') bg = 'var(--success)';
  if (status === 'due') bg = 'var(--accent)';
  if (status === 'upcoming') bg = 'var(--warning)';
  if (status === 'overdue') bg = 'var(--danger)';
  return <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: bg }} />;
}

function ImpfStatusBadge({ status }: { status: VaccinationStatus }) {
  const map: Record<VaccinationStatus, { t: string; c: string }> = {
    completed: { t: 'erledigt', c: 'var(--success)' },
    due: { t: 'jetzt', c: 'var(--accent)' },
    upcoming: { t: 'bald', c: 'var(--warning)' },
    overdue: { t: 'ueberfaellig', c: 'var(--danger)' },
    not_due: { t: 'spaeter', c: 'var(--text-muted)' },
    unclear: { t: 'unklar', c: 'var(--warning)' },
  };
  const m = map[status];
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: m.c, background: m.c + '15' }}>
      {m.t}
    </span>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         style={{ color: 'var(--text-muted)', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
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
