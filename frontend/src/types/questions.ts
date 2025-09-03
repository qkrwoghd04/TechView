export interface CreateQuestionDto {
  category: Category;
  question: string;
  answer: string;
  tags?: string[];
}

export interface UpdateQuestionDto {
  category?: Category;
  question?: string;
  answer?: string;
  tags?: string[];
}

export type Question = {
  id: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  question: string;
  answer: string;
  tags: string[];
};

export enum Category {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
}
