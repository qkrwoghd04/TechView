'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api/admin';

export default function Page() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = await adminLogin(password);
      localStorage.setItem('admin_token', data.access_token); // JWT 저장
      router.push('/admin/questions');
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1>관리자 로그인</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="관리자 비밀번호"
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
