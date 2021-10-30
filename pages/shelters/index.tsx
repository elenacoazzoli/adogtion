import Head from 'next/head';
import Layout from '../../components/Layout';

function Shelters() {
  return (
    <Layout>
      <Head>
        <title>Our shelters</title>
        <meta name="description" content="Austrian shelters" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <span>All shelters page</span>
    </Layout>
  );
}

export default Shelters;
