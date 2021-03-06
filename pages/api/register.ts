import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSession,
  getUserWithPasswordHash,
  insertAdopterUser,
  insertProfileInfo,
  User,
} from '../../util/database';
import { hashPassword } from '../../util/helpers/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/helpers/cookies';
import { verifyCsrfToken } from '../../util/helpers/csrf';
import { Errors } from '../../util/helpers/errors';

export type RegisterResponse = { errors: Errors } | { user: User };

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.name ||
    !req.body.surname
  ) {
    res.status(400).send({
      errors: [
        {
          message: 'Please fill in all necessary fields',
        },
      ],
    });
    return;
  }

  if (!req.body.csrfToken || !verifyCsrfToken(req.body.csrfToken)) {
    res.status(400).send({
      errors: [
        {
          message: 'Request does not contain valid csrf token',
        },
      ],
    });
    return;
  }

  try {
    const username = req.body.username;
    const email = req.body.email;
    const name = req.body.name;
    const surname = req.body.surname;

    const existingUser = await getUserWithPasswordHash(username);
    if (existingUser) {
      res.status(400).send({
        errors: [
          {
            message: 'Username already exists',
          },
        ],
      });
      return;
    }
    const passwordHash = await hashPassword(req.body.password);
    await insertAdopterUser({
      username: username,
      passwordHash: passwordHash,
    }).then(async (user) => {
      // Create the record in the sessions table with a new token

      // 1. create the token
      const token = crypto.randomBytes(64).toString('base64');

      // 2. do a DB query to add the session record
      const newSession = await createSession(token, user.id);

      // set the response to create the cookie in the browser
      const cookie = createSerializedRegisterSessionTokenCookie(
        newSession.token,
      );

      await insertProfileInfo({
        email: email,
        name: name,
        surname: surname,
        userId: user.id,
      });
      res.status(200).setHeader('set-Cookie', cookie).send({ user: user });
    });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}
