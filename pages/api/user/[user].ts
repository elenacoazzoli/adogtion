import { NextApiRequest, NextApiResponse } from 'next';
import { getProfileInfoByUserId } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const profileInfo = await getProfileInfoByUserId(Number(req.query.user));
    res.status(200).json(profileInfo);
  }

  return res.status(405);
}
