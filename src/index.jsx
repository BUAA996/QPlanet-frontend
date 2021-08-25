import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import { StoreProvider } from "./store";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const outerTheme = createTheme({
  palette: {
    secondary: {
      main: '#8ED0F9',
    },
    primary: {
      main: '#149DF1'
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={outerTheme}>
      <BrowserRouter>
        <StoreProvider>
          <CssBaseline />
          <SnackbarProvider
            autoHideDuration={2000}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
          >
            <App />
          </SnackbarProvider>
        </StoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
