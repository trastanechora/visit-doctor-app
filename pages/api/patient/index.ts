import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPatient, getPatientByFilter, getPatientById } from '../../../repository/patient'

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

  if (id) {
    const processedResult = await getPatientById(id)
    res.status(200).json({ ...processedResult })
    return;
  }

  if (filter) {
    const processedResult = await getPatientByFilter(filter)
    res.status(200).json({ ...processedResult })
    return;
  }

  const processedResult = await getAllPatient(Number(offset), Number(limit))
  res.status(200).json({ ...processedResult })
  return;
}

export default handler
