import React, { Component } from 'react';
import { 
	View,
	ActivityIndicator,
	StyleSheet
} from 'react-native';

import { mainColor, bgColor } from '../../constants/Colors';

export default class LazyContainer extends Component {
	state = { isMounting: true };

	componentDidMount() {
		requestAnimationFrame(() => this.setState({ isMounting: false }));
	}

	render() {
		if (this.state.isMounting) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={mainColor} />
				</View>
			);
		}

		const {
			style,
			children,
			NotFullFlex,
			...props
		} = this.props;
		
		return (
			<View
				style={
					[
						NotFullFlex ? {} : { flex: 1 }, 
						style
					]
				}
				{...props}
			>
				{children}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	loadingContainer: {
		backgroundColor: bgColor,
		justifyContent: 'center',
		flex: 1,
		alignItems: 'center',
	},
});