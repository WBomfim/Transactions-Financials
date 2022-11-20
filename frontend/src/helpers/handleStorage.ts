export type UserToken = {
  username: string;
  account: string;
  token: string;
}

export const saveLogin = (data: UserToken): void => {
  localStorage.setItem('userNG', JSON.stringify(data));
}

export const getLogin = (): UserToken | null => {
  return JSON.parse(localStorage.getItem('userNG') || '{}');
}

export const removeLogin = (): void => {
  localStorage.removeItem('userNG');
}
