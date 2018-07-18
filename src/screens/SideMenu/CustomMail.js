import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, StyleSheet,ScrollView } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Header, Left, Body, Title, Right } from 'native-base';
import { deletesms, insertsms, sms, updatesms } from '../../database/conectdatabase';
class CustomMail1 extends Component {
    static navigationOptions = {
        title: 'Mail'
    }
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            message: null,
            signature: null,
            img: null,
            subject: null,
            from: null,
        }
    }
    onClick() {
        updatesms(this.state.id, this.state.message, this.state.img, this.state.signature, this.state.subject, this.state.from);
    };
    componentDidMount() {
        sms(3).then(result => {
            this.setState({ id: result[0], message: result[1], img: result[2], signature: result[3], subject: result[4], from: result[5] })
        }).catch((err) => { console.log(err) })
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10 }}>
                    <Text style={styles.text}>From</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2,  width: "90%", }} multiline={true} numberOfLines={1} maxHeight={80} onChangeText={(text) => { this.setState({ from: text }) }} placeholder={this.state.from} value={this.state.from} />
                    </View>
                    <Text style={styles.text}>Subject</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={80} onChangeText={(text) => { this.setState({ subject: text }) }} placeholder={this.state.subject} value={this.state.subject} />
                    </View>
                    <Text style={styles.text}>Message:( %name% = user, %email% = email )</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={80} onChangeText={(text) => { this.setState({ message: text }) }} placeholder={this.state.message} value={this.state.message} />
                    </View>
                    <Text style={styles.text}>Chữ ký</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={80} onChangeText={(text) => { this.setState({ signature: text }) }} placeholder={this.state.signature} value={this.state.signature} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.btn} onPress={() => { this.onClick() }}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Save</Text></TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
        );
    }
}
class CustomMail2 extends Component {
    static navigationOptions = {
        title: 'IMG Mail'
    };
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            message: null,
            signature: null,
            img: null,
            subject: null,
            from: null,
        }
    }
    onClick() {
        updatesms(this.state.id, this.state.message, this.state.img, this.state.signature, this.state.subject, this.state.from);
    };
    componentDidMount() {
        sms(4).then(result => {
            this.setState({ id: result[0], message: result[1], img: result[2], signature: result[3], subject: result[4], from: result[5] })
        }).catch((err) => { console.log(err) })
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10 }}>
                    <Text style={styles.text}>From</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={80}  onChangeText={(text) => { this.setState({ from: text }) }} placeholder={this.state.from} value={this.state.from} />
                    </View>
                    <Text style={styles.text}>Subject</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={80}  onChangeText={(text) => { this.setState({ subject: text }) }} placeholder={this.state.subject} value={this.state.subject} />
                    </View>
                    <Text style={styles.text}>Message:( %name% = user, %email% = email )</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={80}  onChangeText={(text) => { this.setState({ message: text }) }} placeholder={this.state.message} value={this.state.message} />
                    </View>
                    <Text style={styles.text}>URL</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={80}  onChangeText={(text) => { this.setState({ img: text }) }} placeholder={this.state.img} value={this.state.img} />
                    </View>
                    <Text style={styles.text}>Chữ ký</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true}  numberOfLines={1} maxHeight={80}  onChangeText={(text) => { this.setState({ signature: text }) }} placeholder={this.state.signature} value={this.state.signature} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.btn, { marginBottom: 10 }]} onPress={() => { this.onClick() }}><Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>SAVE</Text></TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
        );
    }
}
const CustomMail3 = TabNavigator({
    CustomMail1: {
        screen: CustomMail1,
    },
    CustomMail2: {
        screen: CustomMail2,
    }
},
    {
        tabBarOptions: {
            style: {
                backgroundColor: '#039be5',
                alignItems: 'center',
                justifyContent: 'center'
            },
            labelStyle: {
                fontSize: 14,
                paddingBottom: 15
            },
            activeBackgroundColor: 'white',
            inactiveTintColor: 'white'
        },
        initialRouteName: "CustomMail1",
        tabBarComponent: TabBarBottom,
    }
)

export default class CustomMail extends Component {
    constructor(props) {
        super(props);
    }
    onToggleClosePress() {
        this.props.navigation.goBack();
    };
    render() {
        return (<View style={{flex: 1}}>
                  <Header to style={{ backgroundColor: '#039be5', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                    <Left>
                        <Title>CustomMail</Title>
                    </Left>
                    <Body></Body>
                </Header>
            <CustomMail3 />
        </View>);
    }
}
const styles = StyleSheet.create({
    btn: {
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: "60%",
        height: 40,
        backgroundColor: '#00b0ff'
    },
    text: {
        color: "#757575",
        fontSize: 14,
        paddingTop: 20,
        paddingLeft: 12,
        paddingBottom: 10
    },
})