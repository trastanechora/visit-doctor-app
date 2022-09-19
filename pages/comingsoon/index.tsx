import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import styles from '../../styles/Home.module.css'

const ComingSoonPage: NextPage = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Coming Soon | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fitur ini akan segera hadir di <br /><a href="">Visit Doctor App</a>
        </h1>

        <p className={styles.description}>
          Untuk saat ini kami sedang menyiapkan layanan terbaik untuk Anda
        </p>

        <Box sx={{ display: 'flex' }}>
          <Button variant="outlined" onClick={() => router.back()} sx={{ textTransform: 'none' }}>Kembali</Button>
        </Box>
      </main>

      <footer className={styles.footer}>
        Made with Love by
        <a
          href="https://www.linkedin.com/in/trastanechora/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mae
        </a>
      </footer>
    </div>
  )
}

export default ComingSoonPage
