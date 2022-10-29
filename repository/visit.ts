import dayjs from 'dayjs';
import { initJoin, initSingle, initFilteredJoin } from './init';
import { createItem } from './create';
import { SHEET_NAME, TABLE_ENTITY, LAST_COLUMN } from '@/constants/visit';
import { LAST_COLUMN as PATIENT_LAST_COLUMN, TABLE_ENTITY as PATIENT_TABLE_ENTITY, SHEET_NAME as PATIENT_SHEET_NAME } from '@/constants/patient';
import { LAST_COLUMN as DOCTOR_LAST_COLUMN, TABLE_ENTITY as DOCTOR_TABLE_ENTITY, SHEET_NAME as DOCTOR_SHEET_NAME } from '@/constants/doctor';

export const getAllVisit = async (offset: number, limit: number) => {
  const dataRows = await initJoin({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, offset, limit, data: dataRows };
}

export const getFilteredVisit = async (offset: number, limit: number, filter: string) => {
  const dataRows = await initFilteredJoin({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    filter
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, offset, limit, data: dataRows };
}

export const getVisitById = async (id: string) => {
  const visit = await initSingle({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    id,
  });

  if (visit.patient_id) {
    const patient = await initSingle({
      sheetName: PATIENT_SHEET_NAME,
      tableEntity: PATIENT_TABLE_ENTITY,
      lastColumn: PATIENT_LAST_COLUMN,
      id: visit.patient_id,
    });
    visit.patient = patient;
  }

  if (visit.patient_id) {
    const doctor = await initSingle({
      sheetName: DOCTOR_SHEET_NAME,
      tableEntity: DOCTOR_TABLE_ENTITY,
      lastColumn: DOCTOR_LAST_COLUMN,
      id: visit.doctor_id,
    });
    visit.doctor = doctor;

  }

  return { table_name: SHEET_NAME, data: visit };
}

export const getVisitByFilter = async (filter: string) => {
  const dataRows = await initFilteredJoin({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN,
    filter,
  });

  return { table_name: SHEET_NAME, table_entity: TABLE_ENTITY, column_count: TABLE_ENTITY.length, last_column: LAST_COLUMN, filter, data: dataRows };
}

export const createVisit = async (body: any) => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const dataArray = [body.patientId, body.doctorId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, body.visitDate, 'schedule', null, null, null, null, null, null, null, currentDate]
  const response = await createItem({
    sheetName: SHEET_NAME,
    lastColumn: LAST_COLUMN,
    tableEntity: TABLE_ENTITY,
    body: dataArray
  });

  return { table_name: SHEET_NAME, data: response };
}
