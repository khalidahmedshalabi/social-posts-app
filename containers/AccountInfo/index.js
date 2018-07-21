import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import DatePicker from 'react-native-datepicker'
import ModalSelector from 'react-native-modal-selector'
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-easy-toast';
import { height } from '../../constants/Layout';
import { POST } from '../../utils/Network';

export default class AccountInfo extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			birthdate: '',
			country: '',
			gender: '',
		}
	}

	onSaveAccountInfo = () => {
		const { birthdate, gender, country } = this.state

		if(!birthdate || !gender || !country)
			this.refs.toast.show('من فضلك قم بادخال كل البيانات')
		else {
			const { name, email, password } = this.props.navigation.state.params

			POST('Signup', {
				name, 
				email, 
				password,
				birthdate, 
				gender, 
				country 
			},
			res => {
				const { response } = res.data

				switch(response) {
					case 0:
						this.refs.toast.show('هذا البريد الالكتروني مُستخدم من قبل')
						break;
					case -1:
						this.refs.toast.show('لقد تم ارسال كود التحقق بالفعل. تفقد بريدك الالكتروني')
						break;
					case 1:
						this.props.navigation.navigate("CodeConfirmation", { 
							sourceScreen: 'AccountInfo', 
							code: res.data.verification_code, 
							user_id: res.data.user_id
						})						
						break;
				}				
			},
			err => this.refs.toast.show('خطاء فى الشبكة'))
		}
	}

	render() {
		const gender_data = [
			{ key: 0, label: 'ذكر' },
			{ key: 1, label: 'أنثى' },
			{ key: 2, label: 'الاثنان' },
		];

		const country_data = [
			{ key: 0, label: 'السعودية' },
			{ key: 1, label: 'مصر' },
			{ key: 2, label: 'فلسطين' }
		];

		return (
			<Container style={{backgroundColor: bgColor}}>
				<View style={{ flex: 0.44, justifyContent: 'flex-end', alignItems: 'center' }}>
					<Animatable.View animation="fadeIn" duration={1000} delay={500}>
						<MaterialCommunityIcons name='file-document' size={150} color={mainColor} />
					</Animatable.View>
				</View>

				<View style={{ flex: 0.48, justifyContent: 'center' }}>
					<View style={{ width: '100%', flexDirection: 'row', paddingVertical: 7, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
						<View style={{ marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
							<FontAwesome name='globe' size={27} color={'#93939b'} />
						</View>

						<ModalSelector
							onChange={(option) => this.setState({ country: option.label })}
							style={{ width: '100%' }}
							selectStyle={{ borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start' }}
							selectTextStyle={{ color: '#d8d8d8', fontFamily: 'droidkufi', fontSize: 19 }}
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

					<View style={{ width: '100%', flexDirection: 'row', paddingVertical: 7, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
						<View style={{ marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
							<FontAwesome name='calendar-o' size={27} color={'#93939b'} />
						</View>

						<DatePicker
							style={{width: '100%'}}
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
							onDateChange={(date) => { this.setState({ birthdate: date }) }}
						/>
					</View>

					<View style={{ width: '100%', flexDirection: 'row', paddingVertical: 7, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
						<View style={{ marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
							<Foundation name='torsos-male-female' size={27} color={'#93939b'} />
						</View>

						<ModalSelector
							onChange={(option) => this.setState({ gender: option.label })}
							style={{width: '100%'}}
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

				<TouchableOpacity 
					onPress={this.onSaveAccountInfo}
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
					positionValue={height * 0.55}
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: bgColor }} />
			</Container>
		)
	}
}
