import axios from 'axios'

export const registerState = {
  type: '',
  username: '',
  email: '',
  password: '',
  messages: [],
  btnText: 'Sign up',
  btnDisabled: false
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const REGISTER_CLEANUP = 'REGISTER_CLEANUP'

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

export const registerActionCreator = (type, payload) => (dispatch) => {
  axios
    .post('/api/auth/user/register', {
      username: payload.username,
      email: payload.email,
      password: payload.password
    })
    .then(({ data }) => {
      dispatch({
        type: type,
        payload: {
          type: REGISTER_SUCCESS,
          username: payload.username,
          email: payload.email,
          password: payload.password,
          messages: data.success,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: REGISTER_CLEANUP,
          payload: { ...registerState }
        })
      }, 3000)
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAILED,
        payload: {
          ...registerState,
          type: REGISTER_FAILED,
          messages: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: REGISTER_CLEANUP,
          payload: { ...registerState }
        })
      }, 3000)
    })
}
