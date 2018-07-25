import React from 'react';
import { connect } from 'react-redux';
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
import Gifts from '../containers/Gifts'
import Drafts from '../containers/Drafts';
import ContactUs from '../containers/ContactUs';
import Posts from '../containers/Posts';

// This is the core of the navigator: route configs, etc...
const RootNavigatorCore = ({ screenProps, initialRouteName }) => {
	const routeConfigs = {
		Tabs: {
			screen: Tabs
		},
		Walkthrough: {
			screen: Walkthrough
		},
		Login: {
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
			screen: props => <Posts {...props} history={true} />
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
	};

	const stackNavigatorConfigs = {
		initialRouteName, // this is passed to the navigator (see RootNavigation below)
		navigationOptions: {
			header: null,
		}
	};

	const NavigatorWithScreenProps = createStackNavigator(routeConfigs, stackNavigatorConfigs);
	return <NavigatorWithScreenProps screenProps={screenProps} />;
};

// This acts as a wrapper for the navigator
const RootNavigation = ({ screenProps, seen_walkthrough, logged_in }) => (
	<RootNavigatorCore
		// Pass screen props normally
		screenProps={screenProps}

		// Determine what the initial route screen is based on first-run rules
		initialRouteName={
			seen_walkthrough ?
				logged_in ?
					'Tabs'
					:
					'Login'
				:
				'Walkthrough'
		} />
);

// Map Redux state to this component's props
const mapStateToProps = (state) => ({
	seen_walkthrough: state.justOnce.seen_walkthrough || false,
	logged_in: state.login.logged_in || false,
})

export default connect(mapStateToProps)(RootNavigation)