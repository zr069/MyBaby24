'use client';

import { useState } from 'react';
import { useChildProfile } from '@/hooks/useChildProfile';
import { getTipsForAge, getCategoryLabel, getCategoryIcon } from '@/data/developmentTips';
import { DevelopmentTip, DevelopmentCategory } from '@/lib/types';

export default function FoerderungPage() {
  const { child, age } = useChildProfile();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<DevelopmentCategory | 'all'>('all');

  if (!child || !age) return <Spinner />;

  const allTips = getTipsForAge(age.days);
  const filtered = filter === 'all' ? allTips : allTips.filter(t => t.category === filter);

  const categories: (DevelopmentCategory | 'all')[] = ['all', 'physical', 'cognitive', 'language', 'social'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Fruehkindliche Foerderung</h2>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Altersgerechte Anregungen fuer {child.name}. Alle Aktivitaeten sind Vorschlaege — folge dem Interesse
        und Tempo deines Kindes. Weniger ist oft mehr.
      </p>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex-shrink-0 border"
            style={{
              background: filter === cat ? 'var(--accent)' : 'var(--bg-card)',
              color: filter === cat ? '#fff' : 'var(--text-secondary)',
              borderColor: filter === cat ? 'var(--accent)' : 'var(--border-color)',
            }}>
            {cat === 'all' ? 'Alle' : `${getCategoryIcon(cat)} ${getCategoryLabel(cat)}`}
          </button>
        ))}
      </div>

      {/* Tips */}
      <div className="space-y-3">
        {filtered.map(tip => {
          const isExpanded = expandedId === tip.id;
          return (
            <div key={tip.id} className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <button onClick={() => setExpandedId(isExpanded ? null : tip.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getCategoryIcon(tip.category)}</span>
                  <div>
                    <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{tip.title}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{tip.shortDescription}</div>
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ color: 'var(--text-muted)', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-sm leading-relaxed pt-3" style={{ color: 'var(--text-secondary)' }}>
                    {tip.fullDescription}
                  </p>

                  {tip.steps && tip.steps.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>So geht's</div>
                      <ol className="space-y-1">
                        {tip.steps.map((step, i) => (
                          <li key={i} className="text-xs flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <span className="font-bold flex-shrink-0" style={{ color: 'var(--accent)' }}>{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="flex gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {tip.duration && <span>Dauer: {tip.duration}</span>}
                    {tip.frequency && <span>Haeufigkeit: {tip.frequency}</span>}
                  </div>

                  {tip.source && (
                    <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Quelle: {tip.source}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)' }}>Keine Tipps in dieser Kategorie fuer das aktuelle Alter.</p>
        </div>
      )}

      <div className="rounded-xl p-3 border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Jedes Kind entwickelt sich in seinem eigenen Tempo. Diese Tipps sind Anregungen, keine Pflicht.
          Bei Sorgen zur Entwicklung bitte den Kinderarzt ansprechen.
        </p>
      </div>
    </div>
  );
}

function Spinner() {
  return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} /></div>;
}
