import { profileState, PROFILE_SUCCESS, PROFILE_FAILED, PROFILE_CLEANUP, PROFILE_SUCCESS_ALL } from '../actions/profile'

export const profileReducer = (state = profileState, action) => {
  switch (action.type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled,
        messages: action.payload.messages
      }
    case PROFILE_FAILED:
      return {
        ...state,
        type: action.payload.type,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled,
        messages: typeof action.payload.messages !== 'string' ? [...action.payload.messages] : action.payload.messages
      }
    case PROFILE_SUCCESS_ALL:
      return {
        ...state,
        profile: action.payload.profile
      }
    case PROFILE_CLEANUP:
      return {
        ...state,
        type: action.payload.type,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled,
        messages: action.payload.messages
      }
    default:
      return state
  }
}
