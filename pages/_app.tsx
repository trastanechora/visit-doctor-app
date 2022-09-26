import { SessionProvider } from "next-auth/react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Layout from '../components/layout'
import { AuthProvider } from '../context/auth'
import { NotificationProvider } from '../context/notification'
import 'dayjs/locale/id';

import type { NextPageWithCustomProps } from '../types/custom'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

type AppPropsWithCustomProps = AppProps & {
  Component: NextPageWithCustomProps
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithCustomProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
      <SessionProvider session={session} refetchInterval={30 * 60} refetchOnWindowFocus={false}>
        <NotificationProvider>
          {Component.isRequireAuth ? (
            <AuthProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </NotificationProvider>
      </SessionProvider>
    </LocalizationProvider>
  )
}

export default MyApp
