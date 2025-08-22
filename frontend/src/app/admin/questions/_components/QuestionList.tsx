import { Question } from '@/types/questions';
import QuestionItem from './QuestionItem';
import styles from './QuestionList.module.css';
import EmptyState from '@/components/EmptyState';

export default function QuestionList({ questions }: { questions: Question[] }) {
  if (!questions.length)
    return <EmptyState title="등록된 질문이 없습니다" description="새로운 질문을 추가해 보세요." />;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {questions.map((q) => (
          <QuestionItem key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
}
