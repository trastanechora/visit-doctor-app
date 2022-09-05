import { google } from 'googleapis';

interface InitDBProps {
  sheetName: string;
  lastColumn: string;
  offset?: number;
  limit?: number;
}

interface InitFilteredDBProps {
  sheetName?: string;
  lastColumn?: string;
  searchColumn?: string;
  searchValue?: string;
}

export const initDB = async (props: InitDBProps) => {
  const {
    sheetName,
    lastColumn,
    offset = 0,
    limit = 12,
  } = props

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

  const readData = await googleSheetsInstance.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges: [
      `${sheetName}!A1:${lastColumn}2`,
      `${sheetName}!A${offset + 2}:${lastColumn}${limit + 2}`
    ]
  })
  const keyRow = readData.data.valueRanges ? readData.data.valueRanges[0].values ? readData.data.valueRanges[0].values[0] : [] : [];
  const headerRow = readData.data.valueRanges ? readData.data.valueRanges[0].values ? readData.data.valueRanges[0].values[1] : [] : [];
  const dataRow = readData.data.valueRanges ? readData.data.valueRanges[1].values : [];

  return {
    keyRow,
    headerRow,
    dataRow
  }
}