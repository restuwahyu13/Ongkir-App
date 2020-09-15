import { activationState, ACTIVATION_SUCCESS, ACTIVATION_FAILED, ACTIVATION_CLEANUP } from '../actions/activation'

export const activationReducer = (state = activationState, action) => {
  switch (action.type) {
    case ACTIVATION_SUCCESS:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message
      }
    case ACTIVATION_FAILED:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        expired: action.payload.expired
      }
    default:
      return state
  }
}
