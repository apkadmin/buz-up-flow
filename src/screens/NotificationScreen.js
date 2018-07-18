import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions, Platform,

} from 'react-native';
import {Header,Left,Title,Body,Icon,Button} from 'native-base';
export default class NotificationScreen extends Component {
    static navigationOptions = {
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
                <Title>Thông báo!</Title>
                </Body>
            </Header>
        <Text style={styles.welcome}>
          This is a Notification!
        </Text>
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
