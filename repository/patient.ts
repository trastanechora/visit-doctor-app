import { google } from 'googleapis';

const PATIENT_LAST_COLUMN = 'K'

export const initPatient = async (offset: number = 1, limit: number = 10) => {
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
    range: `Patient!A${offset}:${PATIENT_LAST_COLUMN}${limit}`,
  })

  const rawResult = readData.data.values ? readData.data.values : [];
  const headerRow = rawResult.length > 0 ? rawResult.slice(0, 1)[0] : [];

  rawResult.shift();
  return [headerRow, rawResult]
}

export const getAllPatient = async (offset: number, limit: number) => {
  const [headerRow, rawResult] = await initPatient(offset, limit);

  return rawResult.map(row => {
    const processedRow: any = {};
    headerRow.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })
}

export const getPatient = async (id: string) => {
  const [headerRow, rawResult] = await initPatient();

  const filteredData = rawResult.filter(row => {
    if (row[0] === id) {
      return true;
    }
  })
  if (filteredData.length === 0) {
    return 'Patient Not Found!'
  }
  const processedRow: any = {};
  headerRow.forEach((key, index) => {
    processedRow[key] = filteredData[0][index];
  });
  return processedRow;
}