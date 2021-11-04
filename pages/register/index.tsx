import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Errors } from '../../util/helpers/errors';
import { RegisterResponse } from '../api/register';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout>
      <h1>Create your Adogtion account</h1>

      <form
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

          // const destination =
          //   typeof router.query.returnTo === 'string' && router.query.returnTo
          //     ? router.query.returnTo
          //     : `/users/${registerJson.user.id}`;

          // props.refreshUsername();

          // router.push(destination);
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

        <button>Register</button>
      </form>

      <div>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>{error.message}</div>
        ))}
      </div>
      <p>Already have an account? Log in</p>
    </Layout>
  );
}

export default RegisterPage;
