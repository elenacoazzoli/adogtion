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

export default Favourites;
