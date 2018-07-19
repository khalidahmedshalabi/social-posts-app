import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-easy-toast'
import { height } from '../../constants/Layout';
import { createTransition, SlideUp } from 'react-native-transition';

const Transition = createTransition(SlideUp);

class Login extends Component {
	constructor(props) {
		super(props);

		this.successfulLoginTransitionID = null

		this.state = {
			emailaddress: '',
			password: '',
		}
	}

	switch = () => {
		this.successfulLoginTransitionID = Transition.show(
			<Animatable.View animation="slideInUp" duration={20} style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center' }}>
				<MaterialCommunityIcons name='check-circle' size={150} color={'#24c144'} />
				<FontedText style={{ color: 'white', fontSize: 25 }}>عملية دخول ناجحة</FontedText>
			</Animatable.View>
		);
	}

	loginUser = () => {
		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var isValidEmail = emailRegex.test(this.state.emailaddress);
		
		if (!this.state.emailaddress || !this.state.password) {
			this.refs.toast.show('برجاء ادخال البيانات كاملة');
		}
		else if (this.state.password.length < 8) {
			this.refs.toast.show('الحد الادني لكلمة المرور 8 حروف او ارقام');
		}
		else if (!isValidEmail) {
			this.refs.toast.show('بريد الكتروني غير صالح');
		}
		else {
			this.switch()
		}
	};

	render() {
		return (
			<Transition
				onTransitioned={(id) => {
					if (id == this.successfulLoginTransitionID)
						requestAnimationFrame(() => this.props.setLoggedIn(true)) 
				}}>
				<Container style={{ backgroundColor: bgColor }}>
					<View style={{ flex: 0.33, justifyContent: 'flex-end', alignItems: 'center' }}>
						<Animatable.View animation="fadeInLeft" duration={1000} delay={500}>
							<FontAwesome name='sign-in' size={150} color={mainColor} />
						</Animatable.View>
					</View>
					<View style={{ flex: 0.67, justifyContent: 'center' }}>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
								<View style={{ flex: 0.10, marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
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
										flex: 1,
										color: 'white'
									}}
									onChangeText={(text) => this.setState({ emailaddress: text })}
								/>
							</View>

							<View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
								<View style={{ flex: 0.10, marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
									<FontAwesome name='lock' size={27} color={'#93939b'} />
								</View>

								<FontedInput
									placeholder='كلمة المرور'
									placeholderTextColor='#d8d8d8'
									underlineColorAndroid='transparent'
									maxLength={128}
									secureTextEntry={true}
									style={{
										flex: 1,
										color: 'white'
									}}
									onChangeText={(text) => this.setState({ password: text })}
								/>
							</View>


							<View style={{ flex: 0.35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 30 }}>
								<TouchableOpacity style={{ backgroundColor: mainColor, borderRadius: 25, paddingHorizontal: 12, paddingVertical: 12 }}
									onPress={
										() => {
											this.props.navigation.navigate("Signup")
										}
									}
								>
									<FontedText style={{ color: bgColor, textAlign: 'center' }}>إنشاء حساب جديد</FontedText>
								</TouchableOpacity>

								<TouchableOpacity style={{ borderRadius: 25, borderWidth: 1, borderColor: mainColor, paddingHorizontal: 12, paddingVertical: 12 }}
									onPress={
										() => {
											this.props.navigation.navigate("ResetPassword")
										}
									}
								>
									<FontedText style={{ color: mainColor, textAlign: 'center' }}>نسيت كلمة المرور؟</FontedText>
								</TouchableOpacity>
							</View>
							<Toast ref="toast"
								style={{ backgroundColor: '#dcdee2', borderRadius: 25, }}
								position='bottom'
								positionValue={height * 0.52}
								fadeInDuration={750}
								fadeOutDuration={1000}
								opacity={0.8}
								textStyle={{ color: bgColor }} />
						</View>

						<TouchableOpacity
							onPress={() => {
								this.loginUser()
							}}>
							<LinearGradient
								colors={['#b28003', '#f9ce63']}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 1.0, y: 0.0 }}
								style={{
									paddingVertical: 12
								}}>
								<FontedText style={{ color: bgColor, textAlign: 'center', fontSize: 19 }}>تسجيل الدخول</FontedText>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</Container>
			</Transition>
		)
	}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/LoginRedux.js');

	return {
		...ownProps,
		...stateProps,
		setLoggedIn: (logged_in) => actions.setLoggedIn(dispatch, logged_in)
	};
}

export default connect(undefined, undefined, mergeProps)(Login)