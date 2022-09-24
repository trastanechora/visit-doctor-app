export const SHEET_NAME = 'Visit'
export const LAST_COLUMN = 'S'

export const initialFilterState = {
  searchString: '',
  searchType: '',
  patientId: '',
  patientIdColumn: 'patient_id',
  doctorId: '',
  doctorIdColumn: 'doctor_id',
}

export const TABLE_HEADER = [
  { "field": "patient_id", "headerName": "Nama Pasien", "width": 200, "sortable": false },
  { "field": "doctor_id", "headerName": "Nama Dokter", "width": 200, "sortable": false },
  { "field": "weight", "headerName": "Berat Badan", "width": 200, "sortable": false },
  { "field": "height", "headerName": "Tinggi Badan", "width": 200, "sortable": false },
  { "field": "temperature", "headerName": "Temperatur Tubuh", "width": 200, "sortable": false },
  { "field": "diagnosis", "headerName": "Diagnosa", "width": 200, "sortable": false },
  { "field": "visit_date", "headerName": "Tanggal Periksa", "width": 200, "sortable": false },
  { "field": "status", "headerName": "Status Periksa", "width": 200, "sortable": false },
  { "field": "scheduled_control_date", "headerName": "Tanggal Kontrol Berikutnya", "width": 200, "sortable": false },
];

export const FILTER_OBJECT = [
  { "text": "Nama Pasien", "value": "patient_id", "column": "B" },
  { "text": "Nama Dokter", "value": "doctor_id", "column": "C" },
  { "text": "Status Periksa", "value": "status", "column": "K" }
];

export const TABLE_ENTITY = ['id', 'patient_id', 'doctor_id', 'weight', 'height', 'temperature', 'symptoms', 'diagnosis', 'note', 'visit_date', 'status', 'scheduled_control_date', 'medicine_ids', 'medicine_amounts', 'medicine_subtotal', 'treatment_charge', 'total_treatment_raw', 'total_charge', 'total_charge_raw'];