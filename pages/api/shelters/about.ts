import { NextApiRequest, NextApiResponse } from 'next';
import { ShelterType, updateShelterById } from '../../../util/database';
import { Errors } from '../../../util/helpers/errors';

export type UpdateShelterResponse =
  | { errors: Errors }
  | { shelter: ShelterType };

export default async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateShelterResponse>,
) {
  if (req.method === 'PUT') {
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
