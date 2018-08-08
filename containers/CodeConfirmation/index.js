import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import { mainColor, bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';
import Toast from 'react-native-easy-toast';
import { height, width } from '../../constants/Layout';
import { GET, POST } from '../../utils/Network';
import FontedInput from '../../components/FontedInput';

class CodeConfirmation extends Component {

	constructor(props) {
		super(props);

		const { code } = this.props.navigation.state.params

		this.state = {
			code,
			userCodeInput:'',
		}
	}
	CheckCode = () => {
		if (this.state.userCodeInput != this.state.code) {
			this.refs.toast.show('الكود خاطئ');
			console.log("the code is : " + this.state.userCodeInput)
		}
		else {
			const { sourceScreen, user_id } = this.props.navigation.state.params

			switch(sourceScreen) {
				case 'AccountInfo':
					// Creating a new account

					GET('Signup/ConfirmedSignup?user_id=' + user_id,
						res => {
							if(res.data.response == 1) {
								this.props.setUserID(user_id)
								this.props.setLoggedIn(true)
							}
						},
						() => {})
					break;
				case 'ResetPassword':
					// Changing password
					const { email, password } = this.props.navigation.state.params

					POST('ResetPassword/ConfirmedResetPassword',
						{
							email,
							password
						},
						res => {
							if (res.data.response == 1) {
								this.props.setUserID(user_id)
								this.props.setLoggedIn(true)
							}
						},
						() => { })
					break;
			}
		}
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
				<KeyboardAvoidingView
					behavior="padding" 
					enabled
					keyboardVerticalOffset={0}
					style={{ flex: 1 }}
					contentContainerStyle={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: width, }}>
					<FontedText style={{ color: 'white', textAlign: 'center', paddingTop: 50,paddingHorizontal: 12, }}>ادخل الكود الذي وصلك علي بريدك الالكتروني - تفقد فولدر Spam/Junk ايضا</FontedText>
					
				<View style={{flex:0.17,justifyContent: 'center',alignItems: 'center',marginTop: 60,}}>
					<FontedInput
						borderBottomColor ='#bcbcbc'
						borderBottomWidth= {2}
						placeholder='الكود هنا'
						placeholderTextColor='#bcbcbc'
						keyboardType='decimal-pad'
						returnKeyType='done'
						maxLength={5}
						style={{flex: 1,color:'white',fontSize: 34,}}
						onChangeText={(value) => this.setState({userCodeInput: value})}
						onSubmitEditing={() => this.CheckCode()}
					
					/>
				</View>
					<Toast ref="toast"
						style={{ backgroundColor: '#dcdee2', borderRadius: 25, }}
						position='bottom'
						positionValue={height * 0.52}
						fadeInDuration={750}
						fadeOutDuration={1000}
						opacity={0.8}
						textStyle={{ color: bgColor }} />
				</KeyboardAvoidingView>
			</View>
		)
	}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/LoginRedux.js');

	return {
		...ownProps,
		...stateProps,
		setUserID: (user_id) => actions.setUserID(dispatch, user_id),
		setLoggedIn: (logged_in) => actions.setLoggedIn(dispatch, logged_in)
	};
}

export default connect(undefined, undefined, mergeProps)(CodeConfirmation)