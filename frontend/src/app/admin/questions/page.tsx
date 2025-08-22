import { getQuestions } from '@/lib/api/questions';
import QuestionList from './_components/QuestionList';
import SearchBar from './_components/SearchBar';

export default async function Page() {
  // const { data, total, page, pageSize } = await getQuestions(1, 10);

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>질문 목록</h2>
      <SearchBar />
      {/* <QuestionList questions={data} /> */}
    </div>
  );
}
