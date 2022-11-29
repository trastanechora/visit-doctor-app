import { useEffect, useState, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Typography, Box, Divider, Container, Button, Accordion, AccordionSummary, AccordionDetails, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, Autocomplete } from '@mui/material';
import { useNotificationContext } from '@/context/notification'
import { formatAge, formatDate, formatDiagnosis, formatUnorderedListItem } from '@/utils/formatter'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/ControlPoint';
import Alert from '@mui/material/Alert';
import styles from '@/styles/Visit.module.css'

import type { ChangeEvent } from 'react';
import type { NextPageWithCustomProps } from '@/types/custom'

interface MedicineRow {
  id: string;
  name: string;
  quantity: number;
  subtotal: number;
  price: number
};

const RecipeVisitPage: NextPageWithCustomProps = () => {
  const router = useRouter()
  const { query: { id } } = router;
  const [_, dispatch] = useNotificationContext()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})
  const [open, setOpen] = useState<boolean>(false);
  const [medicineOptions, setMedicineOptions] = useState<any[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState<any>({})
  const [currentQuantity, setCurrentQuantity] = useState<number>(0)
  const [rows, setRows] = useState<MedicineRow[]>([])
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

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`/api/visit?id=${id}`)
        .then((res) => res.json())
        .then((responseObject) => {
          setDetail(responseObject.data);
          console.warn('[DETAIL] responseObject.data', responseObject.data)
          setFormState({ ...formState, patientId: responseObject.data?.patient?.id || '', doctorId: responseObject.data?.doctor?.id || '' })
          setLoading(false)
          fetch(`/api/medicine/list`)
            .then((res) => res.json())
            .then((resObject) => {
              console.warn('list data medicine', resObject.data)
              setMedicineOptions(resObject.data);
            });
        })
    }
  }, [id]);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.warn(event.target.value);
    setCurrentQuantity(Number(event.target.value));
  };

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

  const handleAdd = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setSelectedMedicine({});
    setCurrentQuantity(0);
    setOpen(false);
  };

  const handleAddMedicine = () => {
    const currentMedicine = {
      id: selectedMedicine.id, name: selectedMedicine.text, quantity: currentQuantity, subtotal: currentQuantity * selectedMedicine.price, price: selectedMedicine.price
    }
    const tempRows = rows;
    tempRows.push(currentMedicine);
    setRows(tempRows);
    handleClose();
  }

  const handleDeleteMedicine = (id: string) => {
    const tempRows = rows.filter(row => row.id !== id);
    setRows(tempRows);
  }

  const calculation = useMemo(() => {
    const TAX_RATE = 0.1;
    const SERVICE_FEE = 5000;
    if (rows.length > 0) {
      let subtotal = 0;

      rows.forEach(row => {
        subtotal += row.subtotal;
      })
      subtotal += SERVICE_FEE;
      const tax = subtotal * TAX_RATE;
      const total = subtotal + tax;

      return { subtotal, total, tax, taxPercentage: TAX_RATE, fee: SERVICE_FEE }
    }

    return { subtotal: '-', total: '-', tax: '-', taxPercentage: TAX_RATE, fee: '-' }
  }, [rows, rows.length]);

  const handleSubmit = () => {
    setLoading(true)
    const medicineIds: string[] = [];
    const medicineAmounts: number[] = [];
    const medicineSubtotals: number[] = [];

    rows.forEach(row => {
      medicineIds.push(row.id);
      medicineAmounts.push(row.quantity);
      medicineSubtotals.push(row.subtotal);
    })

    const fee = calculation.fee;
    const subtotal = calculation.subtotal;
    const tax = calculation.tax;
    const total = calculation.total;

    const body = { action: 'medicine', fee, subtotal, tax, total, medicineIds: JSON.stringify(medicineIds), medicineAmounts: JSON.stringify(medicineAmounts), medicineSubtotals: JSON.stringify(medicineSubtotals) }
    fetch(`/api/visit/${id}`, { method: 'PUT', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        console.log('SUCCESS!', responseObject)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Berhasil menambah pencatatan resep obat rekam medis`, severity: 'success' } })
        router.replace(`/visit/${id}`)
        setLoading(false)
      }).catch((err) => {
        console.log('Error!', err)
        dispatch({ type: 'OPEN_NOTIFICATION', payload: { message: `Gagal menambah pencatatan resep obat rekam medis, error: ${err}`, severity: 'error' } })
        setLoading(false)
      })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe | Visit Doctor App</title>
        <meta name="description" content="App for doctor's archive management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button variant="outlined" onClick={() => router.back()} startIcon={<ChevronLeftIcon />} sx={{ marginRight: 3, textTransform: 'none' }}>Kembali</Button>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Peresepan Obat
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
            <Accordion sx={{ width: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {/* <Typography sx={{ fontSize: '12px' }}>Klik di sini untuk melihat info detail pemeriksaan</Typography> */}
                <Alert severity="info">Klik di sini untuk melihat info detail pemeriksaan</Alert>
              </AccordionSummary>
              <AccordionDetails>
                <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
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
                </Container>
              </AccordionDetails>
            </Accordion>
          </Container>
          <Divider sx={{ marginBottom: 3 }} />

          <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginBottom: 1, flexWrap: 'wrap' }}>
            <Box style={{ width: '100%' }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Nama Obat</TableCell>
                      <TableCell sx={{ color: 'primary.main', fontWeight: 600 }} align="right">Kuantitas</TableCell>
                      <TableCell sx={{ color: 'primary.main', fontWeight: 600 }} align="right">Harga</TableCell>
                      <TableCell sx={{ color: 'primary.main', fontWeight: 600 }} align="right">Jumlah</TableCell>
                      <TableCell sx={{ color: 'primary.main', fontWeight: 600 }} align="left" width={200}>Tindakan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.subtotal}</TableCell>
                        <TableCell align="left"><Button variant="outlined" startIcon={<DeleteIcon />} color="error" size="small" sx={{ textTransform: 'none' }} onClick={() => handleDeleteMedicine(row.id)}>
                          Hapus
                        </Button></TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} />
                      <TableCell align="left"><Button variant="outlined" startIcon={<AddIcon />} size="small" sx={{ textTransform: 'none' }} onClick={handleAdd}>
                        Tambah Obat
                      </Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={4} />
                      <TableCell colSpan={2}>Biaya Pelayanan</TableCell>
                      <TableCell align="right">{calculation.fee}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Subtotal</TableCell>
                      <TableCell align="right">{calculation.subtotal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PPn</TableCell>
                      <TableCell align="right">{`${(calculation.taxPercentage * 100).toFixed(0)}%`}</TableCell>
                      <TableCell align="right">{calculation.tax}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell align="right">{calculation.total}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Container>
          {/* <Container maxWidth={false} disableGutters sx={{ width: '100%', display: 'flex', marginTop: 3, marginBottom: 3, flexWrap: 'wrap' }}>
            <Box style={{ width: '100%' }}>
              <Button variant="contained" onClick={handleAdd} disabled={isLoading} sx={{ textTransform: 'none' }}>Tambahkan Obat</Button>
            </Box>
          </Container> */}

          <Divider sx={{ marginBottom: 3 }} />
          <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignSelf: 'center' }}>
              <Button variant="contained" onClick={handleSubmit} disabled={isLoading} sx={{ textTransform: 'none' }}>Simpan</Button>
            </Box>
          </Container>
        </Container>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Tambah Obat</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ketik nama obat dan tentukan jumlah dosisnya:
            </DialogContentText>
            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <Autocomplete
                sx={{ marginBottom: 2 }}
                fullWidth
                id="patient-input"
                options={medicineOptions}
                onChange={(_, newVal) => setSelectedMedicine(newVal)}
                getOptionLabel={(option) => option.text}
                renderInput={(params) => <TextField {...params} value={selectedMedicine.text} name="medicineId" label="Nama Obat" />}
              />
              {selectedMedicine && selectedMedicine.id && <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
                <Box sx={{ width: '50%' }}>
                  <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                    Harga per kuantitas:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {selectedMedicine.price}
                  </Typography>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
                    Stok tersedia:
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {selectedMedicine.stock}
                  </Typography>
                </Box>
              </Box>}
              <TextField
                sx={{ marginBottom: 2 }}
                id="quantity-input"
                label="Kuantitas Dosis"
                type="number"
                name="quantity"
                value={currentQuantity}
                onChange={handleChangeInput}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button onClick={handleAddMedicine}>Tambahkan</Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  )
}

RecipeVisitPage.isRequireAuth = true;
export default RecipeVisitPage;
