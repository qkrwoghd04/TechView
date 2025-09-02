'use client';

import layout from './page.module.css';
import SummaryCard from './_components/SummaryCard';
import RadarPanel from './_components/RadarPanel';
import QuestionCard from './_components/QuestionCard';
import EmptyState from '@/components/EmptyState';

import { useEffect, useState } from 'react';
import type { InterviewResponse } from '@/types/interview';
import { METRICS } from './_constants/metrics';
import { computeAvgByMetric, toRadarData } from './_utils/utils';

export default function ResultPage() {
  const [result, setResult] = useState<InterviewResponse | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('interviewResult');
      if (raw) setResult(JSON.parse(raw));
    } catch (e) {
      console.error('결과 파싱 실패', e);
    }
  }, []);

  const avgByMetric = computeAvgByMetric(result);

  const overallRadar = avgByMetric
    ? {
        radar: toRadarData(METRICS, avgByMetric),
        meters: avgByMetric,
      }
    : { radar: [], meters: null };

  if (!result)
    return (
      <EmptyState
        title="결과 데이터를 불러올 수 없습니다."
        description="면접 결과 데이터를 불러올 수 없습니다."
      />
    );

  return (
    <div className={layout.page}>
      <div className={layout.reportWrapper}>
        <header className={layout.header}>
          <div className={layout.headerInner}>
            <div>
              <h1 className={layout.title}>면접 결과 보고서</h1>
              <div className={layout.subtle}>AI가 분석한 심층 리포트입니다.</div>
            </div>
          </div>
        </header>

        <main className={layout.container}>
          <section className={layout.overview}>
            <SummaryCard
              averageScore={+result.averageScore}
              summary={result.summary}
              count={result.feedback.length}
            />
            <RadarPanel
              title="역량별 점수 분석"
              radarData={overallRadar.radar}
              meters={overallRadar.meters}
            />
          </section>

          <section className={layout.listSection}>
            <h2 className={layout.listHeader}>개별 문항 상세 분석</h2>
            {result.feedback.map((fb) => (
              <QuestionCard key={fb.questionId} fb={fb} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
