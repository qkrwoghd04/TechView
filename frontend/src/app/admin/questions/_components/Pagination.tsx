'use client';

import styles from './Pagination.module.css';

type Props = {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ total, page, limit, onPageChange }: Props) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  // Show max 5 pages at a time with smart pagination
  const getPageNumbers = () => {
    const maxVisible = 5;
    const start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    const adjustedStart = Math.max(1, end - maxVisible + 1);

    return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.prevNext} ${page === 1 ? styles.disabled : ''}`}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        이전
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button className={styles.button} onClick={() => onPageChange(1)}>
            1
          </button>
          {pageNumbers[0] > 2 && <span className={styles.ellipsis}>...</span>}
        </>
      )}

      {pageNumbers.map((p) => (
        <button
          key={p}
          className={`${styles.button} ${page === p ? styles.active : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className={styles.ellipsis}>...</span>
          )}
          <button className={styles.button} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        className={`${styles.button} ${styles.prevNext} ${
          page === totalPages ? styles.disabled : ''
        }`}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        다음
      </button>
    </div>
  );
}
