import Header from './_components/Header';
import Hero from './_components/Hero';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Hero />
      </main>
    </div>
  );
}
