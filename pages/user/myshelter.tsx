import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { DogType, ShelterType, User } from '../../util/database';

interface ShelterAdminProps {
  user: User;
  dogs: DogType[];
  info: ShelterType;
}

function ShelterAdmin({ user, dogs, info }: ShelterAdminProps) {
  return (
    <Layout>
      <Head>
        <title>Admin page</title>
        <meta name="description" content="Shelter admin" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <span>Admin page of {user.username}</span>
      <span>Admin page of {info.shelterName}</span>
      {dogs.map((dog) => (
        <p key={dog.dogId}>{dog.dogName}</p>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserBySessionToken } = await import('../../util/database');

  const allowedUser = await getUserBySessionToken(
    context.req.cookies.sessionToken,
  );

  if (!allowedUser) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/login?returnTo=/user/myprofile',
        permanent: false,
      },
    };
  }

  if (allowedUser.roleId !== 2) {
    return {
      redirect: {
        destination: '/user/myprofile',
        permanent: false,
      },
    };
  }
  const baseUrl = process.env.BASE_URL;
  const dogsResponse = await fetch(
    `${baseUrl}/api/shelteradmin/${allowedUser.shelterId}`,
  );

  const shelterDogs = await dogsResponse.json();

  const infoResponse = await fetch(
    `${baseUrl}/api/shelters/${allowedUser.shelterId}`,
  );

  const shelterInfo = await infoResponse.json();

  // TODO: put here gSSP code for getting profile data and return props

  return {
    props: {
      user: allowedUser,
      dogs: shelterDogs,
      info: shelterInfo,
    },
  };
}

export default ShelterAdmin;
