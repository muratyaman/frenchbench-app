import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/app.scss';
import '../styles/index.css';

function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default App;
