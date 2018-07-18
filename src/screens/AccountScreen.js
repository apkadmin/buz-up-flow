import React, {Component} from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import { Container, Content, ListItem, Text, Left, Right, Body, Thumbnail, Button } from 'native-base';

export default class ListDividerExample extends Component {
    render() {
        return (
          <ScrollView style = {{flex: 1, backgroundColor: '#f6f6f6'}}>
            <View style = {styles.UserInfoContainerStyle}>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{uri: 'https://pbs.twimg.com/profile_images/659710386069897216/C5GLKeIW.png'}} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Button small transparent success style = {{padding: 0, margin: 0}}>
                    <Text style = {{fontSize: 13}}>View profile</Text>
                  </Button>
                </Body>
              </ListItem>
            </View>
            <View style = {{marginTop: 20, backgroundColor: '#fff'}}>
              <ListItem onPress = {this.onPressSideMenuItem.bind(this)}>
                  <Text>Draft</Text>
              </ListItem>
              <ListItem onPress = {this.onPressSideMenuItem.bind(this)}>
                  <Text>Stats</Text>
              </ListItem>
              <ListItem onPress = {this.onPressSideMenuItem.bind(this)}>
                  <Text>Bookmarks</Text>
              </ListItem>
              <ListItem onPress = {this.onPressSideMenuItem.bind(this)}>
                  <Text>Reading history</Text>
              </ListItem>
              <ListItem onPress = {this.onPressSideMenuItem.bind(this)}>
                  <Text>Follow your interests</Text>
              </ListItem>
            </View>
            <View style = {{marginTop: 20, backgroundColor: '#fff'}}>
              <ListItem onPress = {this.onPressSideMenuItem.bind(this)}>
                  <Text>Settings</Text>
              </ListItem>
              <ListItem onPress = {this.onPressSideMenuItem.bind(this)}>
                  <Text>Help</Text>
              </ListItem>
            </View>
          </ScrollView>
        );
    }
    onPressSideMenuItem() {
      this.props.navigator.showModal({
          screen: 'NotificationScreen',
          passProps: {},
          aminateed: true,
      })
    }
    _toggleDrawer() {
      this.props.navigator.toggleDrawer({
        to: 'closed',
        side: 'left',
        animated: true
      });
    }
}

const styles = {
  UserInfoContainerStyle: {
    backgroundColor: '#fff'
  }
}
