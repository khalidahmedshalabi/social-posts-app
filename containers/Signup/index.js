import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import * as Animatable from 'react-native-animatable';

export default class Signup extends Component {
	render() {
		return (
			<Container style={{ backgroundColor: bgColor }}>
				<View style={{ flex: 0.36, justifyContent: 'flex-end', alignItems: 'center' }}>
					<Animatable.View animation="fadeInDown" duration={1000} delay={500}>
						<Feather name='user' size={150} color={mainColor} />
					</Animatable.View>
				</View>

				<View style={{ flex: 0.64, justifyContent: 'center' }}>
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.10, marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
								<Feather name='user' size={27} color={'#93939b'} />
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

						<View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
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

						<View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.10, marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
								<FontAwesome name='lock' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='تأكيد كلمة المرور'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								secureTextEntry={true}
								style={{
									flex: 1,
									color: 'white'
								}} />
						</View>
						
						<View style={{flex: 0.20, justifyContent: 'flex-end', alignItems: 'center'}}>
							<TouchableOpacity>
								<FontedText style={{color: 'white'}}>لديك حساب بالفعل؟</FontedText>
							</TouchableOpacity>
						</View>
					</View>

					<TouchableOpacity>
						<LinearGradient
							colors={['#b28003', '#f9ce63']}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={{
								paddingVertical: 12
							}}>
							<FontedText style={{ color: bgColor, textAlign: 'center', fontSize: 19 }}>إنشاء حساب</FontedText>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</Container>
		)
	}
}
