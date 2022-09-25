import { SessionProvider } from "next-auth/react"
import Layout from '../components/layout'
import { AuthProvider } from '../context/auth'
import { NotificationProvider } from '../context/notification'

import type { NextPageWithCustomProps } from '../types/custom'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

type AppPropsWithCustomProps = AppProps & {
  Component: NextPageWithCustomProps
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithCustomProps) {
  return (
    <SessionProvider session={session} refetchInterval={30 * 60} refetchOnWindowFocus={false}>
      {Component.isRequireAuth ? (
        <AuthProvider>
          <Layout>
            <NotificationProvider>
              <Component {...pageProps} />
            </NotificationProvider>
          </Layout>
        </AuthProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default MyApp
