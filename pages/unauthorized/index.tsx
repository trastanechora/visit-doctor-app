import Head from 'next/head'
import Button from '@mui/material/Button';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

import styles from '../../styles/Home.module.css'

import type { NextPage } from 'next'

const UnauthorizedPage: NextPage = () => {
  const router = useRouter()

  const backToLogin = () => {
    router.push('/login')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Visit Doctor App | Unauthorized</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sorry your account is not authorized to access <a href="https://nextjs.org">Visit Doctor App</a>
        </h1>

        <p className={styles.description}>
          Please contact admin to allow your account access
        </p>
        <Button variant="outlined" onClick={backToLogin}>Try again with other account</Button>
      </main>
    </div>
  )
}

export default UnauthorizedPage
