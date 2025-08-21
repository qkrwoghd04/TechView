export interface CreateQuestionDto {
  category: string;
  question: string;
  modelAnswer: string;
  tags?: string[];
}

export interface UpdateQuestionDto {
  category?: string;
  question?: string;
  modelAnswer?: string;
  tags?: string[];
}
