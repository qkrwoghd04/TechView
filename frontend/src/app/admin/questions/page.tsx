import { getQuestions } from '@/lib/api/questions';
import QuestionList from './_components/QuestionList';

export default async function Page() {
  const questions = await getQuestions();

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>질문 목록</h2>
      <QuestionList questions={questions} />
    </div>
  );
}
