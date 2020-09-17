import axios from 'axios'

export const resendState = {
  type: '',
  email: '',
  messages: [],
  btnText: 'Resend Token',
  btnDisabled: false
}

export const RESEND_SUCCESS = 'RESEND_SUCCESS'
export const RESEND_FAILED = 'RESEND_FAILED'
export const RESEND_CLEANUP = 'RESEND_CLEANUP'

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

export const resendActionCreator = (type, payload) => (dispatch) => {
  axios
    .post('/api/auth/user/resend-token', {
      email: payload.email
    })
    .then(({ data }) => {
      dispatch({
        type: type,
        payload: {
          type: RESEND_SUCCESS,
          messages: data.success,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: RESEND_CLEANUP,
          payload: { ...resendState }
        })
      }, 3000)
    })
    .catch((err) => {
      dispatch({
        type: RESEND_FAILED,
        payload: {
          type: RESEND_FAILED,
          messages: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: RESEND_CLEANUP,
          payload: { ...resendState }
        })
      }, 3000)
    })
}
