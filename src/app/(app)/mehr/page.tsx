'use client';

import { useRouter } from 'next/navigation';
import { useChildProfile } from '@/hooks/useChildProfile';
import { clearSession } from '@/lib/storage';

const menuItems = [
  { href: '/untersuchungen', label: 'U-Untersuchungen', desc: 'U1–U9, Zeitfenster, Inhalte', icon: '\u{1F4CB}' },
  { href: '/impfungen', label: 'Impfungen', desc: 'STIKO-Kalender, Status', icon: '\u{1F6E1}' },
  { href: '/kinderarzt', label: 'Kinderarzt', desc: 'Arzt suchen und hinterlegen', icon: '\u{1FA7A}' },
  { href: '/archiv', label: 'Archiv', desc: 'Bilirubin, Screenings, Historie', icon: '\u{1F4C2}' },
  { href: '/profil', label: 'Kind-Profil', desc: 'Stammdaten und Einstellungen', icon: '\u{1F476}' },
];

export default function MehrPage() {
  const router = useRouter();
  const { child } = useChildProfile();

  function handleLogout() {
    clearSession();
    window.location.reload();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Mehr</h2>

      <div className="space-y-2">
        {menuItems.map(item => (
          <button key={item.href} onClick={() => router.push(item.href)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all active:scale-[0.99]"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <span className="text-2xl">{item.icon}</span>
            <div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
            <svg className="ml-auto flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ color: 'var(--text-muted)' }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        className="w-full py-3 rounded-xl text-sm font-medium border"
        style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
        App sperren (PIN erneut eingeben)
      </button>

      <div className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        MyBaby v1.0 — Alle Daten lokal gespeichert
      </div>
    </div>
  );
}
