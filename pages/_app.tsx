import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useCallback, useEffect, useState } from 'react';
import GlobalStyle from '../components/GlobalStyle';
import UsernameContext from '../components/UsernameContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string | undefined>();

  const refreshUsername = useCallback(async () => {
    console.log('callback');
    const response = await fetch('/api/profile');
    const profile = await response.json();

    console.log('user received', profile);

    if ('errors' in profile) {
      console.log('error', profile.errors);
      return;
    }
    setUsername(profile.user.username);
  }, []);

  useEffect(() => {
    console.log('estoy funcionando');
    refreshUsername();
  }, [refreshUsername]);

  return (
    <UsernameContext.Provider
      value={{
        username,
        refreshUsername,
      }}
    >
      <GlobalStyle />
      <Component {...pageProps} />
    </UsernameContext.Provider>
  );
}

export default MyApp;
