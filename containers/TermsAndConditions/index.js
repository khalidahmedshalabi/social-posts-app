import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container } from 'native-base';
import BackHeader from '../../components/BackHeader';
import { base_url } from '../../constants/Server';

export default class TermsAndConditions extends Component {
	render() {
		return (
			<Container>
				<BackHeader
					navigation={this.props.navigation}
					title='سياسة الخصوصية والشروط والأحكام' />

				<WebView
					source={{ uri: `${base_url}/terms-privacy-policy` }}
				/>
			</Container>
		);
	}
}