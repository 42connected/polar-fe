import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import reportWebVitals from './reportWebVitals';
import Providers from './components/common/Providers';
import './assets/font/font.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
