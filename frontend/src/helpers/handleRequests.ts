import axios from 'axios';
import { getLogin } from './handleStorage';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (): void => {
  const { token } = getLogin() || {};
  if (token) {
    api.defaults.headers.common.Authorization = token;
  }
};

export const requestRegister = async (rota: string, body: unknown): Promise<unknown> => {
  const { data } = await api.post(rota, body);
  return data;
};

export const requestData = async (rota: string): Promise<unknown> => {
  const { data } = await api.get(rota);
  return data;
}

export default api;
