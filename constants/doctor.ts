export const SHEET_NAME = 'Doctor'
export const LAST_COLUMN = 'R'

export const genderList = [
  {
    text: 'Laki-laki',
    value: 'male',
  },
  {
    text: 'Perempuan',
    value: 'female'
  }
]

export const statusList = [
  {
    text: 'Aktif',
    value: 'active'
  },
  {
    text: 'Tidak Aktif',
    value: 'inactive'
  }
]

export const initialFilterState = {
  searchString: '',
  searchType: '',
  gender: '',
  genderType: 'E',
  status: '',
  statusType: 'K'
}

export const TABLE_HEADER = [
  { "field": "name", "headerName": "Nama Dokter", "width": 300, "sortable": false },
  { "field": "email", "headerName": "Alamat Surel", "width": 200, "sortable": false },
  { "field": "phone", "headerName": "Nomor HP", "width": 150, "sortable": false },
  { "field": "gender", "headerName": "Jenis Kelamin", "width": 150, "sortable": false },
  { "field": "date_of_birth", "headerName": "Tanggal Lahir", "width": 150, "sortable": false },
  { "field": "address", "headerName": "Alamat", "width": 200, "sortable": false },
  { "field": "info", "headerName": "Informasi", "width": 100, "sortable": false },
  { "field": "status", "headerName": "Status", "width": 100, "sortable": false },
  { "field": "service_start_date", "headerName": "Buka Praktek Sejak", "width": 100, "sortable": false },
  { "field": "updated_date", "headerName": "Diubah Pada", "width": 100, "sortable": false },
  { "field": "updated_by", "headerName": "Diubah Oleh", "width": 100, "sortable": false }
];

export const FILTER_OBJECT = [
  { "enabled": true, "text": "Nama Dokter", "value": "name", "column": "B" },
  { "enabled": true, "text": "Alamat Surel", "value": "email", "column": "C" },
  { "enabled": true, "text": "Nomor HP", "value": "phone", "column": "D" },
  { "enabled": true, "text": "NIP", "value": "id_number", "column": "F" },
  { "enabled": true, "text": "Alamat", "value": "address", "column": "H" },
  { "enabled": true, "text": "Informasi", "value": "info", "column": "I" }
];

export const TABLE_ENTITY = ['id', 'name', 'email', 'phone', 'gender', 'id_number', 'date_of_birth', 'address', 'info', 'doctor_schedule', 'photo', 'status', 'license_number', 'paraf', 'service_start_date', 'createdDate', 'updated_date', 'updatedBy'];
