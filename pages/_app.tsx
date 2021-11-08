import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useCallback, useEffect, useState } from 'react';
import GlobalStyle from '../components/GlobalStyle';
import UsernameContext from '../components/UsernameContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string | undefined>();
  const [role, setRole] = useState<number | undefined>();

  const refreshUsername = useCallback(async () => {
    const response = await fetch('/api/profile');
    const profile = await response.json();

    if ('errors' in profile) {
      setUsername(undefined);
      setRole(undefined);
      return;
    }
    setUsername(profile.user.username);
    setRole(profile.user.roleId);
  }, []);

  useEffect(() => {
    refreshUsername();
  }, [refreshUsername]);

  return (
    <UsernameContext.Provider
      value={{
        username,
        role,
        refreshUsername,
      }}
    >
      <GlobalStyle />
      <Component {...pageProps} />
    </UsernameContext.Provider>
  );
}

export default MyApp;
