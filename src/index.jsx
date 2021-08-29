import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {SnackbarProvider} from 'notistack'
import {CssBaseline} from '@material-ui/core'
import {StoreProvider} from './store'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from 'theme.js'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <StoreProvider>
          <DndProvider backend={HTML5Backend}>
            <CssBaseline/>
            <SnackbarProvider
              autoHideDuration={2000}
              anchorOrigin={{horizontal: 'center', vertical: 'top'}}
            >
              <App/>
            </SnackbarProvider>
          </DndProvider>
        </StoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
