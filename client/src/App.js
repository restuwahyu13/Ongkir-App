import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'

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
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <PrivateActivationRoute exact path="/activation/:id" component={Activation} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/resend-token" component={ResendToken} />
        <PrivateResetRoute exact path="/reset-password/:id" component={ResetPassword} />
        <Route exact path="/verify-activation/:id" component={VerifyActivation} />
        <Route exact path="/verify-reset/:id" component={VerifyReset} />
        <Route exact path="/logout" component={Logout} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  </Router>
)

export default App
