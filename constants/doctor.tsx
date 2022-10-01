import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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

export const TABLE_HEADER = (callbackFunction: (type: string, dataRow: any) => void) => [
  { field: "name", headerName: "Nama Dokter", width: 300, sortable: false },
  { field: "status", headerName: "Status", width: 100, sortable: false },
  { field: "phone", headerName: "Nomor HP", width: 150, sortable: false },
  { field: "gender", headerName: "Jenis Kelamin", width: 150, sortable: false },
  { field: "date_of_birth", headerName: "Tanggal Lahir", width: 150, sortable: false },
  { field: "address", headerName: "Alamat", width: 200, sortable: false },
  { field: "service_start_date", headerName: "Buka Praktek Sejak", width: 150, sortable: false },
  { field: "email", headerName: "Alamat Surel", width: 200, sortable: false },
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
  { text: "Nama Dokter", value: "name", column: "B" },
  { text: "Alamat Surel", value: "email", column: "C" },
  { text: "Nomor HP", value: "phone", column: "D" },
  { text: "NIP", value: "id_number", column: "F" },
  { text: "Alamat", value: "address", column: "H" },
  { text: "Informasi", value: "info", column: "I" }
];

export const TABLE_ENTITY = ['id', 'name', 'email', 'phone', 'gender', 'id_number', 'date_of_birth', 'address', 'info', 'doctor_schedule', 'photo', 'status', 'license_number', 'paraf', 'service_start_date', 'createdDate', 'updated_date', 'updatedBy'];
