import Link from 'next/link';
import styles from './FormButtons.module.css';

type Props = {
  submitText: string;
  submitLoadingText: string;
  cancelHref: string;
  cancelText?: string;
  loading: boolean;
  variant?: 'primary' | 'success';
};

export default function FormButtons({
  submitText,
  submitLoadingText,
  cancelHref,
  cancelText = '취소',
  loading,
  variant = 'primary',
}: Props) {
  return (
    <div className={styles.container}>
      <Link href={cancelHref} className={styles.cancelButton}>
        {cancelText}
      </Link>
      <button
        type="submit"
        disabled={loading}
        className={`${styles.submitButton} ${styles[variant]}`}
      >
        {loading ? submitLoadingText : submitText}
      </button>
    </div>
  );
}

