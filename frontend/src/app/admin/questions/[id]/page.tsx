import QuestionDetailClient from '../_components/QuestionDetailClient';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <QuestionDetailClient id={id} />;
}
