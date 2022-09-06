import { google } from 'googleapis';

interface InitListProps {
  sheetName: string;
  lastColumn: string;
  offset?: number;
  limit?: number;
}

interface InitFilteredDBProps {
  sheetName: string;
  lastColumn: string;
  filter: string;
}

interface InitSingleProps {
  sheetName: string;
  lastColumn: string;
  id: string;
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
    private_key: (process.env.GOOGLE_API_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  },
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});
const spreadsheetId = process.env.SPREAD_SHEET_ID;

export const initList = async (props: InitListProps) => {
  const {
    sheetName,
    lastColumn,
    offset = 0,
    limit = 12,
  } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const readData = await googleSheetsInstance.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges: [
      `${sheetName}!A1:${lastColumn}2`,
      `${sheetName}!A${offset + 2}:${lastColumn}${limit + 2}`
    ]
  })
  const rawKeys = readData.data.valueRanges ? readData.data.valueRanges[0].values ? readData.data.valueRanges[0].values[1] : [] : [];
  const headerRow = readData.data.valueRanges ? readData.data.valueRanges[0].values ? readData.data.valueRanges[0].values[0] : [] : [];
  const dataRow = readData.data.valueRanges ? readData.data.valueRanges[1].values : [];

  const dataRows = dataRow!.map(row => {
    const processedRow: any = {};
    rawKeys!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  const headerCols = headerRow.map(objectString => {
    return JSON.parse(objectString)
  })

  return { headerCols, dataRows };
}

export const initFilter = async (props: InitFilteredDBProps) => {
  const {
    sheetName,
    lastColumn,
    filter,
  } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const readData = await googleSheetsInstance.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:${lastColumn}1`,
  })

  const queryData = await googleSheetsInstance.spreadsheets.values.update({
    spreadsheetId,
    range: `QueryList!A1:${lastColumn}`,
    includeValuesInResponse: true,
    valueInputOption: 'USER_ENTERED',
    responseValueRenderOption: 'FORMATTED_VALUE',
    requestBody: {
      values: [
        [`=QUERY(${sheetName}!A2:${lastColumn},"select * where (${filter})", 1)`]
      ],
    }
  })

  const rawKeys = queryData.data.updatedData ? queryData.data.updatedData.values ? queryData.data.updatedData.values[0] : [] : [];
  const headerRow = readData.data.values ? readData.data.values[0] : [];
  const dataRow = queryData.data.updatedData ? queryData.data.updatedData.values ? queryData.data.updatedData.values : [] : [];
  dataRow.shift();

  const dataRows = dataRow!.map(row => {
    const processedRow: any = {};
    rawKeys!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  const headerCols = headerRow.map(objectString => {
    return JSON.parse(objectString)
  })

  return { headerCols, dataRows };
}

export const initSingle = async (props: InitSingleProps) => {
  const { id, sheetName, lastColumn } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const queryData = await googleSheetsInstance.spreadsheets.values.update({
    spreadsheetId,
    range: `QueryItem!A1:${lastColumn}`,
    includeValuesInResponse: true,
    valueInputOption: 'USER_ENTERED',
    responseValueRenderOption: 'FORMATTED_VALUE',
    requestBody: {
      values: [
        [`=QUERY(${sheetName}!A2:${lastColumn},"select * where (A = '${id}')", 1)`]
      ],
    }
  })

  const rawKeys = queryData.data.updatedData ? queryData.data.updatedData.values ? queryData.data.updatedData.values[0] : [] : [];
  const dataRow = queryData.data.updatedData ? queryData.data.updatedData.values ? queryData.data.updatedData.values : [] : [];
  dataRow.shift();

  const dataRows = dataRow!.map(row => {
    const processedRow: any = {};
    rawKeys!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  return { ...dataRows[0] };
}