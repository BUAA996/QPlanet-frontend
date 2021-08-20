import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import {CssBaseline} from '@material-ui/core';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
