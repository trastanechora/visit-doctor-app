import { createContext, useContext, useReducer, Dispatch, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { reducer } from './reducer'
import { getCookie, deleteCookie } from 'cookies-next';

import type { Props, AuthState, AuthAction, UserObject } from './types'

const initialState: AuthState = {
  user: {
    id: '',
    name: '',
    email: '',
    image: '',
  },
};

const ContextState = createContext<AuthState | undefined>(undefined);
const ContextDispatch = createContext<Dispatch<AuthAction> | undefined>(undefined);

export const AuthProvider = (props: Props) => {
  const { children } = props;
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      deleteCookie('user_id')
      deleteCookie('name')
      deleteCookie('email')
      deleteCookie('image')
      router.push('/login');
    },
  })
  const loading = status === "loading"

  useEffect(() => {
    if (!loading && session) {
      const user: UserObject = {
        id: `${getCookie('user_id')}`,
        name: `${getCookie('name')}`,
        email: `${getCookie('email')}`,
        image: `${getCookie('image')}`,
      }
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, [loading, session])

  return (
    <ContextState.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </ContextState.Provider>
  )
};

export const useAuthState = (): AuthState => {
  const context = useContext(ContextState);

  if (context === undefined) {
    throw new Error('Please use useLocaleState() within LocaleContextProvider.');
  }

  return context;
};

export const useAuthDispatch = (): Dispatch<AuthAction> => {
  const context = useContext(ContextDispatch);

  if (context === undefined) {
    throw new Error('Please use useLocaleDispatch() within LocaleContextProvider.');
  }

  return context;
};

type FnUseContext = () => [AuthState, Dispatch<AuthAction>];
export const useAuthContext: FnUseContext = () => [useAuthState(), useAuthDispatch()];
