import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { Container, Content } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedInput from '../../components/FontedInput';
import FontedText from '../../components/FontedText';
import PopupDialog from 'react-native-popup-dialog';
import * as Animatable from 'react-native-animatable';
import { GET, POST } from '../../utils/Network';
import HoldUp from '../../components/HoldUp';
import Toast from 'react-native-easy-toast'
import { EventRegister } from 'react-native-event-listeners'

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

	componentWillMount() {
		this.refreshListener = EventRegister.addEventListener('UpdateProfile', () => {
			this.fetchData(true)
		})
	}

	componentWillUnmount() {
		EventRegister.removeEventListener(this.refreshListener)
	}

	componentDidMount() {
		this.fetchData(true)
	}

	fetchData = (showLoader) => {
		GET('Profile', res => this.setState({ ...res.data.user, fetchedData: showLoader }), err => { })
	}

	onTransferPoints = () => {
		this.popupDialog.dismiss()
		Keyboard.dismiss()

		const { transfer_points_amount, transfer_points_target } = this.state

		if(!transfer_points_amount || !transfer_points_target) {
			this.refs.toast.show('مدخلات ناقصة')
			return
		}

		POST('Profile/TransferPoints', {
			to_user_id: parseInt(transfer_points_target),
			amount: parseInt(transfer_points_amount)
		}, res => {
			switch(res.data.response) {
				case -1:
					this.refs.toast.show('لا يوجد مستخدم بهذا الرقم')
					break
				case 0:
					this.refs.toast.show('ليس لديك نقاط كافية')
					break
				case 1:
					this.fetchData(true)
					this.refs.toast.show('تم تحويل النقاط بنجاح')
					break
			}
		}, err => {

		})
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
							<FontedText style={{ color: 'white', fontSize: 32 }}>({this.state.id}) {this.state.name}</FontedText>
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

							<View style={{ flex: 0.333, alignItems: 'center' }}>
								<TouchableOpacity
									onPress={
										() => {
											this.popupDialog.show();
										}
									}
									activeOpacity={0.7}>
									<View style={{ backgroundColor: '#474668', borderRadius: boxBorderRadius, height: boxDim, width: boxDim, justifyContent: 'center', alignItems: 'center' }}>
										<MaterialCommunityIcons name='transfer' size={70} color={mainColor} />
									</View>

									<FontedText style={{ color: 'white', textAlign: 'center', marginTop: 13, fontSize: fontSize }}>تحويل نقاط</FontedText>
								</TouchableOpacity>
							</View>
						</View>

						<View style={{ flexDirection: 'row', marginVertical: 20 }}>
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

							<View style={{ flex: 0.333 }}>
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

				<PopupDialog
					dialogStyle={{ 
						backgroundColor: bgColor, 
						borderRadius: 10, 
						justifyContent: 'center', 
						alignItems: 'center', 
						paddingVertical: 30,
						paddingHorizontal: 15 
					}}
					overlayOpacity={0.85}
					width={0.85}
					height={0.4}
					onDismissed={() => { Keyboard.dismiss() }}
					ref={(popupDialog) => { this.popupDialog = popupDialog; }}>

					<FontedInput
						placeholder='رقم الحساب'
						placeholderTextColor='#d8d8d8'
						underlineColorAndroid='transparent'
						keyboardType='numeric'
						style={{
							color: 'white',
							backgroundColor: '#2a293d',
							borderRadius: 10,
							width: '100%',
							paddingLeft: 13
						}}
						onChangeText={(text) => this.setState({ transfer_points_target: text })}
					/>

					<FontedInput
						placeholder='عدد النقاط'
						placeholderTextColor='#d8d8d8'
						underlineColorAndroid='transparent'
						keyboardType='numeric'
						style={{
							color: 'white',
							backgroundColor: '#2a293d',
							borderRadius: 10,
							width: '100%',
							marginTop: 15,
							paddingLeft: 13
						}}
						onChangeText={(text) => this.setState({ transfer_points_amount: text })}
					/>

					<TouchableOpacity
						onPress={this.onTransferPoints}
						style={{ borderRadius: 20, marginTop: 30 }}>
						<LinearGradient
							colors={['#b28003', '#f9ce63']}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 20,
								paddingVertical: 10,
								paddingHorizontal: 50
							}}>
							<FontedText style={{ color: bgColor, fontSize: 15 }}>تحويل</FontedText>
						</LinearGradient>
					</TouchableOpacity>
				</PopupDialog>

				<Toast
					ref="toast"
					style={{ backgroundColor: '#dcdee2', borderRadius: 25, }}
					position='bottom'
					positionValue={height * 0.78}
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: bgColor }} />
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