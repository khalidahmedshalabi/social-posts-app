import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, View } from 'react-native';
import LazyContainer from '../../components/LazyContainer';
import { LinearGradient } from 'expo';
import { bgColor } from '../../constants/Colors'
import FontedText from '../../components/FontedText'
import BackHeader from '../../components/BackHeader';
import { Content } from 'native-base';
import ModalSelector from 'react-native-modal-selector'
import FontedInput from '../../components/FontedInput';
import Toast from 'react-native-easy-toast'
import { GET } from '../../utils/Network';

const height = Dimensions.get('window').height

export default class BuyGift extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...this.props.navigation.state.params.gift,
			payment_method: 'باى بال',
			payment_id: 0,
			user_message: ''
		}
	}

	onBuyGift = () => {
		if (!this.state.user_message) {
			this.refs.toast.show('من فضلك ادخل البيانات');
			return
		}

		const { id, info, title, user_message, payment_method } = this.state
		const message = `${title} - ${info} - ${payment_method} - ${user_message}`

		GET(`Gifts/UserOrderGift?gift_id=${String(id)}&info=${message}`, res => {
			if (res.data.response == 0) {
				this.refs.toast.show('ليس لديك نقاط كافية');
			}
			else if (res.data.response == 1) {
				this.refs.toast.show('تم الشراء. ستصلك الهدية خلال يوم او اكثر. راقب بريدك الالكتروني و التنبيهات', 10000);
			}
		}, err => { })
	}

	render() {
		const payment_methods = [
			{ key: 0, label: 'باى بال' },
			{ key: 1, label: 'تحويل بنكي' },
		];

		return (
			<LazyContainer style={{ backgroundColor: bgColor }}>
				<BackHeader
					navigation={this.props.navigation}
					title='بيانات المستلم' />

				<Content contentContainerStyle={{ paddingLeft: 8 }}>
					<View
						style={{
							borderBottomWidth: 1,
							borderBottomColor: '#39384b' 
						}}>
						<FontedInput
							placeholder='الهدية'
							placeholderTextColor='#d8d8d8'
							underlineColorAndroid='transparent'
							style={{
								color: 'white',
							}}
							value={`الهدية: ${this.state.title}`}
							editable={false}
						/>
					</View>

					<ModalSelector
						style={{ width: '100%' }}
						selectStyle={{ borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0, alignItems: 'flex-start' }}
						selectTextStyle={{ color: 'white', fontFamily: 'droidkufi', fontSize: 17, marginLeft: 4 }}
						optionTextStyle={{ color: bgColor, fontSize: 17, fontFamily: 'droidkufi' }}
						cancelText='إلغاء'
						overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
						cancelTextStyle={{ color: '#f44242', fontSize: 17, fontFamily: 'droidkufi' }}
						data={payment_methods}
						initValue={this.state.payment_method}
						supportedOrientations={['portrait']}
						accessible={true}
						scrollViewAccessibilityLabel={'Scrollable options'}
						cancelButtonAccessibilityLabel={'Cancel Button'}
						onChange={(option) => this.setState({ payment_method: option.label, payment_id: option.key })}
					/>

					<View 
						style={{ 
							flex: 1, 
							height: 350, 
							flexDirection: 'row', 
							paddingVertical: 17, 
							alignItems: 'flex-start', 
							borderTopWidth: 1, 
							borderTopColor: '#39384b' 
						}}>
						<FontedInput
							placeholder={
								this.state.payment_id == 0 ? 
									'اكتب بيانات حساب باى بال هنا و اى بيانات اضافية اخرى' : 'اكتب بيانات حسابك البنكي هنا و اى بيانات اضافية اخرى'
							}
							placeholderTextColor='#d8d8d8'
							underlineColorAndroid='transparent'
							multiline={true}
							maxLength={868}
							style={{
								textAlignVertical: 'top',
								color: 'white',
								backgroundColor: '#2a293d',
								borderRadius: 10,
								marginRight: 20,
								height: 166,
								paddingTop: 10,
								paddingLeft: 13
							}}
							onChangeText={(text) => this.setState({ user_message: text })}
							value={this.state.user_message}
						/>
					</View>
				</Content>

				<TouchableOpacity 
					onPress={() => { this.onBuyGift() }}
					style={{ flex: 0.12 }} >
					<LinearGradient
						colors={['#b28003', '#f9ce63']}
						start={{ x: 0.0, y: 1.0 }}
						end={{ x: 1.0, y: 0.0 }}
						style={{
							paddingVertical: 12,
							flex: 1
						}}>
						<FontedText style={{ color: bgColor, textAlign: 'center', fontSize: 19 }}>تأكيد الشراء</FontedText>
					</LinearGradient>
				</TouchableOpacity>

				<Toast
					ref="toast"
					style={{ backgroundColor: '#dcdee2', borderRadius: 25, }}
					position='bottom'
					positionValue={height * 0.78}
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: bgColor }} />
			</LazyContainer>
		)
	}
}