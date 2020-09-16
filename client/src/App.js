import React from 'react'
import loadable from '@loadable/component'

const PublicRoute = loadable(() => import('./routes/PublicRoute'))

const App = () => (
  <>
    <PublicRoute />
  </>
)

export default App
