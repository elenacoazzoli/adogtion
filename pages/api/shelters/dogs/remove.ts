import { NextApiRequest, NextApiResponse } from 'next';
import { deleteDogById } from '../../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    try {
      const deletedDogs = await deleteDogById(req.body.dogId);
      res.status(200).json(deletedDogs);
    } catch {
      res.status(404).send({
        errors: [{ message: 'Dog not found' }],
      });
      return;
    }
  }

  return res.status(405);
}
