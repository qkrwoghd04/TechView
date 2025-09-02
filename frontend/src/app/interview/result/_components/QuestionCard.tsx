'use client';

import styles from './QuestionCard.module.css';
import type { InterviewResponse } from '@/types/interview';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';
import 'highlight.js/styles/atom-one-dark.css';
import { SectionBlock } from './SectionBlock';
import { FiUser, FiMessageSquare, FiClipboard } from 'react-icons/fi';

type FeedbackItem = InterviewResponse['feedback'][number];

type Props = { fb: FeedbackItem };

export default function QuestionCard({ fb }: Props) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{fb.question}</h3>
        <div className={styles.badge}>{fb.totalScore.toFixed(1)}점</div>
      </header>

      <div className={styles.body}>
        <SectionBlock title="사용자 답변" icon={<FiUser />} variant="user">
          <p className={styles.userAnswer}>{fb.userAnswer}</p>
        </SectionBlock>

        <SectionBlock title="코멘트" icon={<FiMessageSquare />} variant="comment">
          <p className={styles.comment}>{fb.comment}</p>
        </SectionBlock>

        <SectionBlock title="모범 답변" icon={<FiClipboard />} variant="model" isCollapsible>
          <div className={styles.modelAnswer}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{fb.modelAnswer ?? ''}</ReactMarkdown>
          </div>
        </SectionBlock>
      </div>
    </article>
  );
}
