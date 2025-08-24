import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jaehong.link',
  withCredentials: true,
});

export default api;
