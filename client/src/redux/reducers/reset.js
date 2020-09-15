import { resetState, RESET_SUCCESS, RESET_SUCCESS_ID, RESET_FAILED, RESET_CLEANUP } from '../actions/reset'

export const resetReducer = (state = resetState, action) => {
  switch (action.type) {
    case RESET_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        messages: action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case RESET_SUCCESS_ID:
      return { ...state, type: action.payload.type }
    case RESET_FAILED:
      return {
        ...state,
        type: action.payload.type,
        messages: typeof action.payload.messages !== 'string' ? [...action.payload.messages] : action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled,
        expired: action.payload.expired
      }
    case RESET_CLEANUP:
      return {
        ...state,
        password: action.payload.password,
        cpassword: action.payload.cpassword,
        messages: action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    default:
      return state
  }
}
