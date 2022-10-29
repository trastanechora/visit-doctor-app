import Head from 'next/head'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Typography, Box, Divider, Button, Container } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import styles from '@/styles/Visit.module.css'

import type { NextPageWithCustomProps } from '@/types/custom'

import { formatDate, formatTextVisitStatus, formatAge } from '@/utils/formatter';
import { translateGender } from '@/utils/translator';
import { statusMapper } from '@/utils/mapper';

const VisitDetailPage: NextPageWithCustomProps = () => {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})

  const { query: { id } } = router;

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`/api/visit?id=${id}`)
        .then((res) => res.json())
        .then((responseObject) => {
          setDetail(responseObject.data);
          setLoading(false)
        })
    }
  }, [id]);

  const redirectToPatient = () => {
    router.push(`/patient/${detail.patient?.id}`)
  }

  const redirectToDoctor = () => {
    router.push(`/doctor/${detail.doctor?.id}`)
  }

  const handleClickExamine = () => {
    router.push(`/visit/${id}/examine`)
  }

  if (isLoading) return <p>Loading...</p>

  if (!isLoading && !detail) return <p>Rekam medis tidak dapat ditemukan</p>

  const statusMapped = statusMapper(detail.status);

  return (
    <div className={styles.container}>
      <Head>
        <title>Visit Detail | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button variant="outlined" onClick={() => router.back()} startIcon={<ChevronLeftIcon />} sx={{ marginRight: 3, textTransform: 'none' }}>Kembali</Button>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Detail Rekam Medis
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Status:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ marginTop: 2 }}>
              {formatTextVisitStatus(detail.status)}
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Tanggal Periksa:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ marginTop: 2 }}>
              {formatDate(detail.visit_date)}
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nama Dokter Pemeriksa:
            </Typography>
            <Button variant="text" color="inherit" onClick={redirectToDoctor} sx={{ textTransform: 'none' }}>
              {detail.doctor?.name}
            </Button>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '100%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nama Pasien:
            </Typography>
            <Button variant="text" color="inherit" onClick={redirectToPatient} sx={{ textTransform: 'none' }}>
              <Typography sx={{ paddingBottom: 0 }} variant="h5" display="block" color="primary" gutterBottom>
                {detail.patient?.name}
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '100%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nomor Rekam Medis Pasien:
            </Typography>
            <Typography variant="h5" gutterBottom color="primary">
              {detail.patient?.record_number}
            </Typography>
          </Box>
        </Box>

        {statusMapped.includes('schedule') ? <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1, flexWrap: 'wrap' }}>
          <Box sx={{ width: '30%', paddingRight: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Usia
            </Typography>
            <Typography variant="body2" gutterBottom>
              {formatAge(detail.patient?.date_of_birth)}
            </Typography>
          </Box>
          <Box sx={{ width: '30%', paddingLeft: 1, paddingRight: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Jenis Kelamin
            </Typography>
            <Typography variant="body2" gutterBottom>
              {translateGender(detail.patient?.gender)}
            </Typography>
          </Box>
          <Box sx={{ width: '40%', paddingRight: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Golongan Darah
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.patient?.blood_type}
            </Typography>
          </Box>
          <Box sx={{ width: '30%', paddingRight: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nomor HP
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.patient?.phone}
            </Typography>
          </Box>
          <Box sx={{ width: '30%', paddingLeft: 1, paddingRight: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Asuransi
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.patient?.insurance}
            </Typography>
          </Box>
          <Box sx={{ width: '40%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Alamat
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.patient?.address}
            </Typography>
          </Box>
        </Container> : null}
        <Divider sx={{ marginBottom: 3 }} />
      </Container>

      {/* {statusMapped.includes('schedule') ? <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Keluhan:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.symptoms}
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Diagnosa:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {getDiagnosis(detail.diagnosis)}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Jenis Kelamin:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.patient?.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Umur:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {calculateAge(detail.patient?.date_of_birth)} Tahun
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Obat:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.medicine_ids}
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Harga Obat:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.medicine_subtotal}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nomor HP:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.patient?.phone}
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nama HP Penjamin:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.patient?.guarantorPhone}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Alamat:
          </Typography>
          <Typography sx={{ fontWeight: '500' }} variant="body1" gutterBottom>
            {detail.patient?.address}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
      </Container> : null} */}

      {statusMapped.includes('examine') ? <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          Examining Info
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
      </Container> : null}

      {statusMapped.includes('recipe') ? <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          Recipe Info
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
      </Container> : null}

      {statusMapped.includes('payment') ? <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          Payment Info
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
      </Container> : null}

      {statusMapped.includes('done') ? <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          Done Info
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
      </Container> : null}

      <Container maxWidth={false} disableGutters sx={{ width: '100%', marginBottom: 4 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignSelf: 'center' }}>
          {detail.status === 'schedule' ? <Button variant="contained" onClick={handleClickExamine} disabled={isLoading} sx={{ textTransform: 'none' }}>Periksa</Button> : null}
          {detail.status === 'examine' ? <Button variant="contained" onClick={handleClickExamine} disabled={isLoading} sx={{ textTransform: 'none' }}>Beri Resep Obat</Button> : null}
          {detail.status === 'recipe' ? <Button variant="contained" onClick={handleClickExamine} disabled={isLoading} sx={{ textTransform: 'none' }}>Selesaikan Pembayaran</Button> : null}
          {detail.status === 'payment' ? <Button variant="contained" onClick={handleClickExamine} disabled={isLoading} sx={{ textTransform: 'none' }}>Selesaikan Rekam Medis</Button> : null}
        </Box>
      </Container>
    </div>
  )
}

VisitDetailPage.isRequireAuth = true;
export default VisitDetailPage;
