import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllVisit, getVisit } from '../../repository/visit'

type Data = {
  data: any
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { query: { id, offset = 1, limit = 10 } } = req;

  if (!id) {
    const processedResult = await getAllVisit(Number(offset), Number(limit))
    res.status(200).json({ data: processedResult })
  } else if (id && typeof id === 'string') {
    const processedResult = await getVisit(id) // 9ca1f6fd-572f-4b8b-9a48-c66083f7e3f1
    res.status(200).json({ data: processedResult })
  }
}

export default handler
