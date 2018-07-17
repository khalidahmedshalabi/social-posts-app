import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';
import BackHeader from '../../components/BackHeader';
import { Container } from 'native-base';


class Drafts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			/*FlatListItems: [

				{ key: '1', title: 'عنوان 1', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '2', title: 'عنوان 2', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '3', title: 'عنوان 3', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '4', title: 'عنوان 4', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '5', title: 'عنوان 5', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '6', title: 'عنوان 6', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '7', title: 'عنوان 7', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '8', title: 'عنوان 8', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '9', title: 'عنوان 9', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '10', title: 'عنوان 10', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '11', title: 'عنوان 11', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
				{ key: '12', title: 'عنوان 12', msg: 'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. ' },
			]*/
		}
	}
	FlatListItemSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: "100%",
					backgroundColor: '#474668',
				}}
			/>
		);
	}

	render() {
		return (
			<Container>
				<BackHeader
					navigation={this.props.navigation}
					title='مسودات' />

				<FlatList
					data={this.props.draft_posts}
					style={{ backgroundColor: bgColor, }}
					//contentContainerStyle={{padding}}
					ItemSeparatorComponent={this.FlatListItemSeparator}
					renderItem={({ item }) =>
						<TouchableOpacity
						>
							<View style={{ flex: 1, flexDirection: 'row' }}>
								<View style={{ flex: 1, alignItems: 'flex-start', paddingHorizontal: 15, paddingVertical: 15, }}>
									<FontedText style={{ color: 'white', fontSize: 16 }} > {item.title} </FontedText>
									<FontedText style={{ color: 'white', fontSize: 10, textAlign: 'left' }} > {item.content} </FontedText>
								</View>
							</View>
						</TouchableOpacity>
					}
				/>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
	draft_posts: state.draft.draft_posts || [],
})

function mergeProps(stateProps, dispatchProps, ownProps) {
	const { dispatch } = dispatchProps;
	const { actions } = require('../../redux/DraftRedux.js');

	return {
		...ownProps,
		...stateProps,
		removeDraftPost: (key_to_remove) => actions.removeCartItem(dispatch, key_to_remove),
		clearDraftPosts: () => actions.clearDraftPosts(dispatch),
	};
}

export default connect(mapStateToProps, undefined, mergeProps)(Drafts)