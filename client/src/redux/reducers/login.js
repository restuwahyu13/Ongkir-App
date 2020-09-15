import { loginState, LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_CLEANUP } from '../actions/login'

export const loginReducer = (state = loginState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				type: action.payload.type,
				messages: action.payload.messages,
				btnText: action.payload.btnText,
				btnDisabled: action.payload.btnDisabled
			}
		case LOGIN_FAILED:
			return {
				...state,
				type: action.payload.type,
				messages:
					typeof action.payload.messages !== 'string'
						? [...action.payload.messages]
						: action.payload.messages,
				btnText: action.payload.btnText,
				btnDisabled: action.payload.btnDisabled
			}
		case LOGIN_CLEANUP:
			return {
				...state,
				type: action.payload.type,
				messages: action.payload.messages,
				btnText: action.payload.btnText,
				btnDisabled: action.payload.btnDisabled
			}
		default:
			return state
	}
}
