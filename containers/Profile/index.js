import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import * as Animatable from 'react-native-animatable';
import { GET } from '../../utils/Network';
import HoldUp from '../../components/HoldUp';

const fontSize = 13
const boxBorderRadius = 30
const boxDim = 100
const height = Dimensions.get('window').height

class Profile extends Component {
	state = {
		fetchedData: false,

		id: '',
		name: '',
		points_earned: 0,
		points_left: 0,
		points_used: 0,
		gifts_count: 0
	}

	componentDidMount() {
		GET('Profile', res => this.setState({ ...res.data.user, fetchedData: true }), err => {  })
	}

	render() {
		if (!this.state.fetchedData) return <HoldUp />

		return (
			<Container style={{ backgroundColor: bgColor, alignItems: 'center' }}>
				<Content style={{ width: '100%' }}>
					<LinearGradient
						colors={['#b28003', '#f9ce63']}
						start={{ x: 0.0, y: 1.0 }}
						end={{ x: 1.0, y: 0.0 }}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							height: height * 0.25,
							width: '100%'
						}}>
						<Animatable.Image
							source={require('../../assets/images/Hexagon.png')}
							animation={{
								0: {
									rotate: '0deg',
									translateY: 0
								},
								0.5: {
									translateY: 20
								},
								1: {
									rotate: '360deg',
									translateY: 0
								}
							}}
							duration={18000}
							easing='linear'
							iterationCount='infinite'
							style={{
								opacity: 0.18,
								position: 'absolute',
								width: 200,
								height: 200,
								alignSelf: 'flex-start',
								marginBottom: 200,
								marginLeft: -100
							}}>
						</Animatable.Image>

						<Animatable.Image
							source={require('../../assets/images/Hexagon.png')}
							animation={{
								0: {
									rotate: '360deg',
									translateY: 0
								},
								0.5: {
									translateY: 20
								},
								1: {
									rotate: '0deg',
									translateY: 0
								}
							}}
							duration={18000}
							easing='linear'
							iterationCount='infinite'
							style={{
								opacity: 0.18,
								width: 200,
								height: 200,
								alignSelf: 'flex-start',
								marginTop: -150,
								marginLeft: 70
							}}>
						</Animatable.Image>

						<Animatable.Image
							source={require('../../assets/images/Hexagon.png')}
							animation={{
								0: {
									rotate: '360deg',
									translateY: 0
								},
								0.5: {
									translateY: 20
								},
								1: {
									rotate: '0deg',
									translateY: 0
								}
							}}
							duration={18000}
							easing='linear'
							iterationCount='infinite'
							style={{
								opacity: 0.18,
								position: 'absolute',
								width: 200,
								height: 200,
								alignSelf: 'flex-start',
								marginTop: -100,
								marginLeft: 250
							}}>
						</Animatable.Image>

						<Animatable.View animation="fadeInDown" duration={1000} delay={500}>
							<FontedText style={{ color: 'white', fontSize: 32 }}>({this.state.id})  {this.state.name}</FontedText>
						</Animatable.View>
					</LinearGradient>

