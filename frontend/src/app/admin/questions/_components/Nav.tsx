// Nav.tsx (Client Component)
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../layout.module.css';

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin/questions') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navItem}>
        <Link
          href="/admin/questions"
          className={`${styles.navLink} ${isActive('/admin/questions') ? styles.active : ''}`}
        >
          질문 목록
        </Link>
      </div>
      <div className={styles.navItem}>
        <Link
          href="/admin/questions/new"
          className={`${styles.navLink} ${isActive('/admin/questions/new') ? styles.active : ''}`}
        >
          새 질문 등록
        </Link>
      </div>
    </nav>
  );
}
