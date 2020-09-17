import axios from 'axios'

/**
 * @description SOCIAL LOGIN STATE
 */

export const socialLoginGoogleState = {
  type: '',
  token: '',
  message: '',
  btnText: '',
  btnDisabled: false
}

export const socialLoginFbState = {
  type: '',
  token: '',
  message: '',
  btnText: '',
  btnDisabled: false
}

export const socialLoginGithubState = {
  type: '',
  token: '',
  message: '',
  btnText: '',
  btnDisabled: false
}

/**
 * @description SOCIAL REGISTER TYPE
 */

export const socialRegisterGoogleState = {
  type: '',
  token: '',
  message: '',
  btnText: '',
  btnDisabled: false
}

export const socialRegisterFbState = {
  type: '',
  token: '',
  message: '',
  btnText: '',
  btnDisabled: false
}

export const socialRegisterGithubState = {
  type: '',
  token: '',
  message: '',
  btnText: '',
  btnDisabled: false
}

/**
 * @description SOCIAL LOGIN TYPE
 */

export const SOCIAL_LOGIN_GOOGLE_SUCCESS = 'SOCIAL_LOGIN_GOOGLE_SUCCESS'
export const SOCIAL_LOGIN_FB_SUCCESS = 'SOCIAL_LOGIN_FB_SUCCESS'
export const SOCIAL_LOGIN_GITHUB_SUCCESS = 'SOCIAL_LOGIN_GITHUB_SUCCESS'

export const SOCIAL_LOGIN_GOOGLE_ERROR = 'SOCIAL_LOGIN_GOOGLE_ERROR'
export const SOCIAL_LOGIN_FB_ERROR = 'SOCIAL_LOGIN_FB_ERROR'
export const SOCIAL_LOGIN_GITHUB_ERROR = 'SOCIAL_LOGIN_GITHUB_ERROR'

export const SOCIAL_LOGIN_GOOGLE_CLEANUP = 'SOCIAL_LOGIN_GOOGLE_CLEANUP'
export const SOCIAL_LOGIN_FB_CLEANUP = 'SOCIAL_LOGIN_FB_CLEANUP'
export const SOCIAL_LOGIN_GITHUB_CLEANUP = 'SOCIAL_LOGIN_GITHUB_CLEANUP'

/**
 * @description SOCIAL REGISTER TYPE
 */

export const SOCIAL_REGISTER_GOOGLE_SUCCESS = 'SOCIAL_REGISTER_GOOGLE_SUCCESS'
export const SOCIAL_REGISTER_FB_SUCCESS = 'SOCIAL_REGISTER_FB_SUCCESS'
export const SOCIAL_REGISTER_GITHUB_SUCCESS = 'SOCIAL_REGISTER_GITHUB_SUCCESS'

export const SOCIAL_REGISTER_GOOGLE_ERROR = 'SOCIAL_REGISTER_GOOGLE_ERROR'
export const SOCIAL_REGISTER_FB_ERROR = 'SOCIAL_REGISTER_FB_ERROR'
export const SOCIAL_REGISTER_GITHUB_ERROR = 'SOCIAL_REGISTER_GITHUB_ERROR'

export const SOCIAL_REGISTER_GOOGLE_CLEANUP = 'SOCIAL_REGISTER_GOOGLE_CLEANUP'
export const SOCIAL_REGISTER_FB_CLEANUP = 'SOCIAL_REGISTER_FB_CLEANUP'
export const SOCIAL_REGISTER_GITHUB_CLEANUP = 'SOCIAL_REGISTER_GITHUB_CLEANUP'

/**
 * @description SOCIAL LOGIN ACTION
 */

export const socialLoginGoogleActionCreator = (type, payload) => (dispatch) => {
  axios
    .get('/api/user/social-login?type=login')
    .then(({ data }) => {
      dispatch({
        type,
        payload: {
          type: data.typeAuth,
          token: data.secret,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: SOCIAL_LOGIN_GOOGLE_CLEANUP,
          payload: { ...socialLoginGoogleState }
        })
      }, 500000)
    })
    .catch((err) => {
      dispatch({
        type: SOCIAL_LOGIN_GOOGLE_ERROR,
        payload: {
          type: err.response.data.typeAuth,
          message: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: type,
          payload: { ...socialLoginGoogleState }
        })
      }, 3000)
    })
}

