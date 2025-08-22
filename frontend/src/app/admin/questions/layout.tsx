import type { ReactNode } from 'react';
import styles from './layout.module.css';
import Link from 'next/link';

export default function QuestionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1>관리자 대시보드</h1>
        <ul>
          <li>
            <Link href="/admin/questions">목록</Link>
          </li>
          <li>
            <Link href="/admin/questions/new">새 질문 등록</Link>
          </li>
        </ul>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
