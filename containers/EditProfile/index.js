import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import { FontAwesome, Foundation, Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import LazyContainer from '../../components/LazyContainer';
import DatePicker from 'react-native-datepicker'
import ModalSelector from 'react-native-modal-selector'
import * as Animatable from 'react-native-animatable';
import BackHeader from '../../components/BackHeader';



export default class EditProfile extends Component {
	constructor(props) {
		super(props)
		this.state = { date: '' }
	}

	render() {
		const gender_data = [
			{ key: 0, label: 'ذكر' },
			{ key: 1, label: 'أنثى' },
		];

		const country_data = [
			{ key: 0, label: 'السعودية' },
			{ key: 1, label: 'مصر' },
			{ key: 2, label: 'فلسطين' }
		];

		return (
			<LazyContainer style={{backgroundColor: bgColor}}>
				<BackHeader
					navigation={this.props.navigation}
					title='إضافة منشور' />

				<Content>
					<Animatable.View animation="fadeIn" duration={1000} delay={500} style={{ paddingVertical: 30, flex: 0.55, justifyContent: 'center', alignItems: 'center' }}>
						<Ionicons name='md-settings' size={150} color={mainColor} />
					</Animatable.View>

					<View style={{ flex: 0.45, justifyContent: 'flex-start' }}>
						<View style={{ flex: 1, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Feather name='user' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='الاسم'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								style={{
									flex: 0.85,
									color: 'white'
								}}
								onChangeText={(text) => this.setState({ username: text })}
							/>
						</View>

						<View style={{ flex: 1, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Entypo name='mail' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='البريد الالكتروني'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								autoCapitalize='none'
								keyboardType='email-address'
								maxLength={254}
								style={{
									flex: 0.85,
									color: 'white'
								}}
								onChangeText={(text) => this.setState({ emailaddress: text })}
							/>
						</View>

						<View style={{ flex: 1, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<FontAwesome name='lock' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='كلمة المرور'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								maxLength={128}
								secureTextEntry={true}
								style={{
									flex: 0.85,
									color: 'white'
								}}
								onChangeText={(text) => this.setState({ password: text })}
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
								<FontAwesome name='calendar-o' size={27} color={'#93939b'} />
							</View>

							<DatePicker
								style={{ width: '100%', flex: 0.85 }}
								date={this.state.date}
								placeholder="تاريخ الميلاد"
								format="YYYY-MM-DD"
								minDate="1930-01-01"
								maxDate="2100-01-01"
								confirmBtnText="حفظ"
								cancelBtnText="إلغاء"
								showIcon={false}
								customStyles={{
									dateInput: {
										borderWidth: 0,
										alignItems: 'flex-start'
									},
									dateText: {
										fontFamily: 'droidkufi',
										color: '#d8d8d8',
										fontSize: 19
									},
									placeholderText: {
										fontFamily: 'droidkufi',
										color: '#d8d8d8',
										fontSize: 19
									},
									btnTextConfirm:{
										fontFamily: 'droidkufi',
										color: bgColor
									},
									btnTextCancel: {
										fontFamily: 'droidkufi',
										color: bgColor
									}
								}}
								onDateChange={(date) => { this.setState({ date: date }) }}
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
					</View>
				</Content>

				<TouchableOpacity style={{ flex: 0.08 }}>
					<LinearGradient
						colors={['#b28003', '#f9ce63']}
						start={{ x: 0.0, y: 1.0 }}
						end={{ x: 1.0, y: 0.0 }}
						style={{
							flex: 1,
							justifyContent: 'center'
						}}>
						<FontedText style={{ color: bgColor, textAlign: 'center', fontSize: 19 }}>حفظ البيانات</FontedText>
					</LinearGradient>
				</TouchableOpacity>
			</LazyContainer>
		)
	}
}
