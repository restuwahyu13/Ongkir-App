import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import { loginReducer } from '../reducers/login'
import { registerReducer } from '../reducers/register'
import { ongkirReducer } from '../reducers/ongkir'
import { activationReducer } from '../reducers/activation'
import { forgotReducer } from '../reducers/forgot'
import { resetReducer } from '../reducers/reset'
import { resendReducer } from '../reducers/resend'
import { profileReducer } from '../reducers/profile'
import {
  socialLoginGoogleReducer,
  socialLoginFbReducer,
  socialLoginGithubReducer,
  socialRegisterGoogleReducer,
  socialRegisterFbReducer,
  socialRegisterGithubReducer
} from '../reducers/social'

// const reduxLogger = process.env.NODE_ENV !== 'production' && logger
export const history = createBrowserHistory()
export const store = createStore(
  combineReducers({
    register: registerReducer,
    login: loginReducer,
    ongkir: ongkirReducer,
    activation: activationReducer,
    forgot: forgotReducer,
    reset: resetReducer,
    resend: resendReducer,
    profile: profileReducer,
    socialLoginGoogle: socialLoginGoogleReducer,
    socialLoginFb: socialLoginFbReducer,
    socialLoginGithub: socialLoginGithubReducer,
    socialRegisterGoogle: socialRegisterGoogleReducer,
    socialRegisterFb: socialRegisterFbReducer,
    socialRegisterGithub: socialRegisterGithubReducer,
    router: connectRouter(history)
  }),
  applyMiddleware(thunk, routerMiddleware(history))
)