					<Animatable.View animation="fadeInUp" duration={1000} delay={500}
						style={{ paddingTop: height * 0.10, alignItems: 'center' }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 0.333, alignItems: 'center' }}>
								<TouchableOpacity
									onPress={
										() => {
											this.props.navigation.navigate("Drafts")
										}
									}
									activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: boxBorderRadius, height: boxDim, width: boxDim, justifyContent: 'center', alignItems: 'center' }}>
										<MaterialIcons name='drafts' size={70} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13, fontSize: fontSize }}>مسودات</FontedText>
								</TouchableOpacity>
							</View>

							<View style={{ flex: 0.333, alignItems: 'center' }}>
								<TouchableOpacity
									onPress={
										() => {
											this.props.navigation.navigate("AddPost", {})
										}
									}
									activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: boxBorderRadius, height: boxDim, width: boxDim, justifyContent: 'center', alignItems: 'center' }}>
										<Ionicons name='md-add' size={70} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13, fontSize: fontSize }}>إضافة منشور</FontedText>
								</TouchableOpacity>
							</View>

							<View style={{ flex: 0.333, alignItems: 'center' }}>
								<TouchableOpacity
									onPress={
										() => {
											this.props.navigation.navigate("Gifts")
										}
									}
									activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: boxBorderRadius, height: boxDim, width: boxDim, justifyContent: 'center', alignItems: 'center' }}>
										<MaterialCommunityIcons name='gift' size={70} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13, fontSize: fontSize }}>الهدايا</FontedText>
								</TouchableOpacity>

								<View
									style={{
										width: 28,
										height: 28,
										backgroundColor: mainColor,
										borderRadius: 14,
										borderWidth: 1,
										borderColor: 'white',
										justifyContent: 'center',
										alignItems: 'center',
										position: 'absolute',
										top: -8,
										right: 80,
										zIndex: 2
									}}>
									<FontedText style={{ color: bgColor, fontSize: 15 }}>{this.state.gifts_count}</FontedText>
								</View>
							</View>
						</View>

						<View style={{ flexDirection: 'row', marginTop: 20 }}>
							<View style={{ flex: 0.333, alignItems: 'center' }}>
								<TouchableOpacity
									onPress={
										() => {
											this.props.setLoggedIn(false)
										}
									}
									activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: boxBorderRadius, height: boxDim, width: boxDim, justifyContent: 'center', alignItems: 'center' }}>
										<Ionicons name='md-exit' size={70} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13, fontSize: fontSize }}>تسجيل الخروج</FontedText>
								</TouchableOpacity>
							</View>

							<View style={{ flex: 0.333, alignItems: 'center' }}>
								<TouchableOpacity
									onPress={
										() => {
											this.props.navigation.navigate("EditProfile")
										}
									}
									activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: boxBorderRadius, height: boxDim, width: boxDim, justifyContent: 'center', alignItems: 'center' }}>
										<Ionicons name='md-settings' size={70} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13, fontSize: fontSize }}>تعديل الحساب</FontedText>
								</TouchableOpacity>
							</View>

							<View style={{ flex: 0.333, alignItems: 'center' }}>
								<TouchableOpacity
									onPress={
										() => {
											this.props.navigation.navigate("PostsHistory")
										}
									}
									activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: boxBorderRadius, height: boxDim, width: boxDim, justifyContent: 'center', alignItems: 'center' }}>
										<MaterialCommunityIcons name='history' size={70} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13, fontSize: fontSize }}>منشورات شاهدتها</FontedText>
								</TouchableOpacity>
							</View>
						</View>

						<View style={{ flexDirection: 'row', marginVertical: 20 }}>
							<View style={{ flex: 0.50, alignItems: 'center' }}>
								<TouchableOpacity
									onPress={
										() => {
											this.props.navigation.navigate("ContactUs")
										}
									}
									activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: boxBorderRadius, height: boxDim, width: boxDim, justifyContent: 'center', alignItems: 'center' }}>
										<MaterialIcons name='feedback' size={70} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13, fontSize: fontSize }}>تواصل معنا</FontedText>
								</TouchableOpacity>
							</View>
						</View>
					</Animatable.View>



					<Animatable.View animation="fadeIn" duration={2000} delay={500} style={{ flexDirection: 'row', position: 'absolute', paddingHorizontal: 17, marginTop: height * 0.2125, backgroundColor: 'white', borderRadius: 7, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<FontedText style={{ color: bgColor }}>نقاط متوفرة</FontedText>
							<FontedText style={{ color: mainColor, fontSize: 17 }}>{this.state.points_left}</FontedText>
						</View>

						<View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 17 }}>
							<FontedText style={{ color: bgColor }}>مجموع النقاط</FontedText>
							<FontedText style={{ color: mainColor, fontSize: 17 }}>{this.state.points_earned}</FontedText>
						</View>

						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<FontedText style={{ color: bgColor }}>نقاط مصروفة</FontedText>
							<FontedText style={{ color: mainColor, fontSize: 17 }}>{this.state.points_used}</FontedText>
						</View>
					</Animatable.View>
				</Content>
			</Container>
		)
	}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/LoginRedux.js');

	return {
		...ownProps,
		...stateProps,
		setLoggedIn: (logged_in) => actions.setLoggedIn(dispatch, logged_in),
	};
}

export default connect(undefined, undefined, mergeProps)(Profile)