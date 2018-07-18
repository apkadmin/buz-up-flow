import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions, Platform,
  AsyncStorage,
  Alert
} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import firebase from "react-native-firebase";
import Facebook from "../../database/FbLogin";
import { Header, Left, Title, Body, Icon, Button, Content, List, ListItem, Right } from 'native-base';

import { GoogleSignin } from 'react-native-google-signin';
export default class SettingScreen extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
  }
  onToggleClosePress() {
    this.props.navigation.goBack();
  }

  async onPressSingOut() {
    firebase
      .auth()
      .signOut()
      .then(async (err) => {
        Facebook.logout();
        GoogleSignin.signOut();
        this.props.navigation.navigate("Login");
      })
      .catch(err => {
        console.log(err);
      });
    AsyncStorage.clear();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: '#000' }}>
          <Left>
            <TouchableOpacity onPress={this.onToggleClosePress.bind(this)}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>Setting</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem onPress={this.onPressSingOut.bind(this)}>
              <Left>
                <Entypo name={"log-out"} style={styles.icon1} />
                <Text style={styles.text}>Đăng xuất!</Text>
              </Left>
              <Body style={{ alignItems: "flex-start" }} />
              <Right>
                <Icon name="arrow-forward" style={styles.icon2} />
              </Right>
            </ListItem>
          </List>
        </Content>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 28,
    color: '#999',
    textAlign: 'center',
  }
});
