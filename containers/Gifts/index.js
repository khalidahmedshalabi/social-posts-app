import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions,Image,TouchableOpacity
} from 'react-native';
import { Container} from 'native-base';
import { LinearGradient } from 'expo';
import { mainColor, bgColor } from '../../constants/Colors'
import FontedText from '../../components/FontedText'
import Carousel from 'react-native-snap-carousel';

const width = Dimensions.get('window').width


export default class Gifts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{title: 'اسم الهدية', photo: 'https://cdn1.imggmi.com/uploads/2018/7/16/834aeaae6f5a7c34c8668355c09841f6-full.png',  description: "وصف محتوي الهدية الاولي "},
				{title: 'اسم الهدية', photo: 'https://cdn1.imggmi.com/uploads/2018/7/16/834aeaae6f5a7c34c8668355c09841f6-full.png',  description: "وصف محتوي الهدية الثانية"},
				{title: 'اسم الهدية', photo: 'https://cdn1.imggmi.com/uploads/2018/7/16/834aeaae6f5a7c34c8668355c09841f6-full.png',  description: "وصف محتوي الهدية الثالثة "},
				{title: 'اسم الهدية', photo: 'https://cdn1.imggmi.com/uploads/2018/7/16/834aeaae6f5a7c34c8668355c09841f6-full.png',  description: "وصف محتوي الهدية الرابعة"},
			]
			
			}
		}
	_renderItem ({item, index}) {
		return (
			<View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#474668',borderRadius:40}}>
				<Image style={{ width:160, height: 160, resizeMode:'contain',borderRadius:50,marginBottom:12}} source={{ uri: item.photo }} />
				<FontedText style={{color: 'white', fontSize: 23, textAlign: 'center'}}>{item.title}</FontedText>
				<FontedText style={{color: 'white', fontSize: 16, textAlign: 'center'}}>{item.description}</FontedText>
			</View>
		);
	}
	
	render() {
		return (
			<Container style={{backgroundColor: bgColor, paddingBottom: 15}}>
			<View style={{flex:1,alignItems:'center',justifyContent:'center',paddingVertical:100}} >
				<Carousel
					ref={(c) => { this._carousel = c; }}
					data={this.state.data}
					renderItem={this._renderItem}
					sliderWidth={width}
					itemWidth={width*0.75}
					activeSlideAlignment='center'
					layout={'default'} 
					//layoutCardOffset={9}
					showsHorizontalScrollIndicator={true}
            	/>
				</View>
				<TouchableOpacity style={{bottom:-15}}>
							<LinearGradient
								colors={['#b28003', '#f9ce63']}
								start={{ x: 0.0, y: 1.0 }}
								end={{ x: 1.0, y: 0.0 }}
								style={{
									paddingVertical: 12
								}}>
								<FontedText style={{ color: bgColor, textAlign: 'center', fontSize: 19 }}>اختار الهدية</FontedText>
							</LinearGradient>
						</TouchableOpacity>
			</Container>
		)
	}
}
