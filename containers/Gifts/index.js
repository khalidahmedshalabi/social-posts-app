import React, { Component } from 'react';
import {
	View,
	Dimensions,Image,TouchableOpacity
} from 'react-native';
import LazyContainer from '../../components/LazyContainer';
import { LinearGradient } from 'expo';
import { bgColor } from '../../constants/Colors'
import FontedText from '../../components/FontedText'
import Carousel from 'react-native-snap-carousel';
import BackHeader from '../../components/BackHeader';

const height = Dimensions.get('window').height
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
	_renderItem ({item}) {
		return (
			<View style={{flexDirection:'column',paddingVertical: 20, justifyContent:'center',alignItems:'center',backgroundColor:'#474668',borderRadius:40}}>
				<Image style={{ width:160, height: 160, resizeMode:'contain',borderRadius:50,marginBottom:12}} source={{ uri: item.photo }} />
				<FontedText style={{color: 'white', fontSize: 23, textAlign: 'center'}}>{item.title}</FontedText>
				<FontedText style={{color: 'white', fontSize: 16, textAlign: 'center'}}>{item.description}</FontedText>
			</View>
		);
	}
	
	render() {
		return (
			<LazyContainer style={{backgroundColor: bgColor}}>
				<BackHeader
					navigation={this.props.navigation}
					title='الهدايا' />

				<View style={{ flex: 0.88 }} >
					<Carousel
						contentContainerCustomStyle={{ marginTop: 83 }}
						ref={(c) => { this._carousel = c; }}
						data={this.state.data}
						renderItem={this._renderItem}
						sliderWidth={width}
						itemWidth={width*0.75}
						activeSlideAlignment='center'
						layout={'default'} 
						//layoutCardOffset={9}
					/>
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
								<FontedText style={{ color: bgColor, textAlign: 'center', fontSize: 19 }}>اختار الهدية</FontedText>
							</LinearGradient>
				</TouchableOpacity>
			</LazyContainer>
		)
	}
}
