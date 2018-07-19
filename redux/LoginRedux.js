export const types = {
	SET_LOGGED_IN: 'SET_LOGGED_IN',
};

export const actions = {
	setLoggedIn: (dispatch, logged_in) => {
		dispatch({ type: types.SET_LOGGED_IN, logged_in })
	},
};

const initialState = {
	logged_in: false
}

export const reducer = (state = initialState, action) => {
	const { logged_in } = action;
	
	switch (action.type) {
		case types.SET_LOGGED_IN:
			return { ...state, logged_in };
		default:
			return state
	}
}