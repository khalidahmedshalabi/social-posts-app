import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Dimensions, Linking } from 'react-native';
import { Video } from 'expo'
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';

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
					media_url: 'http://mirrors.standaloneinstaller.com/video-sample/small.mp4',
					link: 'https://google.com',
					is_completed: 0,
					likes: 13
				},
				{
					key: '2',
					title: 'عنوان المنشور',
					content: 'محتوى البوست محتوى البوست محتوى البوست محتوى البوست محتوى البوست',
					media_type: 1,
					media_url: 'https://thuocmocrauvatoc.files.wordpress.com/2016/07/rau-dep-16.jpg',
					link: 'https://facebook.com',
					is_completed: 0,
					likes: 89
				},
				{
					key: '3',
					title: 'عنوان المنشور',
					content: 'محتوى البوست محتوى البوست محتوى البوست محتوى البوست محتوى البوست',
					media_type: 0,
					media_url: '',
					link: 'https://youtube.com',
					is_completed: 0,
					likes: 2038
				},
				{
					key: '4',
					title: 'عنوان المنشور',
					content: 'محتوى البوست محتوى البوست محتوى البوست محتوى البوست محتوى البوست',
					media_type: 2,
					media_url: 'http://mirrors.standaloneinstaller.com/video-sample/grb_2.mp4',
					link: 'https://google.com',
					is_completed: 0,
					likes: 29
				},
				{
					key: '5',
					title: 'عنوان المنشور',
					content: 'محتوى البوست محتوى البوست محتوى البوست محتوى البوست محتوى البوست',
					media_type: 1,
					media_url: 'https://thuocmocrauvatoc.files.wordpress.com/2016/07/rau-dep-16.jpg',
					link: 'https://twitter.com',
					is_completed: 1,
					likes: 2394
				},
				
			]
		}
	}

	componentWillUnmount() {
		alert('will unmount')
	}

	onPressPlayVideo = (key) => {
		// Find index by key
		const index = this.state.posts.findIndex((el) => el.key === key);

		// Make a copy of the posts array
		let copy_posts = [...this.state.posts];

		// Stop other videos from playing
		copy_posts = copy_posts.map(post => ({ ...post, is_playing: false }))

		// Make a copy of the target post
		let post = { ...copy_posts[index] };

		// Change playing status
		post.is_playing = true;

		// Update our copy of posts array
		copy_posts[index] = post;

		// Update component's state
		this.setState({
			posts: copy_posts
		});
	}

	renderCorrectMediaComponent = (key, is_playing, media_type, media_url) => {
		if(media_type == 0) {
			// link type
			return (
				<View 
					style={{ 
						backgroundColor: '#EEEEEE', 
						width: '100%', 
						height: 250, 
						borderTopLeftRadius: 10, 
						borderTopRightRadius: 10, 
						justifyContent: 'center', 
						alignItems: 'center' 
					}}>
					<FontedText style={{ color: '#B6B6B6', fontSize: 40 }}>لا يوجد صورة</FontedText>
				</View>
			)
		}
		else if(media_type == 1) {
			// image type
			return (
				<Image
					style={{
						width: '100%',
						height: 250,
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10
					}}
					source={{ uri: media_url }}
				/>
			)
		}
		else {
			// video type
			return (
				<View style={{
					backgroundColor: 'white', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
					<Video
						source={{ uri: media_url }}
						rate={1.0}
						volume={1.0}
						isMuted={false}
						resizeMode={Video.RESIZE_MODE_STRETCH}
						usePoster={true}
						shouldPlay={is_playing}
						isLooping={true}
						style={{ 
							width: '100%', 
							height: 250,
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10
						}}
					/>

					{
						is_playing ?
							null
							:
							<TouchableOpacity
								style={{ position: 'absolute', top: 100 }}
								onPress={() => this.onPressPlayVideo(key)}
								>
								<FontAwesome 
									name='play-circle'
									color='#eeeeee'
									size={70}
									/>
							</TouchableOpacity>
					}
				</View>
			)
		}	
	}

	renderItem = (item) => {
		return (
			<View style={{ opacity: item.is_completed == 0 ? null : 0.5 }}>
				{this.renderCorrectMediaComponent(item.key, item.is_playing, item.media_type, item.media_url)}
				
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
						paddingHorizontal: 15,
						paddingTop: 20
					}}
					data={this.state.posts}
					renderItem={({ item }) => this.renderItem(item)} />
			</View>
		)
	}
}
