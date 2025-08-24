import Link from 'next/link';
import { getQuestionById } from '@/lib/api/questions';
import styles from './page.module.css';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const question = await getQuestionById(id);

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>{question.question}</h1>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <svg
                    className={styles.metaIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span className={styles.category}>{question.category}</span>
                </div>
                <div className={styles.metaItem}>
                  <svg
                    className={styles.metaIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                    />
                  </svg>
                  {new Date(question.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/admin/questions" className={styles.backButton}>
                <svg
                  className={styles.backIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                목록
              </Link>

              <Link href={`/admin/questions/${id}/edit`} className={styles.editButton}>
                <svg
                  className={styles.editIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                수정
              </Link>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <svg
                  className={styles.sectionIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                모범 답안
              </h2>
              <div className={styles.answerContent}>{question.answer}</div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <svg
                  className={styles.sectionIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                태그
              </h3>
              {question.tags?.length > 0 ? (
                <div className={styles.tags}>
                  {question.tags.map((tag: string) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyTags}>태그가 없습니다</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.errorContainer}>
            <svg className={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h2 className={styles.errorTitle}>질문을 찾을 수 없습니다</h2>
            <p className={styles.errorMessage}>요청한 질문이 존재하지 않거나 삭제되었습니다.</p>
            <Link
              href="/admin/questions"
              className={styles.backButton}
              style={{ marginTop: '20px' }}
            >
              <svg
                className={styles.backIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
