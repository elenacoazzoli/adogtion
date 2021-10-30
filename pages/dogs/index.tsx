import Head from 'next/head';
import Layout from '../../components/Layout';

function Dogs() {
  return (
    <Layout>
      <Head>
        <title>Our dogs</title>
        <meta name="description" content="Dogs available for adoption" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <span>All dogs page</span>
    </Layout>
  );
}

export default Dogs;
