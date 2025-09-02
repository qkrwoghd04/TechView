'use client';

import type { MetricMap } from '../_constants/metrics';
import { METRICS, SCORE_DOMAIN } from '../_constants/metrics';
import styles from './MetricMeters.module.css';

type Props = { values: MetricMap | null };

export function MetricMeters({ values }: Props) {
  if (!values) return null;
  const [min, max] = SCORE_DOMAIN;

  return (
    <ul className={styles.list}>
      {METRICS.map(({ key, label }) => {
        const v = values[key] ?? 0;
        const pct = ((v - min) / (max - min)) * 100;
        return (
          <li key={key} className={styles.row}>
            <span className={styles.name}>{label}</span>
            <div className={styles.meter}>
              <span className={styles.fill} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.value}>{v.toFixed(1)}</span>
          </li>
        );
      })}
    </ul>
  );
}
