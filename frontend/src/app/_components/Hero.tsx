import styles from '../page.module.css';
import { HeroButton } from '@/components/Button';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        전문적인 기술 면접을
        <br />
        지금 바로 시작하세요
      </h1>

      <p className={styles.subtitle}>
        AI가 엄선한 실무 중심의 기술 질문으로 여러분의 역량을 평가하고
        <br />
        개발자로서의 성장을 지원합니다
      </p>

      <div className={styles.buttons}>
        <HeroButton href="/interview?category=FRONTEND" label="Frontend 면접" />

        <HeroButton href="/interview?category=BACKEND" label="Backend 면접" />
      </div>
    </section>
  );
}
