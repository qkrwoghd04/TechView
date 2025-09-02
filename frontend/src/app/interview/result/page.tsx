'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { InterviewResponse } from '@/types/interview';

export default function ResultPage() {
  const [result, setResult] = useState<InterviewResponse | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('interviewResult');
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch (e) {
        console.error('결과 파싱 실패', e);
      }
    }
  }, []);

  if (!result) {
    return <div className={styles.container}>결과 데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>면접 결과</h1>
        <p className={styles.summary}>{result.summary}</p>

        <div className={styles.avgScoreContainer}>
          <div className={styles.avgScoreLabel}>평균 점수</div>
          <div className={styles.avgScoreValue}>{result.averageScore.toFixed(1)}</div>
        </div>

        <div className={styles.feedbackList}>
          {result.feedback.map((fb) => (
            <div key={fb.questionId} className={styles.feedbackCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.questionTitle}>문항 {fb.questionId}</h3>
                <div className={styles.totalScore}>{fb.totalScore.toFixed(1)}점</div>
              </div>
              <p className={styles.comment}>{fb.comment}</p>
              <div className={styles.scoreGrid}>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreLabel}>정확성</div>
                  <div className={styles.scoreValue}>{fb.scores.accuracy}</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreLabel}>깊이</div>
                  <div className={styles.scoreValue}>{fb.scores.depth}</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreLabel}>실무 연관성</div>
                  <div className={styles.scoreValue}>{fb.scores.relevance}</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreLabel}>명확성</div>
                  <div className={styles.scoreValue}>{fb.scores.clarity}</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreLabel}>창의성</div>
                  <div className={styles.scoreValue}>{fb.scores.creativity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
