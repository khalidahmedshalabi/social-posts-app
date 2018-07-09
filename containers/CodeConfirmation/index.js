import React, { Component } from 'react';
import { View, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { Container } from 'native-base';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import { LinearGradient } from 'expo';
import FontedText from '../../components/FontedText';
import FontedInput from '../../components/FontedInput';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-easy-toast';
import { height,width } from '../../constants/Layout';
import CodeInput from 'react-native-confirmation-code-input';

export default class CodeConfirmation extends Component {

	constructor(props) {
        super(props);
        this.state = {
            Code:'12345',
            //resend: false,
			}
		}

	CheckCode = (isValid) => {
		if(!isValid)
		{
			this.refs.toast.show('الكود خاطئ');
		}
		else
		{
			{this.props.navigation.navigate("Tabs")}
		}
	}; 	
	render() {
		return (
			<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:bgColor}}>
			<KeyboardAvoidingView
						behavior="padding" enabled
                        keyboardVerticalOffset={0}
                        style={{flex:1 }}
                        contentContainerStyle= {{ flex: 1, flexDirection: 'column', alignItems: 'center', width:width}}>
					<FontedText style={{ color: 'white', textAlign: 'center',paddingTop:50 }}>ادخل الكود الذي وصلك علي بريدك الالكتروني</FontedText>
					<CodeInput
					ref="codeInputRef2"
					secureTextEntry
					compareWithCode={this.state.Code}
					keyboardType="numeric"
					activeColor={mainColor}
					inactiveColor='white'
					autoFocus={true}
					inputPosition='center'
					size={50}
					onFulfill={(isValid) => this.CheckCode(isValid)}
					containerStyle={{ paddingTop:65,flexDirection:'row-reverse' }}
					codeInputStyle={{ borderWidth: 1.5 }}
					/>
					<Toast 	ref="toast" 
							style={{backgroundColor:'#dcdee2',borderRadius:25,}}
							position='bottom'
							positionValue={height*0.52}
							fadeInDuration={750}
							fadeOutDuration={1000}
							opacity={0.8}
							textStyle={{color:bgColor}}/>
						</KeyboardAvoidingView>
			</View>
		)
	}
}
