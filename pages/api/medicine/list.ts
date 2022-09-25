import type { NextApiRequest, NextApiResponse } from 'next'
import { getMedicineOptions } from '../../../repository/medicine'

type ResponseData = {
  [key: string]: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const processedResult = await getMedicineOptions()
  res.status(200).json(processedResult)
  return;
}

export default handler
