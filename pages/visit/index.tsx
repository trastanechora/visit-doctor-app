import Head from 'next/head'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { DataGrid } from '@mui/x-data-grid';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box, TextField, Autocomplete, FormControl, Button } from '@mui/material';

import styles from '../../styles/Visit.module.css'
import { TABLE_HEADER, FILTER_OBJECT, initialFilterState } from '../../constants/visit'

import type { NextPageWithCustomProps } from '../../types/custom'

const VisitPage: NextPageWithCustomProps = () => {
  const [data, setData] = useState<any[]>([])
  const [expanded, setExpanded] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [values, setValues] = useState(initialFilterState);
  const [patientOptions, setPatientOptions] = useState<any[]>([])
  const [doctorOptions, setDoctorOptions] = useState<any[]>([])

  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    fetch('/api/visit')
      .then((res) => res.json())
      .then((responseObject) => {
        setData(responseObject.data)
        setLoading(false)
        fetch(`/api/patient/list`)
          .then((res) => res.json())
          .then((resObject) => {
            console.warn('list data patient', resObject.data)
            setPatientOptions(resObject.data);
          });
        fetch(`/api/doctor/list`)
          .then((res) => res.json())
          .then((resObject) => {
            console.warn('list data doctor', resObject.data)
            setDoctorOptions(resObject.data);
          });
      })
  }, [])

  const handleChange = (expandString: string) => {
    if (expanded) {
      setExpanded('');
    } else {
      setExpanded(expandString);
    }
  }

  const handleChangeFilter = (newValue: string, name: string) => {
    setValues({ ...values, [name]: newValue });
  };

  const handleResetFilter = () => {
    setValues(initialFilterState)
  }

  const handleApplyFilter = () => {
    setLoading(true)
    const filterArray = [];
    if (values.patientId) {
      filterArray.push(`${values.patientIdColumn} = '${values.patientId}'`)
    }
    if (values.doctorId) {
      filterArray.push(`${values.doctorIdColumn} = '${values.doctorId}'`)
    }
    const joinedFilter = filterArray.join(' AND ')

    fetch(`/api/visit?filter=${joinedFilter}`)
      .then((res) => res.json())
      .then((responseObject) => {
        setData(responseObject.data)
        setLoading(false)
      })
  }

  const handleOnRowClick = (event: any) => {
    router.push(`/visit/${event.row.id}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Visit | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
          <Box sx={{ width: '70%', paddingRight: 1 }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
              List Rekam Medis
            </Typography>
          </Box>
          <Box sx={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignSelf: 'center' }}>
            <Button variant="contained" onClick={() => router.push('/visit/insert')} disabled={isLoading} sx={{ textTransform: 'none' }}>Buat Baru</Button>
          </Box>
        </Container>
        <div className={styles.filterContainer}>
          <Accordion expanded={expanded === 'filter'} onChange={() => handleChange('filter')} disabled={isLoading}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Filter
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="caption" display="block">
                Isi kolom input &quot;Kata Kunci&quot; apa dan &quot;Berdasarkan Kolom&quot; mana yang ingin kamu tampilkan kemudian tekan &quot;Terapkan Filter&quot;.
              </Typography>
              <Container maxWidth={false} disableGutters sx={{ width: '100%', marginTop: 2 }}>
                <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1 }}>
                  <Box sx={{ width: '50%', paddingRight: 1 }}>
                    <FormControl fullWidth>
                      <Autocomplete
                        fullWidth
                        id="patient-input"
                        options={patientOptions}
                        onChange={(_, newVal) => handleChangeFilter(newVal?.id || '', 'patientId')}
                        getOptionLabel={(option) => option.text}
                        renderInput={(params) => <TextField {...params} value={values.patientId} name="patientId" label="Nama Pasien" />}
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ width: '50%', paddingLeft: 1 }}>
                    <FormControl fullWidth>
                      <Autocomplete
                        fullWidth
                        id="doctor-input"
                        options={doctorOptions}
                        onChange={(_, newVal) => handleChangeFilter(newVal?.id || '', 'doctroId')}
                        getOptionLabel={(option) => option.text}
                        renderInput={(params) => <TextField {...params} name="doctorId" label="Nama Dokter" />}
                      />
                    </FormControl>
                  </Box>
                </Container>
              </Container>
              <Typography variant="caption" display="block">
                Atau pilih berdasarkan beberapa kolom yang memiliki nilai pasti berikut:
              </Typography>
              <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginTop: 2 }}>
                <Button variant="outlined" onClick={handleResetFilter} disabled={isLoading} sx={{ width: '30%', textTransform: 'none', marginRight: 1 }}>Reset Filter</Button>
                <Button variant="contained" onClick={handleApplyFilter} disabled={isLoading} sx={{ width: '70%', textTransform: 'none', marginLeft: 1 }}>Terapkan Filter</Button>
              </Container>
            </AccordionDetails>
          </Accordion>
        </div>
        <Box style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={TABLE_HEADER}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            disableColumnMenu
            onRowClick={(event) => handleOnRowClick(event)}
            loading={isLoading}
          />
        </Box>
      </main>
    </div>
  )
}

VisitPage.isRequireAuth = true;
export default VisitPage;
