import type { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

export interface UserObject {
  name: string;
  email: string;
  image: string;
}

export interface AuthState {
  user: UserObject,
}

export type AuthAction = { type: 'SET_USER'; payload: UserObject };