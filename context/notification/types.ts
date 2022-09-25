import type { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

export interface NotificationState {
  isOpen: boolean,
  message: string,
  color?: string,
  autoHideDuration?: number;
}

export interface DispatchProps {
  message: string;
}

export type NotificationAction = { type: 'OPEN_NOTIFICATION' | 'CLOSE_NOTIFICATION'; payload?: DispatchProps };