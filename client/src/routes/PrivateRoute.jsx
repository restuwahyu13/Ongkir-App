import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthLocal, isAuthSocial } from '../services/authenticate'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => isAuthLocal() || isAuthSocial()
  const isRoute = () => {
    return <Route {...rest} render={() => (isAuth() ? <Component /> : <Redirect to='/signin' />)} />
  }
  return <> {isRoute()} </>
}

export default PrivateRoute
