import Head from 'next/head'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Typography, Box, Divider, Button, Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import styles from '@/styles/Visit.module.css'

import type { NextPageWithCustomProps } from '@/types/custom'

import { formatDate, formatTextVisitStatus, formatAge, formatDiagnosis, formatUnorderedListItem } from '@/utils/formatter';
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

  const handleClickRecipe = () => {
    router.push(`/visit/${id}/recipe`)
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

      {statusMapped.includes('examine') ? <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '50%', paddingRight: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Keluhan
            </Typography>
            {formatUnorderedListItem(detail.chief_complaint)}
          </Box>
          <Box sx={{ width: '50%', paddingLeft: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Riwayat Alergi
            </Typography>
            {formatUnorderedListItem(detail.allergy_history)}
          </Box>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ width: '25%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Berat Badan
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.weight} kg
            </Typography>
          </Box>
          <Box sx={{ width: '25%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Tinggi Badan
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.height} cm
            </Typography>
          </Box>
          <Box sx={{ width: '25%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Temperatur Tubuh
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.temperature} °C
            </Typography>
          </Box>
          <Box sx={{ width: '25%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Detak Jantung
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.heart_rate} BPM
            </Typography>
          </Box>
          <Box sx={{ width: '25%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Tekanan Darah
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.blood_pressure} mmHg
            </Typography>
          </Box>
          <Box sx={{ width: '25%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Pernapasan
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.respiration_rate} BPM
            </Typography>
          </Box>
          <Box sx={{ width: '25%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Saturasi O2
            </Typography>
            <Typography variant="body2" gutterBottom>
              {detail.o2_saturation} Sp02
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Subjectives
          </Typography>
          <Typography variant="body2" gutterBottom>
            {detail.subjectives}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Kondisi Umum
          </Typography>
          <Typography variant="body2" gutterBottom>
            {detail.general_condition}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            GCS
          </Typography>
          <Typography variant="body2" gutterBottom>
            {detail.gcs}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Pain Scale
          </Typography>
          <Typography variant="body2" gutterBottom>
            {detail.pain_scale}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Pemeriksaan Fisik
          </Typography>
          <Typography variant="body2" gutterBottom>
            {detail.physical_examination}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Hasil Laboratorium
          </Typography>
          <Typography variant="body2" gutterBottom>
            {detail.laboratory_results}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Hasil Radiology
          </Typography>
          <Typography variant="body2" gutterBottom>
            {detail.radiology_result}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Diagnosis
          </Typography>
          <Typography variant="body2" gutterBottom>
            {formatDiagnosis(detail.diagnosis)}
          </Typography>
        </Box>
        {detail.scheduled_control_date && <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Jadwal kontrol ulang
          </Typography>
          <Typography variant="body2" gutterBottom>
            {formatDate(detail.scheduled_control_date)}
          </Typography>
        </Box>}
        <Divider sx={{ marginBottom: 3 }} />
      </Container> : null}

      {statusMapped.includes('recipe') ? <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Rincian Resep
          </Typography>
          <Typography variant="body2" gutterBottom>
            {JSON.parse(detail.medicine_ids).map((medicine_id: string, index: number) => {
              return (<li key={index}>
                {medicine_id} | {JSON.parse(detail.medicine_amounts)[index]} Dosis
              </li>)
            })}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Rincian Pembayaran Tertagih
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rincian</TableCell>
                  <TableCell align="right">Nominal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Obat</TableCell>
                  <TableCell align="right">{JSON.parse(detail.medicine_subtotal).reduce((total: number, num: number) => {
                    return total + Math.round(num);
                  }, 0)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Biaya Periksa</TableCell>
                  <TableCell align="right">{detail.treatment_charge}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">PPn</TableCell>
                  <TableCell align="right">{detail.tax}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Total</TableCell>
                  <TableCell align="right">{detail.total_charge}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
          {detail.status === 'examine' ? <Button variant="contained" onClick={handleClickRecipe} disabled={isLoading} sx={{ textTransform: 'none' }}>Beri Resep Obat</Button> : null}
          {detail.status === 'recipe' ? <Button variant="contained" onClick={handleClickExamine} disabled={isLoading} sx={{ textTransform: 'none' }}>Selesaikan Pembayaran</Button> : null}
          {detail.status === 'payment' ? <Button variant="contained" onClick={handleClickExamine} disabled={isLoading} sx={{ textTransform: 'none' }}>Selesaikan Rekam Medis</Button> : null}
        </Box>
      </Container>
    </div>
  )
}

VisitDetailPage.isRequireAuth = true;
export default VisitDetailPage;
