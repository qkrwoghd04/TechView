'use client';

import { useEffect, useState } from 'react';
import type { InterviewResponse } from '@/types/interview';

export function useInterviewResult() {
  const [result, setResult] = useState<InterviewResponse | null>(null);

  useEffect(() => {
    try {
      const stored =
        typeof window !== 'undefined' ? window.sessionStorage.getItem('interviewResult') : null;
      if (stored) setResult(JSON.parse(stored));
    } catch (e) {
      console.error('결과 파싱 실패', e);
    }
  }, []);

  return result;
}
