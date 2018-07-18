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
  AsyncStorage,
  ActivityIndicator,
  BackHandler
} from "react-native";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import Swiper from 'react-native-swiper';
import Facebook from "../../database/FbLogin";
import AwesomeButton from 'react-native-really-awesome-button';
// import { urlCheckAcount,urlProfile } from "../../database/URL";

var { height, width } = Dimensions.get("window");



export default class Signup extends Component {
  static navigationOptions = {
  };

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      repass: "",
      hide1: false,
      hide2: false,
      alert: "",
    };
  }

  componentDidMount() {

  }
  kiemtra() {
    let arrtemp = this.state.user.split("@");
    if (arrtemp[1] == null) {
      this.setState({ alert: "*Email không đúng!" });
      return false;
    } else
      if (this.state.pass == null) {
        this.setState({ alert: "*Mật khẩu là bắt buộc!" });
        return false;
      } else
        if (this.state.pass != this.state.repass) {
          this.setState({ alert: "*Mật khẩu không khớp!" });
          return false;
        }
    return true;
  }
  onCreate() {

    this.setState({ alert: "", hide1: true });
    if (this.kiemtra()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.user, this.state.pass)
        .then(async (user) => {
          user.sendEmailVerification(
            {
              android: ({
                packageName: "Marketing App",
                installApp: true,
                minimumVersion: "Android 4.4"
              }),
              handleCodeInApp: true,
              iOS: ({
                bundleId: " string"
              }),
              url: "sb.netadx.com",
            }).then(function (data) {
              Alert.alert("Success", "Vui lòng kiểm tra email xác thực ");
              this.props.navigation.navigate('Login');
            }).catch(function (err) {
              this.setState({ alert: "*" + err, hide1: false });
            });
        })
        .catch((err) => {
          this.setState({ alert: "*" + err, hide1: false});
        })
    }
  }


  render() {
    return (<View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Sign Up</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TextInput underlineColorAndroid={'transparent'} style={styles.input} placeholder={"Email Address"} placeholderTextColor={"#cbcbcb"} returnKeyType={"next"} keyboardType={"email-address"} onChangeText={text => {
          this.setState({ user: text });
        }} />
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput underlineColorAndroid={'transparent'} style={styles.input} placeholder={"Password"} placeholderTextColor={"#cbcbcb"} returnKeyType={"next"} secureTextEntry={true} onChangeText={text => {
          this.setState({ pass: text });
        }} />
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput underlineColorAndroid={'transparent'} style={styles.input} placeholder={"Confirm Password"} placeholderTextColor={"#cbcbcb"} returnKeyType={"next"} secureTextEntry={true} onChangeText={text => {
          this.setState({ repass: text });
        }} />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'red' }}>{this.state.alert}</Text>
        <Text>Use atleast 6 characters</Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <TouchableOpacity style={styles.btn} onPress={() => this.onCreate()}>
          {this.state.hide1 ?
            <Image source={require('../../../img/SkinnySeveralAsianlion.gif')} style={{ width: 25, height: 25 }} />
            :
            <Text style={{ color: 'white', fontSize: 14 }}>Sign Up</Text>
          }
        </TouchableOpacity>
      </View>
    </View>);
  }
}
const styles = StyleSheet.create({
  subtitle: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  btn: {
    borderRadius: 25,
    flexDirection: "row",
    backgroundColor: '#0091ea',
    alignItems: "center",
    width: width * 4 / 5,
    height: 40,
    justifyContent: "center",
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
    paddingRight: 15,
    marginRight: 10,
    marginLeft: 10,
    color: "#000",
    fontSize: 14,
    borderRadius: 25,
    marginTop: 5,
    backgroundColor: "#fff",
    paddingBottom: 5,
    width: width * 9 / 10
  }
});

