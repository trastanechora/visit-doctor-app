import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const SHEET_NAME = 'Medicine'
export const LAST_COLUMN = 'K'

export const initialFilterState = {
  searchString: '',
  searchType: '',
}

export const TABLE_HEADER = (callbackFunction: (type: string, dataRow: any) => void) => [
  { field: "name", headerName: "Nama Obat", width: 300, sortable: false },
  { field: "code", headerName: "Kode Obat", width: 150, sortable: false },
  { field: "active_substance", headerName: "Info Detail", width: 250, sortable: false },
  { field: "price", headerName: "Harga", width: 150, sortable: false },
  { field: "stock", headerName: "Ketersediaan", width: 150, sortable: false },
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
  { text: "Nama Obat", value: "name", column: "B" },
  { text: "Kode Obat", value: "code", column: "C" },
  { text: "Info Detail", value: "code", column: "D" }
];

export const TABLE_ENTITY = ['id', 'name', 'code', 'active_substance', 'price', 'price_raw', 'stock', 'created_date', 'updated_date', 'updated_by', 'photo'];
