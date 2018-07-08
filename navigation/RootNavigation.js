import { createStackNavigator } from 'react-navigation';

import Login from '../containers/Login'
import Signup from '../containers/Signup'
import ResetPassword from '../containers/ResetPassword'
import Walkthrough from '../containers/Walkthrough'

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
},
{
	initialRouteName: 'Login',
	navigationOptions: {
		header: null,
	}
});