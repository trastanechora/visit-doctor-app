import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import { Typography, Box, Divider, Container, TextField, FormControl, Button, Autocomplete, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { translateDay } from '@/utils/translator';
import { useNotificationContext } from '@/context/notification'
import styles from '@/styles/Visit.module.css'

import type { Dayjs } from 'dayjs'
import type { NextPageWithCustomProps } from '@/types/custom'

const InsertVisitPage: NextPageWithCustomProps = () => {
  const router = useRouter()
  const [_, dispatch] = useNotificationContext()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [patientDetail, setPatientDetail] = useState<any>(null)
  const [patientOptions, setPatientOptions] = useState<any[]>([])
  const [doctorDetail, setDoctorDetail] = useState<any>(null)
  const [doctorOptions, setDoctorOptions] = useState<any[]>([])
  const [datePickerScheduleValue, setDatePickerScheduleValue] = useState<Dayjs | null>(dayjs());
  const [formState, setFormState] = useState({
    patientId: '',
    recordNumber: '',
    doctorId: '',
    diagnose: '',
    visitDate: ''
  });

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

  const handleChangeDoctor = (newValue: { id: string; text: string; } | null) => {
    if (newValue !== null) {
      setFormState({ ...formState, doctorId: newValue.id });
      fetch(`/api/doctor?id=${newValue.id}`)
        .then((res) => res.json())
        .then((resObject) => {
          const data = resObject.data;
          data.doctor_schedule = JSON.parse(resObject.data.doctor_schedule)
          setDoctorDetail(data);
          console.warn('doctor detail', data)
        })
    } else {
      setDoctorDetail(undefined);
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

  const renderShedule = (doctorSchedule: any) => {
    return Object.entries(doctorSchedule).filter(([_, value]: any) => value.isChecked).map(([key, value]: any) => (
      <TableRow
        key={key}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {translateDay(key)}
        </TableCell>
        <TableCell align="right">{value.isChecked ? value.time : 'Tidak Buka'}</TableCell>
      </TableRow>
    ))
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

  const handleSubmit = () => {
    const body = {
      ...formState,
      visitDate: datePickerScheduleValue?.format('YYYY-MM-DD')
    }
    setLoading(true)
    fetch('/api/visit', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        console.log('SUCCESS!', responseObject)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Berhasil menambahkan rekam medis`, severity: 'success' } })
        router.replace(`/visit/${responseObject.data.id}`)
        setLoading(false)
      }).catch((err) => {
        console.log('Error!', err)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Gagal menambahkan rekam medis, error: ${err}`, severity: 'error' } })
        setLoading(false)
      })
  }

  if (isLoading) return <p>Loading...</p>

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
                  id="patient-input"
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
                  id="doctor-input"
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
            <Box sx={{ width: '20%', paddingRight: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Usia
              </Typography>
              <Typography variant="body2" gutterBottom>
                {calculateAge(patientDetail.date_of_birth)} Tahun
              </Typography>
            </Box>
            <Box sx={{ width: '20%', paddingLeft: 1, paddingRight: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Jenis Kelamin
              </Typography>
              <Typography variant="body2" gutterBottom>
                {translateGender(patientDetail.gender)}
              </Typography>
            </Box>
            <Box sx={{ width: '20%', paddingLeft: 1, paddingRight: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Nomor HP
              </Typography>
              <Typography variant="body2" gutterBottom>
                {patientDetail.phone}
              </Typography>
            </Box>
            <Box sx={{ width: '40%', paddingLeft: 1 }}>
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
                  onChange={(_, newVal) => handleChangeDoctor(newVal)}
                  getOptionLabel={(option) => option.text}
                  renderInput={(params) => <TextField {...params} value={formState.doctorId} name="doctorId" label="Nama Dokter" />}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: '50%', paddingLeft: 1 }}>
              <FormControl fullWidth>
                <MobileDatePicker
                  label="Rencana Tanggal Periksa"
                  inputFormat="YYYY-MM-DD"
                  value={datePickerScheduleValue}
                  onChange={(newValue) => setDatePickerScheduleValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
          </Container>
          {doctorDetail ? (<Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
            <Box sx={{ width: '50%' }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Jadwal Periksa {doctorDetail.name}:
              </Typography>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Hari</TableCell>
                    <TableCell align="right">Jam</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderShedule(doctorDetail.doctor_schedule)}
                </TableBody>
              </Table>
            </Box>
          </Container>) : null}

          <Divider sx={{ marginBottom: 3 }} />
          <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignSelf: 'center' }}>
              <Button variant="contained" onClick={handleSubmit} disabled={isLoading} sx={{ textTransform: 'none' }}>Simpan</Button>
            </Box>
          </Container>
        </Container>
      </main>
    </div>
  )
}

InsertVisitPage.isRequireAuth = true;
export default InsertVisitPage;
