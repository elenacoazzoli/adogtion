import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';

function Favourites() {
  return (
    <Layout>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="Your favourite dogs" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <span>List of favorite dogs</span>
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
        destination: '/login?returnTo=/user/myfavourites',
        permanent: false,
      },
    };
  }
  // put here gSSP code for getting favourite dogs and return props
  return {
    props: {},
  };
}

export default Favourites;
