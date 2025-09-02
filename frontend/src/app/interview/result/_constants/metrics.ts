export type MetricKey = 'accuracy' | 'depth' | 'relevance' | 'clarity' | 'creativity';

export const METRICS = [
  { key: 'accuracy', label: '정확성' },
  { key: 'depth', label: '깊이' },
  { key: 'relevance', label: '실무 연관성' },
  { key: 'clarity', label: '명확성' },
  { key: 'creativity', label: '창의성' },
] as const satisfies ReadonlyArray<{ key: MetricKey; label: string }>;

export const SCORE_DOMAIN: readonly [number, number] = [0, 20];

export type MetricMap = Record<MetricKey, number>;
