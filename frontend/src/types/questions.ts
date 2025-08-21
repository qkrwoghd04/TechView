export interface CreateQuestionDto {
  category: string;
  question: string;
  answer: string;
  tags?: string[];
}

export interface UpdateQuestionDto {
  category?: string;
  question?: string;
  answer?: string;
  tags?: string[];
}

export type Question = {
  id: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
};
