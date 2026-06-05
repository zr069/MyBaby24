'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Start', icon: HomeIcon },
  { href: '/wachstum', label: 'Wachstum', icon: ChartIcon },
  { href: '/untersuchungen', label: 'U-Hefte', icon: ClipboardIcon },
  { href: '/impfungen', label: 'Impfungen', icon: ShieldIcon },
  { href: '/archiv', label: 'Archiv', icon: ArchiveIcon },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-secondary)' }}>
      <header
        className="sticky top-0 z-40 backdrop-blur-xl border-b px-4 py-3 flex items-center justify-between"
        style={{
          background: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h1 className="text-lg font-bold tracking-tight" style={{ color: 'var(--accent)' }}>
          MyBaby
        </h1>
        <button
          onClick={() => router.push('/profil')}
          className="text-sm px-3 py-1.5 rounded-lg transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          Profil
        </button>
      </header>

      <main className="flex-1 pb-24 px-4 pt-4 max-w-lg mx-auto w-full">
        {children}
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl"
        style={{
          background: 'color-mix(in srgb, var(--bg-primary) 90%, transparent)',
          borderColor: 'var(--border-color)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="max-w-lg mx-auto flex">
          {tabs.map(tab => {
            const isActive = pathname === tab.href;
            return (
              <button
                key={tab.href}
                onClick={() => router.push(tab.href)}
                className="flex-1 flex flex-col items-center py-2 pt-3 gap-0.5 transition-colors"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                <tab.icon active={isActive} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ChartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function ClipboardIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function ShieldIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ArchiveIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}
