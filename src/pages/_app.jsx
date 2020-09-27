import React from 'react';
import App from 'next/app';
import { SWRConfig } from 'swr';
import { fetcher } from '../utils/common';
import 'semantic-ui-css/semantic.min.css';
import '../styles/app.scss';
import '../styles/index.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    );
  }
}

export default MyApp;
