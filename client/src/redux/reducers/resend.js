import { resendState, RESEND_SUCCESS, RESEND_FAILED, RESEND_CLEANUP } from '../actions/resend'

export const resendReducer = (state = resendState, action) => {
  switch (action.type) {
    case RESEND_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        messages: action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case RESEND_FAILED:
      return {
        ...state,
        type: action.payload.type,
        messages: typeof action.payload.messages !== 'string' ? [...action.payload.messages] : action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case RESEND_CLEANUP:
      return {
        ...state,
        type: action.payload.type,
        email: action.payload.email,
        messages: action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    default:
      return state
  }
}
