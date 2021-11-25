import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteFavouriteDog,
  Favourite,
  getFavouriteById,
  getUserBySessionToken,
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
      await getUserBySessionToken(req.cookies.sessionToken).then(
        async (response) => {
          if (response && response.id === Number(req.query.userId)) {
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
  } else if (req.method === 'DELETE') {
    try {
      await getUserBySessionToken(req.cookies.sessionToken).then(
        async (response) => {
          if (response && response.id === Number(req.query.userId)) {
            const deletedFavourite = await deleteFavouriteDog({
              dogId: Number(req.query.dogId),
              userId: Number(req.query.userId),
            });
            return res.status(200).send({ favouriteDog: deletedFavourite });
          } else {
            return res.status(401).send({
              errors: [{ message: 'Not allowed' }],
            });
          }
        },
      );
    } catch {
      res.status(404).send({
        errors: [{ message: 'Dog not found' }],
      });
      return;
    }
  } else if (req.method === 'POST') {
    try {
      await getUserBySessionToken(req.cookies.sessionToken).then(
        async (response) => {
          if (response && response.id === Number(req.query.userId)) {
            const insertedFavouriteDog = await insertFavouriteDog({
              dogId: Number(req.query.dogId),
              userId: Number(req.query.userId),
            });
            return res.status(200).send({ favouriteDog: insertedFavouriteDog });
          } else {
            return res.status(401).send({
              errors: [{ message: 'Not allowed' }],
            });
          }
        },
      );
    } catch {
      res.status(404).send({
        errors: [{ message: 'Dog not found' }],
      });
      return;
    }
  }
  return res.status(405);
}
