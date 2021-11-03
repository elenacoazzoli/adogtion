import { NextApiRequest, NextApiResponse } from 'next';
import { getOneDog } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const individualDog = await getOneDog(Number(req.query.dog));

    res.status(200).json(individualDog);
  }

  return res.status(405);
}
