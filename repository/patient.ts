import dayjs from 'dayjs';
import { initList, initFilter, initSingle, initListOptions } from './init';
import { createItem } from './create';
import { updateItem } from './update';
import { SHEET_NAME, LAST_COLUMN, TABLE_ENTITY } from '../constants/patient';

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

export const createPatient = async (body: any) => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const dataArray = ['=INDIRECT(ADDRESS(ROW()-1,COLUMN()))+1', body.name, body.idNumber, body.gender, body.dateOfBirth, null, null, body.address, body.maritalStatus, body.phone, body.guarantorPhone, currentDate, currentDate, body.currentUser]
  const response = await createItem({
    sheetName: SHEET_NAME,
    lastColumn: LAST_COLUMN,
    tableEntity: TABLE_ENTITY,
    body: dataArray
  });

  return { table_name: SHEET_NAME, data: response };
}

export const updatePatient = async (body: any) => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const dataArray = [body.id, null, body.name, body.idNumber, body.gender, body.dateOfBirth, null, null, body.address, body.maritalStatus, body.phone, body.guarantorPhone, null, currentDate, body.currentUser]
  const response = await updateItem({
    sheetName: SHEET_NAME,
    lastColumn: LAST_COLUMN,
    body: dataArray
  });

  return { table_name: SHEET_NAME, data: response };
}