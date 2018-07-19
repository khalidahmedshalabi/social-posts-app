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
import PostsHistory from '../containers/PostsHistory'
import Gifts from '../containers/Gifts'
import Drafts from '../containers/Drafts';
import ContactUs from '../containers/ContactUs';

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
const RootNavigation = ({ screenProps, seen_walkthrough }) => (
	<RootNavigatorCore
		// Pass screen props normally
		screenProps={screenProps}

		// Determine what the initial route screen is based on first-run rules
		initialRouteName={
			seen_walkthrough ?
				'Tabs' : 'Walkthrough'
		} />
);

// Map Redux state to this component's props
const mapStateToProps = (state) => ({
	seen_walkthrough: state.justOnce.seen_walkthrough || false
})

export default connect(mapStateToProps)(RootNavigation)