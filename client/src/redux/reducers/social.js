import {
  socialLoginGoogleState,
  socialLoginFbState,
  socialLoginGithubState,
  socialRegisterGoogleState,
  socialRegisterFbState,
  socialRegisterGithubState,
  SOCIAL_LOGIN_GOOGLE_SUCCESS,
  SOCIAL_LOGIN_FB_SUCCESS,
  SOCIAL_LOGIN_GITHUB_SUCCESS,
  SOCIAL_LOGIN_GOOGLE_CLEANUP,
  SOCIAL_LOGIN_FB_CLEANUP,
  SOCIAL_LOGIN_GITHUB_CLEANUP,
  SOCIAL_LOGIN_GOOGLE_ERROR,
  SOCIAL_LOGIN_FB_ERROR,
  SOCIAL_LOGIN_GITHUB_ERROR,
  SOCIAL_REGISTER_GOOGLE_SUCCESS,
  SOCIAL_REGISTER_FB_SUCCESS,
  SOCIAL_REGISTER_GITHUB_SUCCESS,
  SOCIAL_REGISTER_GOOGLE_CLEANUP,
  SOCIAL_REGISTER_FB_CLEANUP,
  SOCIAL_REGISTER_GITHUB_CLEANUP,
  SOCIAL_REGISTER_GOOGLE_ERROR,
  SOCIAL_REGISTER_FB_ERROR,
  SOCIAL_REGISTER_GITHUB_ERROR
} from '../actions/social'

/**
 * @description SOCIAL LOGIN REDUCER
 */

export const socialLoginGoogleReducer = (state = socialLoginGoogleState, action) => {
  switch (action.type) {
    case SOCIAL_LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        token: action.payload.token,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_LOGIN_GOOGLE_CLEANUP:
      return {
        ...state,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    default:
      return state
  }
}

export const socialLoginFbReducer = (state = socialLoginFbState, action) => {
  switch (action.type) {
    case SOCIAL_LOGIN_FB_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_LOGIN_FB_ERROR:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_LOGIN_FB_CLEANUP:
      return {
        ...state,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    default:
      return state
  }
}

export const socialLoginGithubReducer = (state = socialLoginGithubState, action) => {
  switch (action.type) {
    case SOCIAL_LOGIN_GITHUB_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        token: action.payload.token,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_LOGIN_GITHUB_ERROR:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled,
        modalTrigger: action.payload.modalTrigger
      }
    case SOCIAL_LOGIN_GITHUB_CLEANUP:
      return {
        ...state,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    default:
      return state
  }
}

/**
 * @description SOCIAL REGISTER STATE
 */

export const socialRegisterGoogleReducer = (state = socialRegisterGoogleState, action) => {
  switch (action.type) {
    case SOCIAL_REGISTER_GOOGLE_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        token: action.payload.token,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_REGISTER_GOOGLE_ERROR:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_REGISTER_GOOGLE_CLEANUP:
      return {
        ...state,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    default:
      return state
  }
}

export const socialRegisterFbReducer = (state = socialRegisterFbState, action) => {
  switch (action.type) {
    case SOCIAL_REGISTER_FB_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        token: action.payload.token,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_REGISTER_FB_ERROR:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_REGISTER_FB_CLEANUP:
      return {
        ...state,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    default:
      return state
  }
}

export const socialRegisterGithubReducer = (state = socialRegisterGithubState, action) => {
  switch (action.type) {
    case SOCIAL_REGISTER_GITHUB_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        token: action.payload.token,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_REGISTER_GITHUB_ERROR:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case SOCIAL_REGISTER_GITHUB_CLEANUP:
      return {
        ...state,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    default:
      return state
  }
}
