import { NextApiRequest, NextApiResponse } from 'next';
import { getUserWithPasswordHash, User } from '../../util/database';
import { verifyHashPassword } from '../../util/helpers/auth';
import { Errors } from '../../util/helpers/errors';

export type LoginResponse = { errors: Errors } | { user: User };

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [
        {
          message: 'Your login does not contain any username or password',
        },
      ],
    });
    return;
  }

  // future to do: query first if username already exist and then send back error in case
  try {
    const username = req.body.username;
    const userWithPasswordHash = await getUserWithPasswordHash(username);

    // username doesn't match to any user in DB
    if (!userWithPasswordHash) {
      res.status(401).send({
        errors: [
          {
            message: 'Username or password does not match',
          },
        ],
      });
      return;
    }

    const isPasswordVerified = await verifyHashPassword(
      req.body.password,
      userWithPasswordHash.passwordHash,
    );

    // password doesn't match to any hash in DB
    if (!isPasswordVerified) {
      res.status(401).send({
        errors: [
          {
            message: 'Username or password does not match',
          },
        ],
      });
      return;
    }

    const { passwordHash, ...user } = userWithPasswordHash;
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
