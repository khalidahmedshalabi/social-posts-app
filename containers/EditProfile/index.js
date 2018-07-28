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
import HoldUp from '../../components/HoldUp';
import * as Animatable from 'react-native-animatable';
import BackHeader from '../../components/BackHeader';
import { POST, GET } from '../../utils/Network';
import Toast from 'react-native-easy-toast';
import { height } from '../../constants/Layout';

export default class EditProfile extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			fetchedSettings: false,

			didNameChange: false,
			didEmailChange: false,
			didPasswordChange: false,
			didBirthdateChange: false,
			didCountryChange: false,
			didGenderChange: false,

			name: '',
			email: '',
			password: '',
			birthdate: '',
			country: '',
			gender: '',
		}
	}

	componentDidMount () {
		GET('EditProfile',
			res => {
				this.setState({ ...res.data.settings, fetchedSettings: true })
			},
			err => {

			},
		)
	}

	onSaveSettings = () => {
		const { didNameChange, didEmailChange, didPasswordChange, didBirthdateChange, didCountryChange, didGenderChange } = this.state

		let
			settings_to_update = {},
			didAnySettingChange = false

		if (didEmailChange) {
			settings_to_update['email'] = this.state.email
			didAnySettingChange = true
		}
		if (didNameChange) {
			settings_to_update['name'] = this.state.name
			didAnySettingChange = true
		}
		if (didBirthdateChange) {
			settings_to_update['birthdate'] = this.state.birthdate
			didAnySettingChange = true
		}
		if (didGenderChange) {
			settings_to_update['gender'] = this.state.gender
			didAnySettingChange = true
		}
		if (didPasswordChange) {
			settings_to_update['password'] = this.state.password
			didAnySettingChange = true

			if (this.state.password.length < 8) {
				this.refs.toast.show('الحد الادني لكلمة المرور 8 حروف او ارقام او رموز');
				return
			}
		}
		if (didCountryChange) {
			settings_to_update['country'] = this.state.country
			didAnySettingChange = true
		}

		if (didAnySettingChange) {
			POST('EditProfile',
				settings_to_update,
				res => {

				},
				err => {
					// on failure
				},
			)
		}
		
		this.props.navigation.replace('Tabs')
	}

	render() {
		if (!this.state.fetchedSettings) return <HoldUp />

		const gender_data = [
			{ key: 0, label: 'ذكر' },
			{ key: 1, label: 'أنثى' },
			{ key: 2, label: 'الاثنان' },
		];

		const country_data = [
			{ key: 0, label: 'السعودية' },
			{ key: 1, label: 'مصر' },
			{ key: 2, label: 'فلسطين' },
			{ key: 3, label: 'الجزائر' },
			{ key: 4, label: 'العراق' },
			{ key: 5, label: 'السودان' },
			{ key: 6, label: 'المغرب' },
			{ key: 7, label: 'اليمن' },
			{ key: 8, label: 'سوريا' },
			{ key: 9, label: 'تونس' },
			{ key: 10, label: 'الصومال' },
			{ key: 11, label: 'الإمارات' },
			{ key: 12, label: 'الأردن' },
			{ key: 13, label: 'ليبيا' },
			{ key: 14, label: 'لبنان' },
			{ key: 15, label: 'موريتانيا' },
			{ key: 16, label: 'عُمان' },
			{ key: 17, label: 'الكويت' },
			{ key: 18, label: 'قطر' },
			{ key: 19, label: 'البحرين' },
			{ key: 20, label: 'جيبوتي' },
			{ key: 21, label: 'جزر القمر' },
		];

		return (
			<LazyContainer style={{backgroundColor: bgColor}}>
				<BackHeader
					navigation={this.props.navigation}
					title='تعديل الحساب' />

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
								defaultValue={this.state.name}
								onChangeText={(text) => this.setState({ name: text, didNameChange: true })}
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
								defaultValue={this.state.email}
								onChangeText={(text) => this.setState({ email: text, didEmailChange: true })}
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
								onChangeText={(text) => this.setState({ password: text, didPasswordChange: true })}
							/>
						</View>

						<View style={{ flex: 1, paddingVertical: 5, width: '100%', flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<FontAwesome name='globe' size={27} color={'#93939b'} />
							</View>

							<ModalSelector
								onChange={(option) => this.setState({ country: option.label, didCountryChange: true })}
								style={{ width: '100%', flex: 0.85 }}
								selectStyle={{ borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start' }}
								selectTextStyle={{ color: '#d8d8d8', fontFamily: 'droidkufi', fontSize: 17, marginLeft: 4 }}
								optionTextStyle={{ color: bgColor, fontSize: 17, fontFamily: 'droidkufi' }}
								cancelText='إلغاء'
								overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
								cancelTextStyle={{ color: '#f44242', fontSize: 17, fontFamily: 'droidkufi' }}
								data={country_data}
								initValue={this.state.country}
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
								date={this.state.birthdate}
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
								onDateChange={(date) => { this.setState({ birthdate: date, didBirthdateChange: true }) }}
							/>
						</View>

						<View style={{ flex: 1, paddingVertical: 5, width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Foundation name='torsos-male-female' size={27} color={'#93939b'} />
							</View>

							<ModalSelector
								onChange={(option) => this.setState({ gender: option.label, didGenderChange: true })}
								style={{ width: '100%', flex: 0.85 }}
								selectStyle={{borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start'}}
								selectTextStyle={{ color: '#d8d8d8', fontFamily: 'droidkufi', fontSize: 19 }}
								optionTextStyle={{ color: bgColor, fontSize: 17, fontFamily: 'droidkufi' }}
								cancelText= 'إلغاء'
								overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
								cancelTextStyle={{ color: '#f44242', fontSize: 17, fontFamily: 'droidkufi' }}
								data={gender_data}
								initValue={this.state.gender}
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
							/>
						</View>
					</View>
				</Content>

				<TouchableOpacity 
					onPress={this.onSaveSettings}
					style={{ flex: 0.08 }}>
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

				<Toast ref="toast"
					style={{ backgroundColor: '#dcdee2', borderRadius: 25, }}
					position='bottom'
					positionValue={height * 0.52}
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: bgColor }} />
			</LazyContainer>
		)
	}
}
