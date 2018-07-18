import React, { Component } from "react";
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Button,
    Dimensions,
    StyleSheet,
    Image,
    ImageBackground,
    AsyncStorage
} from "react-native";

import Swiper from 'react-native-swiper';

var { height, width } = Dimensions.get("window");


console.disableYellowBox = true;
export default class Welcome extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: ""
        };
    }
    componentDidMount() {

    }

    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'white' }}>
                <View style={{ flex: 4 / 6 }}>
                    <Swiper style={{ flex:1 }} showsButtons={false} autoplay={true} autoplayTimeout={10}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <View style={{ flex: 3 / 6, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../../img/welcome.jpg')} style={{width:297,height:170}}/>
                            </View>
                            <View style={{flex:1/5}}>
                            <Text style={{ fontSize: 25, color:'#2979ff',}}>Welcome to Movan</Text>
                            <Text style={{marginTop:10}}>Email marketing and SMS marketing</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 4 / 6, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../../img/welcome2.png')} style={{ width: 170, height: 170 }} />
                            </View>
                            <View style={{ flex: 1 / 6 }}>
                                <Text style={{ marginTop: 10 }}>Fast SMS marketing</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 4 / 6, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../../img/Welcome3.jpg')} style={{ width: 170, height: 170 }} />
                            </View>
                            <View style={{ flex: 1/ 6 }}>
                                <Text style={{ marginTop: 10 }}>Fast Email marketing</Text>
                            </View>
                        </View>
                    </Swiper>
                </View>
                <View style={{ flex: 2 / 6, alignItems:'center', justifyContent:'center' }}>
                    <TouchableOpacity style={styles.btn1} onPress={this.Login.bind(this)}>
                        <Text style={{ color: "white" }}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.Singup()} style={styles.btn2}>
                      <Text
                            style={{ fontFamily: "Arial", fontSize: 15, marginLeft: 10, color:'black' }}
                        >
                            Sign Up
                         </Text>
                    </TouchableOpacity>
                    <View>
                    <Text>Power By Movan</Text>
                    </View>
                </View>
            </View>
        );
    }

    Login() {
        this.props.navigation.navigate('Login');
    }

    Singup() {
        this.props.navigation.navigate('Signup');
    }

}
const styles = StyleSheet.create({
    subtitle: {
        color: "red",
        fontSize: 15,
        textAlign: "center",
        textDecorationLine: "underline"
    },
    btn1: {
        borderRadius: 25,
        flexDirection: "row",
        backgroundColor: "#2979ff",
        alignItems: "center",
        width: width * 4 / 5,
        height: 42,
        justifyContent: "center",
        marginBottom: 40
    }, 
    btn2: {
        borderRadius: 25,
        flexDirection: "row",
        backgroundColor: "transparent",
        alignItems: "center",
        width: width * 4 / 5,
        height: 42,
        justifyContent: "center",
        marginBottom: 40,
        borderColor:'#2979ff',
        borderWidth:1
    },
    label: {
        color: "#777777",
        marginLeft: 10
    },
    input: {
        marginBottom: 15,
        height: 40,
        borderColor: "#cbcbcb",
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        marginLeft: 10,
        color: "#000",
        fontSize: 14,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "#fff",
        paddingBottom: 0,
        width: width * 9 / 10
    }
});

