import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

export type DogType = {
  dogId: number;
  dogName: string;
  dogDescription: string;
  age: number;
  gender: string;
  size: number;
  activityLevel: string;
  kids: boolean;
  pets: boolean;
  service: boolean;
  image: string;
};

export type ShelterType = {
  shelterId: number;
  shelterName: string;
  shelterDescription: string;
  address: string;
  region: string;
  phone: string;
};

export type DogAndShelterType = DogType & ShelterType;

export type User = {
  id: number;
  username: string;
  roleId: number;
  shelterId: number | null;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};

// read the environment variables in the .env file to connect to Postgres
dotenvSafe.config();

declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When we're in development, make sure that we connect only
    // once to the database
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// Connect to postgres (only once)
const sql = connectOneTimeToDatabase();

export async function getAllDogs() {
  const dogs = await sql<DogAndShelterType[]>`
    SELECT
      dogs.id AS dog_id,
      dogs.dog_name,
      dogs.dog_description,
      dogs.age,
      dogs.gender,
      dogs.size,
      dogs.activity_level,
      dogs.kids,
      dogs.pets,
      dogs.service,
      dogs.image,
      shelters.id AS shelter_id,
      shelters.shelter_name,
      shelters.shelter_description,
      shelters.address,
      shelters.region,
      shelters.phone
     FROM
      dogs, shelters
     WHERE
      dogs.shelter = shelters.id;
  `;

  return dogs.map((dog) => {
    // Convert snake case to camelCase
    return camelcaseKeys(dog);
  });
}

export async function getFirstFourDogs() {
  const dogs = await sql<DogAndShelterType[]>`
    SELECT
      dogs.id AS dog_id,
      dogs.dog_name,
      dogs.dog_description,
      dogs.age,
      dogs.gender,
      dogs.size,
      dogs.activity_level,
      dogs.kids,
      dogs.pets,
      dogs.service,
      dogs.image,
      shelters.id AS shelter_id,
      shelters.shelter_name,
      shelters.shelter_description,
      shelters.address,
      shelters.region,
      shelters.phone
     FROM
      dogs, shelters
     WHERE
      dogs.shelter = shelters.id
    LIMIT 4;
  `;
  return dogs.map((onedog) => {
    // Convert snake case to camelCase
    return camelcaseKeys(onedog);
  });
}

export async function getOneDog(id: number) {
  const individualDog = await sql<DogAndShelterType[]>`
    SELECT
      dogs.id AS dog_id,
      dogs.dog_name,
      dogs.dog_description,
      dogs.age,
      dogs.gender,
      dogs.size,
      dogs.activity_level,
      dogs.kids,
      dogs.pets,
      dogs.service,
      dogs.image,
      shelters.id AS shelter_id,
      shelters.shelter_name,
      shelters.shelter_description,
      shelters.address,
      shelters.region,
      shelters.phone
     FROM
      dogs, shelters
     WHERE
      dogs.shelter = shelters.id AND
      dogs.id = ${id};
  `;
  return camelcaseKeys(individualDog[0]);
}

export async function getDogsByShelterId(id: number) {
  const dogsOfShelter = await sql<DogType[]>`
    SELECT
      dogs.id AS dog_id,
      dogs.dog_name,
      dogs.dog_description,
      dogs.age,
      dogs.gender,
      dogs.size,
      dogs.activity_level,
      dogs.kids,
      dogs.pets,
      dogs.service,
      dogs.image
     FROM
      dogs
     WHERE
      dogs.shelter = ${id}
  `;
  return dogsOfShelter.map((onedog) => {
    // Convert snake case to camelCase
    return camelcaseKeys(onedog);
  });
}

export async function insertAdopterUser({
  username,
  passwordHash,
}: {
  username: string;
  passwordHash: string;
}) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (username, password_hash, role_id)
  VALUES
  (${username}, ${passwordHash}, 1)
  RETURNING
  id,
  username,
  role_id,
  shelter_id;
  `;
  return camelcaseKeys(user);
}

export async function getUser(id: number) {
  const [user] = await sql<[User]>`
  SELECT
  id,
  username,
  role_id,
  shelter_id
  FROM users
  WHERE
  id= ${id};
  `;
  return camelcaseKeys(user);
}

export async function getUserWithPasswordHash(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
  SELECT
  id,
  username,
  password_hash,
  role_id,
  shelter_id
  FROM users
  WHERE
  username= ${username};
  `;
  return user && camelcaseKeys(user);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;
  return camelcaseKeys(session);
}

export async function deleteExpiredSessions(userId: number) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW() AND
      user_id = ${userId}
    RETURNING
      *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > NOW()
  `;

  return session && camelcaseKeys(session);
}

export async function getUserBySessionToken(sessionToken: string | undefined) {
  if (!sessionToken) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username,
      users.role_id,
      users.shelter_id
    FROM
      sessions,
      users
    WHERE
      sessions.token = ${sessionToken} AND
      sessions.user_id = users.id
  `;
  return user && camelcaseKeys(user);
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING
      *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function getShelterById(shelterId: number | undefined) {
  if (!shelterId) return undefined;
  const [shelter] = await sql<[ShelterType | undefined]>`
    SELECT
      shelters.id AS shelter_id,
      shelters.shelter_name,
      shelters.shelter_description,
      shelters.address,
      shelters.region,
      shelters.phone
    FROM
      shelters
    WHERE
      shelters.id = ${shelterId}
  `;
  return shelter && camelcaseKeys(shelter);
}

export async function updateShelterById(
  shelterId: number,
  shelterName: string,
  description: string,
  address: string,
  region: string,
  phone: string,
) {
  if (!shelterId) return undefined;
  const [shelter] = await sql<[ShelterType | undefined]>`
  UPDATE shelters
    SET
      shelter_name = ${shelterName},
      shelter_description = ${description},
      address = ${address},
      region = ${region},
      phone = ${phone}
    WHERE
      id = ${shelterId}
    RETURNING *
  `;
  return shelter && camelcaseKeys(shelter);
}

export async function deleteDogById(dogId: number) {
  const dogs = await sql<DogType[]>`
    DELETE FROM
      dogs
    WHERE
      id = ${dogId}
    RETURNING
      *
  `;
  return dogs.map((dog) => camelcaseKeys(dog))[0];
}

export async function insertNewDog({
  dogName,
  description,
  age,
  gender,
  size,
  activityLevel,
  kids,
  pets,
  shelter,
  service,
  image,
}: {
  dogName: string;
  description: string;
  age: number;
  gender: string;
  size: number;
  activityLevel: string;
  kids: boolean;
  pets: boolean;
  shelter: number;
  service: boolean;
  image: string;
}) {
  const [dog] = await sql<[DogType | undefined]>`
    INSERT INTO dogs
    (dog_name, dog_description, age, gender, size, activity_level, kids, pets, shelter, service, image)
    VALUES
    (${dogName}, ${description}, ${age}, ${gender}, ${size}, ${activityLevel}, ${kids}, ${pets}, ${shelter}, ${service}, ${image})
    RETURNING
    id,
    dog_name,
    dog_description,
    age,
    gender,
    activity_level,
    kids,
    pets,
    service,
    image;
    `;
  return dog && camelcaseKeys(dog);
}
