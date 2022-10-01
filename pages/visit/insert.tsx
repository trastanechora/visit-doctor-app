import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Typography, Box, Divider, Container, TextField, FormControl, Button, Autocomplete } from '@mui/material';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import styles from '../../styles/Visit.module.css'
import { icdtenList } from '../../datasets/icd10'
import { useAuthContext } from '../../context/auth'
import type { NextPageWithCustomProps } from '../../types/custom'

const InsertVisitPage: NextPageWithCustomProps = () => {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isEnglish, setIsEnglish] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})
  const [patientDetail, setPatientDetail] = useState<any>(null)
  const [patientOptions, setPatientOptions] = useState<any[]>([])
  const [doctorOptions, setDoctorOptions] = useState<any[]>([])
  const [formState, setFormState] = useState({
    patientId: '',
    recordNumber: '',
    doctorId: '',
    diagnose: ''
  });


  const handleChange = (newValue: string, name: string) => {
    setFormState({ ...formState, [name]: newValue });
  };

  const handleChangePatientAndRecord = (newValue: { id: string; text: string; record_number: string; } | null) => {
    if (newValue !== null) {
      setFormState({ ...formState, patientId: newValue.id, recordNumber: newValue.record_number });
      fetch(`/api/patient?id=${newValue.id}`)
        .then((res) => res.json())
        .then((resObject) => {
          setPatientDetail(resObject.data);
        })
    } else {
      setPatientDetail(undefined);
    }
  };

  const calculateAge = (stringBirthDate: string) => {
    const birthDate = new Date(stringBirthDate);
    const difference = Date.now() - birthDate.getTime();

    const ageDate = new Date(difference);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge;
  }

  const translateGender = (gender: string) => {
    if (gender === 'male') {
      return 'Laki-laki'
    } else {
      return 'Perempuan'
    }
  }

  useEffect(() => {
    setLoading(true)
    fetch(`/api/patient/list`)
      .then((res) => res.json())
      .then((resObject) => {
        console.warn('list data patient', resObject.data)
        setPatientOptions(resObject.data);
      })
    fetch(`/api/doctor/list`)
      .then((res) => res.json())
      .then((resObject) => {
        console.warn('list data doctor', resObject.data)
        setDoctorOptions(resObject.data);
      })
  }, []);

  useEffect(() => {
    if (patientOptions.length !== 0 && doctorOptions.length !== 0) {
      setLoading(false)
    }
  }, [doctorOptions.length, patientOptions.length])

  useEffect(() => {
    console.warn('patientDetail', patientDetail)
  }, [patientDetail])

  if (isLoading) return <p>Loading...</p>

  if (!isLoading && !detail) return <p>Rekam medis tidak dapat ditemukan</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Insert New Visit | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button variant="outlined" onClick={() => router.back()} startIcon={<ChevronLeftIcon />} sx={{ marginRight: 3, textTransform: 'none' }}>Kembali</Button>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Tambahkan Rekam Medis
          </Typography>
        </Box>

        <Container maxWidth={false} disableGutters sx={{ width: '100%', marginTop: 2 }}>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
            <Box sx={{ width: '75%', paddingRight: 1 }}>
              <FormControl fullWidth>
                <Autocomplete
                  fullWidth
                  id="icd-input"
                  options={patientOptions}
                  value={formState.patientId ? patientOptions.find((option) => option.id === formState.patientId) : { text: '' }}
                  onChange={(_, newVal) => handleChangePatientAndRecord(newVal)}
                  getOptionLabel={(option) => option.text}
                  renderInput={(params) => <TextField {...params} label="Nama Pasien" />}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: '25%', paddingLeft: 1 }}>
              <FormControl fullWidth>
                <Autocomplete
                  fullWidth
                  id="icd-input"
                  options={patientOptions}
                  value={formState.recordNumber ? patientOptions.find((option) => option.record_number === formState.recordNumber) : { record_number: '' }}
                  onChange={(_, newVal) => handleChangePatientAndRecord(newVal)}
                  getOptionLabel={(option) => option.record_number}
                  renderInput={(params) => <TextField {...params} label="Nomor RM" />}
                />
              </FormControl>
            </Box>
          </Container>
          {patientDetail ? (<Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
            <Box sx={{ width: '25%', paddingRight: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Umur
              </Typography>
              <Typography variant="body2" gutterBottom>
                {calculateAge(patientDetail.date_of_birth)} Tahun
              </Typography>
            </Box>
            <Box sx={{ width: '25%', paddingLeft: 1, paddingRight: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Jenis Kelamin
              </Typography>
              <Typography variant="body2" gutterBottom>
                {translateGender(patientDetail.gender)}
              </Typography>
            </Box>
            <Box sx={{ width: '50%', paddingLeft: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Alamat
              </Typography>
              <Typography variant="body2" gutterBottom>
                {patientDetail.address}
              </Typography>
            </Box>
          </Container>) : null}
          <Divider sx={{ marginBottom: 3 }} />
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
            <Box sx={{ width: '50%', paddingRight: 1 }}>
              <FormControl fullWidth>
                <Autocomplete
                  fullWidth
                  id="doctor-input"
                  options={doctorOptions}
                  onChange={(_, newVal) => handleChange(newVal?.id || '', 'doctorId')}
                  getOptionLabel={(option) => option.text}
                  renderInput={(params) => <TextField {...params} value={formState.doctorId} name="doctorId" label="Nama Dokter" />}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: '50%', paddingLeft: 1 }}>
              <FormControl fullWidth>
                <Autocomplete
                  fullWidth
                  id="visit-date-input"
                  options={icdtenList}
                  getOptionLabel={(option) => `${option.code} - ${isEnglish ? option.en : option.idn}`}
                  renderInput={(params) => <TextField {...params} label="Tanggal Periksa" />}
                />
              </FormControl>
            </Box>
          </Container>
          <Divider sx={{ marginBottom: 3 }} />
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
            <FormControl fullWidth>
              <Box sx={{ width: '100%', padding: 0, textAlign: 'right' }}>
                <Button variant='text' size="small" startIcon={<GTranslateIcon />} sx={{ textTransform: 'none', marginBottom: 1 }} onClick={() => setIsEnglish(!isEnglish)}>
                  <Typography variant='caption'>{!isEnglish ? "Tampilkan Bahasa Inggris" : "Tampilkan Bahasa Indonesia"}</Typography>
                </Button>
              </Box>
              <Autocomplete
                fullWidth
                id="icd-input"
                options={icdtenList}
                onChange={(_, newVal) => handleChange(newVal?.code || '', 'diagnose')}
                getOptionLabel={(option) => `${option.code} - ${isEnglish ? option.en : option.idn}`}
                renderInput={(params) => <TextField {...params} label="Diagnosis" />}
              />
            </FormControl>
          </Container>

          <Divider sx={{ marginBottom: 3 }} />
          <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
            <Typography color="primary">
              DEV CONSOLE DEBUGGER:
            </Typography>
            <Typography>
              patientId: {formState.patientId}
            </Typography>
            <Typography>
              doctorId: {formState.doctorId}
            </Typography>
            <Typography>
              diagnose: {formState.diagnose}
            </Typography>
          </Container>
        </Container>
      </main>
    </div>
  )
}

InsertVisitPage.isRequireAuth = true;
export default InsertVisitPage;
