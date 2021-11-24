import { NextApiRequest, NextApiResponse } from 'next';
import { updateProfileInfoById, User } from '../../../util/database';
import { Errors } from '../../../util/helpers/errors';

export type UpdateAdopterResponse = { errors: Errors } | { profile: User };

export default async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateAdopterResponse>,
) {
  if (req.method === 'PUT') {
    console.log(req.body);
    const updatedProfileInfo = await updateProfileInfoById(
      req.body.userId,
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.age,
      req.body.gender,
      req.body.size,
      req.body.activityLevel,
      req.body.kids,
      req.body.pets,
      req.body.service,
    );

    if (!updatedProfileInfo) {
      res.status(404).send({
        errors: [{ message: 'User not found' }],
      });
      return;
    }
    return res.status(200).send({ profile: updatedProfileInfo });
  }

  return res.status(405);
}
