export const SHEET_NAME = 'Patient'
export const LAST_COLUMN = 'L'

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

export const maritalStatusList = [
  {
    text: 'Lajang',
    value: 'single'
  },
  {
    text: 'Menikah',
    value: 'married'
  }
]

export const initialFilterState = {
  searchString: '',
  searchType: '',
  gender: '',
  genderType: 'D',
  status: '',
  maritalStatusType: 'G'
}

export const TABLE_HEADER = [
  { "field": "record_number", "headerName": "Nomor RM", "width": 100, "sortable": false },
  { "field": "name", "headerName": "Nama Pasien", "width": 250, "sortable": false },
  { "field": "id_number", "headerName": "NIK", "width": 200, "sortable": false },
  { "field": "gender", "headerName": "Jenis Kelamin", "width": 200, "sortable": false },
  { "field": "date_of_birth", "headerName": "Tanggal Lahir", "width": 200, "sortable": false },
  { "field": "address", "headerName": "Alamat", "width": 200, "sortable": false },
  { "field": "marital_status", "headerName": "Status Pernikahan", "width": 200, "sortable": false },
  { "field": "phone", "headerName": "Nomor HP", "width": 200, "sortable": false },
  { "field": "guarantor_phone", "headerName": "Nomor HP Penjamin", "width": 200, "sortable": false },
  { "field": "created_date", "headerName": "Tanggal Terdaftar", "width": 200, "sortable": false },
  { "field": "udated_date", "headerName": "Terakhir Diperbarui", "width": 200, "sortable": false },
  { "field": "updated_by", "headerName": "Diperbarui Oleh", "width": 200, "sortable": false },
];

export const FILTER_OBJECT = [
  { "text": "Nomor RM", "value": "record_number", "column": "B" },
  { "text": "Nama Pasien", "value": "name", "column": "C" },
  { "text": "NIK", "value": "id_number", "column": "D" },
  { "text": "Jenis Kelamin", "value": "gender", "column": "E" },
  { "text": "Alamat", "value": "address", "column": "G" },
  { "text": "Status Pernikahan", "value": "marital_status", "column": "H" },
  { "text": "Nomor HP", "value": "phone", "column": "I" },
  { "text": "Nomor HP Penjamin", "value": "guarantor_phone", "column": "J" }
];

export const TABLE_ENTITY = ['id', 'name', 'email', 'phone', 'gender', 'id_number', 'date_of_birth', 'address', 'info', 'doctor_schedule', 'photo', 'status', 'license_number', 'paraf', 'service_start_date', 'createdDate', 'updated_date', 'updatedBy'];
