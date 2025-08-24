'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getQuestionById } from '@/lib/api/questions';
import styles from './QuestionDetailClient.module.css';

export default function QuestionDetailClient({ id }: { id: string }) {
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getQuestionById(id)
      .then(setQuestion)
      .catch(() => setError('질문을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className={styles.container}>로딩 중...</div>;
  }

  if (error || !question) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.errorContainer}>
            <svg className={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h2 className={styles.errorTitle}>질문을 찾을 수 없습니다</h2>
            <p className={styles.errorMessage}>요청한 질문이 존재하지 않거나 삭제되었습니다.</p>
            <Link
              href="/admin/questions"
              className={styles.backButton}
              style={{ marginTop: '20px' }}
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>{question.question}</h1>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.category}>{question.category}</span>
              </div>
              <div className={styles.metaItem}>
                {new Date(question.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/admin/questions" className={styles.backButton}>
              목록
            </Link>
            <Link href={`/admin/questions/${id}/edit`} className={styles.editButton}>
              수정
            </Link>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>모범 답안</h2>
            <div className={styles.answerContent}>{question.answer}</div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>태그</h3>
            {question.tags?.length > 0 ? (
              <div className={styles.tags}>
                {question.tags.map((tag: string) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div className={styles.emptyTags}>태그가 없습니다</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
