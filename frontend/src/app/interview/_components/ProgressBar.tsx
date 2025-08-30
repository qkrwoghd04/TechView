import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

export default function ProgressBar({ current, total, percentage }: ProgressBarProps) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className={styles.progressText}>
        {current} / {total}
      </div>
    </div>
  );
}
