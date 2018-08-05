import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container } from 'native-base';
import BackHeader from '../../components/BackHeader';

export default class TermsAndConditions extends Component {
	render() {
		return (
			<Container>
				<BackHeader
					navigation={this.props.navigation}
					title='سياسة الخصوصية والشروط والأحكام' />

				<WebView
					source={{ uri: 'https://github.com/facebook/react-native' }}
				/>
			</Container>
		);
	}
}