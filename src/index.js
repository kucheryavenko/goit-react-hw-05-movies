import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'styles';
import { App } from 'components/App/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter basename="/goit-react-hw-05-movies/">
    <ThemeProvider theme={theme}>
      <GlobalStyle styles={GlobalStyle} />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
