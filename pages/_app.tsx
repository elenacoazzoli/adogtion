import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import GlobalStyle from '../components/GlobalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
