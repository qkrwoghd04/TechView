import styles from '../page.module.css';

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function FeatureCard({ title, description, icon }: Props) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          {icon}
        </svg>
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}
