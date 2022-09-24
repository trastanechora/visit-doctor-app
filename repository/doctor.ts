import { initList, initFilter, initSingle, initListOptions } from './init';
import { SHEET_NAME, LAST_COLUMN, TABLE_ENTITY } from '../constants/doctor'

export const getAllDoctor = async (offset: number, limit: number) => {
  const dataRows = await initList({
    sheetName: SHEET_NAME,
    lastColumn: LAST_COLUMN,
    tableEntity: TABLE_ENTITY,
    offset,
    limit
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, offset, limit, data: dataRows };
}

export const getDoctorByFilter = async (filter: string) => {
  const dataRows = await initFilter({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    filter,
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, filter, data: dataRows };
}

export const getDoctorById = async (id: string) => {
  const response = await initSingle({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    id,
  });

  return { table_name: SHEET_NAME, data: response };
}

export const getDoctorByEmail = async (email: string) => {
  const response = await initSingle({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    email,
  });

  return { table_name: SHEET_NAME, data: response };
}

export const getDoctorOptions = async () => {
  const response = await initListOptions({
    sheetName: SHEET_NAME,
    nameColumn: 'B'
  });

  return { table_name: SHEET_NAME, data: response };
}