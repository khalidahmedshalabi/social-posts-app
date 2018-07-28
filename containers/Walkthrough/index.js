import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	StyleSheet,
	View,
	Dimensions,
	Platform
} from 'react-native';
import { Container, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors'
import FontedText from '../../components/FontedText'
import { pagePadding } from '../../constants/Layout';
import Swiper from 'react-native-swiper';

const width = Dimensions.get('window').width


class Walkthrough extends Component {
	ShouldAnim1= true
	ShouldAnim2=true
	ShouldAnim3=true

	componentDidMount () {
		this.viewIcon1.fadeOut(0)
		this.viewText1.fadeOut(0)
		this.viewIcon3.fadeOut(0)
		this.viewText3.fadeOut(0)
	}

	applyTheAnim = () => {
		this.viewIcon1.bounce(1500)
		this.viewText1.fadeInUpBig(1500)
		//this.viewSkip1.fadeInUpBig(1500)
	}

	applyTheAnim2 = () => {
		this.viewIcon2.jello(1500)
		this.viewText2.fadeInUpBig(1500)
	}
	
	applyTheAnim3 = () => {
		this.viewIcon3.fadeInUpBig(1500)
		this.viewText3.fadeInUpBig(1500)
	}

	onPageChanged = (number) => {
		if(number == 0) {
			this.viewText1.fadeOut(0)
			this.viewIcon1.fadeOut(0)
			//this.viewSkip1.fadeOut(0)
			
		}
		else if(number == 1) {
			// second page
			if(this.ShouldAnim1==true)
			{
			this.applyTheAnim()

			this.viewText2.fadeOut(0)
			this.viewIcon2.fadeOut(0)			
			this.ShouldAnim1=false
			}
			else if(this.ShouldAnim1==false) 
			{		
				this.viewText1.stopAnimation()
				this.viewIcon1.stopAnimation()
				this.viewText2.fadeOut(0)
				this.viewIcon2.fadeOut(0)
			}
			
		}
		
		else if (number == 2) {
				// third page
			if(this.ShouldAnim2==true)
			{

			this.applyTheAnim2()

			this.viewText1.fadeOut(0)
			this.viewIcon1.fadeOut(0)
			this.ShouldAnim2=false
		//	this.viewSkip1.fadeOut(0)
			}
			else if(this.ShouldAnim2==false)
			{
				this.viewText2.stopAnimation()
				this.viewIcon2.stopAnimation()
			}

		}
		else if (number == 3) {
			// fourth page
		if(this.ShouldAnim3==true)
		{

		this.applyTheAnim3()

		this.viewText2.fadeOut(0)
		this.viewIcon2.fadeOut(0)
		this.ShouldAnim3=false
	//	this.viewSkip1.fadeOut(0)
		}
		else if(this.ShouldAnim3==false)
		{
			this.viewText3.stopAnimation()
			this.viewIcon3.stopAnimation()
		}

	}
	
	}

	render() {
		return (
			<Container style={{backgroundColor: bgColor, paddingBottom: 15}}>
				<Swiper
					height="100%"
					paginationStyle={{ flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse' }}
					horizontal={true}
					loop={false}
					showsPagination={true}
					activeDotColor='grey'
					dotColor='white'
					onIndexChanged={(number) => this.onPageChanged(number)}
				>
					<View style={styles.contentContainer}>
						<Animatable.View 
							style={styles.contentContainerIcon} 
							animation="rubberBand" 
							duration={1500}
							delay={300}>
							<MaterialIcons name='attach-money' size={120} color={mainColor} />
						</Animatable.View>

						<Animatable.View style={styles.contentContainerText} animation="fadeInUpBig" >
							<FontedText style={{ color: 'white', fontSize: 23, textAlign: 'center' }}>هل تريد ان تحصل على المال بدون جهد</FontedText>
						</Animatable.View>

						<View style={{ flex: 0.7 }} />
					{/*	<Animatable.View 
						animation="fadeInUpBig"
						style={{ flex: 0.7, alignSelf: 'flex-start', justifyContent: 'center' }}>
							<TouchableOpacity>
								<FontedText style={{ color: mainColor }}>تخطي</FontedText>
							</TouchableOpacity>
					</Animatable.View> */}
					</View> 

					<View style={styles.contentContainer}>
						<Animatable.View 
							ref={ref => this.viewIcon1 = ref} 
							style={styles.contentContainerIcon}>
							<Entypo name='trophy' size={120} color={mainColor} />
						</Animatable.View>
					
						<Animatable.View 
							ref={ref => this.viewText1 = ref} 
							style={styles.contentContainerText}	>
							<FontedText style={{ color: 'white', fontSize: 23, textAlign: 'center' }}>شاهد واربح الان</FontedText>
						</Animatable.View>

							<View style={{ flex: 0.7 }} />
					{/*	<Animatable.View
							ref={ref => this.viewSkip1 = ref}
							style={{ flex: 0.7, alignSelf: 'flex-start', justifyContent: 'center' }}>
							<TouchableOpacity>
								<FontedText style={{ color: mainColor }}>تخطي</FontedText>
							</TouchableOpacity>
					</Animatable.View> */}
					</View>

					<View style={styles.contentContainer}>
						<Animatable.View 
							ref={ref => this.viewIcon2 = ref}
							style={styles.contentContainerIcon}>
							<FontAwesome name='bullhorn' size={120} color={mainColor} />
						</Animatable.View>

						<Animatable.View 
							ref={ref => this.viewText2 = ref}
							style={styles.contentContainerText}>
							<FontedText style={{ color: 'white', fontSize: 23, textAlign: 'center' }}>
								هل انت صاحب مشروع وتريد ايصال اعلانك لاكبر قدر من الناس المهتمين</FontedText>
						{/*	<Button 
								onPress={
									() => {
										this.props.navigation.navigate("Login")
									}
								}
								style={{ backgroundColor: mainColor, paddingHorizontal: width * 0.35, paddingVertical: 15, borderRadius: 20, marginTop: 25 }}>
								<FontedText style={{ fontSize: 19 }}>ابدأ الان</FontedText>
							</Button> */}
						</Animatable.View>

						<View style={{flex: 0.4}}/>
					</View>


					<View style={styles.contentContainer}>
						<Animatable.View 
							ref={ref => this.viewIcon3 = ref}
							style={styles.contentContainerIcon}>
							<Ionicons name='md-thumbs-up' size={120} color={mainColor} />
						</Animatable.View>

						<Animatable.View 
							ref={ref => this.viewText3 = ref}
							style={styles.contentContainerText}>
							<FontedText style={{ color: 'white', fontSize: 23, textAlign: 'center' }}>اعلن الان لدينا</FontedText>
							<Button 
								onPress={
									() => {
										this.props.markSeenWalkthrough(true)
									}
								}
								style={{ backgroundColor: mainColor, paddingHorizontal: width * 0.35, paddingVertical: 15, borderRadius: 20, marginTop: 25 }}>
								<FontedText style={{ fontSize: 19 }}>ابدأ الان</FontedText>
							</Button>
						</Animatable.View>

						<View style={{flex: 0.4}}/>
					</View>
				</Swiper>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	contentContainerIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'flex-end'
	},
	contentContainerText: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	contentContainer: {
		paddingHorizontal: pagePadding,
		backgroundColor: bgColor,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/JustOnceRedux.js');
	return {
		...ownProps,
		...stateProps,
		markSeenWalkthrough: (seen) => actions.markSeenWalkthrough(dispatch, seen)
	};
}

export default connect(undefined, undefined, mergeProps)(Walkthrough)