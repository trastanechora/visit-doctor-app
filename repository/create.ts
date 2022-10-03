import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';

interface CreateProps {
  sheetName: string;
  lastColumn: string;
  tableEntity: string[];
  body: any[];
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
    private_key: (process.env.GOOGLE_API_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  },
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});
const spreadsheetId = process.env.SPREAD_SHEET_ID;

export const createItem = async (props: CreateProps) => {
  const {
    sheetName,
    lastColumn,
    tableEntity,
    body
  } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const response = await googleSheetsInstance.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:${lastColumn}`,
    includeValuesInResponse: true,
    insertDataOption: 'INSERT_ROWS',
    responseValueRenderOption: 'FORMATTED_VALUE',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [uuidv4(), ...body]
      ]
    }
  })

  const dataRows = response?.data?.updates?.updatedData?.values || [];

  const processedResponse = dataRows!.map(row => {
    const processedRow: any = {};
    tableEntity!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  return processedResponse[0];
}