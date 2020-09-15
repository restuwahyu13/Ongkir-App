import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { activationActionCreator } from '../redux/actions/activation'

const CheckToken = ({ match, Component }) => {
  const state = useSelector(({ activation }) => activation)
  const dispatch = useDispatch()
  const { id } = match.params
  const { expired } = state

  useEffect(() => {
    dispatch(activationActionCreator('ACTIVATION_SUCCESS', { id }))
  }, [])

  const isRoute = () => {
    return expired ? <Redirect to={{ pathname: `/verify-activation/${id}` }} /> : <Component id={id} />
  }
  return <> {isRoute()} </>
}

const PrivateActivationRoute = ({ component: Component, ...rest }) => {
  const isRoute = () => {
    return <Route {...rest} render={(props) => <CheckToken {...props} Component={Component} />} />
  }
  return <> {isRoute()} </>
}

export default PrivateActivationRoute
