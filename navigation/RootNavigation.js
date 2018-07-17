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
import PostsHistory from '../containers/PostsHistory'
import Gifts from '../containers/Gifts'
import Drafts from '../containers/Drafts';
import ContactUs from '../containers/ContactUs';

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
	PostsHistory: {
		screen: PostsHistory
	},
	Gifts: {
		screen: Gifts
	},
	Drafts: {
		screen: Drafts
	},
	ContactUs: {
		screen: ContactUs
	},
},
{
	initialRouteName: 'Tabs',
	navigationOptions: {
		header: null,
	}
});