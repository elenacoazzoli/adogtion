import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSession,
  deleteExpiredSessions,
  getUserWithPasswordHash,
  User,
} from '../../util/database';
import { verifyHashPassword } from '../../util/helpers/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/helpers/cookies';
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

    // password doesn't match to hash in DB
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

    // clean old sessions
    deleteExpiredSessions(userWithPasswordHash.id);

    // create the token andd the user id to sessions
    // 1. create the token
    const token = crypto.randomBytes(64).toString('base64');

    // 2. so a query to add a session record
    const newSession = await createSession(token, userWithPasswordHash.id);
    // set the response to create the cookie in the browser
    const cookie = createSerializedRegisterSessionTokenCookie(newSession.token);

    // removing password hash from the response
    const { passwordHash, ...user } = userWithPasswordHash;

    // set Cookies from server side
    res.status(200).setHeader('Set-Cookie', cookie).send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}
