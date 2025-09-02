'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { SCORE_DOMAIN } from '../_constants/metrics';
type Props = {
  data: Array<{ subject: string; value: number }>;
  height?: number;
  ariaLabel?: string;
  domain?: readonly [number, number];
};

export function ScoreRadarChart({ data, height = 240, ariaLabel, domain = SCORE_DOMAIN }: Props) {
  return (
    <div aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <PolarGrid gridType="polygon" stroke="var(--border)" radialLines />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: 'black', fontWeight: '900' }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={domain}
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--tooltip-bg)',
            }}
            labelStyle={{ color: 'var(--text)' }}
            itemStyle={{ color: 'var(--text)' }}
          />
          <Radar
            name="점수"
            dataKey="value"
            stroke="var(--ink)"
            strokeWidth={2}
            fill="var(--ink)"
            fillOpacity={0.14}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
