const INVALID_USER_ID = -1

export const types = {
	SET_LOGGED_IN: 'SET_LOGGED_IN',
	SET_USER_ID: 'SET_USER_ID',
};

export const actions = {
	setLoggedIn: (dispatch, logged_in) => {
		dispatch({ type: types.SET_LOGGED_IN, logged_in })
	},
	setUserID: (dispatch, user_id) => {
		dispatch({ type: types.SET_USER_ID, user_id })
	},
};

const initialState = {
	logged_in: false,
	user_id: INVALID_USER_ID
}

export const reducer = (state = initialState, action) => {
	const { logged_in, user_id } = action;
	
	switch (action.type) {
		case types.SET_LOGGED_IN:
			return logged_in ? { ...state, logged_in } : { ...state, logged_in, user_id: INVALID_USER_ID };
		case types.SET_USER_ID:
			return { ...state, user_id };
		default:
			return state
	}
}