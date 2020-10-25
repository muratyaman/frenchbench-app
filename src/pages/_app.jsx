import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import '../styles/app.scss';
import '../styles/index.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="community,charity,help,neighbourhood,exchange,barter,products,services" />
          <title>FrenchBench Communities</title>
          <link href="/manifest.json" rel="manifest" />
          <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link href="/icons/apple-icon.png"    rel="apple-touch-icon" />
          <meta name="theme-color" content="#800080" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
