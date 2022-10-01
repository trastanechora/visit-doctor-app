import Head from 'next/head'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Typography, Box, Divider, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import styles from '../../styles/Visit.module.css'

import type { NextPageWithCustomProps } from '../../types/custom'

import { icdtenList } from '../../datasets/icd10'

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

  const getDiagnosis = (code: string) => {
    const diagnosis = icdtenList.find((icdten) => icdten.code === code)
    if (!diagnosis) return 'Diagnosa tidak ada';

    return `${diagnosis.code} - ${diagnosis.idn}`;
  }

  const calculateAge = (stringBirthDate: string) => {
    const birthDate = new Date(stringBirthDate);
    const difference = Date.now() - birthDate.getTime();

    const ageDate = new Date(difference);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge;
  }

  if (isLoading) return <p>Loading...</p>

  if (!isLoading && !detail) return <p>Rekam medis tidak dapat ditemukan</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Visit Detail | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button variant="outlined" onClick={() => router.back()} startIcon={<ChevronLeftIcon />} sx={{ marginRight: 3, textTransform: 'none' }}>Kembali</Button>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Detail Rekam Medis
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Status:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.status === 'scheduled' ? 'Dijadwalkan' : 'Selesai'}
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Tanggal Periksa:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.visit_date}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nama Pasien:
            </Typography>
            <Button variant="text" onClick={redirectToPatient}>
              {detail.patient?.name}
            </Button>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Nama Dokter:
            </Typography>
            <Button variant="text" onClick={redirectToDoctor}>
              {detail.doctor?.name}
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '50%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Keluhan:
            </Typography>
            {/* <Autocomplete
              fullWidth
              id="combo-box-demo"
              options={icdtenList}
              getOptionLabel={(option) => `${option.code} - ${option.idn}`}
              renderInput={(params) => <TextField {...params} label="Diagnosis" />}
            /> */}
            {/* <List dense>
                  {
                    detail.symptoms?.map((symptom: string, index: number) => (<ListItem key={`${index}-${symptom}`}>
                      <ListItemText
                        primary={symptom} />
                      </ListItem>))
                  }
            </List> */}
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
              Suhu Tubuh:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.temperature} °C
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Berat Badan:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.weight} Kg
            </Typography>
          </Box>
          <Box sx={{ width: '33%' }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Tinggi Badan:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {detail.height} cm
            </Typography>
          </Box>
        </Box>
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
      </main>
    </div>
  )
}

VisitDetailPage.isRequireAuth = true;
export default VisitDetailPage;
