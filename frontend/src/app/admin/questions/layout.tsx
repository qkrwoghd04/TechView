import type { ReactNode } from 'react';
import styles from './layout.module.css';

export default function QuestionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Admin - Questions</h2>
        <ul>
          <li>
            <a href="/admin/questions">목록</a>
          </li>
          <li>
            <a href="/admin/questions/new">새 질문 등록</a>
          </li>
        </ul>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
