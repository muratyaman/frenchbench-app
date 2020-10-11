import React from 'react';
import App from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import '../styles/app.scss';
import '../styles/index.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps} />
    );
  }
}

export default MyApp;
