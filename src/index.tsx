import ReactDOM from 'react-dom';
import GlobalStyle from '@/styles/GlobalStyle';
import reportWebVitals from '@/src/reportWebVitals';
import '@/assets/font/font.css';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@/styles/theme';
import App from '@/src/App';
import '@/src/index.css';
import React from 'react';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
