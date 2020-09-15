import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { resetIdactionCreator } from '../redux/actions/reset'

const CheckToken = ({ match, history, Component }) => {
  const state = useSelector(({ reset }) => reset)
  const dispatch = useDispatch()
  const { id } = match.params
  const { expired } = state

  useEffect(() => {
    dispatch(resetIdactionCreator('RESET_SUCCESS_ID', { id }))
  }, [])

  const isRoute = () => {
    return expired ? <Redirect to={{ pathname: `/verify-reset/${id}` }} /> : <Component hs={history} id={id} />
  }
  return <> {isRoute()} </>
}

const PrivateResetRoute = ({ component: Component, ...rest }) => {
  const isRoute = () => {
    return <Route {...rest} render={(props) => <CheckToken {...props} Component={Component} />} />
  }
  return <> {isRoute()} </>
}

export default PrivateResetRoute
