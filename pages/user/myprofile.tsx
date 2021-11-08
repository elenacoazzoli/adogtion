import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { User } from '../../util/database';

interface UserProfileProps {
  user: User;
}

function UserProfile({ user }: UserProfileProps) {
  return (
    <Layout>
      <Head>
        <title>Profile page</title>
        <meta name="description" content="Your profile" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <span>Profile page of {user.username}</span>
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

  // TODO: put here gSSP code for getting profile data and return props
  return {
    props: {
      user: allowedUser,
    },
  };
}

export default UserProfile;
