import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllFavouriteDogsByUserId,
  getUserBySessionToken,
} from '../../../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      await getUserBySessionToken(req.cookies.sessionToken).then(
        async (response) => {
          if (response && response.id === Number(req.query.userId)) {
            const favouriteDogs = await getAllFavouriteDogsByUserId(
              Number(req.query.userId),
            );

            return res.status(200).send({ favouriteDogs: favouriteDogs });
          } else {
            return res.status(401).send({
              errors: [{ message: 'Not allowed' }],
            });
          }
        },
      );
    } catch {
      res.status(404).send({
        errors: [{ message: 'Some problems occured with your favourite' }],
      });
      return;
    }
  }
  return res.status(405);
}
