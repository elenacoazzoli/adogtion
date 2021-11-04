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

export default UserProfile;
