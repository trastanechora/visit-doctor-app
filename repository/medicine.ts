import { initList, initFilter, initSingle } from './init';
import { MEDICINE_LAST_COLUMN } from '../constants/medicine'

export const getAllMedicine = async (offset: number, limit: number) => {
  const { headerCols, dataRows } = await initList({
    sheetName: 'Medicine',
    lastColumn: MEDICINE_LAST_COLUMN,
    offset,
    limit
  });

  return { headerCols, dataRows };
}

export const getMedicineByFilter = async (filter: string) => {
  const { headerCols, dataRows } = await initFilter({
    sheetName: 'Medicine',
    lastColumn: MEDICINE_LAST_COLUMN,
    filter,
  });

  return { headerCols, dataRows };
}

export const getMedicineById = async (id: string) => {
  const { ...response } = await initSingle({
    sheetName: 'Medicine',
    lastColumn: MEDICINE_LAST_COLUMN,
    id,
  });

  return { ...response };
}
