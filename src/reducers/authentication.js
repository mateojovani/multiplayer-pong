import API from '../rest_api'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'

const initialState = {
	isLoggedIn: false,
	token: null
}

export default (state = initialState, action) => {
	switch (action.type) {

		case LOGIN_SUCCESS || REGISTER_SUCCESS:
			return Object.assign(state, {token: action.token, isLoggedIn: true})
		
		case LOGIN_FAIL || REGISTER_FAIL:
			return Object.assign(state, {token: null, isLoggedIn: false})

		default:
			return state
	}
}

export const login = (username, password) => {
	return dispatch => {	
		return API.login(username, password)
			.then((response) => {
				return new Promise((resolve, reject) => {
					if(response.status === 200){
						dispatch({
							type: LOGIN_SUCCESS,
							token: response.data
						})

						resolve(response)
					} else {
						dispatch({
							type: LOGIN_FAIL
						})

						reject(response)
					}	
				})				
			})
		
	}
}

export const register = (username, password) => {
	return dispatch => {	
		return API.register(username, password)
			.then((response) => {
				return new Promise((resolve, reject) => {
					if(response.status === 200){
						dispatch({
							type: REGISTER_SUCCESS,
							token: response.data
						})

						resolve(response)
					} else {
						dispatch({
							type: REGISTER_FAIL
						})

						reject(response)
					}	
				})				
			})
		
	}
}	
