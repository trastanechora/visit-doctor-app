import dayjs from 'dayjs';
import { initJoin, initSingle, initFilteredJoin } from './init';
import { createItem } from './create';
import { updateItem } from './update';
import { SHEET_NAME, TABLE_ENTITY, OBJECT_ENTITY, LAST_COLUMN } from '@/constants/visit';
import { LAST_COLUMN as PATIENT_LAST_COLUMN, TABLE_ENTITY as PATIENT_TABLE_ENTITY, SHEET_NAME as PATIENT_SHEET_NAME } from '@/constants/patient';
import { LAST_COLUMN as DOCTOR_LAST_COLUMN, TABLE_ENTITY as DOCTOR_TABLE_ENTITY, SHEET_NAME as DOCTOR_SHEET_NAME } from '@/constants/doctor';

export const getAllVisit = async (offset: number, limit: number) => {
  const dataRows = await initJoin({
    sheetName: SHEET_NAME,
    tableEntity: TABLE_ENTITY,
    lastColumn: LAST_COLUMN
  });

  console.warn('[DEBUG] dataRows', dataRows)

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
    tableEntity: OBJECT_ENTITY,
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

export const examineVisit = async (body: any) => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  // -------------- ['id', 'patient_id', - 'doctor_id', 'chief_complaint', 'subjectives', 'allergy_history', 'general_condition', 'gcs', 'weight', 'height', 'blood_pressure', 'heart_rate', 'respiration_rate', 'temperature', 'o2_saturation', 'pain_scale', 'physical_examination', 'laboratory_results', 'radiology_result', 'diagnosis', 'plan_or_treatment', 'note', 'visit_date', 'status', 'scheduled_control_date', 'medicine_ids', 'medicine_amounts', 'medicine_subtotal', 'treatment_charge', 'total_treatment_raw', 'total_charge', 'total_charge_raw', 'created_date'];
  const dataArray = [body.id, body.patientId, body.doctorId, body.chiefComplaint, body.subjectives, body.allergyHistory, body.generalCondition, body.gcs, body.weight, body.height, body.bloodPressure, body.heartRate, body.respirationRate, body.temperature, body.o2Saturation, body.painScale, body.physicalExamination, body.laboratoryResult, body.radiologyResult, body.diagnose, body.planOrTreatment, body.note, null, 'examine', body.scheduledControllDate, null, null, null, null, null, null, currentDate]
  const response = await updateItem({
    sheetName: SHEET_NAME,
    lastColumn: LAST_COLUMN,
    body: dataArray
  });

  return { table_name: SHEET_NAME, data: response };
}
