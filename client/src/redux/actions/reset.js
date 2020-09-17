import axios from 'axios'

export const resetState = {
  type: '',
  password: '',
  cpassword: '',
  messages: [],
  btnText: 'Reset Password',
  btnDisabled: false,
  expired: false
}

export const RESET_SUCCESS = 'RESET_SUCCESS'
export const RESET_SUCCESS_ID = 'RESET_SUCCESS_ID'
export const RESET_FAILED = 'RESET_FAILED'
export const RESET_CLEANUP = 'RESET_CLEANUP'

axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    res.headers['accept'] = 'application/json'
    res.headers['content-type'] = 'application/json'
    res.config.headers['Accept'] = 'application/json'
    res.config.headers['Content-Type'] = 'application/json'
  }
  return res
})

export const resetIdactionCreator = (type, payload) => (dispatch) => {
  axios
    .get(`/api/auth/user/reset-password/verify/${payload.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    })
    .then(({ data }) => {
      dispatch({
        type: type,
        payload: {
          type: RESET_SUCCESS_ID
        }
      })

      setTimeout(() => {
        dispatch({
          type: RESET_FAILED,
          payload: { ...resetState }
        })
      }, 3000)
    })
    .catch((err) => {
      dispatch({
        type: RESET_FAILED,
        payload: {
          type: RESET_FAILED,
          messages: err.response.data.error,
          expired: err.response.data.expired
        }
      })
    })
}

export const resetActionCreator = (type, payload) => (dispatch) => {
  axios
    .post(`/api/auth/user/reset-password/${payload.id}`, {
      password: payload.password,
      cpassword: payload.cpassword
    })
    .then(({ data }) => {
      dispatch({
        type: type,
        payload: {
          type: RESET_SUCCESS,
          messages: data.success,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: RESET_CLEANUP,
          payload: { ...resetState }
        })
      }, 3000)
    })
    .catch((err) => {
      dispatch({
        type: RESET_FAILED,
        payload: {
          type: RESET_FAILED,
          messages: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled,
          expired: err.response.data.expired
        }
      })

      setTimeout(() => {
        dispatch({
          type: RESET_CLEANUP,
          payload: { ...resetState }
        })
      }, 3000)
    })
}
