import { useState } from 'react'
import Head from 'next/head'
import dayjs from 'dayjs';
import { useRouter } from 'next/router'
import { Typography, Box, Divider, Container, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useNotificationContext } from '@/context/notification'
import { useAuthContext } from '@/context/auth'
import { genderList } from '@/constants/doctor'
import { maritalStatusList } from '@/constants/patient'
import styles from '@/styles/Patient.module.css'

import type { NextPageWithCustomProps } from '@/types/custom'
import type { Dayjs } from 'dayjs';

const InsertPatientPage: NextPageWithCustomProps = () => {
  const [_, dispatch] = useNotificationContext()
  const [authState] = useAuthContext()
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(dayjs());

  const [values, setValues] = useState({
    name: '',
    idNumber: '',
    gender: '',
    address: '',
    maritalStatus: '',
    phone: '',
    guarantorPhone: '',
    currentUser: authState.user.id
  });
  const handleFilterChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    const body = {
      ...values,
      dateOfBirth: datePickerValue?.format('YYYY-MM-DD')
    }
    setLoading(true)
    fetch('/api/patient', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        console.log('SUCCESS!', responseObject)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Berhasil menambahkan pasien ${values.name}`, severity: 'success' } })
        router.replace('/patient')
        setLoading(false)
      }).catch((err) => {
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Gagal menambahkan pasien, error: ${err}`, severity: 'error' } })
        setLoading(false)
      })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Insert New Patient | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button variant="outlined" onClick={() => router.back()} startIcon={<ChevronLeftIcon />} sx={{ marginRight: 3, textTransform: 'none' }}>Kembali</Button>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Tambahkan Pasien
          </Typography>
        </Box>

        <Container maxWidth={false} disableGutters sx={{ width: '100%', marginTop: 2 }}>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth>
                <TextField
                  id="name-input"
                  label="Nama Pasien"
                  name="name"
                  value={values.name}
                  onChange={handleFilterChange('name')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
          </Container>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <Box sx={{
              width: '50%',
              paddingRight: 1
            }}>
              <FormControl fullWidth>
                <TextField
                  id="id-number-input"
                  label="NIK"
                  name="idNumber"
                  value={values.idNumber}
                  onChange={handleFilterChange('idNumber')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
            <Box sx={{
              width: '50%',
              paddingLeft: 1
            }}>
              <FormControl fullWidth>
                <MobileDatePicker
                  label="Tanggal Lahir"
                  inputFormat="YYYY-MM-DD"
                  value={datePickerValue}
                  onChange={(newValue) => setDatePickerValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
          </Container>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <Box sx={{
              width: '50%',
              paddingRight: 1
            }}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender-input"
                  label="Jenis Kelamin"
                  value={values.gender}
                  onChange={handleFilterChange('gender')}
                  fullWidth
                  disabled={isLoading}
                >
                  {genderList.map((option, index) => (<MenuItem key={index} value={option.value}>{option.text}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{
              width: '50%',
              paddingLeft: 1
            }}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status Pernikahan</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-input"
                  label="Status Pernikahan"
                  value={values.maritalStatus}
                  onChange={handleFilterChange('maritalStatus')}
                  fullWidth
                  disabled={isLoading}
                >
                  {maritalStatusList.map((option, index) => (<MenuItem key={index} value={option.value}>{option.text}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
          </Container>
          <Divider sx={{ marginBottom: 3 }} />
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <Box sx={{
              width: '50%',
              paddingRight: 1
            }}>
              <FormControl fullWidth>
                <TextField
                  id="phone-input"
                  label="Nomor HP"
                  name="phone"
                  value={values.phone}
                  onChange={handleFilterChange('phone')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
            <Box sx={{
              width: '50%',
              paddingLeft: 1
            }}>
              <FormControl fullWidth>
                <TextField
                  id="guarantor-phone-input"
                  label="Nomor HP Penjamin"
                  name="guarantorPhone"
                  value={values.guarantorPhone}
                  onChange={handleFilterChange('guarantorPhone')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
          </Container>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <FormControl fullWidth>
              <TextField
                id="address-input"
                label="Alamat"
                name="address"
                value={values.address}
                onChange={handleFilterChange('address')}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={3}
                maxRows={6}
                disabled={isLoading}
              />
            </FormControl>
          </Container>
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

InsertPatientPage.isRequireAuth = true;
export default InsertPatientPage;
