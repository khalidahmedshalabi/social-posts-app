import { createStackNavigator } from 'react-navigation';

import Tabs from './TabNavigation'

import Login from '../containers/Login'
import Signup from '../containers/Signup'
import ResetPassword from '../containers/ResetPassword'
import Walkthrough from '../containers/Walkthrough'
import AccountInfo from '../containers/AccountInfo'
import CodeConfirmation from '../containers/CodeConfirmation'
import EditProfile from '../containers/EditProfile'
import AddPost from '../containers/AddPost'

export default RootNavigation = createStackNavigator({
	Tabs: {
		screen: Tabs
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
	CodeConfirmation: {
		screen: CodeConfirmation
	},
	EditProfile: {
		screen: EditProfile
	},
	AddPost: {
		screen: AddPost
	},
},
{
	initialRouteName: 'Tabs',
	navigationOptions: {
		header: null,
	}
});