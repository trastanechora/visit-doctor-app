import Head from 'next/head'
import Button from '@mui/material/Button';
import { signIn } from "next-auth/react";

import styles from '../../styles/Home.module.css'

import type { NextPage } from 'next'

const LoginPage: NextPage = () => {
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
          Selamat datang di <a href="https://nextjs.org">Visit Doctor App</a>
        </h1>

        <p className={styles.description}>
          Mohon login dengan akun Google Anda yang sudah terdaftar melalui tombol berikut:
        </p>
        <Button variant="outlined" onClick={doLogin} sx={{ textTransform: 'none' }}>Masuk</Button>
      </main>
    </div>
  )
}

export default LoginPage
