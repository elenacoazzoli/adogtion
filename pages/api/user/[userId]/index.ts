import { NextApiRequest, NextApiResponse } from 'next';
import {
  getProfileInfoByUserId,
  updateProfileInfoById,
  User,
} from '../../../../util/database';
import { Errors } from '../../../../util/helpers/errors';

export type AdopterResponse = { errors: Errors } | { profile: User };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AdopterResponse>,
) {
  if (req.method === 'GET') {
    const profileInfo = await getProfileInfoByUserId(Number(req.query.userId));
    return res.status(200).send({ profile: profileInfo });
  } else if (req.method === 'PUT') {
    console.log('put body', req.body);
    const updatedProfileInfo = await updateProfileInfoById(
      Number(req.query.userId),
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
