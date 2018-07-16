import React, { Component } from 'react';
import { View, TouchableOpacity,FlatList } from 'react-native';
import { Container } from 'native-base';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor, bgColor } from '../../constants/Colors';
import FontedText from '../../components/FontedText';



export default class Drafts extends Component {
	constructor(props) {
		super(props)
		this.state = { FlatListItems: [

			{key:'1',title: 'عنوان 1',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'2',title: 'عنوان 2',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'3',title: 'عنوان 3',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'4',title: 'عنوان 4',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'5',title: 'عنوان 5',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'6',title: 'عنوان 6',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'7',title: 'عنوان 7',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'8',title: 'عنوان 8',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'9',title: 'عنوان 9',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'10',title: 'عنوان 10',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'11',title: 'عنوان 11',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
			{key:'12',title: 'عنوان 12',msg:'محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. محتوى البوست. '},
		] }
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
		/*
		var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();*/
		return (
			<View style= {{
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'flex-start',
				backgroundColor:bgColor,
				paddingTop:15,
			}}>
							 <FlatList
									data={ this.state.FlatListItems }
									style={{backgroundColor:bgColor,}}
									//contentContainerStyle={{padding}}
									ItemSeparatorComponent = {this.FlatListItemSeparator}
									renderItem={({item}) =>
									<TouchableOpacity
									>
									<View style= {{flex:1,flexDirection:'row'}}>
									<View style = {{flex:1,alignItems:'flex-start',paddingHorizontal: 15,paddingVertical: 15,}}>
									<FontedText style={{color:'white',fontSize:16}} > {item.title} </FontedText>
									<FontedText style={{color:'white',fontSize: 10,textAlign:'left'}} > {item.msg} </FontedText>
									</View>
									</View>
									</TouchableOpacity>
							 }
								 />
				</View>
			
		)
	}
}