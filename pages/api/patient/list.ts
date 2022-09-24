import type { NextApiRequest, NextApiResponse } from 'next'
import { getPatientOptions } from '../../../repository/patient'

type ResponseData = {
  [key: string]: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const processedResult = await getPatientOptions()
  res.status(200).json(processedResult)
  return;
}

export default handler
