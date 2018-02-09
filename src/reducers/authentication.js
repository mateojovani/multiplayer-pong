export const LOGIN_REQUEST = 'authentication/LOGIN_REQUEST'

const initialState = {
	loginRequested: false
}

export default (state = initialState, action) => {
	switch (action.type) {

		case LOGIN_REQUEST:
			return {
				...state,
				loginRequested: true
			}	

		default:
			return state
	}
}

export const login = (email, password) => {
	alert(email)
	return dispatch => {			
		dispatch({
			type: LOGIN_REQUEST,
		});		
	}
}
