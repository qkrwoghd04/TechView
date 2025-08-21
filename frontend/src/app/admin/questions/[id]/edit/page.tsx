'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getQuestionById, updateQuestion } from '@/lib/api/questions';
import type { UpdateQuestionDto } from '@/types/questions';

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<UpdateQuestionDto>({
    category: '',
    question: '',
    answer: '',
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 초기 데이터 불러오기
  useEffect(() => {
    async function fetchData() {
      try {
        const q = await getQuestionById(id);
        setForm({
          category: q.category,
          question: q.question,
          answer: q.answer,
          tags: q.tags || [],
        });
      } catch (err) {
        setMessage('❌ 데이터를 불러오지 못했습니다.');
      } finally {
        setInitLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, tags: e.target.value.split(',').map((t) => t.trim()) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateQuestion(id, form);
      setMessage('✅ 문제가 성공적으로 수정되었습니다!');
      // 수정 완료 후 상세 페이지로 이동
      router.push(`/admin/questions/${id}`);
    } catch (err) {
      setMessage('❌ 수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (initLoading) {
    return <p style={{ padding: '2rem' }}>불러오는 중...</p>;
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>문제 수정</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        <label>
          카테고리
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          질문
          <textarea
            name="question"
            value={form.question}
            onChange={handleChange}
            required
            rows={3}
          />
        </label>

        <label>
          모범 답안
          <textarea name="answer" value={form.answer} onChange={handleChange} required rows={6} />
        </label>

        <label>
          태그 (쉼표 구분)
          <input type="text" name="tags" value={form.tags?.join(', ')} onChange={handleTags} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? '수정 중...' : '문제 수정'}
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
