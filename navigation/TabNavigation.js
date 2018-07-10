import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { mainColor } from '../constants/Colors'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Screens
import Posts from '../containers/Posts'
import Profile from '../containers/Profile'

// Style
const tabBarIconSize = 27

export default createBottomTabNavigator({
	'حسابي': {
		screen: Profile,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons color={tintColor} name='account' size={tabBarIconSize} />
		}
	},
	'المنشورات': {
		screen: Posts,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => <Entypo color={tintColor} name='news' size={tabBarIconSize} />
		}
	}
},
	{
		tabBarPosition: 'bottom',
		tabBarOptions: {
			showIcon: true,
			showLabel: true,
			activeTintColor: mainColor,
			inactiveTintColor: '#888888',
			labelStyle: { fontFamily: 'droidkufi', fontSize: 13 }
		},
		lazy: true,
	})