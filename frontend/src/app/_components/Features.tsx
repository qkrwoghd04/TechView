import styles from '../page.module.css';
import FeatureCard from './FeatureCard';

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresContent}>
        <h2 className={styles.featuresTitle}>왜 TechView를 선택해야 할까요?</h2>
        <p className={styles.featuresSubtitle}>
          실무진이 검증한 질문과 AI 기반 평가 시스템으로 정확한 실력 진단을 받아보세요
        </p>

        <div className={styles.featuresGrid}>
          <FeatureCard
            title="실무 중심 질문"
            description="현업 개발자들이 직접 검증한 실무 중심의 기술 질문으로 실제 업무 역량을 평가합니다"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            }
          />
          <FeatureCard
            title="즉시 시작"
            description="복잡한 설정 없이 원하는 분야를 선택하면 바로 면접을 시작할 수 있습니다"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            }
          />
          <FeatureCard
            title="정확한 평가"
            description="AI 기반 분석 시스템으로 답변을 객관적으로 평가하고 개선점을 제시합니다"
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
