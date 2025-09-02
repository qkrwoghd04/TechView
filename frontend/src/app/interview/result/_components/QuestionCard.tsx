'use client';

import { useMemo } from 'react';
import styles from './QuestionCard.module.css';
import { METRICS, SCORE_DOMAIN } from '../_constants/metrics';
import type { InterviewResponse } from '@/types/interview';
import { ScoreRadarChart } from './ScoreRadarChart';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type FeedbackItem = InterviewResponse['feedback'][number];

type Props = { fb: FeedbackItem };

export default function QuestionCard({ fb }: Props) {
  const data = useMemo(
    () => METRICS.map(({ key, label }) => ({ subject: label, value: fb.scores[key] })),
    [fb.scores],
  );

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.title}>{fb.question}</h3>
          <div className={styles.subtle}>총점</div>
        </div>
        <div className={styles.badge}>{fb.totalScore.toFixed(1)}점</div>
      </header>

      <div className={styles.body}>
        <div className={styles.box}>
          <h2>모범 답변</h2>
          <div className={styles.modelAnswer}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{fb.modelAnswer ?? ''}</ReactMarkdown>
          </div>
          <h2>코멘트</h2>
          <p className={styles.comment}>{fb.comment}</p>
        </div>

        <div className={styles.chartBox}>
          <ScoreRadarChart
            data={data}
            height={220}
            ariaLabel={`문항 ${fb.questionId} 레이더`}
            domain={SCORE_DOMAIN}
          />
        </div>
      </div>
    </article>
  );
}
