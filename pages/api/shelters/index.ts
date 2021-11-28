import { NextApiRequest, NextApiResponse } from 'next';
import { getAllShelters } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const shelters = await getAllShelters();
    return res.status(200).json(shelters);
  }
  return res.status(405);
}
