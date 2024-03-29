import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Platform, ActivityIndicator, Alert, WebView } from 'react-native';
import { connect } from 'react-redux'
import { Content } from 'native-base';
import { LinearGradient, ImagePicker, Permissions } from 'expo';
import { FontAwesome, Foundation, SimpleLineIcons, Feather, Entypo, Octicons } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import LazyContainer from '../../components/LazyContainer';
import ModalSelector from 'react-native-modal-selector'
import BackHeader from '../../components/BackHeader';
import Toast from 'react-native-easy-toast';
import PopupDialog from 'react-native-popup-dialog';
import { height } from '../../constants/Layout';
import { base_url, api_extension } from '../../constants/Server';
import { POST } from '../../utils/Network';

class AddPost extends Component {
	constructor() {
		super()

		this.state = {
			image: null,
			title: '',
			content: '',
			link: '',
			country: '',
			age: '',
			gender: '',
			max_reaches: '',
			media_type: 0, // 0 link, 1 image, 2 video,

			is_uploading_media: false,

			paymentMethod: 0,
			published: false,
			isPaymentDialogShown: false,
		}

	}

	componentDidMount() {
		if (this.props.navigation.state.params) {
			this.setState({
				title: this.props.navigation.state.params.title,
				content: this.props.navigation.state.params.content,
				link: this.props.navigation.state.params.link,
				country: this.props.navigation.state.params.country,
				age: this.props.navigation.state.params.age,
				gender: this.props.navigation.state.params.gender,
				max_reaches: this.props.navigation.state.params.max_reaches,
				media_type: this.props.navigation.state.params.media_type,
				media_type_str: this.props.navigation.state.params.media_type_str,
				image: this.props.navigation.state.params.image,
			})
		}
	}

	addToDraft = () => {
		if (this.state.title) {
			this.props.addDraftPost({ 
				title: this.state.title, 
				content: this.state.content, 
				link: this.state.link,
				country: this.state.country, 
				age: this.state.age,
				gender: this.state.gender, 
				max_reaches: this.state.max_reaches,
				media_type: this.state.media_type,
				media_type_str: this.state.media_type_str,
				image: this.state.image,
			})
			
			this.props.navigation.push("Drafts")
		}
		else {
			this.refs.toast.show('تأكد من ادخال العنوان');
		}

	}

