import { NextApiRequest, NextApiResponse } from 'next';
import {
  getShelterById,
  ShelterType,
  updateShelterById,
} from '../../../../util/database';
import { Errors } from '../../../../util/helpers/errors';

export type ShelterResponse = { errors: Errors } | { shelter: ShelterType };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShelterResponse>,
) {
  if (req.method === 'GET') {
    const shelterInfo = await getShelterById(Number(req.query.shelterId));
    if (!shelterInfo) {
      res.status(404).send({
        errors: [{ message: 'Shelter not found' }],
      });
      return;
    }
    return res.status(200).send({ shelter: shelterInfo });
  } else if (req.method === 'PUT') {
    const updatedShelterInfo = await updateShelterById(
      req.body.shelterId,
      req.body.shelterName,
      req.body.description,
      req.body.address,
      req.body.region,
      req.body.phone,
    );

    if (!updatedShelterInfo) {
      res.status(404).send({
        errors: [{ message: 'Shelter not found' }],
      });
      return;
    }
    return res.status(200).send({ shelter: updatedShelterInfo });
  }

  return res.status(405);
}
