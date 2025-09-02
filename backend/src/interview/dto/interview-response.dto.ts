export class ScoreDto {
  accuracy: number;
  depth: number;
  relevance: number;
  clarity: number;
  creativity: number;
}

export class FeedbackDto {
  questionId: string;
  question: string;
  userAnswer: string;
  modelAnswer: string | null;
  scores: ScoreDto;
  totalScore: number;
  comment: string;
}

export class InterviewResultDto {
  feedback: FeedbackDto[];
  averageScore: number;
  summary: string;
}
