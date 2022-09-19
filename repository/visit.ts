import { initJoin } from './init';
import { VISIT_LAST_COLUMN } from '../constants/visit'

export const getAllVisit = async (offset: number, limit: number) => {
  const { headerCols, dataRows } = await initJoin({
    sheetName: 'Visit',
    lastColumn: VISIT_LAST_COLUMN
  });

  return { headerCols, dataRows };

  // const { queryData, headerRow } = await initJoin({
  //   sheetName: 'Visit',
  //   lastColumn: VISIT_LAST_COLUMN
  // });

  // return { queryData, headerRow }
}
