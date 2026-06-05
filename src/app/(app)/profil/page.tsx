'use client';

import { useChildProfile } from '@/hooks/useChildProfile';
import { formatDateDE } from '@/lib/age';

export default function ProfilPage() {
  const { child, age, phaseLabel } = useChildProfile();

  if (!child) return <Spinner />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Kind-Profil</h2>

      <div className="rounded-2xl p-5 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="text-center mb-4">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl"
               style={{ background: 'var(--accent-light)' }}>
            {child.sex === 'male' ? '\u{1F466}' : child.sex === 'female' ? '\u{1F467}' : '\u{1F476}'}
          </div>
          <h3 className="text-lg font-bold mt-3" style={{ color: 'var(--text-primary)' }}>{child.name}</h3>
          {age && <p className="text-sm" style={{ color: 'var(--accent)' }}>{age.label}</p>}
          {phaseLabel && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{phaseLabel}</p>}
        </div>

        <div className="space-y-3 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
          <ProfileRow label="Geburtsdatum" value={`${formatDateDE(child.birthDate)}, ${child.birthTime} Uhr`} />
          <ProfileRow label="Geschlecht" value={child.sex === 'male' ? 'maennlich' : child.sex === 'female' ? 'weiblich' : 'divers'} />
          <ProfileRow label="Geburtsgewicht" value={`${child.birthWeight} g`} />
          <ProfileRow label="Geburtsgroesse" value={`${child.birthLength} cm`} />
          <ProfileRow label="Kopfumfang" value={`${child.birthHeadCircumference} cm`} />
          {child.gestationalAge && <ProfileRow label="Schwangerschaftswoche" value={child.gestationalAge} />}
          {child.apgar && <ProfileRow label="Apgar" value={child.apgar} />}
          {child.birthPlace && <ProfileRow label="Geburtsort" value={child.birthPlace} />}
          {child.notes && (
            <div>
              <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Notizen</div>
              <div className="text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{child.notes}</div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl p-3 border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Die Profildaten werden ausschliesslich lokal auf diesem Geraet gespeichert.
          Es werden keine Daten an externe Server uebertragen.
          Die Bearbeitung des Profils wird in einer zukuenftigen Version ermoeglicht.
        </p>
      </div>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-sm font-semibold text-right" style={{ color: 'var(--text-primary)' }}>{value}</span>
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
