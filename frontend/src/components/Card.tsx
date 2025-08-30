import styles from './Card.module.css';

interface CardProps {
  questionNumber: number;
  question: string;
  answer: string;
  onAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export default function Card({
  questionNumber,
  question,
  answer,
  onAnswerChange,
  placeholder = '구체적이고 실무 경험을 바탕으로 답변해 주세요...',
}: CardProps) {
  return (
    <div className={styles.questionCard}>
      <div className={styles.questionNumber}>Question {questionNumber}</div>
      <h2 className={styles.question}>{question}</h2>

      <div className={styles.answerSection}>
        <label className={styles.answerLabel}>답변 작성</label>
        <textarea
          value={answer}
          onChange={onAnswerChange}
          placeholder={placeholder}
          className={styles.textarea}
        />
      </div>
    </div>
  );
}
