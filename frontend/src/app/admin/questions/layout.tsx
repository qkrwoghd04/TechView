import type { ReactNode } from 'react';
import styles from './layout.module.css';
import Nav from './_components/Nav';

export default function QuestionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1 className={styles.logoText}>TechView 관리자</h1>
          </div>
          <Nav />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
