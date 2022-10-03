import dayjs from 'dayjs';
import { initList, initFilter, initSingle, initListOptions } from './init';
import { createItem } from './create';
import { updateItem } from './update';

import { SHEET_NAME, LAST_COLUMN, TABLE_ENTITY } from '../constants/medicine'

export const getAllMedicine = async (offset: number, limit: number) => {
  const dataRows = await initList({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    offset,
    limit
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, offset, limit, data: dataRows };
}

export const getMedicineByFilter = async (filter: string) => {
  const dataRows = await initFilter({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    filter,
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, filter, data: dataRows };
}

export const getMedicineById = async (id: string) => {
  const response = await initSingle({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    id,
  });

  return { table_name: SHEET_NAME, data: response };
}

export const getMedicineOptions = async () => {
  const response = await initListOptions({
    sheetName: SHEET_NAME,
    nameColumn: 'B',
    stockColumn: 'G'
  });

  return { table_name: SHEET_NAME, data: response };
}

export const createMedicine = async (body: any) => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const dataArray = [body.name, body.code, body.description, body.price, body.price, body.stock, currentDate, currentDate, body.currentUser, '-']
  const response = await createItem({
    sheetName: SHEET_NAME,
    lastColumn: LAST_COLUMN,
    tableEntity: TABLE_ENTITY,
    body: dataArray
  });

  return { table_name: SHEET_NAME, data: response };
}

export const updateMedicine = async (body: any) => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const dataArray = [body.id, body.name, body.code, body.description, body.price, body.price, body.stock, null, currentDate, body.currentUser, '-']
  const response = await updateItem({
    sheetName: SHEET_NAME,
    lastColumn: LAST_COLUMN,
    body: dataArray
  });

  return { table_name: SHEET_NAME, data: response };
}