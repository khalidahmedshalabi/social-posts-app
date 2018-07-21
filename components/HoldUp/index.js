import React from 'react'
import { View } from 'react-native';
import { bgColor, mainColor } from '../../constants/Colors';
import { SkypeIndicator } from 'react-native-indicators';
import FontedText from '../../components/FontedText';

export default () => (
	<View style={{ flex: 1, backgroundColor: bgColor, alignItems: 'center' }}>
		<View style={{ flex: 0.60 }}>
			<SkypeIndicator color={mainColor} count={4} size={100} />
		</View>

		<View style={{ flex: 0.40 }}>
			<FontedText style={{ color: '#c1c1c1', fontSize: 20 }}>جاري التحميل</FontedText>
		</View>
	</View>
)