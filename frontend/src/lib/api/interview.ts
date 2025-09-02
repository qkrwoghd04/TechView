import api from './client';
import { SubmitInterviewRequest, InterviewResponse } from '@/types/interview';

export async function submitInterview(data: SubmitInterviewRequest): Promise<InterviewResponse> {
  console.log(data);
  const res = await api.post<InterviewResponse>('/interview/submit', data);
  console.log(res.data);
  return res.data;
}
