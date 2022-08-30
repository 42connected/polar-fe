import ReactDOM from 'react-dom';
import GlobalStyle from './styles/GlobalStyle';
import reportWebVitals from './reportWebVitals';
import './assets/font/font.css';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './styles/theme';
import App from './App';
import './index.css';
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

//curryyou.tistory.com/468 [카레유:티스토리]

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
