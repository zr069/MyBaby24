'use client';

import { useState, useEffect } from 'react';
import {
  hasExistingData,
  isSessionActive,
  setSessionActive,
  verifyPin,
  createFamily,
  saveChildProfile,
  importArianData,
} from '@/lib/storage';
import { ChildProfile } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

type Screen = 'loading' | 'welcome' | 'login' | 'setup_pin' | 'setup_child';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('loading');
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSessionActive()) {
      setScreen('loading');
      // brief flash then show content
      setTimeout(() => setScreen('loading'), 0);
    } else if (hasExistingData()) {
      setScreen('login');
    } else {
      setScreen('welcome');
    }
  }, []);

  if (screen === 'loading' && isSessionActive()) {
    return <>{children}</>;
  }

  if (screen === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
             style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  function handleLogin() {
    if (verifyPin(pin)) {
      setSessionActive();
      setScreen('loading');
    } else {
      setError('Falscher PIN. Bitte erneut versuchen.');
      setPin('');
    }
  }

  function handleSetupPin() {
    if (pin.length < 4) {
      setError('PIN muss mindestens 4 Zeichen haben.');
      return;
    }
    if (pin !== pinConfirm) {
      setError('PINs stimmen nicht ueberein.');
      return;
    }
    createFamily(pin);
    setError('');
    setScreen('setup_child');
  }

  function handleCreateChild(profile: ChildProfile) {
    saveChildProfile(profile);
    setSessionActive();
    setScreen('loading');
  }

  function handleImportArian() {
    importArianData();
    setSessionActive();
    setScreen('loading');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--accent)' }}>
            MyBaby
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Baby-Gesundheitsbegleiter fuer Eltern
          </p>
        </div>

        {screen === 'welcome' && (
          <div className="space-y-4">
            <div className="rounded-2xl p-5 border text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Willkommen!
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Erstelle ein Familienprofil, damit nur du und dein/e Partner/in
                Zugriff auf die Gesundheitsdaten eures Kindes haben.
              </p>
            </div>
            <button
              onClick={() => setScreen('setup_pin')}
              className="w-full py-4 rounded-xl font-semibold text-white text-base active:scale-[0.98]"
              style={{ background: 'var(--accent)' }}
            >
              Los geht's
            </button>
          </div>
        )}

        {screen === 'login' && (
          <div className="space-y-4">
            <div className="rounded-2xl p-5 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <h2 className="text-base font-bold mb-3 text-center" style={{ color: 'var(--text-primary)' }}>
                PIN eingeben
              </h2>
              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={e => { setPin(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Familien-PIN"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border outline-none text-center text-2xl tracking-[0.3em] font-bold"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              {error && <p className="text-xs text-center mt-2" style={{ color: 'var(--danger)' }}>{error}</p>}
            </div>
            <button
              onClick={handleLogin}
              disabled={pin.length < 4}
              className="w-full py-4 rounded-xl font-semibold text-white text-base active:scale-[0.98] disabled:opacity-40"
              style={{ background: 'var(--accent)' }}
            >
              Entsperren
            </button>
          </div>
        )}

        {screen === 'setup_pin' && (
          <div className="space-y-4">
            <div className="rounded-2xl p-5 border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <h2 className="text-base font-bold text-center" style={{ color: 'var(--text-primary)' }}>
                Familien-PIN festlegen
              </h2>
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                Teile diesen PIN mit deinem/deiner Partner/in, damit ihr beide Zugriff habt.
              </p>
              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={e => { setPin(e.target.value); setError(''); }}
                placeholder="PIN (mind. 4 Zeichen)"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border outline-none text-center text-xl tracking-[0.3em] font-bold"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              <input
                type="password"
                inputMode="numeric"
                value={pinConfirm}
                onChange={e => { setPinConfirm(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSetupPin()}
                placeholder="PIN bestaetigen"
                className="w-full px-4 py-3 rounded-xl border outline-none text-center text-xl tracking-[0.3em] font-bold"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              {error && <p className="text-xs text-center" style={{ color: 'var(--danger)' }}>{error}</p>}
            </div>
            <button
              onClick={handleSetupPin}
              disabled={pin.length < 4}
              className="w-full py-4 rounded-xl font-semibold text-white text-base active:scale-[0.98] disabled:opacity-40"
              style={{ background: 'var(--accent)' }}
            >
              Weiter
            </button>
          </div>
        )}

        {screen === 'setup_child' && (
          <SetupChild onCreate={handleCreateChild} onImportArian={handleImportArian} />
        )}
      </div>
    </div>
  );
}

function SetupChild({ onCreate, onImportArian }: {
  onCreate: (p: ChildProfile) => void;
  onImportArian: () => void;
}) {
  const [mode, setMode] = useState<'choose' | 'new'>('choose');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | 'diverse'>('male');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [headCirc, setHeadCirc] = useState('');
  const [error, setError] = useState('');

  if (mode === 'choose') {
    return (
      <div className="space-y-3">
        <div className="rounded-2xl p-5 border text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Kind anlegen
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Fuer wen moechtest du die App nutzen?
          </p>
        </div>

        <button
          onClick={onImportArian}
          className="w-full py-4 rounded-xl font-semibold text-white text-sm active:scale-[0.98]"
          style={{ background: 'var(--accent)' }}
        >
          Arian Noel Sarafi (bestehende Daten laden)
        </button>

        <button
          onClick={() => setMode('new')}
          className="w-full py-4 rounded-xl font-semibold text-sm border active:scale-[0.98]"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--bg-card)' }}
        >
          Neues Kind anlegen
        </button>
      </div>
    );
  }

  function handleCreate() {
    if (!name.trim() || !birthDate) {
      setError('Name und Geburtsdatum sind Pflichtfelder.');
      return;
    }
    onCreate({
      id: uuidv4(),
      name: name.trim(),
      birthDate,
      birthTime: birthTime || '00:00',
      sex,
      birthWeight: weight ? parseFloat(weight) : 0,
      birthLength: length ? parseFloat(length) : 0,
      birthHeadCircumference: headCirc ? parseFloat(headCirc) : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl p-4 border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-base font-bold text-center" style={{ color: 'var(--text-primary)' }}>
          Kind anlegen
        </h2>

        <Input label="Name" value={name} onChange={setName} placeholder="Vorname Nachname" autoFocus />
        <div className="grid grid-cols-2 gap-2">
          <Input label="Geburtsdatum" type="date" value={birthDate} onChange={setBirthDate} />
          <Input label="Uhrzeit (opt.)" type="time" value={birthTime} onChange={setBirthTime} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Geschlecht</label>
          <div className="flex gap-2">
            {(['male', 'female', 'diverse'] as const).map(s => (
              <button key={s} onClick={() => setSex(s)}
                className="flex-1 py-2 rounded-lg text-xs font-medium border"
                style={{
                  background: sex === s ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: sex === s ? '#fff' : 'var(--text-secondary)',
                  borderColor: sex === s ? 'var(--accent)' : 'var(--border-color)',
                }}>
                {s === 'male' ? 'maennlich' : s === 'female' ? 'weiblich' : 'divers'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Input label="Gewicht (g)" value={weight} onChange={setWeight} placeholder="3100" type="number" />
          <Input label="Groesse (cm)" value={length} onChange={setLength} placeholder="52" type="number" />
          <Input label="KU (cm)" value={headCirc} onChange={setHeadCirc} placeholder="34" type="number" />
        </div>
        {error && <p className="text-xs text-center" style={{ color: 'var(--danger)' }}>{error}</p>}
      </div>

      <button onClick={handleCreate}
        className="w-full py-4 rounded-xl font-semibold text-white text-base active:scale-[0.98]"
        style={{ background: 'var(--accent)' }}>
        Kind anlegen
      </button>
      <button onClick={() => setMode('choose')}
        className="w-full py-2 text-sm" style={{ color: 'var(--text-muted)' }}>
        Zurueck
      </button>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', placeholder, autoFocus }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} autoFocus={autoFocus}
        className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
    </div>
  );
}
