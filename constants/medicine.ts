export const SHEET_NAME = 'Medicine'
export const LAST_COLUMN = 'K'

export const initialFilterState = {
  searchString: '',
  searchType: '',
}

export const TABLE_HEADER = [
  { "field": "name", "headerName": "Nama Obat", "width": 300, "sortable": false },
  { "field": "code", "headerName": "Kode Obat", "width": 200 },
  { "field": "active_substance", "headerName": "Info Detail", "width": 200 },
  { "field": "price", "headerName": "Harga", "width": 200 },
  { "field": "stock", "headerName": "Jumlah Ketersediaan", "width": 200 },
  { "field": "updated_date", "headerName": "Diperbarui Pada", "width": 200 },
  { "field": "updated_by", "headerName": "Diperbarui Oleh", "width": 200 }
];

export const FILTER_OBJECT = [
  { "text": "Nama Obat", "value": "name", "column": "B" },
  { "text": "Kode Obat", "value": "code", "column": "C" },
  { "text": "Info Detail", "value": "code", "column": "D" }
];

export const TABLE_ENTITY = ['id', 'name', 'code', 'active_substance', 'price', 'price_raw', 'stock', 'created_date', 'updated_date', 'updated_by', 'photo'];
