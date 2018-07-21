import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo, Foundation, FontAwesome } from '@expo/vector-icons';
import { bgColor } from '../../constants/Colors';
import LazyContainer from '../../components/LazyContainer';
import FontedText from '../../components/FontedText';
import BackHeader from '../../components/BackHeader';
import { Container } from 'native-base';


export default class ContactUs extends Component {

	render() {
		return (
			<LazyContainer style={{ backgroundColor: bgColor }}>
				<BackHeader
					navigation={this.props.navigation}
					title='تواصل معنا' />
					
				<View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 15, alignItems: 'flex-start' }}>
					<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Entypo name='phone' size={35} color={'#999999'} />
						
						<View style={{ width: '100%' }}>
							<FontedText style={{ color: '#ededed', fontSize: 18, marginLeft: 10, alignSelf: 'flex-start' }}>333-1212</FontedText>

							<View style={{ width: '100%', height: 1, backgroundColor: '#474668' }}></View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 17 }}>
						<FontAwesome name='globe' size={35} color={'#999999'} />

						<View style={{ width: '100%' }}>
							<FontedText style={{ color: '#ededed', fontSize: 18, marginLeft: 10, alignSelf: 'flex-start' }}>www.cash.com</FontedText>

							<View style={{ width: '100%', height: 1, backgroundColor: '#474668' }}></View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 17 }}>
						<Foundation name='mail' size={35} color={'#999999'} />

						<View style={{ width: '100%' }}>
							<FontedText style={{ color: '#ededed', fontSize: 18, marginLeft: 10, alignSelf: 'flex-start' }}>cashyabalash@gmail.com</FontedText>
						</View>
					</TouchableOpacity>
				</View>
			</LazyContainer>
		)
	}
}
