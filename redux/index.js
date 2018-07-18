import {combineReducers} from 'redux';

// Must import every reducer and combine them.
import { reducer as DraftRedux } from './DraftRedux';
import { reducer as JustOnceRedux } from './JustOnceRedux';

const AppReducers = combineReducers({
	draft: DraftRedux,
	justOnce: JustOnceRedux,
});

export default AppReducers;