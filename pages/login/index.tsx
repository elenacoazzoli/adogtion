import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useUserName } from '../../components/UsernameContext';
import { Errors } from '../../util/helpers/errors';
import { LoginResponse } from '../api/login';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  const { refreshUsername } = useUserName();
  return (
    <Layout>
      <h1>Log into your Adogtion account</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // do something with the values
          const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // this body will be the res.body of the API route
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
          // casting of loginJson
          const loginJson = (await loginResponse.json()) as LoginResponse;

          // if loginJson contains errors, setErrors
          if ('errors' in loginJson) {
            setErrors(loginJson.errors);
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
        <label>
          Username
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>

        <button>Login</button>
      </form>

      <div>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
      <p>Don't have an account yet? Sign up</p>
    </Layout>
  );
}

export default LoginPage;
