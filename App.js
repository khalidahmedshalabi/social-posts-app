import React from 'react';
import { I18nManager } from 'react-native';
import { AppLoading, Font, Util } from 'expo';
import ReduxProvider from './ReduxProvider'

export default class App extends React.Component {
	constructor() {
		super()

		if (!I18nManager.isRTL) {
			I18nManager.forceRTL(true)
			Util.reload(true)
			return
		}

		this.state = {
			isLoadingComplete: false,
		};
	}

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else {
			return (
				<ReduxProvider />
			);
		}
	}

	_loadResourcesAsync = async () => {
		return await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
			Entypo: require("@expo/vector-icons/fonts/Entypo.ttf"),
			MaterialIcons: require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
			"Material Icons": require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
			Octicons: require("@expo/vector-icons/fonts/Octicons.ttf"),
			'droidkufi': require('./assets/fonts/DroidKufi-Regular.ttf')
		})
	};

	_handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}