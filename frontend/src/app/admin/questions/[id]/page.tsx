import QuestionDetailClient from '../_components/QuestionDetailClient';

export default function Page({ params }: { params: { id: string } }) {
  return <QuestionDetailClient id={params.id} />;
}
