'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BilirubinEntry } from '@/lib/types';

interface BiliChartProps {
  entries: BilirubinEntry[];
  birthDate: string;
  birthTime: string;
}

export default function BiliChart({ entries, birthDate, birthTime }: BiliChartProps) {
  const birth = new Date(`${birthDate}T${birthTime}:00`);

  const data = entries.map(e => {
    const t = new Date(`${e.date}T${e.time}:00`);
    const hours = Math.round((t.getTime() - birth.getTime()) / (1000 * 60 * 60) * 10) / 10;
    return { hours, value: e.value, type: e.type };
  });

  return (
    <div style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
          <XAxis
            dataKey="hours"
            type="number"
            tickFormatter={v => `${Math.round(v)}h`}
            tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
          />
          <YAxis
            domain={[0, 'auto']}
            tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
          />
          <Tooltip content={<BiliTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={{ fill: '#f59e0b', r: 4, strokeWidth: 2, stroke: '#fff' }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function BiliTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { hours: number; value: number; type: string } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl p-2 shadow-lg border text-xs" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{Math.round(d.hours)}h Lebensalter</div>
      <div className="font-bold" style={{ color: '#f59e0b' }}>{d.value} mg/dl</div>
      <div style={{ color: 'var(--text-muted)' }}>{d.type}</div>
    </div>
  );
}
