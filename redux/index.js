import {combineReducers} from 'redux';

// Must import every reducer and combine them.
import { reducer as DraftRedux } from './DraftRedux';

const AppReducers = combineReducers({
	draft: DraftRedux,
});

export default AppReducers;