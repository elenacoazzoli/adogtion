import Head from 'next/head';
import Layout from '../../components/Layout';

function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
        <meta name="description" content="Log in" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <span>Log in page</span>
    </Layout>
  );
}

export default Login;
