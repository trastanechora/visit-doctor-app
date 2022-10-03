import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllVisit, getVisitById, getVisitByFilter, createVisit } from '@/repository/visit'

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
  const { body } = req;

  if (req.method === 'POST') {
    if (req.method === 'POST') {
      const parsedBody = JSON.parse(body)
      const processedResult = await createVisit(parsedBody)
      res.status(200).json(processedResult)
    }
  }

  if (req.method === 'GET') {
    if (id) {
      const processedResult = await getVisitById(id)
      res.status(200).json(processedResult)
      return;
    }

    if (filter) {
      const processedResult = await getVisitByFilter(filter)
      res.status(200).json(processedResult)
      return;
    }

    const processedResult = await getAllVisit(Number(offset), Number(limit))
    res.status(200).json(processedResult)
    return;
  }
}

export default handler
