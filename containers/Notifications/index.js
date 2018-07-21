import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { bgColor } from '../../constants/Colors';
import LazyContainer from '../../components/LazyContainer';
import FontedText from '../../components/FontedText';
import { Container } from 'native-base';



export default class Notifications extends Component {
	constructor(props) {
		super(props)

		this.state = {
			notifications: [
						{
							key: '1',
							status: 0,
							points: '50'
						},
						{
							key: '2',
							status: 1,
							points: '100'
						},
						{
							key: '3',
							status: 0,
							points: '150'
						},
						{
							key: '4',
							status: 1,
							points: '200'
						},
						{
							key: '5',
							status: 0,
							points: '250'
						},
						{
							key: '6',
							status: 1,
							points: '300'
						},
						{
							key: '7',
							status: 0,
							points: '350'
						},
						{
							key: '8',
							status: 1,
							points: '450'
						},
						{
							key: '9',
							status: 0,
							points: '500'
						},
						{
							key: '10',
							status: 1,
							points: '550'
						},
			]
		}
	}



	renderItem = (item) => {
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 }}>
				<Entypo name={item.status == 0 ? 'circle-with-minus' : 'circle-with-plus' } size={28} color={item.status == 0 ? '#c13c3f' : '#4d9336' } />

				<FontedText style={{ color: 'white', fontSize: 16, marginLeft: 15 }}>{item.status == 0 ? 'لقد تم خصم' : 'لقد تم إضافة'}</FontedText>				

				<FontedText style={{ color: item.status == 0 ? '#bcbcbc' : '#bcbcbc', fontSize: 16, marginLeft: 5 }}>{item.points}</FontedText>
				<FontedText style={{ color: item.status == 0 ? '#bcbcbc' : '#bcbcbc', fontSize: 16, marginRight: 5 }}>{item.status == 0 ? '-' : '+'}</FontedText>
				
				<FontedText style={{ color: 'white', fontSize: 16 }}>{item.status == 0 ? 'نقطة من حسابك' : 'نقطة إلى حسابك'}</FontedText>
			</View>
		)
	}


	render() {
		return (
			<LazyContainer style={{ backgroundColor: bgColor }}>
				<FlatList
					contentContainerStyle={{
						paddingVertical: 15
					}}
					ItemSeparatorComponent={ () => <View style={{ height: 1, backgroundColor: '#474668', width: '100%' }}></View> }
					data={this.state.notifications}
					renderItem={({ item }) => this.renderItem(item)} />
			</LazyContainer>	
		)
	}
}
