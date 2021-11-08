import { GetServerSidePropsContext } from 'next';
import { deleteSessionByToken } from '../../util/database';

function Logout() {
  return 'You are logged out';
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { serialize } = await import('cookie');

  const sessionToken = context.req.cookies.sessionToken;

  if (sessionToken) {
    // fetch an api route called logout
    await deleteSessionByToken(sessionToken);

    // await fetch(`${process.env.BASE_URL}/api/logout`, {
    //   method: 'GET',
    //   headers: {
    //     cookie: sessionToken,
    //   },
    //   credentials: 'include',
    // });

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
