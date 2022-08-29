import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllDoctor, getDoctor } from '../../repository/doctor'

type Data = {
  data: any
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { query: { id, offset = 1, limit = 10 } } = req;

  if (!id) {
    const processedResult = await getAllDoctor(Number(offset), Number(limit))
    res.status(200).json({ data: processedResult })
  } else if (id && typeof id === 'string') {
    const processedResult = await getDoctor(id) // 2574551a-b8d4-4798-9ac7-8628828bfbb3
    res.status(200).json({ data: processedResult })
  }
}

export default handler
