import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllMedicine, getMedicine } from '../../repository/medicine'

type Data = {
  data: any
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { query: { id, offset = 1, limit = 10 } } = req;

  if (!id) {
    const processedResult = await getAllMedicine(Number(offset), Number(limit))
    res.status(200).json({ data: processedResult })
  } else if (id && typeof id === 'string') {
    const processedResult = await getMedicine(id) // f2c9db51-323c-4a32-90c3-e3015d8608fe
    res.status(200).json({ data: processedResult })
  }
}

export default handler
