'use client';

import styles from './SummaryCard.module.css';

type Props = {
  averageScore: number;
  summary: string;
  count: number;
};

export default function SummaryCard({ averageScore, summary, count }: Props) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>총평</h2>
      <div className={styles.kpi} aria-label="평균 점수">
        <div className={styles.kpiValue}>{averageScore.toFixed(1)}</div>
      </div>
      <p className={styles.text}>{summary}</p>
      <div className={styles.meta}>
        <span>문항 수 {count}</span>
      </div>
    </div>
  );
}
