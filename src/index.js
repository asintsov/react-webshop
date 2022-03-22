import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { GlobalStyles } from './global-styles'

import App from './App'
import { store } from './redux/store'
import { ReduxConnectedColorThemeProvider } from './providers'

ReactDOM.render(
  <Provider store={store}>
    <ReduxConnectedColorThemeProvider>
      <App />
      <GlobalStyles />
    </ReduxConnectedColorThemeProvider>
  </Provider>,
  document.getElementById('root')
)
