import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllDoctor, getDoctorByFilter, getDoctorById, getDoctorByEmail, createDoctor } from '@/repository/doctor'

type RequestParameters = {
  query: RequestParametersQuery
}

type RequestParametersQuery = {
  id?: string;
  offset?: number;
  limit?: number
  filter?: string;
  email?: string;
}

type ResponseData = {
  [key: string]: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { query: { id, email, offset = 1, limit = 10, filter = '' } }: RequestParameters = req;
  const { body } = req;

  if (req.method === 'POST') {
    const parsedBody = JSON.parse(body)
    const processedResult = await createDoctor(parsedBody)
    res.status(200).json(processedResult)
  }

  if (req.method === 'GET') {
    if (email) {
      const processedResult = await getDoctorByEmail(email)
      res.status(200).json(processedResult)
      return;
    }

    if (id) {
      const processedResult = await getDoctorById(id)
      res.status(200).json(processedResult)
      return;
    }

    if (filter) {
      const processedResult = await getDoctorByFilter(filter)
      res.status(200).json(processedResult)
      return;
    }

    const processedResult = await getAllDoctor(Number(offset), Number(limit))
    res.status(200).json(processedResult)
    return;
  }
}

export default handler
