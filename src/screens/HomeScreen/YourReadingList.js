// import React, {Component} from 'react';
// import {
//     View,
//     ListView,
//     Image,
//     TouchableOpacity,
//     Dimensions,
//     LayoutAnimation
// } from 'react-native';
// import { Container, Content, Card,CardItem, Left,Right, Body, Thumbnail, Text, Button, Icon, H2 } from 'native-base';
// import Navigation from 'react-navigation';
// import {saveSMSToLocal} from "../../database/conectdatabase";

// let { width, height } = Dimensions.get('window');
// let initWidth = width / 2 - 10;
// let initHeight = initWidth * 0.7;
// let URL1='http://nguyenvanan.tk/getpost';

// var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// export default class YourReadingList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dataSource:ds,
//         };
//         fetch(URL1, {
//             method: 'POST',
//             headers:
//                 {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//         }) .then((response) => response.json()).then((responseData) => {
//             this.setState({dataSource: ds.cloneWithRows(responseData)});
//         }).done();
//     }
//     _renderRow(dataItem) {
//         return (
//             <Card >
//                 <TouchableOpacity onPress={()=>
//                     this.props.onPress(dataItem.guid)
//                 }>
//                     <Left>
//                         <Text note>Movan</Text>
//                     </Left>
//                     <CardItem cardBody>
//                         <Image style={styles.imageStyle} source= {{uri: dataItem.post_content}}/>
//                     </CardItem>
//                     <CardItem header>
//                         <H2>{dataItem.post_title}</H2>
//                     </CardItem>

//                 </TouchableOpacity>
//                 <CardItem>
//                     <Left>
//                         <Button transparent>
//                             <Icon name="heart" />
//                             <Text> 12 Likes</Text>
//                         </Button>
//                     </Left>
//                     <Body>
//                     <Button transparent style={{width:150}}>
//                         <Icon name="chatbubbles" />
//                         <Text>4 responses</Text>
//                     </Button>
//                     </Body>
//                     <Right>
//                         <Button transparent>
//                             <Icon name="bookmark" />
//                         </Button>
//                     </Right>
//                 </CardItem>
//             </Card>
//         )
//     }
//     render() {
//         return (
//             <View style = {styles.containerStyle}>
//                 <View style = {styles.headerContainerStyle}>
//                     <View>
//                         <Text style = {styles.headerStyle}>
//                             Có gì hot!!!
//                         </Text>
//                     </View>
//                     <View>
//                         <Text style = {styles.exploreStyle}>
//                             Persionalize
//                         </Text>
//                     </View>
//                 </View>
//                 <ListView
//                     style={styles.listViewContainerStyle}
//                     dataSource={this.state.dataSource}
//                     renderRow={this._renderRow.bind(this)}
//                 />
//             </View>
//         );
//     }
// }

// const styles = {
//     containerStyle: {
//         padding: 5,
//         margin: 5,
//         marginTop: 10
//     },
//     headerContainerStyle: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 5,
//         paddingLeft: 15,
//         paddingRight: 15
//     },
//     headerStyle: {
//         fontWeight: '500'
//     },
//     exploreStyle: {
//         color: '#999',
//         fontWeight: '500'
//     },
//     listViewContainerStyle: {

//     },
//     itemListViewStyle: {
//         marginRight: 10,
//         padding: 0
//     },
//     imageStyle: {
//         width: width - 25,
//         height: width * 0.6,
//         resizeMode: 'cover'
//     }
// }
