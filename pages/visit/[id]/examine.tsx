import { useEffect, useState } from 'react'
import Head from 'next/head'
import dayjs from 'dayjs';
import { useRouter } from 'next/router'
import { Typography, Box, Divider, Container, Button, FormControl, Autocomplete, TextField, Chip, InputAdornment, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useNotificationContext } from '@/context/notification'
import { formatAge } from '@/utils/formatter'
import { icdtenList } from '@/datasets/icd10'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import styles from '@/styles/Visit.module.css'

import type { ChangeEvent } from 'react';
import type { Dayjs } from 'dayjs'
import type { NextPageWithCustomProps } from '@/types/custom'

const ExamineVisitPage: NextPageWithCustomProps = () => {
  const router = useRouter()
  const { query: { id } } = router;
  const [_, dispatch] = useNotificationContext()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isEnglish, setIsEnglish] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})
  const [datePickerScheduleValue, setDatePickerScheduleValue] = useState<Dayjs | null>(dayjs());
  const [formState, setFormState] = useState({
    patientId: '',
    recordNumber: '',
    doctorId: '',
    chiefComplaint: [],
    allergyHistory: [],
    weight: '',
    height: '',
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respirationRate: '',
    o2Saturation: '',
    subjectives: '',
    generalCondition: '',
    gcs: '',
    painScale: '',
    physicalExamination: '',
    laboratoryResult: '',
    radiologyResult: '',
    planOrTreatment: '',
    note: '',
    isScheduleControllNeeded: false,
    scheduledControllDate: '',
    diagnose: '',
    visitDate: ''
  });

  const handleChange = (newValue: string | string[], name: string) => {
    setFormState({ ...formState, [name]: newValue });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.warn(event.target.name, event.target.value)
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: !formState.isScheduleControllNeeded });
  };

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`/api/visit?id=${id}`)
        .then((res) => res.json())
        .then((responseObject) => {
          setDetail(responseObject.data);
          setFormState({ ...formState, patientId: responseObject.data?.patient?.id || '', doctorId: responseObject.data?.doctor?.id || '' })
          setLoading(false)
        })
    }
  }, [id]);

  const redirectToPatient = () => {
    router.push(`/patient/${detail.patient?.id}`)
  }

  const translateGender = (gender: string) => {
    if (gender === 'male') {
      return 'Laki-laki'
    } else {
      return 'Perempuan'
    }
  }

  const handleSubmit = () => {
    const body = { ...formState, action: 'examine', chiefComplaint: JSON.stringify(formState.chiefComplaint), allergyHistory: JSON.stringify(formState.allergyHistory) }
    if (formState.isScheduleControllNeeded) {
      body.scheduledControllDate = datePickerScheduleValue?.format('YYYY-MM-DD') || ''
    }
    setLoading(true)
    fetch(`/api/visit/${id}`, { method: 'PUT', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        console.log('SUCCESS!', responseObject)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Berhasil menambah pencatatan periksa rekam medis`, severity: 'success' } })
        // router.replace(`/visit/${responseObject.data.id}`)
        setLoading(false)
      }).catch((err) => {
        console.log('Error!', err)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Gagal menambah pencatatan periksa rekam medis, error: ${err}`, severity: 'error' } })
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
            Pemeriksaan
          </Typography>
        </Box>

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

        <Container maxWidth={false} disableGutters sx={{ width: '100%', marginTop: 2 }}>
          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
            <Box sx={{ width: '20%', paddingRight: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Usia
              </Typography>
              <Typography variant="body2" gutterBottom>
                {formatAge(detail.patient?.date_of_birth)}
              </Typography>
            </Box>
            <Box sx={{ width: '20%', paddingLeft: 1, paddingRight: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Jenis Kelamin
              </Typography>
              <Typography variant="body2" gutterBottom>
                {translateGender(detail.patient?.gender)}
              </Typography>
            </Box>
            <Box sx={{ width: '20%', paddingLeft: 1, paddingRight: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Nomor HP
              </Typography>
              <Typography variant="body2" gutterBottom>
                {detail.patient?.phone}
              </Typography>
            </Box>
            <Box sx={{ width: '40%', paddingLeft: 1 }}>
              <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                Alamat
              </Typography>
              <Typography variant="body2" gutterBottom>
                {detail.patient?.address}
              </Typography>
            </Box>
          </Container>
          <Divider sx={{ marginBottom: 3 }} />

          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1, flexWrap: 'wrap' }}>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 1 }}>
              <Autocomplete
                multiple
                clearOnBlur
                freeSolo
                id="chief-complaint-input"
                options={[]}
                onChange={(_, newVal) => handleChange(newVal, 'chiefComplaint')}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} key={`${option}-${index}`} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Keluhan"
                    helperText="Tekan enter ketika selesai mengetik keluhan, jika tidak maka tak akan tersimpan"
                  />
                )}
              />
            </Box>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 1 }}>
              <Autocomplete
                multiple
                clearOnBlur
                freeSolo
                id="allergy-history-input"
                options={[]}
                onChange={(_, newVal) => handleChange(newVal, 'allergyHistory')}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} key={`${option}-${index}`} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Riwayat Alergi"
                    helperText="Tekan enter ketika selesai mengetik keluhan, jika tidak maka tak akan tersimpan"
                  />
                )}
              />
            </Box>
          </Container>

          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1, flexWrap: 'wrap' }}>
            <Box sx={{ width: '50%', paddingRight: 1, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="weight-input"
                label="Berat Badan"
                type="number"
                name="weight"
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                }}
              />
            </Box>
            <Box sx={{ width: '50%', paddingLeft: 1, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="height-input"
                label="Tinggi Badan"
                type="number"
                name="height"
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                }}
              />
            </Box>
            <Box sx={{ width: '50%', paddingRight: 1, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="temperature-input"
                label="Temperatur Tubuh"
                type="number"
                name="temperature"
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: <InputAdornment position="start">°C</InputAdornment>,
                }}
              />
            </Box>
            <Box sx={{ width: '50%', paddingLeft: 1, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="heart-rate-input"
                label="Detak Jantung"
                type="number"
                name="heartRate"
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: <InputAdornment position="start">BPM</InputAdornment>,
                }}
              />
            </Box>
            <Box sx={{ width: '50%', paddingRight: 1, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="blood-pressure-input"
                label="Tekanan Darah"
                type="number"
                name="bloodPressure"
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: <InputAdornment position="start">mmHg</InputAdornment>,
                }}
              />
            </Box>
            <Box sx={{ width: '50%', paddingLeft: 1, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="respiration-rate-input"
                label="Pernapasan"
                type="number"
                name="respirationRate"
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: <InputAdornment position="start">BPM</InputAdornment>,
                }}
              />
            </Box>
            <Box sx={{ width: '50%', paddingRight: 1 }}>
              <TextField
                fullWidth
                id="o2-saturation-input"
                label="Saturasi O2"
                type="number"
                name="o2Saturation"
                onChange={handleChangeInput}
                InputProps={{
                  endAdornment: <InputAdornment position="start">Sp02</InputAdornment>,
                }}
              />
            </Box>
          </Container>
          <Divider sx={{ marginBottom: 3, marginTop: 3 }} />

          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1, flexWrap: 'wrap' }}>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 2 }}>
              <TextField
                fullWidth
                multiline
                id="subjectives-input"
                label="Subjectives"
                name="subjectives"
                rows={2}
                onChange={handleChangeInput}
              />
            </Box>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 2 }}>
              <TextField
                fullWidth
                multiline
                id="general-condition-input"
                label="Kondisi Umum"
                name="generalCondition"
                rows={2}
                onChange={handleChangeInput}
              />
            </Box>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 2 }}>
              <TextField
                fullWidth
                multiline
                id="gcs-input"
                label="GCS"
                name="gcs"
                rows={2}
                onChange={handleChangeInput}
              />
            </Box>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 2 }}>
              <TextField
                fullWidth
                multiline
                id="pain-scale-input"
                label="Pain Scale"
                name="painScale"
                rows={2}
                onChange={handleChangeInput}
              />
            </Box>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 2 }}>
              <TextField
                fullWidth
                multiline
                id="physical-examination-input"
                label="Pemeriksaan Fisik"
                name="physicalExamination"
                rows={2}
                onChange={handleChangeInput}
              />
            </Box>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="laboratory-result-input"
                label="Hasil Laboratiorium"
                name="laboratoryResult"
                onChange={handleChangeInput}
              />
            </Box>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="radiology-result-input"
                label="Hasil Radiology"
                name="radiologyResult"
                onChange={handleChangeInput}
              />
            </Box>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 2 }}>
              <TextField
                fullWidth
                id="plan-or-treatment-input"
                label="Plan or Treatment"
                name="planOrTreatment"
                onChange={handleChangeInput}
              />
            </Box>
          </Container>

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
                renderInput={(params) => <TextField {...params} label="Diagnosis" helperText="Tekan tombol pada atas kanan dari field ini untuk mengganti bahasa" />}
              />
            </FormControl>
          </Container>

          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1, flexWrap: 'wrap' }}>
            <Box sx={{ width: '100%', padding: 0, marginBottom: 3 }}>
              <TextField
                fullWidth
                multiline
                id="note-input"
                label="Catatan Tambahan"
                name="note"
                rows={3}
                onChange={handleChangeInput}
              />
            </Box>
            <FormControl fullWidth>
              <FormGroup>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 3 }}>
                  <Box sx={{
                    width: '50%',
                    paddingRight: 1,
                    display: 'flex'
                  }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formState.isScheduleControllNeeded} name="isScheduleControllNeeded" onChange={handleChangeCheck} />
                      }
                      label="Apakah perlu kontrol lanjutan?"
                    />
                  </Box>
                  {formState.isScheduleControllNeeded ? <Box sx={{
                    width: '50%',
                    paddingLeft: 1
                  }}>
                    <FormControl fullWidth>
                      <MobileDatePicker
                        label="Tanggal Kontrol Ulang"
                        inputFormat="YYYY-MM-DD"
                        value={datePickerScheduleValue}
                        onChange={(newValue) => setDatePickerScheduleValue(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                        disabled={isLoading}
                      />
                    </FormControl>
                  </Box> : null}
                </Container>
              </FormGroup>
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

ExamineVisitPage.isRequireAuth = true;
export default ExamineVisitPage;
