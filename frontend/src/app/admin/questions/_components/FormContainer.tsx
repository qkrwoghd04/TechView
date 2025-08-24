import { ReactNode } from 'react';
import styles from './FormContainer.module.css';

type Props = {
  title: string;
  subtitle: string;
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
};

export default function FormContainer({
  title,
  subtitle,
  loading = false,
  loadingText = '불러오는 중...',
  children,
}: Props) {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            {loadingText}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

