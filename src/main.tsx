import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {Provider} from 'react-redux'

import {store} from './app/store'
const theme = createTheme({})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
