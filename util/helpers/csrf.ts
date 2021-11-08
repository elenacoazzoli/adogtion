import Tokens from 'csrf';

const tokens = new Tokens();

export function createToken() {
  return tokens.create(
    // In a real application, this would be
    // more secure if we were to change this
    // value on every request (for example,
    // with the session token)
    process.env.CSRF_SECRET as string,
  );
}

export function verifyCsrfToken(token: string) {
  return tokens.verify(process.env.CSRF_SECRET as string, token);
}
