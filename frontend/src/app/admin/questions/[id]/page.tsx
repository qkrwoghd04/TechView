import { getQuestionById } from '@/lib/api/questions';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const question = await getQuestionById(params.id);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
        {question.question}
      </h1>
      <p style={{ color: '#555', marginBottom: '0.5rem' }}>카테고리: {question.category}</p>
      <p style={{ color: '#777', marginBottom: '1rem' }}>
        작성일: {new Date(question.createdAt).toLocaleDateString()}
      </p>

      <h2 style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '0.5rem' }}>모범 답안</h2>
      <p style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem' }}>
        {question.answer}
      </p>

      {question.tags?.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>태그</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {question.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: '#e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
