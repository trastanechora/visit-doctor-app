import { initList, initFilter, initSingle } from './init';
import { DOCTOR_LAST_COLUMN } from '../constants/doctor'

export const getAllDoctor = async (offset: number, limit: number) => {
  const { headerCols, dataRows } = await initList({
    sheetName: 'Doctor',
    lastColumn: DOCTOR_LAST_COLUMN,
    offset,
    limit
  });

  return { headerCols, dataRows };
}

export const getDoctorByFilter = async (filter: string) => {
  const { headerCols, dataRows } = await initFilter({
    sheetName: 'Doctor',
    lastColumn: DOCTOR_LAST_COLUMN,
    filter,
  });

  return { headerCols, dataRows };
}

export const getDoctorById = async (id: string) => {
  const { ...response } = await initSingle({
    sheetName: 'Doctor',
    lastColumn: DOCTOR_LAST_COLUMN,
    id,
  });

  return { ...response };
}

export const getDoctorByEmail = async (email: string) => {
  const { ...response } = await initSingle({
    sheetName: 'Doctor',
    lastColumn: DOCTOR_LAST_COLUMN,
    email,
  });

  return { ...response };
}
