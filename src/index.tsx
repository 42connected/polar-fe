import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/src/App';
import GlobalStyle from '@/styles/GlobalStyle';
import reportWebVitals from '@/src/reportWebVitals';
import Providers from '@/components/v2/common/Providers';
import '@/assets/font/font.css';
import '@/src/index.css';

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