export const socialLoginFbActionCreator = (type, payload) => async (dispatch) => {
  axios
    .get('/api/user/social-login?type=login')
    .then(({ data }) => {
      dispatch({
        type,
        payload: {
          type: data.typeAuth,
          token: data.secret,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: SOCIAL_LOGIN_FB_CLEANUP,
          payload: { ...socialLoginFbState }
        })
      }, 500000)
    })
    .catch((err) => {
      dispatch({
        type: SOCIAL_LOGIN_FB_ERROR,
        payload: {
          type: err.response.data.typeAuth,
          message: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: type,
          payload: { ...socialLoginFbState }
        })
      }, 3000)
    })
}

/**
 * @description SOCIAL LOGIN ACTION GITHUB
 */

export const socialLoginGithubActionCreator = (type, payload) => (dispatch) => {
  axios
    .get('/api/user/social-login?type=login')
    .then(({ data }) => {
      dispatch({
        type,
        payload: {
          type: data.typeAuth,
          token: data.secret,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: SOCIAL_LOGIN_GITHUB_CLEANUP,
          payload: { ...socialLoginGithubState }
        })
      }, 500000)
    })
    .catch((err) => {
      dispatch({
        type: SOCIAL_LOGIN_GITHUB_ERROR,
        payload: {
          type: err.response.data.typeAuth,
          message: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: type,
          payload: { ...socialLoginGithubState }
        })
      }, 3000)
    })
}

/**
 * @description SOCIAL REGISTER ACTION
 */

export const socialRegisterGoogleActionCreator = (type, payload) => (dispatch) => {
  axios
    .get('/api/user/social-register?type=register')
    .then(({ data }) => {
      dispatch({
        type,
        payload: {
          type: data.typeAuth,
          token: data.secret,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: SOCIAL_REGISTER_GOOGLE_CLEANUP,
          payload: { ...socialLoginGoogleState }
        })
      }, 500000)
    })
    .catch((err) => {
      dispatch({
        type: SOCIAL_REGISTER_GOOGLE_ERROR,
        payload: {
          type: err.response.data.typeAuth,
          message: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: SOCIAL_REGISTER_GOOGLE_CLEANUP,
          payload: { ...socialLoginGoogleState }
        })
      }, 3000)
    })
}

export const socialRegisterFbActionCreator = (type, payload) => (dispatch) => {
  axios
    .get('/api/user/social-register?type=register')
    .then(({ data }) => {
      dispatch({
        type,
        payload: {
          type: data.typeAuth,
          token: data.secret,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: SOCIAL_REGISTER_FB_CLEANUP,
          payload: { ...socialRegisterFbState }
        })
      }, 500000)
    })
    .catch((err) => {
      dispatch({
        type: SOCIAL_REGISTER_FB_ERROR,
        payload: {
          type: err.response.data.typeAuth,
          message: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: SOCIAL_REGISTER_FB_CLEANUP,
          payload: { ...socialRegisterFbState }
        })
      }, 3000)
    })
}

export const socialRegisterGithubActionCreator = (type, payload) => async (dispatch) => {
  axios
    .get('/api/user/social-register?type=register')
    .then(({ data }) => {
      dispatch({
        type,
        payload: {
          type: data.typeAuth,
          token: data.secret,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: SOCIAL_REGISTER_GITHUB_CLEANUP,
          payload: { ...socialRegisterGithubState }
        })
      }, 500000)
    })
    .catch((err) => {
      dispatch({
        type: SOCIAL_REGISTER_GITHUB_ERROR,
        payload: {
          type: err.response.data.typeAuth,
          message: err.response.data.error,
          btnText: payload.btnText,
          btnDisabled: payload.btnDisabled
        }
      })

      setTimeout(() => {
        dispatch({
          type: type,
          payload: { ...socialRegisterGithubState }
        })
      }, 3000)
    })
}
