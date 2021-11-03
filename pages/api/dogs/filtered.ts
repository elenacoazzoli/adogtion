import { NextApiRequest, NextApiResponse } from 'next';
import { getFirstFourDogs } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const dogs = await getFirstFourDogs();
    return res.status(200).json(dogs);
  }

  return res.status(405);
}
