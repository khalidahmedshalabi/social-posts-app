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

const width = Dimensions.get('window').width


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
			this.setState({ ...res.data, fetchedData: true })
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
						layout={'default'} />
				</View>

				<TouchableOpacity style={{ flex: 0.12 }} >
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
			</LazyContainer>
		)
	}
}