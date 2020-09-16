import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import loadable from '@loadable/component'
import { store } from './redux/store/store'

const App = loadable(() => import('./App'), {
  fallback: (
    <>
      <h5 className='text-dark'>Loading...</h5>
    </>
  )
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)