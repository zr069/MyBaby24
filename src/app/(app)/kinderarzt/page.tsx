'use client';

import { useState, useEffect } from 'react';
import { useChildProfile } from '@/hooks/useChildProfile';
import { searchPediatricians } from '@/data/kinderaerzte';
import { getSelectedPediatrician, saveSelectedPediatrician, clearSelectedPediatrician } from '@/lib/storage';
import { Pediatrician } from '@/lib/types';

export default function KinderarztPage() {
  const { child } = useChildProfile();
  const [selected, setSelected] = useState<Pediatrician | null>(null);
  const [mode, setMode] = useState<'view' | 'search'>('view');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Pediatrician[]>([]);

  useEffect(() => {
    setSelected(getSelectedPediatrician());
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchPediatricians(query));
    } else {
      setResults([]);
    }
  }, [query]);

  function handleSelect(doc: Pediatrician) {
    saveSelectedPediatrician(doc);
    setSelected(doc);
    setMode('view');
    setQuery('');
  }

  function handleRemove() {
    clearSelectedPediatrician();
    setSelected(null);
  }

  if (!child) return <Spinner />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Kinderarzt</h2>

      {/* Current pediatrician */}
      {selected && mode === 'view' && (
        <div className="rounded-2xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--accent)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
            Kinderarzt von {child.name}
          </div>
          <div className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selected.name}</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selected.practice}</div>
          <div className="text-xs mt-2 space-y-0.5" style={{ color: 'var(--text-muted)' }}>
            <div>{selected.street}, {selected.zip} {selected.city}</div>
            {selected.phone && <div>Tel: {selected.phone}</div>}
            {selected.email && <div>{selected.email}</div>}
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setMode('search')}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              Aendern
            </button>
            <button onClick={handleRemove}
              className="text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{ color: 'var(--danger)' }}>
              Entfernen
            </button>
          </div>
        </div>
      )}

      {/* No pediatrician or search mode */}
      {(!selected || mode === 'search') && (
        <div className="space-y-3">
          {!selected && (
            <div className="rounded-2xl p-4 border text-center" style={{ background: 'var(--warning-light)', borderColor: 'var(--warning)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--warning)' }}>
                Noch kein Kinderarzt hinterlegt
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Suche deinen Kinderarzt oder finde einen in der Naehe.
              </p>
            </div>
          )}

          {/* Search */}
          <div className="rounded-2xl p-4 border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Kinderarzt suchen
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Name, Praxis, Stadt oder PLZ eingeben..."
              autoFocus
              className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {results.map(doc => (
                  <button key={doc.id} onClick={() => handleSelect(doc)}
                    className="w-full text-left p-3 rounded-xl border transition-all hover:border-current active:scale-[0.99]"
                    style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{doc.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{doc.practice}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {doc.street}, {doc.zip} {doc.city}
                      {doc.phone && ` | ${doc.phone}`}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {query.length >= 2 && results.length === 0 && (
              <p className="text-xs text-center py-4" style={{ color: 'var(--text-muted)' }}>
                Kein Ergebnis. Die Beispieldatenbank enthaelt nur ausgewaehlte Staedte.
                Fuer die Vollversion wird eine komplette Datenbank aller Kinderaerzte in Deutschland integriert.
              </p>
            )}

            {query.length < 2 && (
              <div className="text-xs space-y-1" style={{ color: 'var(--text-muted)' }}>
                <p>Tipps zur Suche:</p>
                <p>&middot; Nach Name suchen: "Dr. Mueller"</p>
                <p>&middot; Nach PLZ suchen: "60325"</p>
                <p>&middot; Nach Stadt suchen: "Frankfurt"</p>
              </div>
            )}
          </div>

          {mode === 'search' && selected && (
            <button onClick={() => setMode('view')} className="w-full text-sm py-2" style={{ color: 'var(--text-muted)' }}>
              Abbrechen
            </button>
          )}
        </div>
      )}

      <div className="rounded-xl p-3 border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Die Kinderarzt-Suche befindet sich im Aufbau. Aktuell enthaelt die Datenbank Beispieleintraege
          fuer ausgewaehlte Staedte. Fuer den Produktivbetrieb wird eine vollstaendige Datenbank
          aller Kinderaerzte in Deutschland (ca. 7.000+) integriert.
        </p>
      </div>
    </div>
  );
}

function Spinner() {
  return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} /></div>;
}
