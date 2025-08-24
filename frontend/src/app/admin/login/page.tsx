'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api/admin';
import FormContainer from '../questions/_components/FormContainer';
import FormField from '../questions/_components/FormField';
import FormMessage from '../questions/_components/FormMessage';
import styles from './page.module.css';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await adminLogin(password);
      setMessage('로그인 성공! 관리 페이지로 이동합니다.');
      setMessageType('success');
      setTimeout(() => router.push('/admin/questions'), 1500);
    } catch (err: any) {
      console.error(err);
      setMessage('비밀번호가 올바르지 않습니다.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormContainer title="관리자 로그인" subtitle="관리자 전용 페이지에 접근하기 위해 로그인하세요">
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField
          type="input"
          name="password"
          label="관리자 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      {message && <FormMessage type={messageType} message={message} />}
    </FormContainer>
  );
}
