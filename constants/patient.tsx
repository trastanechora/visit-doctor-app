import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { formatAge, formatMaritalStatus, formatGender } from '@/utils/formatter'

export const SHEET_NAME = 'Patient'
export const LAST_COLUMN = 'M'

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
  },
  {
    text: 'Cerai',
    value: 'divorced'
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

export const TABLE_HEADER = (callbackFunction: (type: string, dataRow: any) => void) => [
  { field: "record_number", headerName: "Nomor RM", width: 100, sortable: false },
  { field: "name", headerName: "Nama Pasien", width: 250, sortable: false },
  { field: "id_number", headerName: "NIK", width: 200, sortable: false },
  { field: "gender", headerName: "Jenis Kelamin", width: 150, sortable: false, renderCell: (params: any) => formatGender(params.row.gender) },
  { field: "date_of_birth", headerName: "Usia", width: 150, sortable: false, renderCell: (params: any) => formatAge(params.row.date_of_birth) },
  { field: "address", headerName: "Alamat", width: 300, sortable: false },
  { field: "marital_status", headerName: "Status Pernikahan", width: 150, sortable: false, renderCell: (params: any) => formatMaritalStatus(params.row.marital_status) },
  { field: "phone", headerName: "Nomor HP", width: 200, sortable: false },
  { field: "guarantor_phone", headerName: "Nomor HP Penjamin", width: 200, sortable: false },
  {
    field: 'action',
    headerName: 'Tindakan',
    sortable: false,
    width: 370,
    renderCell: (params: any) =>
      <ButtonGroup variant="outlined" aria-label="text button group">
        <Button onClick={() => callbackFunction('view', params)} sx={{ textTransform: 'none' }} startIcon={<VisibilityIcon />}>Detail</Button>
        <Button onClick={() => callbackFunction('edit', params)} sx={{ textTransform: 'none' }} startIcon={<EditIcon />}>Ubah</Button>
        <Button disabled onClick={() => callbackFunction('delete', params)} sx={{ textTransform: 'none' }} startIcon={<DeleteForeverIcon />}>Hapus</Button>
      </ButtonGroup>
  }
];

export const FILTER_OBJECT = [
  { text: "Nomor RM", value: "record_number", column: "B" },
  { text: "Nama Pasien", value: "name", column: "C" },
  { text: "NIK", value: "id_number", column: "D" },
  { text: "Jenis Kelamin", value: "gender", column: "E" },
  { text: "Alamat", value: "address", column: "G" },
  { text: "Status Pernikahan", value: "marital_status", column: "H" },
  { text: "Nomor HP", value: "phone", column: "I" },
  { text: "Nomor HP Penjamin", value: "guarantor_phone", column: "J" }
];

export const TABLE_ENTITY = ['id', 'record_number', 'name', 'id_number', 'gender', 'date_of_birth', 'address', 'marital_status', 'phone', 'guarantor_phone', 'created_date', 'updated_date', 'updated_by'];
