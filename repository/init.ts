import { google } from 'googleapis';

interface InitListProps {
  sheetName: string;
  tableEntity: string[];
  lastColumn: string;
  offset?: number;
  limit?: number;
}

interface InitFilteredDBProps {
  sheetName: string;
  tableEntity: string[];
  lastColumn: string;
  filter: string;
}

interface InitSingleProps {
  sheetName: string;
  tableEntity: string[];
  lastColumn: string;
  id?: string;
  email?: string;
}

interface InitJoinedDBProps {
  sheetName: string;
  tableEntity: string[];
  lastColumn: string;
}

interface InitJoinedFilterDBProps {
  sheetName: string;
  tableEntity: string[];
  lastColumn: string;
  filter: string;
}

interface InitListOptionsProps {
  sheetName: string;
  nameColumn: string;
  recordColumn?: string;
  stockColumn?: string;
  priceColumn?: string;
  codeColumn?: string;
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
    tableEntity,
    lastColumn,
    offset = 0,
    limit = 12,
  } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const readData = await googleSheetsInstance.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges: [
      `${sheetName}!A${offset + 1}:${lastColumn}${limit + 1}`
    ]
  })

  const dataRow = readData.data.valueRanges ? readData.data.valueRanges[0].values : [];

  const dataRows = dataRow!.map(row => {
    const processedRow: any = {};
    tableEntity!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  return dataRows;
}

export const initFilter = async (props: InitFilteredDBProps) => {
  const {
    sheetName,
    tableEntity,
    lastColumn,
    filter,
  } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const queryData = await googleSheetsInstance.spreadsheets.values.update({
    spreadsheetId,
    range: `QueryList!A1:${lastColumn}`,
    includeValuesInResponse: true,
    valueInputOption: 'USER_ENTERED',
    responseValueRenderOption: 'FORMATTED_VALUE',
    requestBody: {
      values: [
        [`=QUERY(${sheetName}!A1:${lastColumn},"select * where (${filter})", 1)`]
      ],
    }
  })

  const dataRow = queryData.data.updatedData ? queryData.data.updatedData.values ? queryData.data.updatedData.values : [] : [];
  dataRow.shift();

  const dataRows = dataRow!.map(row => {
    const processedRow: any = {};
    tableEntity!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  return dataRows;
}

export const initSingle = async (props: InitSingleProps) => {
  const { id, email, sheetName, lastColumn, tableEntity } = props

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
        [id ? `=QUERY(${sheetName}!A1:${lastColumn},"select * where (A = '${id}')", 1)` : `=QUERY(${sheetName}!A1:${lastColumn},"select * where (C = '${email}')", 1)`]
      ],
    }
  })

  const dataRow = queryData.data.updatedData ? queryData.data.updatedData.values ? queryData.data.updatedData.values : [] : [];
  dataRow.shift();

  const dataRows = dataRow!.map(row => {
    const processedRow: any = {};
    tableEntity!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  return dataRows[0];
}

export const initJoin = async (props: InitJoinedDBProps) => {
  const {
    sheetName,
    tableEntity,
    lastColumn,
  } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const queryData = await googleSheetsInstance.spreadsheets.values.update({
    spreadsheetId,
    range: `QueryJoin!A1:${lastColumn}`,
    includeValuesInResponse: true,
    valueInputOption: 'USER_ENTERED',
    responseValueRenderOption: 'FORMATTED_VALUE',
    requestBody: {
      values: [
        [`=SUPERSQL("SELECT v.id, p.name as patient_name, d.name as doctor_name, v.visit_date, v.status FROM ? v LEFT JOIN ? p ON v.patient_id = p.id LEFT JOIN ? d ON v.doctor_id = d.id ORDER BY v.created_date ASC", ${sheetName}!A1:${lastColumn}, Patient!A1:K, Doctor!A1:P)`]
      ],
    }
  })

  const dataRows = queryData.data.updatedData ? queryData.data.updatedData.values ? queryData.data.updatedData.values : [] : [];
  dataRows.shift();
  console.warn('[DEBUG] queryData', queryData)

  const processedDataRows = dataRows!.map(row => {
    const processedRow: any = {};
    tableEntity!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  return processedDataRows;
}

export const initFilteredJoin = async (props: InitJoinedFilterDBProps) => {
  const {
    sheetName,
    tableEntity,
    lastColumn,
    filter
  } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  const queryData = await googleSheetsInstance.spreadsheets.values.update({
    spreadsheetId,
    range: `QueryJoin!A1:${lastColumn}`,
    includeValuesInResponse: true,
    valueInputOption: 'USER_ENTERED',
    responseValueRenderOption: 'FORMATTED_VALUE',
    requestBody: {
      values: [
        [`=SUPERSQL("SELECT v.id, p.name as patient_name, d.name as doctor_name, v.visit_date, v.temperature, v.weight, v.height, v.diagnosis, v.scheduled_control_date, v.status, v.total_charge FROM ? v LEFT JOIN ? p ON v.patient_id = p.id LEFT JOIN ? d ON v.doctor_id = d.id WHERE ${filter}", ${sheetName}!A1:${lastColumn}, Patient!A1:K, Doctor!A1:P)`]
      ],
    }
  })

  const dataRow = queryData.data.updatedData ? queryData.data.updatedData.values ? queryData.data.updatedData.values : [] : [];
  dataRow.shift();

  const dataRows = dataRow!.map(row => {
    const processedRow: any = {};
    tableEntity!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  return dataRows;
}

export const initListOptions = async (props: InitListOptionsProps) => {
  const {
    sheetName,
    nameColumn,
    recordColumn,
    stockColumn,
    codeColumn,
    priceColumn
  } = props

  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

  let ranges = [];
  if (recordColumn) {
    ranges = [
      `${sheetName}!A2:A`,
      `${sheetName}!${nameColumn}2:${nameColumn}`,
      `${sheetName}!${recordColumn}2:${recordColumn}`
    ]
  } else if (stockColumn) {
    ranges = [
      `${sheetName}!A2:A`,
      `${sheetName}!${nameColumn}2:${nameColumn}`,
      `${sheetName}!${stockColumn}2:${stockColumn}`,
      `${sheetName}!${codeColumn}2:${codeColumn}`,
      `${sheetName}!${priceColumn}2:${priceColumn}`
    ]
  } else {
    ranges = [
      `${sheetName}!A2:A`,
      `${sheetName}!${nameColumn}2:${nameColumn}`
    ]
  }

  const readData = await googleSheetsInstance.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges
  })

  const rawIdStack = readData.data.valueRanges ? readData.data.valueRanges[0].values : [];
  const rawNameStack = readData.data.valueRanges ? readData.data.valueRanges[1].values : [];

  const idStack = rawIdStack?.map((id) => {
    const [rawId] = id;
    return rawId;
  })

  const nameStack = rawNameStack?.map((name) => {
    const [rawName] = name;
    return rawName;
  })

  if (recordColumn) {
    const rawRecordStack = readData.data.valueRanges ? readData.data.valueRanges[2].values : [];
    const recordStack = rawRecordStack?.map((rm) => {
      const [rawRm] = rm;
      return rawRm;
    })
    return idStack?.map((id, index) => ({ id, text: nameStack ? nameStack[index] : '', record_number: recordStack ? recordStack[index] : '' }));
  } else if (stockColumn) {
    const rawStockStack = readData.data.valueRanges ? readData.data.valueRanges[2].values : [];
    const rawCodeStack = readData.data.valueRanges ? readData.data.valueRanges[3].values : [];
    const rawPriceStack = readData.data.valueRanges ? readData.data.valueRanges[4].values : [];
    const stockStack = rawStockStack?.map((rm) => {
      const [rawRm] = rm;
      return rawRm;
    })
    const codeStack = rawCodeStack?.map((rm) => {
      const [rawRm] = rm;
      return rawRm;
    })
    const priceStack = rawPriceStack?.map((rm) => {
      const [rawRm] = rm;
      return rawRm;
    })
    return idStack?.map((id, index) => ({ id, text: nameStack ? nameStack[index] : '', stock: stockStack ? stockStack[index] : '', code: codeStack ? codeStack[index] : '', price: priceStack ? priceStack[index] : '' }
    ));
  } else {
    return idStack?.map((id, index) => ({ id, text: nameStack ? nameStack[index] : '' }));
  }
}