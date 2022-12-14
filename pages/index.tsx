import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Selamat datang di <br /><a href="">Visit Doctor App</a>
        </h1>

        <p className={styles.description}>
          Aplikasi manajemen arsip untuk dokter
        </p>

        <Box sx={{ display: 'flex' }}>
          <Button variant="outlined" onClick={() => router.push('/comingsoon')} sx={{ textTransform: 'none', marginRight: 1 }}>Saya Pasien</Button>
          <Button variant="outlined" onClick={() => router.push('/login')} sx={{ textTransform: 'none', marginLeft: 1 }}>Saya Dokter</Button>
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

export default Home
