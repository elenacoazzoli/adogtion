import { NextApiRequest, NextApiResponse } from 'next';
import { insertAdopterUser, User } from '../../util/database';
import { hashPassword } from '../../util/helpers/auth';
import { Errors } from '../../util/helpers/errors';

export type RegisterResponse = { errors: Errors } | { user: User };

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [
        {
          message:
            'Your registration does not contain any username or password',
        },
      ],
    });
    return;
  }

  // future to do: query first if username already exist and then send back error in case
  try {
    const username = req.body.username;
    const passwordHash = await hashPassword(req.body.password);
    const user = await insertAdopterUser({
      username: username,
      passwordHash: passwordHash,
    });
    res.send({ user: user });
  } catch (err) {
    res.status(500).send({
      errors: [
        {
          message: 'Username already taken. Choose a different username',
        },
      ],
    });
  }
}
