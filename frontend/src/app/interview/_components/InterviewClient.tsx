'use client';

import { useEffect, useState } from 'react';
import { getRandomQuestions } from '@/lib/api/questions';
import styles from './InterviewClient.module.css';
import { Question } from '@/types/questions';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import ProgressBar from './ProgressBar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { MdNavigateNext } from 'react-icons/md';

export default function InterviewClient({ category }: { category?: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getRandomQuestions(5);
        setQuestions(data);
        setAnswers(Array(data.length).fill(''));
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <LoadingState title="면접 질문을 준비하고 있습니다..." description="잠시만 기다려 주세요" />
    );
  }

  if (!questions.length) {
    return (
      <EmptyState title="질문을 불러올 수 없습니다" description="잠시 후 다시 시도해 주세요" />
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSubmit = () => {
    console.log('제출 완료:', { category, questions, answers });
    alert('면접이 완료되었습니다! 결과를 검토하여 피드백을 제공해드리겠습니다.');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.interviewHeader}>
          <h1 className={styles.title}>{category} 기술 면접</h1>
          <p className={styles.subtitle}>차분히 생각하고 자세한 답변을 작성해 주세요</p>
        </div>

        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          percentage={progressPercentage}
        />

        <Card
          questionNumber={currentIndex + 1}
          question={currentQuestion.question}
          answer={answers[currentIndex]}
          onAnswerChange={handleChange}
        />

        <div className={styles.actions}>
          {!isLast && (
            <Button
              onClick={handleNext}
              disabled={!answers[currentIndex].trim()}
              variant="primary"
              icon={<MdNavigateNext size={20} />}
            >
              다음 질문
            </Button>
          )}
          {isLast && (
            <Button
              onClick={handleSubmit}
              disabled={!answers[currentIndex].trim()}
              variant="success"
            >
              면접 완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
