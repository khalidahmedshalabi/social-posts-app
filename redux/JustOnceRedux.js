const types = {
	SEEN_WALKTHROUGH: 'SEEN_WALKTHROUGH',
};

export const actions = {
	markSeenWalkthrough: (dispatch, seen_walkthrough) => {
		dispatch({ type: types.SEEN_WALKTHROUGH, seen_walkthrough })
	},
};

const initialState = {
	seen_walkthrough: false,
}

export const reducer = (state = initialState, action) => {
	const { seen_walkthrough } = action;

	switch (action.type) {
		case types.SEEN_WALKTHROUGH:
			return { ...state, seen_walkthrough };
		default:
			return state
	}
}