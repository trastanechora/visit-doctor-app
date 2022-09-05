// import { google } from 'googleapis';
import { initDB } from './init';

const DOCTOR_LAST_COLUMN = 'P'

export const getAllDoctor = async (offset: number, limit: number) => {
  const { keyRow, headerRow, dataRow } = await initDB({
    sheetName: 'Doctor',
    lastColumn: DOCTOR_LAST_COLUMN,
    offset,
    limit
  });

  const list = dataRow!.map(row => {
    const processedRow: any = {};
    keyRow!.forEach((key, index) => {
      processedRow[key] = row[index];
    });
    return processedRow;
  })

  return {
    list,
    header: keyRow,
    headerObjects: headerRow!.map(objectString => {
      return JSON.parse(objectString)
    }),
  }
}
