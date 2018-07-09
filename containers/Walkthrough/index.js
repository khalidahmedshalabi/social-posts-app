import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions
} from 'react-native';
import { Container, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors'
import FontedText from '../../components/FontedText'
import { pagePadding } from '../../constants/Layout';
import Swiper from 'react-native-swiper';

const width = Dimensions.get('window').width


export default class Walkthrough extends Component {
	ShouldAnim1= true
	ShouldAnim2=true
	

	componentDidMount () {
		this.viewIcon1.fadeOut(0)
		this.viewText1.fadeOut(0)
	}

	applyTheAnim = () => {
		this.viewIcon1.fadeIn(1500)
		this.viewText1.fadeInUpBig(1500)
		//this.viewSkip1.fadeInUpBig(1500)
	}

	applyTheAnim2 = () => {
		this.viewIcon2.fadeIn(1500)
		this.viewText2.fadeInUpBig(1500)
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
		else {
			if (number == 2) {
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
		}
	}

	render() {
		return (
			<Container style={{backgroundColor: bgColor, paddingBottom: 15}}>
				<Swiper
					height="100%"
					horizontal={true}
					loop={false}
					showsPagination={true}
					activeDotColor='grey'
					dotColor='white'
					onIndexChanged={(number) => this.onPageChanged(number)}
				>
					<View style={styles.contentContainer}>
						<Animatable.View style={styles.contentContainerIcon} animation="fadeIn">
							<FontAwesome name='picture-o' size={120} color={mainColor} />
						</Animatable.View>

						<Animatable.View style={styles.contentContainerText} animation="fadeInUpBig" >
								<FontedText style={{color: 'white', fontSize: 23}}>عنوان 1</FontedText>
								<FontedText style={{ color: '#a1a2a3', fontSize: 12, textAlign: 'center' }}>
									هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان
								</FontedText>
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
							<FontAwesome name='picture-o' size={120} color={mainColor} />
						</Animatable.View>
					
						<Animatable.View 
							ref={ref => this.viewText1 = ref} 
							style={styles.contentContainerText}	>
							<FontedText style={{ color: 'white', fontSize: 23 }}>عنوان 2</FontedText>
							<FontedText style={{ color: '#a1a2a3', fontSize: 12, textAlign: 'center' }}>
								هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان
							</FontedText>
							
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
							<FontAwesome name='picture-o' size={120} color={mainColor} />
						</Animatable.View>

						<Animatable.View 
							ref={ref => this.viewText2 = ref}
							style={styles.contentContainerText}>
							<FontedText style={{ color: 'white', fontSize: 23 }}>عنوان 3</FontedText>
							<FontedText style={{ color: '#a1a2a3', fontSize: 12, textAlign: 'center' }}>
								هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان - هذا وصف لهذا العنوان
							</FontedText>

							<Button 
								onPress={
									() => {
										this.props.navigation.navigate("Login")
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