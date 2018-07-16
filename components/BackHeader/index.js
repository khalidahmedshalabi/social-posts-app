import React from 'react';
import { Platform, StatusBar } from 'react-native'
import {
	Header, Left, Body, Button, Right
} from 'native-base';
import FontedText from '../FontedText';
import { mainColor, lightBGColor } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default BackHeader = ({ title, navigation, rightComponent }) => {
	const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

	return (
		<Header
			style={{ backgroundColor: lightBGColor, height: 56 + statusBarHeight, paddingTop: statusBarHeight }}>
			<Left style={{ flex: 0.5 }}>
				<Button
					transparent
					onPress={() => navigation.goBack()}
					style={{ elevation: 0, paddingHorizontal: 10 }}>

					<Ionicons
						name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
						size={25}
						color={mainColor} />
				</Button>
			</Left>

			<Body style={{ flex: 1, alignItems: 'center' }}>
				<FontedText style={{ color: mainColor }}>{title}</FontedText>
			</Body>

			<Right style={{ flex: 0.5 }}>
				{rightComponent}
			</Right>
		</Header>
	)
}