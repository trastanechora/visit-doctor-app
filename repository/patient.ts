import { initList, initFilter, initSingle, initListOptions } from './init';
import { SHEET_NAME, LAST_COLUMN, TABLE_ENTITY } from '../constants/patient'

export const getAllPatient = async (offset: number, limit: number) => {
  const dataRows = await initList({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    offset,
    limit
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, offset, limit, data: dataRows };
}

export const getPatientByFilter = async (filter: string) => {
  const dataRows = await initFilter({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    filter,
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, filter, data: dataRows };
}

export const getPatientById = async (id: string) => {
  const response = await initSingle({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    id,
  });

  return { table_name: SHEET_NAME, data: response };
}

export const getPatientOptions = async () => {
  const response = await initListOptions({
    sheetName: SHEET_NAME,
    nameColumn: 'C',
    recordColumn: 'B'
  });

  return { table_name: SHEET_NAME, data: response };
}
