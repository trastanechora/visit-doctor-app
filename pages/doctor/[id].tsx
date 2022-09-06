import { useEffect, useState } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Typography, Box, Divider } from '@mui/material';
import styles from '../../styles/Doctor.module.css'

const DoctorDetailPage: NextPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})

  const router = useRouter()
  const { query: { id } } = router;

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`/api/doctor?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.warn(data)
          setLoading(false)
          setDetail(data);
        })
    }
  }, [id]);

  if (isLoading) return <p>Loading...</p>

  console.warn('current site id', id);

  return (
    <div className={styles.container}>
      <Head>
        <title>Doctor Detail | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
          Detail Dokter
        </Typography>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Nama Dokter:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {detail.name}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Informasi:
          </Typography>
          <Typography sx={{ fontWeight: '500' }} variant="body1" gutterBottom>
            {detail.info}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Alamat:
          </Typography>
          <Typography sx={{ fontWeight: '500' }} variant="body1" gutterBottom>
            {detail.address}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              NIP:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.idNumber}
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Status:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.status}
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Buka Praktik Sejak:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.serviceStartDate}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nomor HP:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.phone}
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Alamat Surel:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.email}
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Tanggal Lahir:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.dateOfBirth}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
      </main>
    </div>
  )
}

export default DoctorDetailPage;
