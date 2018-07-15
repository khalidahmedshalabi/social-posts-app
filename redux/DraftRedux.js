const types = {
	ADD_DRAFT_POST: 'ADD_DRAFT_POST',
	REMOVE_DRAFT_POST: 'REMOVE_DRAFT_POST',
	CLEAR_DRAFT_POSTS: 'CLEAR_DRAFT_POSTS',
};

export const actions = {
	addDraftPost: (dispatch, draft_post) => {
		dispatch({ type: types.ADD_DRAFT_POST, draft_post })
	},
	removeDraftPost: (dispatch, key_to_remove) => {
		dispatch({ type: types.REMOVE_DRAFT_POST, key_to_remove })
	},
	clearDraftPosts: (dispatch) => {
		dispatch({ type: types.CLEAR_DRAFT_POSTS })
	},
}

const initialState = {
	draft_posts: [],
	key: -1,
}

export const reducer = (state = initialState, action) => {
	const { draft_post, key_to_remove } = action;

	switch (action.type) {
		case types.ADD_DRAFT_POST:
			return {
				...state,
				key: state.key + 1,
				draft_posts: [
					...state.draft_posts,
					{ key: String(state.key), ...draft_post }
				]
			};
		case types.REMOVE_DRAFT_POST:
			let draftPostsAfterRemoval = state.draft_posts.filter(
				(draft_post) => draft_post.key != key_to_remove
			)

			return {
				...state,
				draft_posts: draftPostsAfterRemoval
			};
		case types.CLEAR_DRAFT_POSTS:
			return { ...state, draft_posts: [] };
		
		default:
			return state
	}
}