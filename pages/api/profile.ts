import { NextApiRequest, NextApiResponse } from 'next';
import { getUser, getValidSessionByToken, User } from '../../util/database';
import { RegisterResponse } from './register';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (req.method === 'GET') {
    const token = req.cookies.sessionToken;
    const session = await getValidSessionByToken(token);

    if (!session) {
      res.status(404).send({
        errors: [{ message: 'Not a valid Session' }],
      });
      return;
    }

    const user = (await getUser(session.userId)) as User | undefined;

    if (!user) {
      res.status(404).send({
        errors: [{ message: 'User not found' }],
      });
      return;
    }

    return res.status(200).send({ user: user });
  }
  return res.status(405);
}
