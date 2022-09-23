import { initList, initFilter, initSingle, initListOptions } from './init';
import { PATIENT_LAST_COLUMN } from '../constants/patient'

export const getAllPatient = async (offset: number, limit: number) => {
  const { headerCols, dataRows } = await initList({
    sheetName: 'Patient',
    lastColumn: PATIENT_LAST_COLUMN,
    offset,
    limit
  });

  return { headerCols, dataRows };
}

export const getPatientByFilter = async (filter: string) => {
  const { headerCols, dataRows } = await initFilter({
    sheetName: 'Patient',
    lastColumn: PATIENT_LAST_COLUMN,
    filter,
  });

  return { headerCols, dataRows };
}

export const getPatientById = async (id: string) => {
  const { ...response } = await initSingle({
    sheetName: 'Patient',
    lastColumn: PATIENT_LAST_COLUMN,
    id,
  });

  return { ...response };
}

export const getPatientOptions = async () => {
  const response = await initListOptions({
    sheetName: 'Patient',
    nameColumn: 'C',
    recordColumn: 'B'
  });

  return response;
}
