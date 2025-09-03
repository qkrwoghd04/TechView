import api from './client';
import { CreateQuestionDto, UpdateQuestionDto } from '@/types/questions';

// 전체 문제 가져오기
export async function getQuestions(
  page: number = 1,
  limit: number = 10,
  q?: string,
  category?: string,
) {
  const res = await api.get('/questions', {
    params: { page, limit, q, category },
  });
  return res.data;
}

// 특정 문제 가져오기
export async function getQuestionById(id: string) {
  const res = await api.get(`/questions/${id}`);
  return res.data;
}

// 랜덤 N개 문제 가져오기
export async function getRandomQuestions(count: number, category: string) {
  const res = await api.get(`/questions/random/${count}`, {
    params: { category },
  });
  return res.data;
}

// 문제 생성
export async function createQuestion(data: CreateQuestionDto) {
  const res = await api.post('/questions', data);
  return res.data;
}

// 문제 수정
export async function updateQuestion(id: string, data: UpdateQuestionDto) {
  const res = await api.patch(`/questions/${id}`, data);
  return res.data;
}

// 문제 삭제
export async function deleteQuestion(id: string) {
  const res = await api.delete(`/questions/${id}`);
  return res.data;
}
