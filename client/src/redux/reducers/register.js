import { registerState, REGISTER_SUCCESS, REGISTER_FAILED, REGISTER_CLEANUP } from '../actions/register'

export const registerReducer = (state = registerState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        messages: action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case REGISTER_FAILED:
      return {
        ...state,
        messages: typeof action.payload.messages !== 'string' ? [...action.payload.messages] : action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }

    case REGISTER_CLEANUP:
      return {
        ...state,
        type: action.payload.type,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        messages: action.payload.messages,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }

    default:
      return state
  }
}
