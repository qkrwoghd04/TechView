import api from './client';

export async function adminLogin(password: string) {
  const res = await api.post('/admin/login', { password });
  console.log(res.data);
  return res.data;
}
