import Head from 'next/head'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Typography, Box, Divider } from '@mui/material';

import styles from '../../styles/Medicine.module.css'

import type { NextPageWithCustomProps } from '../../types/custom'

const MedicineDetailPage: NextPageWithCustomProps = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})

  const router = useRouter()
  const { query: { id } } = router;

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`/api/medicine?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false)
          setDetail(data);
        })
    }
  }, [id]);

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Medicine Detail | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
          Detail Obat
        </Typography>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Nama Obat:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {detail.name}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Kode Obat:
          </Typography>
          <Typography sx={{ fontWeight: '500' }} variant="body1" gutterBottom>
            {detail.code}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Info Detail:
          </Typography>
          <Typography sx={{ fontWeight: '500' }} variant="body1" gutterBottom>
            {detail.info}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Harga:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.price}
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Stok:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.stock}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
      </main>
    </div>
  )
}

MedicineDetailPage.isRequireAuth = true;
export default MedicineDetailPage;
