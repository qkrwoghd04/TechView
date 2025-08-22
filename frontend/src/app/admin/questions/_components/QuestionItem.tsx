import { Question } from '@/types/questions';
import styles from './QuestionItem.module.css';
import Link from 'next/link';

type Props = {
  question: Question;
};

export default function QuestionItem({ question }: Props) {
  return (
    <Link href={`/admin/questions/${question.id}`} className={styles.item}>
      <div className={styles.card}>
        <h3 className={styles.question}>{question.question}</h3>
        <p className={styles.answer}>{question.answer}</p>

        <div className={styles.meta}>
          <span className={styles.category}>{question.category}</span>
          <span className={styles.date}>{new Date(question.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
