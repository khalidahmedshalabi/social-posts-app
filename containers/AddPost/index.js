import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import { LinearGradient } from 'expo';
import { FontAwesome, Foundation, SimpleLineIcons, Feather, Entypo, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import LazyContainer from '../../components/LazyContainer';
import ModalSelector from 'react-native-modal-selector'



export default class AddPost extends Component {

	render() {
		const gender_data = [
			{ key: 0, label: 'ذكر' },
			{ key: 1, label: 'أنثى' },
		];

		const age_data = [
			{ key: 0, label: '1' },
			{ key: 1, label: '2' },
			{ key: 2, label: '3' },
			{ key: 3, label: '4' },
			{ key: 4, label: '5' },
		];

		const country_data = [
			{ key: 0, label: 'السعودية' },
			{ key: 1, label: 'مصر' },
			{ key: 2, label: 'فلسطين' }
		];

		return (
			<LazyContainer style={{backgroundColor: bgColor}}>
				<Content>
					<TouchableOpacity style={{ flex: 0.55, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
						<SimpleLineIcons name='camera' size={100} color={'#93939b'} />

						<FontedText style={{ color: '#d8d8d8', fontSize: 18 }}>إضافة صورة او فيديو</FontedText>
					</TouchableOpacity>

					<View style={{ flex: 0.45, justifyContent: 'flex-start' }}>
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<FontAwesome name='tag' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='العنوان'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								style={{
									flex: 0.85,
									color: 'white'
								}}
							/>
						</View>

						<View style={{ flex: 1, height: 200, flexDirection: 'row', paddingVertical: 17, alignItems: 'flex-start', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center', height: '100%' }}>
								<Octicons name='note' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='المحتوى...'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								multiline={true}
								autoCapitalize='none'
								keyboardType='email-address'
								maxLength={254}
								style={{
									flex: 0.85,
									textAlignVertical: 'top',
									color: 'white',
									backgroundColor: '#2a293d',
									borderRadius: 10,
									marginRight: 20,
									height: 166,
									paddingTop: 10,
									paddingLeft: 13
								}}
							/>
						</View>

						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Feather name='link' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='الرابط'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								maxLength={128}
								secureTextEntry={true}
								style={{
									flex: 0.85,
									color: 'white'
								}}
							/>
						</View>

						<View style={{ flex: 1, paddingVertical: 5, width: '100%', flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<FontAwesome name='globe' size={27} color={'#93939b'} />
							</View>

							<ModalSelector
								style={{ width: '100%', flex: 0.85 }}
								selectStyle={{ borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start' }}
								selectTextStyle={{ color: '#d8d8d8', fontFamily: 'droidkufi', fontSize: 17, marginLeft: 4 }}
								optionTextStyle={{ color: bgColor, fontSize: 17, fontFamily: 'droidkufi' }}
								cancelText='إلغاء'
								overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
								cancelTextStyle={{ color: '#f44242', fontSize: 17, fontFamily: 'droidkufi' }}
								data={country_data}
								initValue="الدولة"
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
							/>
						</View>

						<View style={{ flex: 1, paddingVertical: 5, width: '100%', flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Foundation name='torsos-all-female' size={27} color={'#93939b'} />
							</View>

							<ModalSelector
								style={{ width: '100%', flex: 0.85 }}
								selectStyle={{ borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start' }}
								selectTextStyle={{ color: '#d8d8d8', fontFamily: 'droidkufi', fontSize: 17, marginLeft: 4 }}
								optionTextStyle={{ color: bgColor, fontSize: 17, fontFamily: 'droidkufi' }}
								cancelText='إلغاء'
								overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
								cancelTextStyle={{ color: '#f44242', fontSize: 17, fontFamily: 'droidkufi' }}
								data={age_data}
								initValue="العمر"
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
							/>
						</View>

						<View style={{ flex: 1, paddingVertical: 5, width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Foundation name='torsos-male-female' size={27} color={'#93939b'} />
							</View>

							<ModalSelector
								style={{ width: '100%', flex: 0.85 }}
								selectStyle={{borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start'}}
								selectTextStyle={{ color: '#d8d8d8', fontFamily: 'droidkufi', fontSize: 19 }}
								optionTextStyle={{ color: bgColor, fontSize: 17, fontFamily: 'droidkufi' }}
								cancelText= 'إلغاء'
								overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
								cancelTextStyle={{ color: '#f44242', fontSize: 17, fontFamily: 'droidkufi' }}
								data={gender_data}
								initValue="الجنس"
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
							/>
						</View>

						<View style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Entypo name='area-graph' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='المشاهدات المطلوبة'
								placeholderTextColor='#d8d8d8'
								keyboardType='numeric'
								underlineColorAndroid='transparent'
								maxLength={128}
								style={{
									flex: 0.85,
									color: 'white'
								}}
							/>
						</View>
					</View>
				</Content>

				<View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
					<TouchableOpacity style={{ borderRadius: 20, flex: 0.5, marginHorizontal: 10 }}>
						<LinearGradient
							colors={['#b28003', '#f9ce63']}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 20,
								paddingVertical: 7
							}}>
							<FontedText style={{ color: bgColor, fontSize: 15 }}>نشر</FontedText>
						</LinearGradient>
					</TouchableOpacity>

				
					<TouchableOpacity style={{ flex: 0.5, borderWidth: 1, borderColor: mainColor, marginHorizontal: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
						<FontedText style={{ color: mainColor, fontSize: 15 }}>حفظ كمسودة</FontedText>
					</TouchableOpacity>
				</View>
			</LazyContainer>
		)
	}
}