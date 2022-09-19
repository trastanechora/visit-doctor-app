import { AuthState, AuthAction } from './types'

export const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: { ...action.payload }
      };
    }

    default:
      return { ...state };
  }
};