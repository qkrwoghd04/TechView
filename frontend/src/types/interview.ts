export type SubmitAnswer = {
  questionId: string;
  question: string;
  answer: string;
};

export type SubmitInterviewRequest = {
  category: 'FRONTEND' | 'BACKEND';
  answers: SubmitAnswer[];
};

export type ScoreBreakdown = {
  accuracy: number;
  depth: number;
  relevance: number;
  clarity: number;
  creativity: number;
};

export type Feedback = {
  questionId: string;
  scores: ScoreBreakdown;
  totalScore: number;
  comment: string;
};

export type InterviewResponse = {
  feedback: Feedback[];
  averageScore: number;
  summary: string;
};
