import { NextApiRequest, NextApiResponse } from 'next';
import {
  getDonationsByUserId,
  getUserBySessionToken,
  insertDogDonation,
} from '../../../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const donations = await getDonationsByUserId(Number(req.query.userId));

      return res.status(200).send(donations);
    } catch {
      res.status(404).send({
        errors: [{ message: 'Some problems occured with your donation' }],
      });
      return;
    }
  } else if (req.method === 'POST') {
    try {
      await getUserBySessionToken(req.cookies.sessionToken).then(
        async (response) => {
          if (response && response.id === Number(req.query.userId)) {
            const insertedDonation = await insertDogDonation({
              dogId: req.body.dogId,
              userId: Number(req.query.userId),
              amount: req.body.amount,
            });
            return res.status(200).send({ donation: insertedDonation });
          } else {
            return res.status(401).send({
              errors: [{ message: 'Not allowed' }],
            });
          }
        },
      );
    } catch {
      res.status(404).send({
        errors: [{ message: 'Some problems occured with your donation' }],
      });
      return;
    }
  }
  return res.status(405);
}
