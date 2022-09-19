import Head from 'next/head'
import Button from '@mui/material/Button';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

import styles from '../../styles/Home.module.css'

import type { NextPage } from 'next'

const LoginPage: NextPage = () => {
  const router = useRouter()

  const doLogin = () => {
    signIn('google', { callbackUrl: '/doctor' })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Visit Doctor App | Login</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Visit Doctor App</a>
        </h1>

        <p className={styles.description}>
          Please do sign in from this button below:
        </p>
        <Button variant="outlined" onClick={doLogin}>Sign In</Button>
      </main>
    </div>
  )
}

export default LoginPage
