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
		let iconName
		let iconColor

		switch (item.type) {
			case 0:
				iconName = 'circle-with-minus'
				iconColor = '#c13c3f'
				break;
			case 1:
				iconName = 'circle-with-plus'
				iconColor = '#4d9336'
				break;
			case 2:
				iconName = 'check'
				iconColor = '#4259f4'
				break;
		}

		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 }}>
				<Entypo name={iconName} size={28} color={iconColor} />

				{
					item.type == 2 ? 
						(
							<View style={{ flexDirection: 'row' }}>
								<FontedText style={{ color: 'white', fontSize: 14, textAlign: 'left', marginLeft: 15 }}>تم تنفيذ الطلب: {item.value}</FontedText>
							</View>
						) : (
							<View style={{ flexDirection: 'row' }}>
								<FontedText style={{ color: 'white', fontSize: 14, textAlign: 'left', marginLeft: 15 }}>{item.type == 0 ? 'لقد تم خصم' : 'لقد تم إضافة'}</FontedText>

								<FontedText style={{ color: item.type == 0 ? '#bcbcbc' : '#bcbcbc', fontSize: 14, textAlign: 'left', marginLeft: 5 }}>{item.value}</FontedText>
								<FontedText style={{ color: item.type == 0 ? '#bcbcbc' : '#bcbcbc', fontSize: 14, textAlign: 'left', marginRight: 5 }}>{item.type == 0 ? '-' : '+'}</FontedText>

								<FontedText style={{ color: 'white', fontSize: 14, textAlign: 'left', }}>{item.type == 0 ? 'نقطة من حسابك' : 'نقطة إلى حسابك'}</FontedText>
							</View>
						)
				}
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
