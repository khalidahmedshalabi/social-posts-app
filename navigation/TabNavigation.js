import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { mainColor } from '../constants/Colors'
import Entypo from 'react-native-vector-icons/Entypo'

// Screens
import Posts from '../containers/Posts'

// Style
const tabBarIconSize = 27

export default createBottomTabNavigator({
	'المنشورات': {
		screen: Posts,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => <Entypo color={tintColor} name='home' size={tabBarIconSize} />
		}
	},
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