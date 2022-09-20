import { initJoin, initSingle } from './init';
import { VISIT_LAST_COLUMN } from '../constants/visit'
import { PATIENT_LAST_COLUMN } from '../constants/patient'
import { DOCTOR_LAST_COLUMN } from '../constants/doctor'

export const getAllVisit = async (offset: number, limit: number) => {
  const { headerCols, dataRows } = await initJoin({
    sheetName: 'Visit',
    lastColumn: VISIT_LAST_COLUMN
  });

  return { headerCols, dataRows };
}

export const getVisitById = async (id: string) => {
  const visit = await initSingle({
    sheetName: 'Visit',
    lastColumn: VISIT_LAST_COLUMN,
    id,
  });

  // visit.diagnosis = JSON.parse(visit.diagnosis);
  // visit.symptomp = JSON.parse(visit.symptomp);

  if (visit.patient_id) {
    const patient = await initSingle({
      sheetName: 'Patient',
      lastColumn: PATIENT_LAST_COLUMN,
      id: visit.patient_id,
    });
    visit.patient = patient;
  }

  if (visit.patient_id) {
    const doctor = await initSingle({
      sheetName: 'Doctor',
      lastColumn: DOCTOR_LAST_COLUMN,
      id: visit.doctor_id,
    });
    visit.doctor = doctor;

  }

  return { ...visit };
}
