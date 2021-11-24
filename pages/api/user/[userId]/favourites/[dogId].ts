import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteFavouriteDog,
  Favourite,
  getFavouriteById,
  insertFavouriteDog,
} from '../../../../../util/database';
import { Errors } from '../../../../../util/helpers/errors';

export type FavouriteDogResponse =
  | { errors: Errors }
  | { favouriteDog: Favourite };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FavouriteDogResponse>,
) {
  if (req.method === 'GET') {
    try {
      const favouriteDog = await getFavouriteById({
        dogId: Number(req.query.dogId),
        userId: Number(req.query.userId),
      });

      if (!favouriteDog) {
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
      return res.status(200).send({ favouriteDog: favouriteDog });
    } catch {
      res.status(404).send({
        errors: [{ message: 'Some problems occured with your favourite' }],
      });
      return;
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedFavourite = await deleteFavouriteDog({
        dogId: Number(req.query.dogId),
        userId: Number(req.query.userId),
      });
      return res.status(200).send({ favouriteDog: deletedFavourite });
    } catch {
      res.status(404).send({
        errors: [{ message: 'Dog not found' }],
      });
      return;
    }
  } else if (req.method === 'POST') {
    try {
      const insertedFavouriteDog = await insertFavouriteDog({
        dogId: Number(req.query.dogId),
        userId: Number(req.query.userId),
      });
      return res.status(200).send({ favouriteDog: insertedFavouriteDog });
    } catch {
      res.status(404).send({
        errors: [{ message: 'Dog not found' }],
      });
      return;
    }
  }
  return res.status(405);
}
