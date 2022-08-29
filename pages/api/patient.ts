import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPatient, getPatient } from '../../repository/patient'

type Data = {
  data: any
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { query: { id, offset = 1, limit = 10 } } = req;

  if (!id) {
    const processedResult = await getAllPatient(Number(offset), Number(limit))
    res.status(200).json({ data: processedResult })
  } else if (id && typeof id === 'string') {
    const processedResult = await getPatient(id) // 1d7f5e81-6dd5-4feb-b695-ded386f540a7
    res.status(200).json({ data: processedResult })
  }
}

export default handler
