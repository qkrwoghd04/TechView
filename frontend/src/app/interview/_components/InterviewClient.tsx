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
import { submitInterview } from '@/lib/api/interview';
import { useRouter } from 'next/navigation';
import OverlayLoading from '@/components/OverlayLoading';

export default function InterviewClient({ category }: { category?: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

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
    return <OverlayLoading show={loading} message="면접 질문을 준비하고 있습니다..." />;
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

  const handleSubmit = async () => {
    if (!answers[currentIndex].trim()) return;
    setSubmitting(true);

    try {
      const payload = {
        category: (category || 'FRONTEND') as 'FRONTEND' | 'BACKEND',
        answers: questions.map((q, i) => ({
          questionId: q.id,
          question: q.question,
          answer: answers[i],
        })),
      };

      const result = await submitInterview(payload);

      // ✅ 결과를 sessionStorage에 저장
      sessionStorage.setItem('interviewResult', JSON.stringify(result));

      // 오버레이를 유지한 채로 페이지 이동
      router.push('/interview/result');
    } catch (e) {
      alert('제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error(e);
      setSubmitting(false); // 에러 시에만 오버레이 제거
    }
    // 성공 시에는 setSubmitting(false)를 호출하지 않아 오버레이가 유지됨
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
      <OverlayLoading show={submitting} message="지원자의 답변을 면밀히 분석하고 있습니다..." />
    </div>
  );
}
