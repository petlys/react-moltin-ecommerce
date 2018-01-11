import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import Raven from 'raven-js'
import { SENTRY_DSN } from './config'
import productsDataStore from './stores/ProductsDataStore'
import checkoutStateStore from './stores/CheckoutStateStore'
import App from './App'

import 'normalize.css'
import 'animate.css'
import './styles/content.css'

Raven.config(SENTRY_DSN).install()

ReactDOM.render(
  <Provider productsDataStore={productsDataStore} checkoutStateStore={checkoutStateStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // $FlowFixMe
  document.getElementById('root')
)
