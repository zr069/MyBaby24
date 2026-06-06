'use client';

import { useState, useEffect } from 'react';
import { useChildProfile } from '@/hooks/useChildProfile';
import { useUExams } from '@/hooks/useUExams';
import { getCalendarEvents, addCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from '@/lib/storage';
import { CalendarEvent, CalendarEventType } from '@/lib/types';
import { formatDateDE, addDays } from '@/lib/age';
import { v4 as uuidv4 } from 'uuid';

export default function KalenderPage() {
  const { child } = useChildProfile();
  const uExams = useUExams(child?.birthDate ?? '2000-01-01', child?.birthTime ?? '00:00');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEvents(getCalendarEvents());
    setLoading(false);
  }, []);

  if (loading || !child) return <Spinner />;

  const today = new Date().toISOString().split('T')[0];
  const upcoming = events.filter(e => e.date >= today && !e.completed);
  const past = events.filter(e => e.date < today || e.completed);

  // Auto-suggest U-exam appointments
  const suggestedUExams = uExams.examsWithStatus
    .filter(e => e.status === 'due' || e.status === 'upcoming' || e.status === 'overdue')
    .filter(e => !events.some(ev => ev.linkedExamKey === e.key && !ev.completed));

  function handleAdd(event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const full: CalendarEvent = { ...event, id: uuidv4(), createdAt: now, updatedAt: now };
    addCalendarEvent(full);
    setEvents(getCalendarEvents());
    setShowForm(false);
  }

  function handleComplete(id: string) {
    updateCalendarEvent(id, { completed: true });
    setEvents(getCalendarEvents());
  }

  function handleDelete(id: string) {
    deleteCalendarEvent(id);
    setEvents(getCalendarEvents());
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Kalender</h2>
        <button onClick={() => setShowForm(!showForm)}
          className="text-sm font-semibold px-4 py-2 rounded-xl active:scale-95"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          {showForm ? 'Schliessen' : '+ Termin'}
        </button>
      </div>

      {showForm && (
        <EventForm childId={child.id} onSave={handleAdd} onCancel={() => setShowForm(false)} />
      )}

      {/* Suggested appointments */}
      {suggestedUExams.length > 0 && (
        <div className="rounded-2xl p-4 border" style={{ background: 'var(--warning-light)', borderColor: 'var(--warning)' }}>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--warning)' }}>
            Termin vereinbaren
          </h3>
          {suggestedUExams.map(exam => {
            const fromDate = addDays(child.birthDate, exam.ageRange.fromDays);
            const toDate = addDays(child.birthDate, exam.ageRange.toDays);
            return (
              <div key={exam.key} className="flex items-center justify-between py-2 border-b last:border-0"
                   style={{ borderColor: 'var(--warning)' + '30' }}>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {exam.name} — {exam.ageRange.label}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Zeitfenster: {formatDateDE(fromDate)} — {formatDateDE(toDate)}
                  </div>
                  {exam.status === 'overdue' && (
                    <div className="text-xs font-semibold" style={{ color: 'var(--danger)' }}>Ueberfaellig!</div>
                  )}
                </div>
                <button onClick={() => {
                  setShowForm(false);
                  handleAdd({
                    childId: child.id,
                    title: `${exam.name} — Kinderarzt`,
                    date: fromDate > today ? fromDate : today,
                    type: 'u_exam',
                    description: exam.description,
                    linkedExamKey: exam.key,
                    reminder: true,
                  });
                }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{ background: 'var(--accent)', color: '#fff' }}>
                  Eintragen
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Upcoming events */}
      <Card title={`Anstehend (${upcoming.length})`}>
        {upcoming.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Keine anstehenden Termine.</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map(ev => (
              <EventRow key={ev.id} event={ev} onComplete={() => handleComplete(ev.id)} onDelete={() => handleDelete(ev.id)} />
            ))}
          </div>
        )}
      </Card>

      {/* Past events */}
      {past.length > 0 && (
        <Card title={`Vergangen (${past.length})`}>
          <div className="space-y-2">
            {past.map(ev => (
              <EventRow key={ev.id} event={ev} onDelete={() => handleDelete(ev.id)} isPast />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function EventForm({ childId, onSave, onCancel }: {
  childId: string;
  onSave: (e: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [type, setType] = useState<CalendarEventType>('doctor');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onSave({ childId, title: title.trim(), date, time: time || undefined, type, description: description || undefined, location: location || undefined, reminder: true });
  }

  const typeOptions: { value: CalendarEventType; label: string }[] = [
    { value: 'u_exam', label: 'U-Untersuchung' },
    { value: 'vaccination', label: 'Impftermin' },
    { value: 'doctor', label: 'Arzttermin' },
    { value: 'other', label: 'Sonstiges' },
  ];

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-4 border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--accent)' }}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Termin-Titel"
        className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm font-semibold"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} autoFocus />
      <div className="grid grid-cols-2 gap-2">
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
        <input type="time" value={time} onChange={e => setTime(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
      </div>
      <div className="flex gap-2">
        {typeOptions.map(t => (
          <button key={t.value} type="button" onClick={() => setType(t.value)}
            className="flex-1 py-2 rounded-lg text-[10px] font-medium border"
            style={{
              background: type === t.value ? 'var(--accent)' : 'var(--bg-secondary)',
              color: type === t.value ? '#fff' : 'var(--text-secondary)',
              borderColor: type === t.value ? 'var(--accent)' : 'var(--border-color)',
            }}>
            {t.label}
          </button>
        ))}
      </div>
      <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Ort (optional)"
        className="w-full px-3 py-2.5 rounded-xl border outline-none text-sm"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
      <div className="flex gap-2">
        <button type="submit" className="flex-1 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: 'var(--accent)' }}>Speichern</button>
        <button type="button" onClick={onCancel} className="px-4 py-3 rounded-xl text-sm border"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>Abbrechen</button>
      </div>
    </form>
  );
}

function EventRow({ event, onComplete, onDelete, isPast }: {
  event: CalendarEvent; onComplete?: () => void; onDelete: () => void; isPast?: boolean;
}) {
  const typeColors: Record<CalendarEventType, string> = {
    u_exam: 'var(--accent)', vaccination: 'var(--success)', doctor: 'var(--warning)', other: 'var(--text-muted)',
  };
  const typeLabels: Record<CalendarEventType, string> = {
    u_exam: 'U-Untersuchung', vaccination: 'Impfung', doctor: 'Arzt', other: 'Termin',
  };

  return (
    <div className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: 'var(--border-color)', opacity: isPast ? 0.6 : 1 }}>
      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: typeColors[event.type] }} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{event.title}</div>
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {formatDateDE(event.date)}{event.time ? `, ${event.time} Uhr` : ''} | {typeLabels[event.type]}
        </div>
        {event.location && <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{event.location}</div>}
      </div>
      <div className="flex gap-1 flex-shrink-0">
        {!isPast && onComplete && (
          <button onClick={onComplete} className="text-[10px] px-2 py-1 rounded-lg" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>Erledigt</button>
        )}
        <button onClick={onDelete} className="text-[10px] px-2 py-1 rounded-lg" style={{ color: 'var(--danger)' }}>X</button>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{title}</h3>
      {children}
    </div>
  );
}

function Spinner() {
  return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} /></div>;
}
