import { NextApiRequest, NextApiResponse } from 'next';
import { getAllFavouriteDogsByUserId } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const favouriteDogs = await getAllFavouriteDogsByUserId(req.body.userId);

      if (!favouriteDogs) {
        res.status(404).send({
          errors: [
            {
              message: 'We could not find your favourites, please try again',
            },
          ],
        });
        return;
      }
      return res.status(200).send({ favouriteDogs: favouriteDogs });
    } catch {
      res.status(404).send({
        errors: [{ message: 'Some problems occured with your favourite' }],
      });
      return;
    }
  }
  return res.status(405);
}
