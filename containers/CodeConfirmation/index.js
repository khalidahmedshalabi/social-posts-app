import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import { mainColor, bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';
import Toast from 'react-native-easy-toast';
import { height, width } from '../../constants/Layout';
import CodeInput from 'react-native-confirmation-code-input';
import { GET } from '../../utils/Network';

class CodeConfirmation extends Component {

	constructor(props) {
		super(props);

		const { code } = this.props.navigation.state.params

		this.state = {
			code,
		}
	}

	CheckCode = (isValid) => {
		if (!isValid) {
			this.refs.toast.show('الكود خاطئ');
		}
		else {
			const { sourceScreen } = this.props.navigation.state.params

			switch(sourceScreen) {
				case 'AccountInfo':
					// Was creating a new account
					const { user_id } = this.props.navigation.state.params

					GET('Signup/ConfirmedSignup?user_id=' + user_id,
						res => {
							if(res.data.response == 1) {
								this.props.setUserID(user_id)
								this.props.setLoggedIn(true)
							}
						},
						() => {})
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
					contentContainerStyle={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: width }}>
					<FontedText style={{ color: 'white', textAlign: 'center', paddingTop: 50 }}>ادخل الكود الذي وصلك علي بريدك الالكتروني - تفقد فولدر spam ايضا</FontedText>

					<CodeInput
						ref="codeInputRef2"
						secureTextEntry
						compareWithCode={this.state.code}
						keyboardType="numeric"
						activeColor={mainColor}
						inactiveColor='white'
						autoFocus={true}
						inputPosition='center'
						size={50}
						onFulfill={(isValid) => this.CheckCode(isValid)}
						containerStyle={{ paddingTop: 65, flexDirection: 'row-reverse' }}
						codeInputStyle={{ borderWidth: 1.5 }}
					/>

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