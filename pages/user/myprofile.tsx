import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';

function UserProfile() {
  return (
    <Layout>
      <Head>
        <title>Profile page</title>
        <meta name="description" content="Your profile" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <span>Profile page</span>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../../util/database');

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
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
  // put here gSSP code for getting favourite dogs and return props
  return {
    props: {},
  };
}

export default UserProfile;
