import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './redux/configureStore'
import RootNavigation from './navigation/RootNavigation';

const { persistor, store } = configureStore();

const onBeforeLift = () => {
	// take some action before the gate lifts
}

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate
					loading={null}
					onBeforeLift={onBeforeLift}
					persistor={persistor}>
					<View style={styles.container}>
						{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
						<RootNavigation />
					</View>
				</PersistGate>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});