import { GetServerSidePropsContext } from 'next';

function Logout() {
  return 'You are logged out';
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { serialize } = await import('cookie');

  const sessionToken = context.req.cookies.sessionToken;

  if (sessionToken) {
    // fetch an api route called logout
    await fetch(`${process.env.BASE_URL}/api/logout`);

    context.res.setHeader(
      'Set-Cookie',
      serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}

export default Logout;
