import api from './client';

export async function adminLogin(password: string) {
  const res = await fetch(`${api.defaults.baseURL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
    credentials: 'include',
  });

  console.log(res);

  if (!res.ok) {
    throw new Error('로그인 실패');
  }

  return res.json();
}
