'use client';

import { useState } from 'react';
import { useChildProfile } from '@/hooks/useChildProfile';
import { useGrowthData } from '@/hooks/useGrowthData';
import { getAgeInDays, formatDateDE } from '@/lib/age';
import GrowthCharts from '@/components/GrowthCharts';

export default function WachstumPage() {
  const { child } = useChildProfile();
  const { entries, addEntry, removeEntry, loading } = useGrowthData();
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  if (loading || !child) {
    return <Spinner />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Wachstum</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          {showForm ? 'Schliessen' : '+ Neuer Eintrag'}
        </button>
      </div>

      {showForm && (
        <GrowthEntryForm
          birthDate={child.birthDate}
          birthTime={child.birthTime}
          childId={child.id}
          onSave={(entry) => {
            addEntry(entry);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Stats Overview */}
      {entries.length > 0 && (
        <StatsOverview entries={entries} birthWeight={child.birthWeight} birthLength={child.birthLength} />
      )}

      {/* Charts */}
      {entries.length >= 2 && (
        <GrowthCharts entries={entries} birthWeight={child.birthWeight} />
      )}

      {/* History Toggle */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full text-sm font-medium py-3 rounded-xl border transition-all"
        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--bg-card)' }}
      >
        {showHistory ? 'Verlauf ausblenden' : `Alle ${entries.length} Eintraege anzeigen`}
      </button>

      {showHistory && (
        <div className="space-y-2">
          {[...entries].reverse().map(entry => (
            <div key={entry.id} className="rounded-xl p-3 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Tag {entry.ageInDays} — {formatDateDE(entry.date)}
                  </div>
                  <div className="text-xs mt-1 space-x-3" style={{ color: 'var(--text-secondary)' }}>
                    {entry.weight && <span>{entry.weight >= 1000 ? `${(entry.weight / 1000).toFixed(2)} kg` : `${entry.weight} g`}</span>}
                    {entry.length && <span>{entry.length} cm</span>}
                    {entry.headCircumference && <span>KU {entry.headCircumference} cm</span>}
                  </div>
                  {entry.generalNotes && (
                    <div className="text-xs mt-1 italic" style={{ color: 'var(--text-muted)' }}>
                      {entry.generalNotes}
                    </div>
                  )}
                </div>
                {entry.id !== 'growth-birth' && (
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="text-xs px-2 py-1 rounded"
                    style={{ color: 'var(--danger)' }}
                  >
                    Entfernen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {entries.length === 0 && !showForm && (
        <div className="text-center py-12 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)' }}>Noch keine Messwerte vorhanden.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-3 text-sm font-semibold px-4 py-2 rounded-xl"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Ersten Wert eintragen
          </button>
        </div>
      )}

      {/* Perzentilen-Hinweis */}
      <div className="rounded-xl p-3 border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Perzentilenvergleich (WHO/KiGGS) ist in einer zukuenftigen Version geplant.
          Die aktuellen Kurven zeigen den individuellen Verlauf Ihres Kindes.
          Bei starken Abweichungen oder ploetzlichen Veraenderungen bitte beim Kinderarzt ansprechen.
        </p>
      </div>
    </div>
  );
}

// ── Growth Entry Form ──
function GrowthEntryForm({
  birthDate, birthTime, childId, onSave, onCancel,
}: {
  birthDate: string;
  birthTime: string;
  childId: string;
  onSave: (entry: Parameters<ReturnType<typeof useGrowthData>['addEntry']>[0]) => void;
  onCancel: () => void;
}) {
  const now = new Date();
  const [date, setDate] = useState(now.toISOString().split('T')[0]);
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [headCirc, setHeadCirc] = useState('');
  const [temp, setTemp] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const ageDays = getAgeInDays(birthDate, birthTime, new Date(date + 'T12:00:00'));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!weight && !length && !headCirc) {
      setError('Bitte mindestens einen Messwert eingeben.');
      return;
    }

    onSave({
      childId,
      date,
      ageInDays: ageDays,
      weight: weight ? Math.round(parseFloat(weight) * (parseFloat(weight) < 20 ? 1000 : 1)) : undefined,
      length: length ? parseFloat(length) : undefined,
      headCircumference: headCirc ? parseFloat(headCirc) : undefined,
      temperature: temp ? parseFloat(temp) : undefined,
      generalNotes: notes || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-4 border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--accent)' }}>
      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Datum</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border outline-none"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
        {ageDays >= 0 && (
          <div className="text-xs mt-1 px-2" style={{ color: 'var(--accent)' }}>
            Lebenstag {ageDays}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Gewicht</label>
          <input
            type="number"
            step="0.01"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="g / kg"
            className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Groesse (cm)</label>
          <input
            type="number"
            step="0.1"
            value={length}
            onChange={e => setLength(e.target.value)}
            placeholder="cm"
            className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>KU (cm)</label>
          <input
            type="number"
            step="0.1"
            value={headCirc}
            onChange={e => setHeadCirc(e.target.value)}
            placeholder="cm"
            className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Notiz (optional)</label>
        <input
          type="text"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="z.B. nach dem Stillen, beim Kinderarzt..."
          className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      {error && (
        <p className="text-xs font-medium px-2" style={{ color: 'var(--danger)' }}>{error}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-3 rounded-xl font-semibold text-white text-sm transition-all active:scale-[0.98]"
          style={{ background: 'var(--accent)' }}
        >
          Speichern
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-3 rounded-xl text-sm border"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}

// ── Stats Overview ──
function StatsOverview({ entries, birthWeight, birthLength }: { entries: import('@/lib/types').GrowthEntry[]; birthWeight: number; birthLength: number }) {
  const latest = entries[entries.length - 1];
  const weightDelta = latest.weight ? latest.weight - birthWeight : null;

  return (
    <div className="rounded-2xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        Zusammenfassung
      </h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Geburtsgewicht:</span>
          <span className="ml-1 font-semibold" style={{ color: 'var(--text-primary)' }}>{birthWeight} g</span>
        </div>
        {latest.weight && (
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Aktuell:</span>
            <span className="ml-1 font-semibold" style={{ color: 'var(--text-primary)' }}>
              {latest.weight >= 1000 ? `${(latest.weight / 1000).toFixed(2)} kg` : `${latest.weight} g`}
            </span>
          </div>
        )}
        {weightDelta !== null && (
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Veraenderung:</span>
            <span className="ml-1 font-semibold" style={{ color: weightDelta >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              {weightDelta >= 0 ? '+' : ''}{weightDelta} g ({((weightDelta / birthWeight) * 100).toFixed(1)}%)
            </span>
          </div>
        )}
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Eintraege:</span>
          <span className="ml-1 font-semibold" style={{ color: 'var(--text-primary)' }}>{entries.length}</span>
        </div>
      </div>
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
