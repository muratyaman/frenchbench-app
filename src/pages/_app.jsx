import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/app.scss';

function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default App;
