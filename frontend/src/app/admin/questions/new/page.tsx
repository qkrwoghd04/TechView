'use client';

import { useState } from 'react';
import { createQuestion } from '@/lib/api/questions';
import type { CreateQuestionDto } from '@/types/questions';
import styles from './page.module.css';

export default function Page() {
  const [form, setForm] = useState<CreateQuestionDto>({
    category: '',
    question: '',
    answer: '',
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      await createQuestion(form);
      setMessage('✅ 문제가 성공적으로 등록되었습니다!');
      setForm({ category: '', question: '', answer: '', tags: [] });
    } catch (err) {
      setMessage('❌ 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>새로운 문제 생성</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          카테고리
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="예: FRONTEND / BACKEND"
            required
          />
        </label>

        <label>
          질문
          <textarea
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="질문 내용을 입력하세요"
            required
          />
        </label>

        <label>
          모범 답안
          <textarea
            name="answer"
            value={form.answer}
            onChange={handleChange}
            placeholder="모범 답안을 입력하세요"
            required
          />
        </label>

        <label>
          태그 (쉼표 구분)
          <input
            type="text"
            name="tags"
            onChange={handleTags}
            placeholder="예: react, javascript"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? '등록 중...' : '문제 등록'}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
