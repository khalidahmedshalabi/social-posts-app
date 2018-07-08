import React from 'react'
import { Input } from 'native-base';

export default (props) => (
	<Input
		{...props}
		style={[props.style, {
			fontFamily: 'droidkufi',
			textAlign: 'right',
		}] }
		/>
)