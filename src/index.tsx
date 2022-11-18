import ReactDOM from 'react-dom';
import GlobalStyle from '@/styles/GlobalStyle';
import reportWebVitals from '@/src/reportWebVitals';
import '@/assets/font/font.css';
import { ThemeProvider } from 'styled-components';
import App from '@/src/App';
import '@/src/index.css';
import themeV1 from '@/styles/theme';
import themeV2 from '@/styles/themeV2';
import React from 'react';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={themeV1}>
      <ThemeProvider theme={themeV2}>
        <App />
      </ThemeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
