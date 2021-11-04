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