	openImagePicker = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: false,
			base64: true,
		});
		if (!result.cancelled) {
			this.setState({
				image: result.uri,
				media_type_str: result.type,
				media_type: result.type === 'image' ? 1 : 2
			});
		}
	}

	pickImage = async () => {
		if (Platform.OS === 'ios') {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

			if (status === 'granted') {
				this.openImagePicker()
			}
		}
		else this.openImagePicker()
	}

	onPublishPost = () => {
		this.setState({ published: true }, () => {

			setTimeout(() => {
				this.props.navigation.replace('Tabs')
			}, 3000);
		})
	}

	uploadPostMedia = (post_id) => {
		this.setState({ is_uploading_media: true })

		const apiUrl = `${base_url}${api_extension}Posts/UploadPostMedia`;
		const uri = this.state.image;
		const uriParts = uri.split('.');
		const fileType = uriParts[uriParts.length - 1];
		const formData = new FormData();

		formData.append('document', {
			uri,
			name: `post_${post_id}_media.${fileType}`,
			type: `${this.state.media_type_str}/${fileType}`,
		});

		const options = {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				post_id
			},
		};

		return fetch(apiUrl, options).then((response) => response.json())
			.then((responseJson) => {
				if(responseJson.response == 1) {
					this.onPublishPost()
				} 
			})
			.catch((error) => {
				console.error(error);
				alert('error')
			});
	}

	addPost = () => {
		const { title, content, link, country, age, gender, max_reaches, media_type } = this.state

		if (!title || !content || !link || !country || !age || !gender || max_reaches < 1)
			return this.refs.toast.show('من فضلك قم بادخال كل البيانات')

		POST('Posts/AddPost', 
			{
				title, 
				content, 
				link, 
				country, 
				age, 
				gender, 
				max_reaches: parseInt(max_reaches), 
				media_type
			},
			res => {
				if(media_type > 0 && this.state.image) {
					const { post_id } = res.data
					this.uploadPostMedia(post_id)
				}
				else this.onPublishPost()
			},
			err => {

			})
	}

	renderPickedImage = () => {
		if (this.state.image) {
			return (
				<Image
					source={{ uri: this.state.image }}
					style={{ width: 250, height: 250 }}
					resizeMode='contain'
				/>
			)
		}
		else {
			return [
				<SimpleLineIcons key='1' name='camera' size={100} color={'#93939b'} />
				,
				<FontedText key='2' style={{ color: '#d8d8d8', fontSize: 18 }}>إضافة صورة او فيديو | اختياري</FontedText>
			]
		}
	}

	toggleDialog = (toggle) => {
		this.setState({ isPaymentDialogShown: toggle }, () => {
			if(toggle)
				this.popupDialog.show()
			else
				this.popupDialog.dismiss()
		})
	}

	askPaymentMethod = () => {
		Alert.alert(
			'طرق الدفع',
			'اى طرق الدفع تفضل؟',
			[
				{ text: 'الدفع بالنقاط', onPress: () => this.setState({ paymentMethod: 1 }, () => this.toggleDialog(true)) },
				{ text: 'الدفع بالمال', onPress: () => this.setState({ paymentMethod: 0 }, () => this.toggleDialog(true)) },
			],
			{ cancelable: true }
		)
	}

	renderPopDialogContent = () => {
		if (!this.state.isPaymentDialogShown) return null

		if (!this.state.max_reaches || !this.state.title || !this.state.content || (!this.state.link && !this.state.image)
			|| !this.state.country || !this.state.age || !this.state.gender 
			|| (this.state.paymentMethod != 0 && this.state.paymentMethod != 1)) {
			return (
				<FontedText style={{ color: mainColor, margin: 23, textAlign: 'center' }}>قم بملء كل الخانات المطلوبة فى المنشور</FontedText>
			)
		}

		const { paymentMethod, max_reaches } = this.state
		const { user_id } = this.props
		
		return (
			<WebView
				scalesPageToFit={true}
				javaScriptEnabled={true}
				source={{ uri: `${base_url}/PayForPost?user_id=${user_id}&method=${paymentMethod}&reaches=${max_reaches}` }}
				onMessage={(event) => { 
					const { data } = event.nativeEvent
					
					this.toggleDialog(false)

					switch(data) {
						case 'success':
							this.addPost()
							break;
						case 'invalid_request':
							alert('طلب غير صالح')
							break;
						case 'payment_error':
							alert('فشل فى الدفع')
							break;
						case 'not_enough_points':
							alert('لا يوجد نقاط كافية')
							break;
						case 'expired':
							alert('تأخرت فى الدفع. اعد المحاولة')
							break;
						case 'invalid_payment':
							alert('عملية دفع غير صالحة')
							break;
					}
				 }}
				style={{ flex: 1, height: 300, width: 300 }}
				ref="WebView"
			/>
		)
	}

	render() {
		if (this.state.published) {
			return (
				<View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center', padding: 25 }}>
					<FontedText style={{ fontSize: 24, marginBottom: 15, color: '#d8d8d8' }}>تم النشر</FontedText>
				</View>
			)
		}

		if(this.state.is_uploading_media) {
			return (
				<View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center', padding: 25 }}>
					<FontedText style={{ fontSize: 21, marginBottom: 15, color: '#d8d8d8' }}>جاري رفع {this.state.media_type == 1 ? 'الصورة' : 'الفيديو'}</FontedText>
					<ActivityIndicator size="large" color={mainColor} />
				</View>
			)
		}

		const gender_data = [
			{ key: 0, label: 'ذكر' },
			{ key: 1, label: 'أنثى' },
			{ key: 2, label: 'الاثنان' },
		];

		const age_data = [
			{ key: 0, label: '6-12' },
			{ key: 1, label: '13-18' },
			{ key: 2, label: '19-24' },
			{ key: 3, label: '25-44' },
			{ key: 5, label: '45-64' },
			{ key: 6, label: '65-130' },
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
			<LazyContainer style={{ backgroundColor: bgColor }}>
				<BackHeader
					navigation={this.props.navigation}
					title='إضافة منشور' />

				<Content>
					<TouchableOpacity
						onPress={() => this.pickImage()}
						style={{ flex: 0.55, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
						{this.renderPickedImage()}
					</TouchableOpacity>

					<View style={{ flex: 0.45, justifyContent: 'flex-start' }}>
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<FontAwesome name='tag' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='العنوان'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								style={{
									flex: 0.85,
									color: 'white'
								}}
								onChangeText={(text) => this.setState({ title: text })}
								value={this.state.title}

							/>
						</View>

						<View style={{ flex: 1, height: 200, flexDirection: 'row', paddingVertical: 17, alignItems: 'flex-start', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center', height: '100%' }}>
								<Octicons name='note' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='المحتوى...'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								multiline={true}
								autoCapitalize='none'
								maxLength={254}
								style={{
									flex: 0.85,
									textAlignVertical: 'top',
									color: 'white',
									backgroundColor: '#2a293d',
									borderRadius: 10,
									marginRight: 20,
									height: 166,
									paddingTop: 10,
									paddingLeft: 13
								}}
								onChangeText={(text) => this.setState({ content: text })}
								value={this.state.content}
							/>
						</View>

						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Feather name='link' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='الرابط'
								placeholderTextColor='#d8d8d8'
								underlineColorAndroid='transparent'
								maxLength={128}
								style={{
									flex: 0.85,
									color: 'white'
								}}
								onChangeText={(text) => this.setState({ link: text })}
								value={this.state.link}
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
								initValue={this.state.country || 'الدولة'}
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
								onChange={(option) => this.setState({ country: option.label })}
							//value={this.state.country}
							/>
						</View>

						<View style={{ flex: 1, paddingVertical: 5, width: '100%', flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#39384b', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Foundation name='torsos-all-female' size={27} color={'#93939b'} />
							</View>

							<ModalSelector
								style={{ width: '100%', flex: 0.85 }}
								selectStyle={{ borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start' }}
								selectTextStyle={{ color: '#d8d8d8', fontFamily: 'droidkufi', fontSize: 17, marginLeft: 4 }}
								optionTextStyle={{ color: bgColor, fontSize: 17, fontFamily: 'droidkufi' }}
								cancelText='إلغاء'
								overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
								cancelTextStyle={{ color: '#f44242', fontSize: 17, fontFamily: 'droidkufi' }}
								data={age_data}
								initValue={this.state.age || 'العمر'}
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
								onChange={(option) => { this.setState({ age: option.label }) }}
							//	labelExtractor={(age_data)=> {age_data.label}}
							//value={this.state.age}
							/>
						</View>
						<View style={{ flex: 1, paddingVertical: 5, width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Foundation name='torsos-male-female' size={27} color={'#93939b'} />
							</View>

							<ModalSelector
								style={{ width: '100%', flex: 0.85 }}
								selectStyle={{ borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start' }}
								selectTextStyle={{ color: '#d8d8d8', fontFamily: 'droidkufi', fontSize: 19 }}
								optionTextStyle={{ color: bgColor, fontSize: 17, fontFamily: 'droidkufi' }}
								cancelText='إلغاء'
								overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
								cancelTextStyle={{ color: '#f44242', fontSize: 17, fontFamily: 'droidkufi' }}
								data={gender_data}
								initValue={this.state.gender || 'الجنس'}
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
								onChange={(option) => { this.setState({ gender: option.label }) }}
							//value={this.state.gender}
							/>
						</View>

						<View style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#39384b' }}>
							<View style={{ flex: 0.15, alignItems: 'center' }}>
								<Entypo name='area-graph' size={27} color={'#93939b'} />
							</View>

							<FontedInput
								placeholder='المشاهدات المطلوبة'
								placeholderTextColor='#d8d8d8'
								keyboardType='numeric'
								underlineColorAndroid='transparent'
								maxLength={128}
								style={{
									flex: 0.70,
									color: 'white'
								}}
								onChangeText={(text) => this.setState({ max_reaches: text })}
								value={this.state.max_reaches}
							/>

							{/*<View style={{ flex: 0.15, alignItems: 'flex-start' }}>
								<FontedText style={{ color: mainColor }}>35 رس</FontedText>
							</View>*/}
						</View>
					</View>
				</Content>

				<View
					style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
					<TouchableOpacity 
						onPress={() => this.askPaymentMethod()}
						style={{ borderRadius: 20, flex: 0.5, marginHorizontal: 10 }}>
						<LinearGradient
							colors={['#b28003', '#f9ce63']}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 20,
								paddingVertical: 7
							}}>
							<FontedText style={{ color: bgColor, fontSize: 15 }}>نشر</FontedText>
						</LinearGradient>
					</TouchableOpacity>


					<TouchableOpacity style={{ flex: 0.5, borderWidth: 1, borderColor: mainColor, marginHorizontal: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
						onPress={() => {
							this.addToDraft()
						}}>
						<FontedText style={{ color: mainColor, fontSize: 15 }}>حفظ كمسودة</FontedText>
					</TouchableOpacity>
				</View>

				<PopupDialog
					dialogStyle={{ backgroundColor: bgColor, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
					width={0.80}
					height={0.7}
					ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
					{this.renderPopDialogContent()}
				</PopupDialog>

				<Toast
					ref="toast"
					style={{ backgroundColor: '#dcdee2', borderRadius: 25 }}
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

const mapStateToProps = (state) => ({
	user_id: state.login.user_id || -1,
})

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/DraftRedux.js');

	return {
		...ownProps,
		...stateProps,
		addDraftPost: (draft_post) => actions.addDraftPost(dispatch, draft_post),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(AddPost)