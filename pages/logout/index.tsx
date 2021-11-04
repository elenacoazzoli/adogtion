import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useUserName } from '../../components/UsernameContext';

function Logout() {
  const router = useRouter();
  const { refreshUsername } = useUserName();
  console.log('antes del refresh');
  refreshUsername();
  console.log('antes del push');
  window.location.href = '/';
  // router.push('/', undefined, { shallow: true });
  return 'Logged out';
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
    props: {},
  };
}

export default Logout;
