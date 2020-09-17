import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import loadable from '@loadable/component'
import { store } from './redux/store/store'

/**
@description code splitting
*/
const App = loadable(() => import('./App'), {
  fallback: (
    <>
      <h5 className='text-dark'>Loading...</h5>
    </>
  )
})

/**
@description render content
*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

/**
@description on serviceWorker if environment is production mode
*/
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in window.navigator) {
  window.onload = () => window.navigator.serviceWorker.register('/service-worker.js')
}
