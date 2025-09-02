'use client';

import styles from './OverlayLoading.module.css';

type OverlayLoadingProps = {
  show: boolean;
  message?: string;
};

export default function OverlayLoading({ show, message }: OverlayLoadingProps) {
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <div className={styles.spinner} />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
