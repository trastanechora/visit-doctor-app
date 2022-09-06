import type { NextApiRequest, NextApiResponse } from 'next'
// import { getAllDoctor, getDoctor } from '../../repository/doctor'
import { getAllDoctor, getDoctorByFilter, getDoctorById } from '../../repository/doctor'

type RequestParameters = {
  query: RequestParametersQuery
}

type RequestParametersQuery = {
  id?: string;
  offset?: number;
  limit?: number
  filter?: string;
}

type ResponseData = {
  [key: string]: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { query: { id, offset = 1, limit = 10, filter = '' } }: RequestParameters = req;

  if (filter) {
    const processedResult = await getDoctorByFilter(filter)
    res.status(200).json({ ...processedResult })
    return;
  }

  if (id) {
    const processedResult = await getDoctorById(id)
    res.status(200).json({ ...processedResult })
    return;
  }

  const processedResult = await getAllDoctor(Number(offset), Number(limit))
  res.status(200).json({ ...processedResult })
  return;
}

export default handler
