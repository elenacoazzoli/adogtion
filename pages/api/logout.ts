import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSessionByToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    if (req.cookies.sessionToken) {
      await deleteSessionByToken(req.cookies.sessionToken);

      return res.status(200).send({});
    }
  }

  return res.status(405).send({});
}
