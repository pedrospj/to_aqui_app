export const SET_USER = 'user/SET_USER';
export const CLEAR_USER = 'user/CLEAR_USER';

export interface UserState {
  name: string;
  email: string;
  uid: string;
  refreshToken: string;
}
