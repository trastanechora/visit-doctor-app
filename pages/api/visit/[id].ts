import type { NextApiRequest, NextApiResponse } from 'next'
import { examineVisit, medicineVisit } from '@/repository/visit'

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
  const { query: { id } }: RequestParameters = req;
  const { body } = req;
  const parsedBody = JSON.parse(body)

  if (req.method === 'PUT' && id) {
    if (parsedBody.action === 'examine') {
      const processedResult = await examineVisit({ ...parsedBody, id })
      res.status(200).json(processedResult)
    }

    if (parsedBody.action === 'medicine') {
      const processedResult = await medicineVisit({ ...parsedBody, id })
      res.status(200).json(processedResult)
    }
  }

  res.status(200).json({ table_name: 'Visit', data: { id: '', error: true } })
}

export default handler
