import Head from 'next/head';
import Layout from '../../components/Layout';

function Blog() {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
        <meta name="description" content="All news about dogs" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <span>List of blog posts</span>
    </Layout>
  );
}

export default Blog;
