import QuestionsBrowser from './_components/QuestionsBrowser';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <QuestionsBrowser />
    </div>
  );
}
