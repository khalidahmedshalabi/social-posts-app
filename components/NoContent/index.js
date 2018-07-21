import React from 'react'
import { View, Dimensions } from 'react-native';
import { bgColor, mainColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';

const height = Dimensions.get('window').height

export default () => (
	<View style={{ justifyContent: 'center', alignItems: 'center' }}>
		<FontedText style={{ color: '#c1c1c1', fontSize: 30, marginTop: height*0.38 }}>لا يوجد محتوى</FontedText>
	</View>
)