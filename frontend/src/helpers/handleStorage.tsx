type UserToken = {
  username: string;
  token: string;
}

export const saveLogin = (data: UserToken): void => {
  localStorage.setItem('userNG', JSON.stringify(data));
}

export const getLogin = (): UserToken | null => {
  return JSON.parse(localStorage.getItem('userNG') || 'null');
}

export const removeLogin = (): void => {
  localStorage.removeItem('userNG');
}
