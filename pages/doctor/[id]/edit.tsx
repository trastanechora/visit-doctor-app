import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Typography, Box, Divider, Container, TextField, FormControl, Button, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

import { useNotificationContext } from '@/context/notification'
import { useAuthContext } from '@/context/auth'
import { genderList, statusList } from '@/constants/doctor'
import styles from '@/styles/Patient.module.css'

import type { NextPageWithCustomProps } from '@/types/custom'
import type { Dayjs } from 'dayjs';

const InsertDoctorPage: NextPageWithCustomProps = () => {
  const [_, dispatch] = useNotificationContext()
  const [authState] = useAuthContext()
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [datePickerBirthValue, setDatePickerBirthValue] = useState<Dayjs | null>(dayjs());
  const [datePickerStartValue, setDatePickerStartValue] = useState<Dayjs | null>(dayjs());
  const { query: { id } } = router;

  const [values, setValues] = useState<any>({
    name: '',
    email: '',
    phone: '',
    gender: '',
    idNumber: '',
    dateOfBirth: '',
    address: '',
    info: '',
    doctorSchedule: {
      monday: {
        isChecked: false,
        time: ''
      },
      tuesday: {
        isChecked: false,
        time: ''
      },
      wednesday: {
        isChecked: false,
        time: ''
      },
      thursday: {
        isChecked: false,
        time: ''
      },
      friday: {
        isChecked: false,
        time: ''
      },
      saturday: {
        isChecked: false,
        time: ''
      },
      sunday: {
        isChecked: false,
        time: ''
      }
    },
    photo: '-',
    status: 'active',
    licenseNumber: '',
    paraf: '-',
    serviceStartDate: '',
    currentUser: authState.user.id
  });
  const handleInputChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleScheduleChecked = (event: any) => {
    const name: string = event.target.name
    setValues({
      ...values, doctorSchedule: {
        ...values.doctorSchedule,
        [name]: {
          ...values.doctorSchedule[name],
          isChecked: event.target.checked
        }
      }
    });
  };

  const handleScheduleTime = (event: any) => {
    const name: string = event.target.name
    setValues({
      ...values, doctorSchedule: {
        ...values.doctorSchedule,
        [name]: {
          ...values.doctorSchedule[name],
          time: event.target.value
        }
      }
    });
  };

  useEffect(() => {
    if (id && authState) {
      setLoading(true)
      fetch(`/api/doctor?id=${id}`)
        .then((res) => res.json())
        .then((responseObject) => {
          console.warn('responseObject', responseObject)
          setLoading(false)
          const parsedSchedule = JSON.parse(responseObject.data.doctor_schedule)
          console.warn('parsedSchedule', parsedSchedule)
          setValues({
            name: responseObject.data.name,
            email: responseObject.data.email,
            phone: responseObject.data.phone,
            gender: responseObject.data.gender,
            idNumber: responseObject.data.id_number,
            dateOfBirth: responseObject.data.date_of_birth,
            address: responseObject.data.address,
            info: responseObject.data.info,
            doctorSchedule: {
              monday: {
                isChecked: parsedSchedule.monday.isChecked,
                time: parsedSchedule.monday.time
              },
              tuesday: {
                isChecked: parsedSchedule.tuesday.isChecked,
                time: parsedSchedule.tuesday.time
              },
              wednesday: {
                isChecked: parsedSchedule.wednesday.isChecked,
                time: parsedSchedule.wednesday.time
              },
              thursday: {
                isChecked: parsedSchedule.thursday.isChecked,
                time: parsedSchedule.thursday.time
              },
              friday: {
                isChecked: parsedSchedule.friday.isChecked,
                time: parsedSchedule.friday.time
              },
              saturday: {
                isChecked: parsedSchedule.saturday.isChecked,
                time: parsedSchedule.saturday.time
              },
              sunday: {
                isChecked: parsedSchedule.sunday.isChecked,
                time: parsedSchedule.sunday.time
              }
            },
            photo: responseObject.data.photo,
            status: responseObject.data.status,
            licenseNumber: responseObject.data.license_number,
            paraf: responseObject.data.paraf,
            serviceStartDate: responseObject.data.service_start_date,
            currentUser: authState.user.id
          });
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authState]);

  const handleSubmit = () => {
    setLoading(true)
    const body = {
      ...values,
      dateOfBirth: datePickerBirthValue?.format('YYYY-MM-DD'),
      serviceStartDate: datePickerStartValue?.format('YYYY-MM-DD'),
    }
    fetch(`/api/doctor/${id}`, { method: 'PUT', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        console.log('SUCCESS!', responseObject)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Berhasil ubah data dokter ${values.name}`, severity: 'success' } })
        router.replace('/doctor')
        setLoading(false)
      }).catch((err) => {
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Gagal ubah data dokter, error: ${err}`, severity: 'error' } })
        setLoading(false)
      })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit Doctor | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
          Ubah Data Dokter
        </Typography>

        <Container maxWidth={false} disableGutters sx={{ width: '100%', marginTop: 2 }}>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth>
                <TextField
                  id="name-input"
                  label="Nama Dokter"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange('name')}
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
                  onChange={handleInputChange('idNumber')}
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
                  id="license-number-input"
                  label="Nomor Lisensi"
                  name="licenseNumber"
                  value={values.licenseNumber}
                  onChange={handleInputChange('licenseNumber')}
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
                <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender-input"
                  label="Jenis Kelamin"
                  value={values.gender}
                  onChange={handleInputChange('gender')}
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
                <MobileDatePicker
                  label="Tanggal Lahir"
                  inputFormat="YYYY-MM-DD"
                  value={datePickerBirthValue}
                  onChange={(newValue) => setDatePickerBirthValue(newValue)}
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
                  labelId="status-label"
                  id="status-input"
                  label="Status Awal"
                  value={values.status}
                  onChange={handleInputChange('status')}
                  fullWidth
                  disabled={isLoading}
                >
                  {statusList.map((option, index) => (<MenuItem key={index} value={option.value}>{option.text}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{
              width: '50%',
              paddingLeft: 1
            }}>
              <FormControl fullWidth>
                <MobileDatePicker
                  label="Tanggal Mulai Praktik"
                  inputFormat="YYYY-MM-DD"
                  value={datePickerStartValue}
                  onChange={(newValue) => setDatePickerStartValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  disabled={isLoading}
                />
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
                  id="email-input"
                  label="Alamat Surel"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange('email')}
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
                  id="phone-input"
                  label="Nomor HP"
                  name="phone"
                  value={values.phone}
                  onChange={handleInputChange('phone')}
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
                id="info-input"
                label="Informasi Umum"
                name="info"
                value={values.info}
                onChange={handleInputChange('info')}
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
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <FormControl fullWidth>
              <TextField
                id="address-input"
                label="Alamat Tempat Tinggal Sekarang"
                name="address"
                value={values.address}
                onChange={handleInputChange('address')}
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

          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
            <FormControl fullWidth>
              <FormLabel component="legend">Jadwal Praktek</FormLabel>
              <FormGroup>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
                  <Box sx={{
                    width: '20%',
                    paddingRight: 1,
                    display: 'flex'
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.doctorSchedule.monday.isChecked} onChange={handleScheduleChecked} name="monday" />
                      }
                      label="Senin"
                    />
                  </Box>
                  <Box sx={{
                    width: '80%',
                    paddingLeft: 1
                  }}>
                    <FormControl fullWidth>
                      <TextField
                        id="schedule-monday-time-input"
                        label="Waktu Praktek Hari Senin"
                        name="monday"
                        value={values.doctorSchedule.monday.time}
                        onChange={handleScheduleTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={isLoading || !values.doctorSchedule.monday.isChecked}
                      />
                    </FormControl>
                  </Box>
                </Container>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
                  <Box sx={{
                    width: '20%',
                    paddingRight: 1,
                    display: 'flex'
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.doctorSchedule.tuesday.isChecked} onChange={handleScheduleChecked} name="tuesday" />
                      }
                      label="Selasa"
                    />
                  </Box>
                  <Box sx={{
                    width: '80%',
                    paddingLeft: 1
                  }}>
                    <FormControl fullWidth>
                      <TextField
                        id="schedule-tuesday-time-input"
                        label="Waktu Praktek Hari Selasa"
                        name="tuesday"
                        value={values.doctorSchedule.tuesday.time}
                        onChange={handleScheduleTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={isLoading || !values.doctorSchedule.tuesday.isChecked}
                      />
                    </FormControl>
                  </Box>
                </Container>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
                  <Box sx={{
                    width: '20%',
                    paddingRight: 1,
                    display: 'flex'
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.doctorSchedule.wednesday.isChecked} onChange={handleScheduleChecked} name="wednesday" />
                      }
                      label="Rabu"
                    />
                  </Box>
                  <Box sx={{
                    width: '80%',
                    paddingLeft: 1
                  }}>
                    <FormControl fullWidth>
                      <TextField
                        id="schedule-wednesday-time-input"
                        label="Waktu Praktek Hari Rabu"
                        name="wednesday"
                        value={values.doctorSchedule.wednesday.time}
                        onChange={handleScheduleTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={isLoading || !values.doctorSchedule.wednesday.isChecked}
                      />
                    </FormControl>
                  </Box>
                </Container>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
                  <Box sx={{
                    width: '20%',
                    paddingRight: 1,
                    display: 'flex'
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.doctorSchedule.thursday.isChecked} onChange={handleScheduleChecked} name="thursday" />
                      }
                      label="Kamis"
                    />
                  </Box>
                  <Box sx={{
                    width: '80%',
                    paddingLeft: 1
                  }}>
                    <FormControl fullWidth>
                      <TextField
                        id="schedule-thursday-time-input"
                        label="Waktu Praktek Hari Kamis"
                        name="thursday"
                        value={values.doctorSchedule.thursday.time}
                        onChange={handleScheduleTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={isLoading || !values.doctorSchedule.thursday.isChecked}
                      />
                    </FormControl>
                  </Box>
                </Container>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
                  <Box sx={{
                    width: '20%',
                    paddingRight: 1,
                    display: 'flex'
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.doctorSchedule.friday.isChecked} onChange={handleScheduleChecked} name="friday" />
                      }
                      label="Jumat"
                    />
                  </Box>
                  <Box sx={{
                    width: '80%',
                    paddingLeft: 1
                  }}>
                    <FormControl fullWidth>
                      <TextField
                        id="schedule-friday-time-input"
                        label="Waktu Praktek Hari Jumat"
                        name="friday"
                        value={values.doctorSchedule.friday.time}
                        onChange={handleScheduleTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={isLoading || !values.doctorSchedule.friday.isChecked}
                      />
                    </FormControl>
                  </Box>
                </Container>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
                  <Box sx={{
                    width: '20%',
                    paddingRight: 1,
                    display: 'flex'
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.doctorSchedule.saturday.isChecked} onChange={handleScheduleChecked} name="saturday" />
                      }
                      label="Sabtu"
                    />
                  </Box>
                  <Box sx={{
                    width: '80%',
                    paddingLeft: 1
                  }}>
                    <FormControl fullWidth>
                      <TextField
                        id="schedule-saturday-time-input"
                        label="Waktu Praktek Hari Jumat"
                        name="saturday"
                        value={values.doctorSchedule.saturday.time}
                        onChange={handleScheduleTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={isLoading || !values.doctorSchedule.saturday.isChecked}
                      />
                    </FormControl>
                  </Box>
                </Container>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
                  <Box sx={{
                    width: '20%',
                    paddingRight: 1,
                    display: 'flex'
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={values.doctorSchedule.sunday.isChecked} onChange={handleScheduleChecked} name="sunday" />
                      }
                      label="Minggu"
                    />
                  </Box>
                  <Box sx={{
                    width: '80%',
                    paddingLeft: 1
                  }}>
                    <FormControl fullWidth>
                      <TextField
                        id="schedule-sunday-time-input"
                        label="Waktu Praktek Hari Minggu"
                        name="sunday"
                        value={values.doctorSchedule.sunday.time}
                        onChange={handleScheduleTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={isLoading || !values.doctorSchedule.sunday.isChecked}
                      />
                    </FormControl>
                  </Box>
                </Container>
              </FormGroup>
              <FormHelperText>Jadwal ini akan ditampilkan ketika pendaftaran rekam medis</FormHelperText>
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

InsertDoctorPage.isRequireAuth = true;
export default InsertDoctorPage;
