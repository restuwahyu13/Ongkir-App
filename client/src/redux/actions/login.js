import axios from 'axios'
import { setAuthLocal } from '../../services/authenticate'

export const loginState = {
  type: '',
  messages: [],
  btnText: 'Sign in',
  btnDisabled: false
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_CLEANUP = 'LOGIN_CLEANUP'

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200 && res.headers['content-type'] === 'application/json') {
      res.headers['accept'] = 'application/json'
      res.headers['content-type'] = 'application/json'
      res.config.headers['Accept'] = 'application/json'
      res.config.headers['Content-Type'] = 'application/json'
      return res
    }
  },
  (err) => Promise.reject(err)
)

export const loginActionCreator = (type, payload) => {
  return (dispatch) => {
    axios
      .post('/api/auth/user/login', {
        username: payload.username,
        password: payload.password
      })
      .then(({ data }) => {
        setAuthLocal(data.token, () => {})
        dispatch({
          type,
          payload: {
            type: LOGIN_SUCCESS,
            messages: data.success,
            btnText: payload.btnText,
            btnDisabled: payload.btnDisabled
          }
        })

        setTimeout(() => {
          dispatch({
            type: LOGIN_CLEANUP,
            payload: { ...loginState }
          })
        }, 3000)
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: {
            ...loginState,
            type: LOGIN_FAILED,
            messages: err.response.data.error,
            btnText: payload.btnText,
            btnDisabled: payload.btnDisabled
          }
        })

        setTimeout(() => {
          dispatch({
            type: LOGIN_CLEANUP,
            payload: { ...loginState }
          })
        }, 3000)
      })
  }
}
