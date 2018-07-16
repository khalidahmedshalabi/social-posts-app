import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Dimensions, Linking } from 'react-native';
import { Container } from 'native-base';
import { Ionicons, Foundation, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Posts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			posts: [
				{
					key: '1',
					title: 'عنوان المنشور',
					content: 'محتوى البوست محتوى البوست محتوى البوست محتوى البوست محتوى البوست',
					media_type: 2,
					media_url: '',
					link: 'https://google.com',
					is_completed: 0,
					likes: 10
				},
				{
					key: '2',
					title: 'عنوان المنشور',
					content: 'محتوى البوست محتوى البوست محتوى البوست محتوى البوست محتوى البوست',
					media_type: 1,
					media_url: 'https://thuocmocrauvatoc.files.wordpress.com/2016/07/rau-dep-16.jpg',
					link: 'https://facebook.com',
					is_completed: 1,
					likes: 100
				},
				{
					key: '3',
					title: 'عنوان المنشور',
					content: 'محتوى البوست محتوى البوست محتوى البوست محتوى البوست محتوى البوست',
					media_type: 0,
					media_url: '',
					link: 'https://youtube.com',
					is_completed: 1,
					likes: 1000
				},
				{
					key: '4',
					title: 'عنوان المنشور',
					content: 'محتوى البوست محتوى البوست محتوى البوست محتوى البوست محتوى البوست',
					media_type: 1,
					media_url: 'https://thuocmocrauvatoc.files.wordpress.com/2016/07/rau-dep-16.jpg',
					link: 'https://twitter.com',
					is_completed: 0,
					likes: 10000
				}
			]
		}
	}

	renderItem = (item) => {
		return (
			<View style={{ opacity: item.is_completed == 0 ? null : 0.5 }}>
				{
				( item.media_url ) ? 
				<Image
					style={{
						width: '100%',
						height: 250,
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10
					}}
					source={{ uri: item.media_url }}
				/> : 
				<View style={{ backgroundColor: '#EEEEEE', width: '100%', height: 250, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
					<FontedText style={{ color: '#B6B6B6', fontSize: 40 }}>لا يوجد صورة</FontedText>
				</View>
				}

				
				<View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: item.is_completed == 0 ? 'white' : '#b5b5b5', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 12 }}>
					<FontedText style={{ color: 'black', fontSize: 18, alignSelf: 'flex-start' }}>{item.title}</FontedText>

					<FontedText style={{ color: '#b5b5b5', fontSize: 13, textAlign: 'left', marginTop: 3 }}>{item.content}</FontedText>

					<View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
						<View style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center' }}>
							<Feather
								name='link' size={18} color={'#b5b5b5'} />

							<TouchableOpacity 
								onPress={() => { Linking.openURL(item.link) }}
								style={{ marginLeft: 7 }}>
								<FontedText style={{ color: '#007AF9', fontSize: 15 }}>{item.link}</FontedText>
							</TouchableOpacity>
						</View>
						
						<View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
							<FontedText style={{ color: mainColor, marginRight: 7, fontSize: 16 }}>{item.likes}</FontedText>

							<MaterialCommunityIcons name='heart' size={20} color={ mainColor } />
						</View>
					</View>
				</View>
				
				
				<View style={{ backgroundColor: bgColor, width: '100%', height: 40 }}></View>

				{
					(item.is_completed == 0 ) ? null :
				<Ionicons 
					style={{ position: 'absolute', marginTop: height * 0.02, marginLeft: 15 }}
					name='md-checkmark-circle' size={55} color={'#ff5e5e'} />
				}
				
				<TouchableOpacity 
					activeOpacity= {0.7}
					style={{ position: 'absolute', marginTop: height * 0.35, alignSelf: 'flex-end', paddingRight: 8 }}>
					<MaterialCommunityIcons name='heart' size={60} color={'#B6B6B6'} />
				</TouchableOpacity>
			</View>
		)
	}

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<FlatList
					style={{
						backgroundColor: bgColor,
						paddingHorizontal: 20,
						paddingTop: 20
					}}
					data={this.state.posts}
					renderItem={({ item }) => this.renderItem(item)} />
			</View>
		)
	}
}
