import { Question } from '@/types/questions';
import QuestionItem from './QuestionItem';
import styles from './QuestionList.module.css';

export default function QuestionList({ questions }: { questions: Question[] }) {
  if (!questions.length) {
    return <p className={styles.empty}>등록된 질문이 없습니다.</p>;
  }

  return (
    <div className={styles.list}>
      {questions.map((q) => (
        <QuestionItem key={q.id} question={q} />
      ))}
    </div>
  );
}
