import React from 'react';
import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { Configuration } from 'react-md';
import '../app.scss';

const App = ({ Component, pageProps }) => {
  const { session } = pageProps
  return (
    <Provider options={{ site: process.env.SITE }} session={session}>
      <Head>
        <title>Home - FrenchBench</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500:700&display=swap" />
      </Head>
      <Configuration>
        <Component {...pageProps} />
      </Configuration>
    </Provider>
  )
};

export default App;
