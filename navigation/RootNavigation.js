import { createStackNavigator } from 'react-navigation';

import Login from '../containers/Login'
import Signup from '../containers/Signup'
import ResetPassword from '../containers/ResetPassword'
import Walkthrough from '../containers/Walkthrough'
import AccountInfo from '../containers/AccountInfo'

export default RootNavigation = createStackNavigator({
	Walkthrough: {
		screen: Walkthrough
	},
	Login:{
		screen: Login
	},
	Signup: {
		screen: Signup
	},
	ResetPassword: {
		screen: ResetPassword
	},
	AccountInfo: {
		screen: AccountInfo
	},
},
{
	initialRouteName: 'AccountInfo',
	navigationOptions: {
		header: null,
	}
});