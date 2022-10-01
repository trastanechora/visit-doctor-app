import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllMedicine, getMedicineByFilter, getMedicineById, createMedicine, updateMedicine } from '@/repository/medicine'

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

  if (req.method === 'PUT' && id) {
    const parsedBody = JSON.parse(body)
    const processedResult = await updateMedicine({ ...parsedBody, id })
    res.status(200).json(processedResult)
  }
}

export default handler
