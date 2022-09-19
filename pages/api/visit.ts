import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllVisit } from '../../repository/visit'

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

  const processedResult = await getAllVisit(Number(offset), Number(limit))
  res.status(200).json({ ...processedResult })
  return;
}

export default handler
