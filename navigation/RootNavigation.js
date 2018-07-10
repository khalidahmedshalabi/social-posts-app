import { createStackNavigator } from 'react-navigation';

import Tabs from './TabNavigation'
import Profile from './TabNavigation'

import Login from '../containers/Login'
import Signup from '../containers/Signup'
import ResetPassword from '../containers/ResetPassword'
import Walkthrough from '../containers/Walkthrough'
import AccountInfo from '../containers/AccountInfo'

export default RootNavigation = createStackNavigator({
	Tabs: {
		screen: Tabs
	},
	Profile: {
		screen: Profile
	},
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
	initialRouteName: 'Profile',
	navigationOptions: {
		header: null,
	}
});