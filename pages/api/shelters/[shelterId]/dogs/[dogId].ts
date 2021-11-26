import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteDogById,
  getUserBySessionToken,
} from '../../../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    try {
      await getUserBySessionToken(req.cookies.sessionToken).then(
        async (response) => {
          if (
            response &&
            response.roleId === 2 &&
            response.shelterId === Number(req.query.shelterId)
          ) {
            const deletedDogs = await deleteDogById(
              Number(req.query.dogId),
              Number(req.query.shelterId),
            );
            res.status(200).json(deletedDogs);
          } else {
            return res.status(401).send({
              errors: [{ message: 'Not allowed' }],
            });
          }
        },
      );
    } catch {
      res.status(404).send({
        errors: [{ message: 'Not found' }],
      });
      return;
    }
  }

  return res.status(405);
}
