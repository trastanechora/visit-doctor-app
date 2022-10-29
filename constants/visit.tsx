import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { formatDate, formatVisitStatus } from '@/utils/formatter';

export const SHEET_NAME = 'Visit'
export const LAST_COLUMN = 'AG'

export const initialFilterState = {
  searchString: '',
  searchType: '',
  patientId: '',
  patientIdColumn: 'patient_id',
  doctorId: '',
  doctorIdColumn: 'doctor_id',
}

export const TABLE_HEADER = (callbackFunction: (type: string, dataRow: any) => void) => [
  { field: "patient_id", headerName: "Nama Pasien", width: 200, sortable: false },
  { field: "doctor_id", headerName: "Nama Dokter", width: 200, sortable: false },
  { field: "status", headerName: "Status Periksa", width: 300, sortable: false, renderCell: (params: any) => formatVisitStatus(params.row.status) },
  { field: "visit_date", headerName: "Tanggal Periksa", width: 200, sortable: false, renderCell: (params: any) => formatDate(params.row.visit_date) },
  // { field: "weight", headerName: "Berat Badan", width: 200, sortable: false, renderCell: (params: any) => params.row.weight ? `${params.row.weight} Kg` : '-' },
  // { field: "height", headerName: "Tinggi Badan", width: 200, sortable: false, renderCell: (params: any) => params.row.height ? `${params.row.height} cm` : '-' },
  // { field: "temperature", headerName: "Temperatur Tubuh", width: 200, sortable: false, renderCell: (params: any) => params.row.temperature ? `${params.row.temperature} °C` : '-' },
  // { field: "diagnosis", headerName: "Diagnosa", width: 200, sortable: false, renderCell: (params: any) => params.row.diagnosis ? params.row.diagnosis : '-' },
  // { field: "scheduled_control_date", headerName: "Tanggal Kontrol Berikutnya", width: 200, sortable: false, renderCell: (params: any) => params.row.scheduled_control_date ? formatDate(params.row.scheduled_control_date) : '-' },
  {
    field: 'action',
    headerName: 'Tindakan',
    sortable: false,
    width: 370,
    renderCell: (params: any) =>
      <ButtonGroup variant="outlined" aria-label="text button group">
        <Button onClick={() => callbackFunction('view', params)} sx={{ textTransform: 'none' }} startIcon={<VisibilityIcon />}>Detail</Button>
        <Button disabled onClick={() => callbackFunction('edit', params)} sx={{ textTransform: 'none' }} startIcon={<EditIcon />}>Ubah</Button>
        <Button disabled onClick={() => callbackFunction('delete', params)} sx={{ textTransform: 'none' }} startIcon={<DeleteForeverIcon />}>Hapus</Button>
      </ButtonGroup>
  }
];

export const FILTER_OBJECT = [
  { text: "Nama Pasien", value: "patient_id", column: "B" },
  { text: "Nama Dokter", value: "doctor_id", column: "C" },
  { text: "Status Periksa", value: "status", column: "X" }
];

export const TABLE_ENTITY = ['id', 'patient_id', 'doctor_id', 'chief_complaint', 'subjectives', 'allergy_history', 'general_condition', 'gcs', 'weight', 'height', 'blood_pressure', 'heart_rate', 'respiration_rate', 'temperature', 'o2_saturation', 'pain_scale', 'physical_examination', 'laboratory_results', 'radiology_result', 'diagnosis', 'plan_or_treatment', 'note', 'visit_date', 'status', 'scheduled_control_date', 'medicine_ids', 'medicine_amounts', 'medicine_subtotal', 'treatment_charge', 'total_treatment_raw', 'total_charge', 'total_charge_raw', 'created_date'];