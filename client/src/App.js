import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import loadable from '@loadable/component'
import { history } from './redux/store/store'

const NavbarLink = loadable(() => import('./components/layout/Navbar'))
const PrivateActivationRoute = loadable(() => import('./routes/PrivateActivationRoute'))
const PrivateResetRoute = loadable(() => import('./routes/PrivateResetRoute'))
const Login = loadable(() => import('./components/auth/Login'))
const Register = loadable(() => import('./components/auth/Register'))
const Profile = loadable(() => import('./components/pages/Profile'))
const OngkirApp = loadable(() => import('./components/pages/Ongkir'))
const Activation = loadable(() => import('./components/auth/Activation'))
const ForgotPassword = loadable(() => import('./components/auth/Forgot'))
const ResetPassword = loadable(() => import('./components/auth/Reset'))
const ResendToken = loadable(() => import('./components/auth/Resend'))
const VerifyActivation = loadable(() => import('./components/auth/VerifyActivation'))
const VerifyReset = loadable(() => import('./components/auth/VerifyReset'))
const Logout = loadable(() => import('./components/auth/Logout'))
const NotFound = loadable(() => import('./components/NotFound'))

const App = () => (
  <Router>
    <>
      <NavbarLink />
      <Switch>
        <Route exact path="/" component={OngkirApp} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/profile" component={Profile} />
        <PrivateActivationRoute path="/activation/:id" component={Activation} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/resend-token" component={ResendToken} />
        <PrivateResetRoute path="/reset-password/:id" component={ResetPassword} />
        <Route path="/verify-activation/:id" component={VerifyActivation} />
        <Route path="/verify-reset/:id" component={VerifyReset} />
        <Route path="/logout" component={Logout} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  </Router>
)

export default App
