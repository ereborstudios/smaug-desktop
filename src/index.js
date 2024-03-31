import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import sessionStorageCache from './sessionStorageCache.jsx';
import Breakpoints from './components/Breakpoints.jsx';

window.cache = sessionStorageCache;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="ereborstudios.us.auth0.com"
      clientId="nWLVxZ7n3UItLzdEBZfdtM1qqAFD20vR"
      redirectUri={window.location.origin}
      cache={sessionStorageCache}
    >
      <Breakpoints />
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
