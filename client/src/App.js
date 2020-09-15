import React from 'react'
import loadable from '@loadable/component'

const NavbarLink = loadable(() => import('./components/layout/Navbar'))
const PublicRoute = loadable(() => import('./routes/PublicRoute'))

const App = () => (
  <>
    <NavbarLink />
    <PublicRoute />
  </>
)

export default App
