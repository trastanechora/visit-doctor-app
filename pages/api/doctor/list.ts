import type { NextApiRequest, NextApiResponse } from 'next'
import { getDoctorOptions } from '../../../repository/doctor'

type ResponseData = {
  [key: string]: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const processedResult = await getDoctorOptions()
  res.status(200).json({ list: processedResult })
  return;
}

export default handler
