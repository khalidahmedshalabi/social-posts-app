import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Dimensions, Linking, RefreshControl } from 'react-native';
import { Video } from 'expo'
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome, Entypo } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';
import NoContent from '../../components/NoContent';
import { Container } from 'native-base';
import PopupDialog from 'react-native-popup-dialog';
import { GET } from '../../utils/Network';
import HoldUp from '../../components/HoldUp';
import { base_url } from '../../constants/Server';
const height = Dimensions.get('window').height

const POPUP_DIALOG_SHOW_INTERVAL = 3000

export default class Posts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			points_earned: 0,
			fetched: false,
			posts: []
		}

		this.viewabilityConfig = {
			viewAreaCoveragePercentThreshold: 90
		}

		this.reachedPosts = []
	}

	fetchPosts = (showLoader) => {
		GET('Posts', res => {
			this.setState({ posts: res.data.posts, fetched: showLoader })
		}, err => {
			//console.log(err)
		})
	}

	componentDidMount () {
		this.fetchPosts(true)
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

	setVideoAsWatched = (key, id) => {
		GET('Posts/UserWatchVideo?post_id=' + id, res => { 
			if(!res.data.response) return

			this.setState({ points_earned: res.data.points_earned }, () => {
				this.popupDialog.show();
				setTimeout(() => this.popupDialog.dismiss(), POPUP_DIALOG_SHOW_INTERVAL)
			})
		}, err => { })

		// Find index by key
		const index = this.state.posts.findIndex((el) => el.key === key);

		// Make a copy of the posts array
		let copy_posts = [...this.state.posts];

		// Make a copy of the target post
		let post = { ...copy_posts[index] };

		// Set status as watched
		post.did_watch_video = 1;

		// Change playing status
		post.is_playing = false;

		// Update our copy of posts array
		copy_posts[index] = post;

		// Update component's state
		this.setState({
			posts: copy_posts
		});
	}

	renderCorrectMediaComponent = (id, key, is_playing, media_type, media_path, did_watch_video) => {
		if (media_type == 0) {
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
					<Feather
						name='link' size={70} color={'#b5b5b5'} />
				</View>
			)

			/*return (
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
			)*/
		}
		else if (media_type == 1) {
			// Image type
			return (
				<View style={{ backgroundColor: 'transparent', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
					<Image
						style={{
							width: '100%',
							height: 250
						}}
						source={{ uri: `${base_url}/${media_path}` }}
					/>
				</View>
			)
		}
		else {
			// Video type
			return (
				<View style={{ backgroundColor: 'transparent', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
					<Video
						source={{ uri: `${base_url}/${media_path}` }}
						rate={1.0}
						volume={1.0}
						isMuted={false}
						resizeMode={Video.RESIZE_MODE_STRETCH}
						usePoster={true}
						shouldPlay={is_playing ? true : false}
						isLooping={false}
						onPlaybackStatusUpdate={(playbackStatus) => {
							if (playbackStatus.didJustFinish && !did_watch_video) {
								this.setVideoAsWatched(key, id)
							}
						}}
						style={{
							width: '100%',
							height: 250

						}}
					/>

					{
						is_playing || did_watch_video ?
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

	onPressLink = (item) => {
		GET('Posts/UserVisitLink?post_id=' + item.id, res => {
			Linking.openURL(item.link)
			/*Linking.openURL(() => {
				return item.link.replace(
					/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
					function (url) {
						var full_url = url;
						if (!full_url.match('^https?:\/\/')) {
							full_url = 'http://' + full_url;
						}
						return full_url;
					}
				)
			})*/
			if (!res.data.response) return

			this.setState({ points_earned: res.data.points_earned }, () => {
				this.popupDialog.show();
				setTimeout(() => this.popupDialog.dismiss(), POPUP_DIALOG_SHOW_INTERVAL)
			})
		 }, err => { })
	}

	onPressLikePost = (key, id) => {
		// Find index by key
		const index = this.state.posts.findIndex((el) => el.key === key);

		// Make a copy of the posts array
		let copy_posts = [...this.state.posts];

		// Make a copy of the target post
		let post = { ...copy_posts[index] };

		// Set status as liked
		post.is_liked = 1;

		GET('Posts/UserLikePost?post_id=' + id, res => {
			if (res.data.response === 1) {
				// Increase likes locally too
				post.likes = post.likes + 1
			}
		}, err => { })

		// Update our copy of posts array
		copy_posts[index] = post;

		// Update component's state
		this.setState({
			posts: copy_posts,
		});
	}

	renderLikeButton = (item) => {
		const { is_liked, did_watch_video, media_type, key, id } = item

		const likeButtonColor = is_liked ? '#f23548' : '#B6B6B6'
		const didNotWatchVideo = (media_type == 2 && !did_watch_video)
		const isNotClickable = is_liked || didNotWatchVideo ? true : false

		return (
			<TouchableOpacity
				key='2'
				disabled={isNotClickable}
				onPress={() => this.onPressLikePost(key, id)}
				activeOpacity={0.8}
				style={{
					opacity: didNotWatchVideo && !is_liked ? 0.2 : 1.0,
					position: 'absolute',
					top: 220,
					alignSelf: 'flex-end',
					paddingRight: 8,
				}}>
				<MaterialCommunityIcons name='heart' size={60} color={likeButtonColor} />
			</TouchableOpacity>
		)
	}

	renderItem = (item) => {
		return (
			<View style={{ opacity: item.is_completed ? 0.5 : 1.0, marginHorizontal: 10 }}>
				{this.renderCorrectMediaComponent(item.id, item.key, item.is_playing, item.media_type, item.media_path, item.did_watch_video)}

				<View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: item.is_completed == 0 ? 'white' : '#b5b5b5', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 12 }}>
					<FontedText style={{ color: 'black', fontSize: 18, alignSelf: 'flex-start' }}>{item.title}</FontedText>
					<FontedText style={{ color: '#b5b5b5', fontSize: 13, alignSelf: 'flex-start', textAlign: 'left', marginTop: 3 }}>{item.content}</FontedText>

					<View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
						<View style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center' }}>
							<Feather
								name='link' size={18} color={'#b5b5b5'} />

							<TouchableOpacity
								onPress={() => { this.onPressLink(item) }}
								style={{ marginLeft: 7 }}>
								<FontedText style={{ color: '#007AF9', fontSize: 15 }}>{item.link}</FontedText>
							</TouchableOpacity>
						</View>

						<View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
							<FontedText style={{ color: mainColor, marginRight: 7, fontSize: 16 }}>{item.likes}</FontedText>

							<MaterialCommunityIcons name='heart' size={20} color={mainColor} />
						</View>
					</View>
				</View>

				{
					(item.is_completed) ?
						<Ionicons
							key='1'
							style={{ position: 'absolute', marginTop: height * 0.02, marginLeft: 15 }}
							name='md-checkmark-circle' size={55} color={'#ff5e5e'} />
						:
						this.renderLikeButton(item)
				}
			</View>
		)
	}

	onViewablePostsChanged = (viewableItems/*, changed*/) => {
		if (!viewableItems.length)
			return

		if (this.reachedPosts.length == this.state.posts.length)
			return

		let eligibleViewableItems = []
		for (let item of viewableItems) {
			if (this.reachedPosts.findIndex(reachedItem => reachedItem === item.key) === -1) {
				eligibleViewableItems.push(item.key)
			}
		}

		eligibleViewableItems.map(key => {
			GET('Posts/UserReachPost?post_id=' + parseInt(key), res => { }, err => { })

			this.reachedPosts.push(key)
		});
		//console.log("Visible items are", viewableItems);
		//console.log("Changed in this iteration", changed);
	}

	render() {
		if(!this.state.fetched)
			return <HoldUp />

		return (
			<Container style={{ /*alignItems: 'center',*/ backgroundColor: bgColor }}>
				<FlatList
					refreshControl={
						<RefreshControl
							colors={[mainColor]}
							tintColor={mainColor}
							refreshing={!this.state.fetched}
							onRefresh={() => {
								this.fetchPosts(true)
							}}
						/>
					}
					contentContainerStyle={{ paddingVertical: 58/*, marginHorizontal: 10*/ }}
					ListEmptyComponent={() => [
						<NoContent key='1' />
						,
						<TouchableOpacity key='2' onPress={() => this.fetchPosts(true)}>
							<Ionicons
								style={{ marginTop: 20, alignSelf: 'center' }}
								name='md-refresh'
								size={40}
								color={mainColor} />
						</TouchableOpacity>
					]}
					ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
					data={this.state.posts}
					renderItem={({ item }) => this.renderItem(item)}
					onViewableItemsChanged={({ viewableItems/*, changed*/ }) => {
						this.onViewablePostsChanged(viewableItems/*, changed*/)
					}}
					viewabilityConfig={this.viewabilityConfig} />

				<PopupDialog
					dialogStyle={{ backgroundColor: bgColor, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
					width={0.80}
					height={0.25}
					ref={(popupDialog) => { this.popupDialog = popupDialog; }}>

					<View>
						<Entypo name='circle-with-plus' size={70} color={'#4d9336'} />
					</View>

					<View style={{ flexDirection: 'row', marginTop: 15 }}>
						<FontedText style={{ color: 'white', fontSize: 16 }}>لقد تم إضافة</FontedText>

						<FontedText style={{ color: '#4d9336', fontSize: 16, marginLeft: 5 }}>{this.state.points_earned}</FontedText>
						<FontedText style={{ color: '#4d9336', fontSize: 16, marginRight: 5 }}></FontedText>

						<FontedText style={{ color: 'white', fontSize: 16 }}>نقطة إلى حسابك</FontedText>
					</View>
				</PopupDialog>
			</Container>
		)
	}
}