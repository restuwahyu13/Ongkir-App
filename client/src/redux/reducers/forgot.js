import { forgotState, FORGOT_SUCCESS, FORGOT_FAILED, FORGOT_CLEANUP } from '../actions/forgot'

export const forgotReducer = (state = forgotState, action) => {
	switch (action.type) {
		case FORGOT_SUCCESS:
			return {
				...state,
				type: action.payload.type,
				messages: action.payload.messages,
				btnText: action.payload.btnText,
				btnDisabled: action.payload.btnDisabled
			}
		case FORGOT_FAILED:
			return {
				...state,
				type: action.payload.type,
				messages: typeof action.payload.messages !== 'string' ? [...action.payload.messages] : action.payload.messages,
				btnText: action.payload.btnText,
				btnDisabled: action.payload.btnDisabled
			}
		case FORGOT_CLEANUP:
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
