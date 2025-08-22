import styles from './EmptyState.module.css';

export default function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.empty}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
