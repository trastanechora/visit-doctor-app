import { google } from 'googleapis';

interface InitFindRowBProps {
  id: string;
  sheetName: string;
  idColumn?: string;
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
    private_key: (process.env.GOOGLE_API_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  },
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});
const spreadsheetId = process.env.SPREAD_SHEET_ID;

export const updateItem = async (props: any) => {
  const {
    sheetName,
    lastColumn,
    body
  } = props

  const idColumn = 'A'
  const [id, ...rest] = body;

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const queryData = await googleSheetsInstance.spreadsheets.values.update({
    spreadsheetId,
    range: `FindRow!${idColumn}1:${idColumn}`,
    includeValuesInResponse: true,
    valueInputOption: 'USER_ENTERED',
    responseValueRenderOption: 'FORMATTED_VALUE',
    requestBody: {
      values: [
        [`=MATCH("${id}", ${sheetName}!A1:A, 0)`]
      ],
    }
  })

  const rowNumber = queryData.data.updatedData?.values ? queryData.data.updatedData?.values[0][0] : '';

  const readData = await googleSheetsInstance.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A${rowNumber}:${lastColumn}${rowNumber}`,
    includeValuesInResponse: true,
    responseValueRenderOption: 'FORMATTED_VALUE',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [null, ...rest]
      ]
    }
  })

  return readData;
}