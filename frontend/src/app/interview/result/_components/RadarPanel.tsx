'use client';

import { MetricMeters } from './MetricMeters';
import { ScoreRadarChart } from './ScoreRadarChart';
import type { MetricMap } from '../_constants/metrics';
import r from './RadarPanel.module.css';

type RadarPanelProps = {
  title?: string;
  radarData: Array<{ subject: string; value: number }>;
  meters: MetricMap | null;
};

export default function RadarPanel({ title = '항목별 평균', radarData, meters }: RadarPanelProps) {
  return (
    <section className={r.panel} aria-label={title}>
      <div className={r.title}>{title}</div>
      <div className={r.chartBox}>
        <ScoreRadarChart data={radarData} height={260} />
      </div>
      <MetricMeters values={meters} />
    </section>
  );
}
