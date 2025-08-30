import styles from '../page.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Image src="/logo.png" alt="TechView" width={50} height={50} />
        <h1 className={styles.logoText}>TECHVIEW</h1>
      </div>
    </header>
  );
}
