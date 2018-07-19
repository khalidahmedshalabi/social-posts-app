import {combineReducers} from 'redux';

// Must import every reducer and combine them.
import { reducer as DraftRedux } from './DraftRedux';
import { reducer as JustOnceRedux } from './JustOnceRedux';
import { reducer as LoginRedux } from './LoginRedux';

const AppReducers = combineReducers({
	draft: DraftRedux,
	justOnce: JustOnceRedux,
	login: LoginRedux,
});

export default AppReducers;