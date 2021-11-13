import { serialize } from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  // Save the token in a cookie on the user's side
  // (cookies get sent automatically to the server every time
  // a user makes a request)
  const maxAge = 60 * 60; // one hour

  return serialize('sessionToken', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    // Important for security
    httpOnly: true,
    // Set secure cookies on production (eg. Heroku)
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}
