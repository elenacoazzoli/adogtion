import { NextApiRequest, NextApiResponse } from 'next';
import { Favourite, insertFavouriteDog } from '../../../util/database';
import { Errors } from '../../../util/helpers/errors';

export type InsertFavouriteDogResponse =
  | { errors: Errors }
  | { favouriteDog: Favourite };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InsertFavouriteDogResponse>,
) {
  if (req.method === 'POST') {
    try {
      const insertedDog = await insertFavouriteDog({
        dogId: req.body.dogId,
        userId: req.body.userId,
      });

      if (!insertedDog) {
        res.status(404).send({
          errors: [
            {
              message:
                'We could not add this dog to your favourites, please try again',
            },
          ],
        });
        return;
      }
      return res.status(200).send({ favouriteDog: insertedDog });
    } catch {
      res.status(404).send({
        errors: [{ message: 'Some problems occured with your favourite' }],
      });
      return;
    }
  }

  return res.status(405);
}
