import { NextApiRequest, NextApiResponse } from 'next';
import { getShelterById } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const shelterInfo = await getShelterById(Number(req.query.shelter));
    res.status(200).json(shelterInfo);
  }

  return res.status(405);
}
