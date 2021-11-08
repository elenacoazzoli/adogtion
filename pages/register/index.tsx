import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useUserName } from '../../components/UsernameContext';
import { Errors } from '../../util/helpers/errors';
import { RegisterResponse } from '../api/register';

const BlobBackgroundImageLeft = styled.img`
  position: absolute;
  top: 0px;
  left: -180px;
  z-index: -2;
  width: 840px;
`;

const DoodleImageRight = styled.img`
  position: absolute;
  transform: rotate(-15deg);
  top: 300px;
  right: 100px;
  z-index: -1;
  width: 500px;
`;

const BlobBackgroundImageRight = styled.img`
  position: absolute;
  top: 200px;
  right: -200px;
  z-index: -2;
  width: 740px;
`;

const RegisterSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 40%;
`;

const H1Styled = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 3rem;
  margin: 32px 0 16px 0;
  box-shadow: inset 0 -16px 0 #efd5d2;
`;

const RegisterSubTitleStyled = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #2f3b4d;
  font-weight: 500;
  font-size: 1rem;
  margin: 8px 0 0 0;
  text-align: center;
`;

const RegisterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 32px 0 32px;
  padding: 24px;
  width: 40%;
`;

const LabelsAndInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  justify-content: center;
  margin-top: 12px;
`;

const LabelStyled = styled.label`
  margin: 4px 0 4px 0;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
`;
const InputStyled = styled.input`
  width: 100%;
  height: 32px;
  padding: 4px 8px;
  border: 2px solid #dfe3e9;
  border-radius: 8px;
  font-size: 1rem;

  &::placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
  }
`;

const ButtonStyled = styled.button`
  background-color: #343f53;
  border: 2px solid transparent;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  text-align: center;
  font-size: 1rem;
  border-color: #343f53;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  margin-top: 24px;
  padding: 12px 36px;
  border-radius: 12px;
  cursor: pointer;
  :hover {
    text-decoration: underline 2px solid #efd5d2;
  }
`;
const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 300;
  font-size: 1rem;
  text-align: center;
  margin: 32px 0 0 0;
`;

const PageLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  color: #343f53;
  font-weight: 500;
  font-size: 1rem;
  border-bottom: 2px solid #343f53;
  margin-left: 4px;
`;

interface RegisterProps {
  csrfToken: string;
}

function RegisterPage({ csrfToken }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  const { refreshUsername } = useUserName();

  return (
    <Layout>
      <Head>
        <title>Login</title>
        <meta name="description" content="Sign up and create a new profile" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>

      <BlobBackgroundImageLeft src="/shapes/shape3.svg" />
      <BlobBackgroundImageRight src="/shapes/shape1.svg" />
      <DoodleImageRight src="/shapes/DogJumpDoodle.svg" />
      <RegisterSectionStyled>
        <HeadingContainer>
          <H1Styled>Create your account</H1Styled>
          <RegisterSubTitleStyled>
            <b>Welcome!</b> Register below and create your new Adogtion account.
          </RegisterSubTitleStyled>
        </HeadingContainer>

        <RegisterFormContainer
          onSubmit={async (event) => {
            event.preventDefault();
            // do something with the values
            const registerResponse = await fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              // this body will be the res.body of the API route
              body: JSON.stringify({
                username: username,
                password: password,
                csrfToken: csrfToken,
              }),
            });
            // casting of registerJson
            const registerJson =
              (await registerResponse.json()) as RegisterResponse;

            // if registerJson contains errors, setErrors
            if ('errors' in registerJson) {
              setErrors(registerJson.errors);
              return;
            }

            const destination =
              typeof router.query.returnTo === 'string' && router.query.returnTo
                ? router.query.returnTo
                : `/user/myprofile`;

            refreshUsername();

            router.push(destination);
          }}
        >
          <LabelsAndInputsContainer>
            <LabelStyled htmlFor="username">Username </LabelStyled>
            <InputStyled
              id="username"
              required
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </LabelsAndInputsContainer>
          <LabelsAndInputsContainer>
            <LabelStyled htmlFor="passowrd">Password</LabelStyled>
            <InputStyled
              id="password"
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </LabelsAndInputsContainer>

          <ButtonStyled>Register</ButtonStyled>
        </RegisterFormContainer>

        <div>
          {errors.map((error) => (
            <div key={`error-${error.message}`}>{error.message}</div>
          ))}
        </div>
        <ParagraphStyled>
          Already have an account?
          <Link href="/login" passHref>
            <PageLink>Log in</PageLink>
          </Link>
        </ParagraphStyled>
      </RegisterSectionStyled>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../../util/database');
  const { createToken } = await import('../../util/helpers/csrf');

  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: createToken(),
    },
  };
}

export default RegisterPage;
