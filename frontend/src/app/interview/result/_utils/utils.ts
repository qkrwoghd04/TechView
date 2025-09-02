import type { InterviewResponse } from '@/types/interview';
import type { MetricKey, MetricMap } from '../_constants/metrics';

export const emptyMetrics = (): MetricMap => ({
  accuracy: 0,
  depth: 0,
  relevance: 0,
  clarity: 0,
  creativity: 0,
});

export function computeAvgByMetric(result: InterviewResponse | null): MetricMap | null {
  if (!result || !result.feedback?.length) return null;
  const sum = emptyMetrics();
  const n = result.feedback.length;

  for (const fb of result.feedback) {
    sum.accuracy += fb.scores.accuracy;
    sum.depth += fb.scores.depth;
    sum.relevance += fb.scores.relevance;
    sum.clarity += fb.scores.clarity;
    sum.creativity += fb.scores.creativity;
  }
  const avg: MetricMap = {
    accuracy: +(sum.accuracy / n).toFixed(1),
    depth: +(sum.depth / n).toFixed(1),
    relevance: +(sum.relevance / n).toFixed(1),
    clarity: +(sum.clarity / n).toFixed(1),
    creativity: +(sum.creativity / n).toFixed(1),
  };
  return avg;
}

export function toRadarData(
  labels: ReadonlyArray<{ key: MetricKey; label: string }>,
  values: MetricMap | null,
) {
  if (!values) return [];
  return labels.map(({ key, label }) => ({ subject: label, value: values[key] }));
}
