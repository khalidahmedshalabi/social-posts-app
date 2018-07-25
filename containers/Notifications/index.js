import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { bgColor } from '../../constants/Colors';
import LazyContainer from '../../components/LazyContainer';
import NoContent from '../../components/NoContent';
import FontedText from '../../components/FontedText';
import { GET } from '../../utils/Network';
import HoldUp from '../../components/HoldUp';

export default class Notifications extends Component {
	constructor(props) {
		super(props)

		this.state = {
			fetched: false,
			notifications: []
		}
	}

	fetchData = () => {
		GET('PointsNotifications', res => {
			this.setState({ notifications: res.data.notifications, fetched: true })
		}, err => console.log(err))
	}

	componentDidMount () {
		this.fetchData()
	}

	renderItem = (item) => {
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 }}>
				<Entypo name={item.status == 0 ? 'circle-with-minus' : 'circle-with-plus' } size={28} color={item.status == 0 ? '#c13c3f' : '#4d9336' } />

				<FontedText style={{ color: 'white', fontSize: 16, marginLeft: 15 }}>{item.status == 0 ? 'لقد تم خصم' : 'لقد تم إضافة'}</FontedText>				

				<FontedText style={{ color: item.status == 0 ? '#bcbcbc' : '#bcbcbc', fontSize: 16, marginLeft: 5 }}>{item.amount}</FontedText>
				<FontedText style={{ color: item.status == 0 ? '#bcbcbc' : '#bcbcbc', fontSize: 16, marginRight: 5 }}>{item.status == 0 ? '-' : '+'}</FontedText>
				
				<FontedText style={{ color: 'white', fontSize: 16 }}>{item.status == 0 ? 'نقطة من حسابك' : 'نقطة إلى حسابك'}</FontedText>
			</View>
		)
	}

	_keyExtractor = (item) => String(item.id);

	render() {
		if(!this.state.fetched) return <HoldUp />

		return (
			<LazyContainer style={{ backgroundColor: bgColor }}>
				<FlatList
					keyExtractor={this._keyExtractor}
					contentContainerStyle={{
						paddingVertical: 15
					}}
					ListEmptyComponent={<NoContent />}
					ItemSeparatorComponent={ () => <View style={{ height: 1, backgroundColor: '#474668' }}></View> }
					data={this.state.notifications}
					renderItem={({ item }) => this.renderItem(item)} />
			</LazyContainer>	
		)
	}
}
