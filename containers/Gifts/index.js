import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native';
import LazyContainer from '../../components/LazyContainer';
import { LinearGradient } from 'expo';
import { bgColor, mainColor } from '../../constants/Colors'
import FontedText from '../../components/FontedText'
import Carousel from 'react-native-snap-carousel';
import BackHeader from '../../components/BackHeader';
import { GET } from '../../utils/Network';
import HoldUp from '../../components/HoldUp';
import Toast from 'react-native-easy-toast'
import { UpdateProfile } from '../../utils/Updaters';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Gifts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchedData: false,
			can_buy_cash_gifts: true,
			user_points: 0,
			gifts: []
		}
	}

	componentDidMount() {
		GET('Gifts', res => {
			this.currentGift = res.data.gifts[0]
			this.setState({ ...res.data, fetchedData: true,  })
		}, err => { })
	}

	_renderItem({ item }) {
		let img = {}

		switch (item.type_id) {
			case 1:
				img = require('../../assets/images/gift-phone.png')
				break;
			case 2:
				img = require('../../assets/images/gift-coupon.png')
				break;
			case 3:
				img = require('../../assets/images/gift-money.png')
				break;
		}

		return (
			<View style={{ paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#474668', borderRadius: 40 }}>
				<Image 
					style={{ width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 }} 
					source={img} />

				<FontedText style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{item.title}</FontedText>
				<FontedText style={{ color: '#EEEEEE', fontSize: 14, textAlign: 'center' }}>{item.info}</FontedText>
				
				<View style={{ marginTop: 13, flexDirection: 'row' }}>
					<FontedText style={{ color: mainColor, fontSize: 13, textAlign: 'center' }}>{item.price} نقطة</FontedText>
				</View>
			</View>
		);
	}

	onBuyGift = () => {
		const { currentGift } = this

		if (currentGift.price > this.state.user_points) {
			this.refs.toast.show('ليس لديك نقاط كافية');
			return
		}

		if (currentGift.type_id == 3) {
			this.props.navigation.navigate('BuyGift', { gift: currentGift })
		}
		else {
			const { id, info, title } = currentGift
			const message = `${title} - ${info}`

			GET(`Gifts/UserOrderGift?gift_id=${String(id)}&info=${message}`, res => {
				if (res.data.response == 0) {
					this.refs.toast.show('ليس لديك نقاط كافية');
				}
				else if (res.data.response == 1) {
					UpdateProfile()
					this.refs.toast.show('تم الشراء. ستصلك الهدية خلال يوم او اكثر. راقب بريدك الالكتروني و التنبيهات', 10000);
				}
			}, err => { })
		}
	}

	render() {
		if (!this.state.fetchedData) return <HoldUp />

		return (
			<LazyContainer style={{ backgroundColor: bgColor }}>
				<BackHeader
					navigation={this.props.navigation}
					title='الهدايا' />

				<View style={{ flex: 0.88 }} >
					<Carousel
						contentContainerCustomStyle={{ marginTop: 83 }}
						ref={(c) => { this._carousel = c; }}
						data={this.state.gifts}
						renderItem={this._renderItem}
						sliderWidth={width}
						itemWidth={width * 0.75}
						activeSlideAlignment='center'
						layout={'default'}
						onBeforeSnapToItem={(slideIndex) => {
							// Gotta reverse due to RTL..
							const len = this.state.gifts.length
							const correctIndex = len - 1 - slideIndex
							
							this.currentGift = this.state.gifts[correctIndex]
						}} />
				</View>

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
						<FontedText style={{ color: bgColor, textAlign: 'center', fontSize: 19 }}>اشترى الهدية</FontedText>
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