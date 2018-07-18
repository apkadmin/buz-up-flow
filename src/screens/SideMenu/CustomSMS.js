import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Header, Left, Body, Title, Right } from 'native-base';
import { deletesms, insertsms, sms, updatesms } from '../../database/conectdatabase';
class CustomSMS1 extends Component {
    static navigationOptions = {
        title: 'SMS'
    }
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            message: null,
            signature: null,
            text:null
        }
    }
    onClick() {
        updatesms(1, this.state.message, null, this.state.signature, null, null);
    };
    componentDidMount() {
        sms(1).then((result) => {
            this.setState({ id: result[0], message: result[1], signature: result[3] })
        }).catch((err) => { console.log(err) })
    }
    render() {
        return (
                <View style={{ flex:1,paddingRight: 10, paddingLeft: 10,}}>
                    <Text style={styles.text}>Message:(%name% = user, %email% = email)</Text>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ backgroundColor:'#fff',borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={100} onChangeText={(text) => { this.setState({ message: text }) }} placeholder={this.state.message} value={this.state.message} />
                </View>
                 <Text style={styles.text}>Chữ ký:</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ backgroundColor: '#fff', borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={100}  onChangeText={(text) => { this.setState({ signature: text }) }} placeholder={this.state.signature} value={this.state.signature} />
                        </View>
     <View style={{alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity style={styles.btn} onPress={() => { this.onClick() }}><Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>SAVE</Text></TouchableOpacity>
               </View>
               </View>
        );
    }
}
class CustomSMS2 extends Component {
    static navigationOptions = {
        title: 'IMG SMS'
    }
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            message: null,
            signature: null,
            img: null
        }
    }
    onClick() {
        updatesms(2, this.state.message, this.state.img, this.state.signature, null, null);
    };
    async componentWillMount() {
        await sms(2).then(async (result) => {
            this.setState({ id: result[0], message: result[1], img: result[2], signature: result[3] });
        }).catch((err) => { console.log(err) })
    }
    render() {
        return (
            <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10}}>
                    <Text style={styles.text}>Message:( %name% = user, %email% = email )</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                    <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} numberOfLines={5} multiline={true} numberOfLines={1} maxHeight={100} onChangeText={(text) => { this.setState({ message: text }) }} placeholder={this.state.message} value={this.state.message} />
                    </View>
                    <Text style={styles.text}>URL</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                    <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={100}  onChangeText={(text) => { this.setState({ img: text }) }} placeholder={this.state.img} value={this.state.img} />
                    </View>
                    <Text style={styles.text}>Chữ ký:</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 2, width: "90%", }} multiline={true} numberOfLines={1} maxHeight={100}  onChangeText={(text) => { this.setState({ signature: text }) }} placeholder={this.state.signature} value={this.state.signature} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => { this.onClick() }}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>SAVE</Text></TouchableOpacity>
                    </View>
                </View>

        );
    }
}


const CustomSMS3 = TabNavigator({
    CustomSMS1: {
        screen: CustomSMS1,
    },
    CustomSMS2: {
        screen: CustomSMS2,
    }
},
    {
 
        tabBarOptions: {
            style: {
                backgroundColor: '#039be5',
                alignItems: 'center',
                justifyContent: 'center',
            },
            labelStyle: {
                fontSize: 14,
                paddingBottom: 15,
            },
            activeBackgroundColor: 'white',
            inactiveTintColor:'white'
        },
        initialRouteName: "CustomSMS1",
        tabBarComponent: TabBarBottom,
        
    },
   
);

export default class CustomSMS extends Component {
    constructor(props) {
        super(props);
    }
    onToggleClosePress() {
        this.props.navigation.goBack();
    };
    render() {
        return (<View style={{ flex: 1}}>
            <Header to style={{ backgroundColor: '#039be5', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                <Left>
                    <Title>CustomSMS</Title>
                </Left>
                <Body>
                   
                </Body>
            </Header>
            <CustomSMS3 />
        </View>);
    }
}
const styles= StyleSheet.create({
    btn: {
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
        width:"60%",
        height:40,
        backgroundColor:'#00b0ff'
    },
    text: {
        color: "#757575",
        fontSize: 14,
        paddingTop:20,
        paddingLeft:12,
        paddingBottom:10
    },
})