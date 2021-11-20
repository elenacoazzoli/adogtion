import { NextApiRequest, NextApiResponse } from 'next';
import { deleteFavouriteDog } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    try {
      const deletedFavourite = await deleteFavouriteDog({
        dogId: req.body.dogId,
        userId: req.body.userId,
      });
      res.status(200).json(deletedFavourite);
    } catch {
      res.status(404).send({
        errors: [{ message: 'Dog not found' }],
      });
      return;
    }
  }
  return res.status(405);
}
