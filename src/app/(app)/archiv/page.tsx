'use client';

import { useState } from 'react';
import { useChildProfile } from '@/hooks/useChildProfile';
import { getBilirubinEntries, getArchiveEntries } from '@/lib/storage';
import { formatDateDE } from '@/lib/age';
import { BilirubinEntry, MedicalArchiveEntry } from '@/lib/types';
import BiliChart from '@/components/BiliChart';

export default function ArchivPage() {
  const { child } = useChildProfile();
  const [tab, setTab] = useState<'overview' | 'bilirubin' | 'screenings'>('overview');

  if (!child) return <Spinner />;

  const biliEntries = getBilirubinEntries();
  const archiveEntries = getArchiveEntries();
  const screenings = archiveEntries.filter(e => e.type === 'screening');
  const photoEntries = archiveEntries.filter(e => e.type === 'phototherapy');
  const noteEntries = archiveEntries.filter(e => e.type === 'note' || e.type === 'hospital');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Archiv</h2>

      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Fruehere medizinische Daten, Screenings und der Bilirubin-Verlauf aus der Neugeborenenphase.
      </p>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'overview' as const, label: 'Uebersicht' },
          { key: 'bilirubin' as const, label: 'Bilirubin' },
          { key: 'screenings' as const, label: 'Screenings' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: tab === t.key ? 'var(--accent)' : 'var(--bg-card)',
              color: tab === t.key ? '#fff' : 'var(--text-secondary)',
              border: tab !== t.key ? '1px solid var(--border-color)' : 'none',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-3">
          {/* Phototherapie */}
          {photoEntries.length > 0 && (
            <Card title="Phototherapie">
              {photoEntries.map(e => (
                <div key={e.id} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {e.title} — {formatDateDE(e.date)}
                  </div>
                  {e.notes && <p className="text-xs mt-1 leading-relaxed">{e.notes}</p>}
                </div>
              ))}
            </Card>
          )}

          {/* Bilirubin Kurzuebersicht */}
          {biliEntries.length > 0 && (
            <Card title="Bilirubin-Verlauf (Kurzfassung)">
              <div className="space-y-1">
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {biliEntries.length} Messungen vom {formatDateDE(biliEntries[0].date)} bis {formatDateDE(biliEntries[biliEntries.length - 1].date)}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Min: {Math.min(...biliEntries.map(e => e.value)).toFixed(1)} mg/dl |
                  Max: {Math.max(...biliEntries.map(e => e.value)).toFixed(1)} mg/dl
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Medizinisch abgeschlossen. Fuer Details auf &quot;Bilirubin&quot;-Tab wechseln.
                </div>
              </div>
            </Card>
          )}

          {/* Screenings Kurzuebersicht */}
          {screenings.length > 0 && (
            <Card title="Screenings">
              {screenings.map(e => (
                <div key={e.id} className="flex items-start justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{e.title}</div>
                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{formatDateDE(e.date)}</div>
                  </div>
                  {e.notes && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
                      {e.notes.includes('unauffaellig') || e.notes.includes('Unauffaellig') ? 'unauffaellig' : 'dokumentiert'}
                    </span>
                  )}
                </div>
              ))}
            </Card>
          )}

          {/* Notizen */}
          {noteEntries.length > 0 && (
            <Card title="Notizen">
              {noteEntries.map(e => (
                <div key={e.id} className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-semibold">{formatDateDE(e.date)}:</span> {e.notes}
                </div>
              ))}
            </Card>
          )}
        </div>
      )}

      {tab === 'bilirubin' && (
        <BilirubinArchive entries={biliEntries} birthDate={child.birthDate} birthTime={child.birthTime} />
      )}

      {tab === 'screenings' && (
        <div className="space-y-3">
          {screenings.map(e => (
            <Card key={e.id} title={e.title}>
              <div className="text-xs space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <div>Datum: {formatDateDE(e.date)}{e.time ? `, ${e.time} Uhr` : ''}</div>
                {e.value !== undefined && <div>Wert: {e.value} {e.unit}</div>}
                {e.notes && <div className="leading-relaxed">{e.notes}</div>}
              </div>
            </Card>
          ))}
          {screenings.length === 0 && (
            <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>
              Keine Screenings dokumentiert.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function BilirubinArchive({ entries, birthDate, birthTime }: {
  entries: BilirubinEntry[];
  birthDate: string;
  birthTime: string;
}) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
        Keine Bilirubin-Daten vorhanden.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Card title="Bilirubin-Verlauf">
        <BiliChart entries={entries} birthDate={birthDate} birthTime={birthTime} />
      </Card>

      <Card title="Alle Messwerte">
        <div className="space-y-2">
          {entries.map((e, i) => {
            const prev = i > 0 ? entries[i - 1] : null;
            const diff = prev ? e.value - prev.value : null;
            return (
              <div key={e.id} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <div className="text-sm font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                    {e.value} mg/dl
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {formatDateDE(e.date)} {e.time} | {e.type}
                  </div>
                  {e.note && <div className="text-[10px] italic" style={{ color: 'var(--text-muted)' }}>{e.note}</div>}
                </div>
                {diff !== null && (
                  <span className="text-xs font-semibold tabular-nums"
                        style={{ color: diff > 0 ? 'var(--danger)' : 'var(--success)' }}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="rounded-xl p-3 border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Die Bilirubin-Thematik ist medizinisch abgeschlossen. Diese Daten werden als Archiv aufbewahrt.
          Bei erneuter Gelbfaerbung oder Auffaelligkeiten bitte zeitnah aerztlich abklaeren.
        </p>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      {children}
    </div>
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
