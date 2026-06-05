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
import { GrowthEntry } from '@/lib/types';

interface GrowthChartsProps {
  entries: GrowthEntry[];
  birthWeight: number;
}

export default function GrowthCharts({ entries, birthWeight }: GrowthChartsProps) {
  const weightData = entries
    .filter(e => e.weight)
    .map(e => ({ day: e.ageInDays, value: e.weight! }));

  const lengthData = entries
    .filter(e => e.length)
    .map(e => ({ day: e.ageInDays, value: e.length! }));

  const headData = entries
    .filter(e => e.headCircumference)
    .map(e => ({ day: e.ageInDays, value: e.headCircumference! }));

  return (
    <div className="space-y-4">
      {weightData.length >= 2 && (
        <ChartCard title="Gewichtsverlauf" unit="g" color="var(--accent)" data={weightData} />
      )}
      {lengthData.length >= 2 && (
        <ChartCard title="Groessenverlauf" unit="cm" color="var(--success)" data={lengthData} />
      )}
      {headData.length >= 2 && (
        <ChartCard title="Kopfumfang" unit="cm" color="var(--warning)" data={headData} />
      )}
    </div>
  );
}

function ChartCard({ title, unit, color, data }: { title: string; unit: string; color: string; data: { day: number; value: number }[] }) {
  return (
    <div className="rounded-2xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
            <XAxis
              dataKey="day"
              tickFormatter={v => `Tag ${v}`}
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              tickFormatter={v => unit === 'g' && v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`}
            />
            <Tooltip content={<GrowthTooltip unit={unit} />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              dot={{ fill: color, r: 4, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function GrowthTooltip({ active, payload, unit }: { active?: boolean; payload?: Array<{ payload: { day: number; value: number } }>; unit: string }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const display = unit === 'g' && d.value >= 1000
    ? `${(d.value / 1000).toFixed(2)} kg`
    : `${d.value} ${unit}`;
  return (
    <div className="rounded-xl p-2 shadow-lg border text-xs" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Tag {d.day}</div>
      <div className="font-bold" style={{ color: 'var(--accent)' }}>{display}</div>
    </div>
  );
}
