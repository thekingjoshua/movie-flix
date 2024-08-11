import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'

import {store} from './app/store'

import ToggleColorModeProvider from './utils/toggleColorMode'

import './main.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ToggleColorModeProvider  >
      <App />
    </ToggleColorModeProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
