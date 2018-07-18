import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Container,Card, CardItem, Content, ListItem, Text, Left, Right, Body, Thumbnail, Button } from 'native-base';
import firebase from 'react-native-firebase';
export default class SideMenu extends Component {
constructor(props){
    super(props);
    this.state = {
        img: '',
        hoten: "Guest"}
}
    componentWillMount(){
        firebase.auth().onAuthStateChanged((results) => {
            if (results) {
                if (results.photoURL) {
                    this.setState({
                        img: results.providerData[0].photoURL,
                    });
                }
                if(results.displayName){
                    this.setState({
                        hoten:results.displayName,
                    })
                }
            }
        });
    }
    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#f6f6f6'}}>
                <View style={styles.UserInfoContainerStyle}>
                    <CardItem>
                        <Left>
                                {this.state.img ? (
                                    <Thumbnail
                                        source={{ uri: this.state.img }}
                                        style={{ width: 50, height: 50 }}
                                    />
                                ) : (
                                        <Thumbnail source={require("../../img/account.png")} />
                                    )}
                            <View>
                                <Text>{this.state.hoten}</Text>
                            </View>
                        </Left>
                        <Body>

                        </Body>
                    </CardItem>
                </View>
                <View style={{marginTop: 20, backgroundColor: '#fff'}}>
                    <ListItem onPress={this.onPressSideMenuItemHome.bind(this)}>
                        <Text>Trang chủ</Text>
                    </ListItem>
                </View>
                <View style={{ marginTop: 20, backgroundColor: '#fff' }}>
                    <ListItem onPress={this.onPressSideMenuSMS.bind(this)}>
                        <Text>SMS Custom</Text>
                    </ListItem>
                    <ListItem onPress={this.onPressSideMenuEmail.bind(this)}>
                        <Text>Email Custom</Text>
                    </ListItem>
                </View>
                <View style={{marginTop: 20, backgroundColor: '#fff'}}>
                    <ListItem onPress={this.onPressSideMenuItemSetting.bind(this)}>
                        <Text>Settings</Text>
                    </ListItem>
                    <ListItem onPress={this.onPressSideMenuItem.bind(this)}>
                        <Text>Help</Text>
                    </ListItem>
                </View>
            </ScrollView>
        );
    }
    onPressSideMenuItem() {
        this._toggleDrawer();
    }

     onPressSideMenuItemSetting() {
        this._toggleDrawer();
        this.props.navigation.navigate('Setting');
    }
    onPressSideMenuItemHome() {
        this._toggleDrawer();
    }

    onPressSideMenuSMS() {
        this._toggleDrawer();
        this.props.navigation.navigate('CustomSMS');
    }
    onPressSideMenuEmail() {
        this._toggleDrawer();
        this.props.navigation.navigate('CustomMail');
    }
    _toggleDrawer() {
        this.props.navigation.navigate('DrawerClose');
    }
}


const styles = {
    UserInfoContainerStyle: {
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingBottom: 30
    },
}
