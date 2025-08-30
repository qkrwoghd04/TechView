import styles from './LoadingState.module.css';

export default function LoadingState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
      <h3 className={styles.loadingTitle}>{title}</h3>
      <p className={styles.loadingDescription}>{description}</p>
    </div>
  );
}
