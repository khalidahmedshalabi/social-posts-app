import React from 'react';
import {
	Text
} from 'react-native';

export default (props) => {
	const {
			style,
			children,
			...otherProps
		} = props;

	return (
		<Text
			style={[{ fontFamily: 'droidkufi' } , style]}
			{...otherProps}
		>
			{children}
		</Text>
	);
}