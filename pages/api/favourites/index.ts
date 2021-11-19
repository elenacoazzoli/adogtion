import { NextApiRequest, NextApiResponse } from 'next';
import { getFavouriteById } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const favouriteDog = await getFavouriteById({
        dogId: req.body.dogId,
        userId: req.body.userId,
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
  }
  return res.status(405);
}
