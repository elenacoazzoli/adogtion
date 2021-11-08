import { NextApiRequest, NextApiResponse } from 'next';
import { getDogsByShelterId } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const shelterDogs = await getDogsByShelterId(
      Number(req.query.shelteradmin),
    );

    res.status(200).json(shelterDogs);
  }

  return res.status(405);
}
