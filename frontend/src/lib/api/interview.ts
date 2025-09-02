import api from './client';
import { SubmitInterviewRequest, InterviewResponse } from '@/types/interview';

export async function submitInterview(data: SubmitInterviewRequest): Promise<InterviewResponse> {
  const res = await api.post('/interview/submit', data);
  return res.data;
}
