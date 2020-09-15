import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import loadable from '@loadable/component'
import { history, store } from './redux/store/store'

/**
@description code splitting
*/
const App = loadable(() => import('./App'))

/**
@description render content
*/
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

/**
@description on serviceWorker if environment is production mode
*/
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in window.navigator) {
  window.onload = () => window.navigator.serviceWorker.register('/service-worker.js')
}
