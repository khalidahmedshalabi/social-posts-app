import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Container } from 'native-base';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import * as Animatable from 'react-native-animatable';
import { createTransition, SlideUp } from 'react-native-transition';
//MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

const Transition = createTransition(SlideUp);


export default class Login extends Component {
	switch = () => {
		Transition.show(
				<Animatable.View animation="slideInUp" duration={20} style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center' }}>
					<MaterialCommunityIcons name='check-circle' size={150} color={'#24c144'} />
					<FontedText style={{color: 'white', fontSize: 25}}>عملية دخول ناجحة</FontedText>
				</Animatable.View>
		);
	}
	
	render() {
		return (
			<Transition>
				<Container style={{backgroundColor: bgColor}}>
					<View style={{flex: 0.33, justifyContent: 'flex-end', alignItems: 'center'}}>
						<Animatable.View animation="fadeInLeft" duration={1000} delay={500}>
							<FontAwesome name='sign-in' size={150} color={mainColor} />
						</Animatable.View>
					</View>

					<View style={{flex: 0.67, justifyContent: 'center'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
								<View style={{ flex: 0.10, marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
									<Entypo name='mail' size={27} color={'#93939b'} />
								</View>

								<FontedInput
									placeholder='البريد الالكتروني'
									placeholderTextColor='#d8d8d8'
									underlineColorAndroid='transparent'
									style={{
										flex: 1,
										color: 'white'
									}}
								/>
							</View>

							<View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b', borderBottomWidth: 1, borderBottomColor: '#39384b'}}>
								<View style={{ flex: 0.10, marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
									<FontAwesome name='lock' size={27} color={'#93939b'} />
								</View>
								
								<FontedInput
									placeholder='كلمة المرور'
									placeholderTextColor='#d8d8d8'
									underlineColorAndroid='transparent'
									secureTextEntry={true}
									style={{
										flex: 1,
										color: 'white'
									}} />
							</View>

							<View style={{ flex: 0.35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 30}}>
								<TouchableOpacity style={{backgroundColor: mainColor, borderRadius: 25, paddingHorizontal: 12, paddingVertical: 12}}>
									<FontedText style={{ color: bgColor, textAlign: 'center' }}>إنشاء حساب جديد</FontedText>
								</TouchableOpacity>

								<TouchableOpacity style={{ borderRadius: 25, borderWidth: 1, borderColor: mainColor, paddingHorizontal: 12, paddingVertical: 12}}>
									<FontedText style={{ color: mainColor, textAlign: 'center' }}>نسيت كلمة المرور؟</FontedText>
								</TouchableOpacity>
							</View>
						</View>
						
						<TouchableOpacity
							onPress={this.switch}>
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
