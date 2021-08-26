import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { CssBaseline } from '@material-ui/core'
import { StoreProvider } from './store'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from 'theme.js'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <StoreProvider>
          <CssBaseline />
          <SnackbarProvider
            autoHideDuration={2000}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          >
            <App />
          </SnackbarProvider>
        </StoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
