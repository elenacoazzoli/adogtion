import bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyHashPassword(password: string, password_hash: string) {
  return bcrypt.compare(password, password_hash);
}
