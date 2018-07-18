import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
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
import Toast, {DURATION} from 'react-native-easy-toast';
import { height } from '../../constants/Layout';
import { base_url, api_extension } from '../../constants/Server';


class AddPost extends Component {
	componentDidMount () {
		
			if(this.props.navigation.state.params)
			{
			this.setState({title:this.props.navigation.state.params.title,content:this.props.navigation.state.params.content,link:this.props.navigation.state.params.link,country:this.props.navigation.state.params.country,age:this.props.navigation.state.params.age,gender:this.props.navigation.state.params.gender,max_reaches:this.props.navigation.state.params.max_reaches})
			}
			else{}
	}
	constructor() {
		super()

		this.state = {
			image: null,
			title: '', 
			content: '',
			link: '',
			country:'',
			age:'', 
			gender: '',
			max_reaches:'',
			media_type: 0, // 0 link, 1 image, 2 video,
			post_id: 0,
		}

	}
	DotheDraft = () => {
		if(this.state.title)
		{
			this.props.addDraftPost({title:this.state.title ,content: this.state.content, link:this.state.link,country:this.state.country,age:this.state.age,gender:this.state.gender,max_reaches:this.state.max_reaches,})
			console.log("title::"+this.state.title)
			console.log("content::"+this.state.content)
			console.log("country::"+this.state.country)
			this.props.navigation.push("Drafts")
		}
		else
		{
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
		if(Platform.OS === 'ios') {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

			if (status === 'granted') {
				this.openImagePicker()
			}
		}
		else this.openImagePicker()
	}

	uploadPostMedia = () => {
		const apiUrl = `${base_url}${api_extension}Posts/UploadPostMedia`;
		const uri = this.state.image;
		const uriParts = uri.split('.');
		const fileType = uriParts[uriParts.length - 1];
		const formData = new FormData();

		formData.append('document', {
			uri,
			name: `post_${this.state.post_id}_media.${fileType}`,
			type: `${this.state.media_type_str}/${fileType}`,
			post_id: this.state.post_id
		});

		const options = {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		};

		return fetch(apiUrl, options);
	}

	renderPickedImage = () => {
		if(this.state.image) {
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
				<FontedText key='2' style={{ color: '#d8d8d8', fontSize: 18 }}>إضافة صورة او فيديو</FontedText>
			]
		}
	}

	render() {
		const gender_data = [
			{ key: 0, label: 'ذكر' },
			{ key: 1, label: 'أنثى' },
			{ key: 2, label: 'الاثنان' },
		];

		const age_data = [
			{ key: 0, label: '1' },
			{ key: 1, label: '2' },
			{ key: 2, label: '3' },
			{ key: 3, label: '4' },
			{ key: 4, label: '5' },
		];

		const country_data = [
			{ key: 0, label: 'السعودية' },
			{ key: 1, label: 'مصر' },
			{ key: 2, label: 'فلسطين' }
		];

		return (
			<LazyContainer style={{backgroundColor: bgColor}}>
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
								onChangeText={(text) => this.setState({title:text})}
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
								keyboardType='email-address'
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
								onChangeText={(text) => this.setState({content:text})}
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
								onChangeText={(text) => this.setState({link:text})}
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
								initValue="الدولة"
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
								onChange={(option) =>  this.setState({textInputValue:option.label})}
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
								initValue="العمر"
								supportedOrientations={['portrait']}
								accessible={true}
								scrollViewAccessibilityLabel={'Scrollable options'}
								cancelButtonAccessibilityLabel={'Cancel Button'}
								onChange={(option)=>{ this.setState({textInputValue:option.label})}}
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
								onChange={(option)=>{ this.setState({textInputValue:option.label})}}							
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
								onChangeText={(text) => this.setState({max_reaches:text})}
								value={this.state.max_reaches}
							/>

							<View style={{ flex: 0.15, alignItems: 'flex-start' }}>
								<FontedText style={{ color: mainColor }}>35 رس</FontedText>
							</View>
						</View>
					</View>
				</Content>

				<Toast
					ref="toast"
					style={{ backgroundColor: '#dcdee2', borderRadius: 25 }}
					position='bottom'
					positionValue={height * 0.30}
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: bgColor }} />

				<View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
					<TouchableOpacity style={{ borderRadius: 20, flex: 0.5, marginHorizontal: 10 }}>
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
							{this.DotheDraft()}

						}}>
						<FontedText style={{ color: mainColor, fontSize: 15 }}>حفظ كمسودة</FontedText>
					</TouchableOpacity>
				</View>
			</LazyContainer>
		)
	}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/DraftRedux.js');
	
	return {
		...ownProps,
		...stateProps,
		addDraftPost: (draft_post) => actions.addDraftPost(dispatch, draft_post),
	};
}

export default connect(undefined, undefined, mergeProps)(AddPost)