'use client';

import { usePathname, useRouter } from 'next/navigation';
import AuthGate from '@/components/AuthGate';

const tabs = [
  { href: '/', label: 'Start', icon: HomeIcon },
  { href: '/kalender', label: 'Kalender', icon: CalendarIcon },
  { href: '/wachstum', label: 'Wachstum', icon: ChartIcon },
  { href: '/foerderung', label: 'Foerderung', icon: HeartIcon },
  { href: '/mehr', label: 'Mehr', icon: MenuIcon },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Highlight "Mehr" tab for sub-pages
  const isMoreActive = ['/mehr', '/untersuchungen', '/impfungen', '/kinderarzt', '/archiv', '/profil'].includes(pathname);

  return (
    <AuthGate>
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
              const isActive = tab.href === '/mehr' ? isMoreActive : pathname === tab.href;
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
    </AuthGate>
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

function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function MenuIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
