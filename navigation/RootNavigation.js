import { createStackNavigator } from 'react-navigation';

import Login from '../containers/Login'
import Signup from '../containers/Signup'
import ResetPassword from '../containers/ResetPassword'

export default RootNavigation = createStackNavigator({
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
	}
);