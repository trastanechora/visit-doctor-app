import { google } from 'googleapis';
import { getPatient } from './patient'
import { getDoctor } from './doctor'
import { getMultipleMedicine } from './medicine'

const VISIT_LAST_COLUMN = 'Q'

export const initVisit = async (offset: number = 1, limit: number = 10) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_API_PRIVATE_KEY,
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
  const spreadsheetId = process.env.SPREAD_SHEET_ID;

  // Read from the spreadsheet
  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `Visit!A${offset}:${VISIT_LAST_COLUMN}${limit}`,
  })

  const rawResult = readData.data.values ? readData.data.values : [];
  const headerRow = rawResult.length > 0 ? rawResult.slice(0, 1)[0] : [];

  rawResult.shift();
  return [headerRow, rawResult]
}

export const getAllVisit = async (offset: number, limit: number) => {
  const [headerRow, rawResult] = await initVisit(offset, limit);

  const promises = rawResult.map(async (row) => {
    const processedRow: any = {};
    let patientId = '';
    let doctorId = '';
    let medicineIds: string[] = [];
    headerRow.forEach((key, index) => {
      if (key === 'patientId') {
        patientId = row[index]
      } else if (key === 'doctorId') {
        doctorId = row[index]
      } else if (key === 'medicineIds') {
        medicineIds = row[index]
      } else {
        processedRow[key] = row[index];
      }
    });

    processedRow.patient = await getPatient(patientId);
    processedRow.doctor = await getDoctor(doctorId);
    processedRow.medicines = await getMultipleMedicine(medicineIds);
    return processedRow;
  })

  return Promise.all(promises);
}

export const getVisit = async (id: string) => {
  const [headerRow, rawResult] = await initVisit();

  const filteredData = rawResult.filter(row => {
    if (row[0] === id) {
      return true;
    }
  })
  if (filteredData.length === 0) {
    return 'Visit Not Found!'
  }

  let patientId = '';
  let doctorId = '';
  let medicineIds: string[] = [];

  const processedRow: any = {};
  headerRow.forEach((key, index) => {
    if (key === 'patientId') {
      patientId = filteredData[0][index]
    } else if (key === 'doctorId') {
      doctorId = filteredData[0][index]
    } else if (key === 'medicineIds') {
      medicineIds = filteredData[0][index]
    } else {
      processedRow[key] = filteredData[0][index];
    }
  });

  processedRow.patient = await getPatient(patientId);
  processedRow.doctor = await getDoctor(doctorId);
  processedRow.medicines = await getMultipleMedicine(medicineIds);

  return processedRow;
}