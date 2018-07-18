import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
    Dimensions
} from 'react-native';
import {  Container, Header, Item, Input, Icon, Button, Left,Body,Title } from 'native-base';

var {height, width} = Dimensions.get('window');

export default class SearchPageScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
    }
    onToggleClosePress(){
        this.props.navigation.goBack();
    }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Header style = {{backgroundColor: '#000'}}>
             <Left>
                <Button transparent onPress = { this.onToggleClosePress.bind(this)}>
                    <Icon name='md-arrow-round-back'/>
                </Button>
             </Left>
                <Body>
                 <Title>Tìm kiếm</Title>
                </Body>
          </Header>
      <Body searchBar rounded style ={{backgroundColor: '#fff'}}>
      <View style={{flexDirection:'row'}}>
          <Item style={{width:2*width/3}}>
              <Icon name="search" />
              <Input placeholder="Search" />
              <Icon active name="people" />
          </Item>
          <Button transparent info>
              <Icon name='search'/>
          </Button>
      </View>
        </Body>
      </View>
    );
  }

  onCloseModalPress() {
   console.log('close');
  }
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue'
  }
});
