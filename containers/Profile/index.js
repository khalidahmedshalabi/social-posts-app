import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Button, Content } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import * as Animatable from 'react-native-animatable';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default class Profile extends Component {
	
	render() {
		return (
				<Container style={{backgroundColor: bgColor, alignItems: 'center'}}>
					<Content style={{ width: '100%' }}>
						<LinearGradient
							colors={['#b28003', '#f9ce63']}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								height: height*0.20,
								width: '100%'
							}}>
							<Animatable.View animation="fadeInDown" duration={1000} delay={500}>
								<FontedText style={{color: 'white', fontSize: 32}}>محمد أحمد</FontedText>
							</Animatable.View>
						</LinearGradient>

						<Animatable.View animation="fadeInUp" duration={1000} delay={500} style={{ paddingTop: height*0.10, alignItems: 'center' }}>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 0.50, alignItems: 'center'}}>
									<TouchableOpacity activeOpacity={0.7}>
										<View style={{backgroundColor: '#474668', borderRadius: 40, height: 130, width: 130, justifyContent: 'center', alignItems: 'center'}}>
											<Ionicons name='md-eye' size={80} color={mainColor} />
										</View>
										
										<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13 }}>بوستات مشاهدة</FontedText>
									</TouchableOpacity>
								</View>

								<View style={{ flex: 0.50, alignItems: 'center'}}>
									<TouchableOpacity activeOpacity={0.7}>
										<View style={{ backgroundColor: '#474668', borderRadius: 40, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>
											<MaterialCommunityIcons name='gift' size={80} color={mainColor} />
										</View>

										<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13 }}>الهدايا</FontedText>
									</TouchableOpacity>
								</View>
							</View>

							<View style={{ flexDirection: 'row', marginTop: 20 }}>
								<View style={{ flex: 0.50, alignItems: 'center' }}>
									<TouchableOpacity activeOpacity={0.7}>
										<View style={{ backgroundColor: '#474668', borderRadius: 40, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>
											<Ionicons name='md-settings' size={80} color={mainColor} />
										</View>

										<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13 }}>تعديل الحساب</FontedText>
									</TouchableOpacity>
								</View>

								<View style={{ flex: 0.50, alignItems: 'center' }}>
									<TouchableOpacity activeOpacity={0.7}>
										<View style={{ backgroundColor: '#474668', borderRadius: 40, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>
											<Ionicons name='md-add' size={80} color={mainColor} />
										</View>

										<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13 }}>إضافة بوست</FontedText>
									</TouchableOpacity>
								</View>
							</View>

							<View style={{ width: '100%', marginVertical: 20, alignSelf: 'center', alignItems: 'center' }}>
								<TouchableOpacity activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: 40, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>
										<MaterialIcons name='feedback' size={80} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13 }}>تواصل معنا</FontedText>
								</TouchableOpacity>
							</View>
						</Animatable.View>

						
							
						<Animatable.View animation="fadeIn" duration={2000} delay={500} style={{ flexDirection: 'row', position: 'absolute', paddingHorizontal: 17, marginTop: height*0.1625, backgroundColor: 'white', borderRadius: 7, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<FontedText style={{ color: bgColor }}>نقاط متوفرة</FontedText>
								<FontedText style={{ color: mainColor, fontSize: 17 }}>10</FontedText>
							</View>

							<View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 17 }}>
								<FontedText style={{ color: bgColor }}>مجموع النقاط</FontedText>
								<FontedText style={{ color: mainColor, fontSize: 17 }}>100</FontedText>
							</View>

							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<FontedText style={{ color: bgColor }}>نقاط مصروفة</FontedText>
								<FontedText style={{ color: mainColor, fontSize: 17 }}>1000</FontedText>
							</View>
						</Animatable.View>
					</Content>
				</Container>
		)
	}
}
