import React, { Component } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Container } from 'native-base';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import * as Animatable from 'react-native-animatable';
import { height,width } from '../../constants/Layout';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class Signup extends Component {
	constructor(props) {
        super(props);
        this.state = {
			username:'',
            emailaddress: '',
			password: '',
			confirmpassword:'',
			}
		}
		
		Check = () => {
			var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var isValidEmail = emailRegex.test(this.state.emailaddress);
			var isValidUser = emailRegex.test(this.state.username);
			if(!this.state.username || !this.state.emailaddress || !this.state.password || !this.state.confirmpassword)
			 {
				 this.refs.toast.show('برجاء ادخال البيانات كاملة');
			 }
			 else if (this.state.username.length<3)
			 {
				this.refs.toast.show('يجب أن يحتوي الاسم علي 3 حروف علي الاقل');
			 }
			 else if (isValidUser)
			 {
				this.refs.toast.show('برجاء ادخال الاسم و ليس البريد الالكتروني');
			 }
			 else if(this.state.password.length < 8 || this.state.confirmpassword.length < 8 )
			 {
				 this.refs.toast.show('الحد الادني لكلمة المرور 8 حروف او ارقام');
			 }
        	else if(!isValidEmail)
        	{
            	this.refs.toast.show('تأكد من ادخال البريد الالكتروني الصحيح');
			}
			else if(this.state.password!=this.state.confirmpassword)
			 {
				this.refs.toast.show('كلمة المرور غير متطبقة');
			 }
			 else
			 {
				{this.props.navigation.navigate("Tabs")}
			 } 
			
		}; 	
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
								placeholder='الاسم'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								style={{
									flex: 1,
									color: 'white'
								}}
								onChangeText={(text) => this.setState({username:text})}
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
								autoCapitalize='none'
								keyboardType='email-address'
								maxLength={254}
								style={{
									flex: 1,
									color: 'white'
								}}
								onChangeText={(text) => this.setState({emailaddress:text})}
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
								onChangeText={(text) => this.setState({password:text})}
								/>
						</View>

						<View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.10, marginLeft: 30, marginRight: 10, alignItems: 'center' }}>
								<FontAwesome name='lock' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='تأكيد كلمة المرور'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								maxLength={128}
								secureTextEntry={true}
								style={{
									flex: 1,
									color: 'white'
								}} 
								onChangeText={(text) => this.setState({confirmpassword:text})}
								/>
						</View>
						
						
						<View style={{flex: 0.20, justifyContent: 'flex-end', alignItems: 'center'}}>
							<TouchableOpacity>
								<FontedText style={{color: 'white'}}>لديك حساب بالفعل؟</FontedText>
							</TouchableOpacity>
						</View>
						
						<Toast 	ref="toast" 
								style={{backgroundColor:'#dcdee2',borderRadius:25,}}
								position='bottom'
								positionValue={height*0.52}
								fadeInDuration={750}
								fadeOutDuration={1000}
								opacity={0.8}
								textStyle={{color:bgColor}}/>
					</View>

					<TouchableOpacity
					onPress={() => {
						this.Check()
					}}>>
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
