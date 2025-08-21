import { getQuestions } from '@/lib/api/questions';

export default async function Page() {
  const questions = await getQuestions();

  return <div>{questions.length}</div>;
}
