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
  ActivityIndicator
} from "react-native";
import Hr from '../../Component/Hr';
import firebase from "react-native-firebase";
import Facebook from "../../database/FbLogin";

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

var { height, width } = Dimensions.get("window");



export default class Login extends Component {
  static navigationOptions = {
  };

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      hide1:false,
      hide2:false,
      hide3:false,
      alert: "",
    };
  }

  componentDidMount() {
  }
  
  loginuser() {
    if (this.state.user === "") {
      this.setState({ alert: "Tên đăng nhập là bắt buộc!"});
    } else if (this.state.password === "") {
      this.setState({ alert:"Mật khẩu là bắt buộc!"});
    } else {
      this.setState({ hide1: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.user, this.state.password)
        .then(async(user) => {
          if(user.emailVerified){
            this.props.navigation.navigate("App");
            await AsyncStorage.setItem("user_id", "login");
          } else{
          user.sendEmailVerification().then(()=> {
              this.setState({ alert: "Bạn chưa xác thực email, vui lòng check email" });
            this.setState({ hide1: false });
            this.logout();
            }).catch((err)=> {
              this.logout();
              this.setState({ alert: "*" + err, hide1: false });
            });
          }
        })
        .catch(err => {
          this.setState({ hide1: false });
          this.setState({ alert:"Sai tên đăng nhập hoặc mật khẩu..."});
          this.logout();
        }) 
        .done();
    }
  }

  async googlesn() {
    this.setState({hide3:true});
    await GoogleSignin.configure({
      offlineAccess: true,
      webClientId: "435626143294-55v7huut36bf65crbrmf5vs7en40k957.apps.googleusercontent.com",// if you want to access Google API on behalf of the user FROM YOUR SERVER
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/pubsub'
      ]
    });
    await GoogleSignin.signIn().then((user) => {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        user.idToken,
        user.accessToken
      );

      firebase.auth().signInWithCredential(credential)
        .then(async (user) => {
          if (user.emailVerified) {
            this.props.navigation.navigate("App");
            await AsyncStorage.setItem("user_id", "login");
          } else {
            user.sendEmailVerification().then(() => {
              this.setState({ alert: "Bạn chưa xác thực email, vui lòng check email" });
              this.setState({ hide3: false });
              this.logout();
            }).catch((err) => {
              this.setState({ hide3: false });
              this.logout();
            });
          }
        })
        .catch(err => {
          this.setState({
            alert: "Không thể login với email.\nTài khoản đã tồn tại hoặc Liên hệ nhà cung cấp",
            hide3: false
          });
          this.logout();
        })
        .done();
    })
      .catch((err) => {
        this.setState({
          alert: "Không thể login với email.\nTài khoản đã tồn tại hoặc Liên hệ nhà cung cấp",
          hide2: false
        });
        this.logout();
      })
      .done();

  }

  async logout(){
    try {
    firebase.auth().signOut();
    Facebook.logout();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
       console.log(err);
    }
  }
  fblogin() {
    this.setState({ hide2: true });
    Facebook.login()
      .then(token => {
        firebase
          .auth()
          .signInWithCredential(
            firebase.auth.FacebookAuthProvider.credential(token)
          )
          .then(async(user) => {
            if (user.emailVerified) {
              this.props.navigation.navigate("App");
              await AsyncStorage.setItem("user_id", "login");
            } else {
              user.sendEmailVerification().then(() => {
                this.setState({ alert: "Bạn chưa xác thực email, vui lòng check email" });
                this.setState({ hide2: false });
                this.logout();
                }).catch((err)=> {
                  this.setState({hide2: false });
                  this.logout();
                });
            }
          })
          .catch(err => {
            this.setState({
              alert:"Không thể login với facebook.\nTài khoản đã tồn tại hoặc Liên hệ nhà cung cấp",
              hide2: false 
            });
            this.logout();
          })
          .done();
      })
  }

  render() {
    return (<View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Sign In</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TextInput underlineColorAndroid={'transparent'} style={styles.input} placeholder={"Email Address"} placeholderTextColor={"#cbcbcb"} returnKeyType={"next"} keyboardType={"email-address"} onChangeText={text => {
          this.setState({ user: text });
        }} editable={this.state.editTable} />
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput underlineColorAndroid={'transparent'} style={[styles.input, { marginBottom: 30 }]} placeholder={"Password"} placeholderTextColor={"#cbcbcb"} returnKeyType={"next"} secureTextEntry={true} onChangeText={text => {
          this.setState({ password: text });
        }} editable={this.state.editTable} />
        <Text style={{ color: 'red', alignItems:'center' }}>{this.state.alert}</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>this.loginuser()}>
        {this.state.hide1?
                  <Image source={require('../../../img/SkinnySeveralAsianlion.gif')} style={{ width: 25, height: 25 }} />
          :
          <Text style={{color:'white',fontSize:14}}>Log In</Text>
          }
        </TouchableOpacity>
 <Hr lineColor='red' text='Or sign in with'
          lineStyle={{
            backgroundColor: "black",
            height: 0.5,
            marginTop:20,
            marginBottom:20
          }}
          textStyle={{
            paddingTop:10,
            color: "black",
            fontSize: 14,
          }}
        />
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#0d47a1' }]} onPress={() => this.fblogin()}>
          {this.state.hide2 ?
            <Image source={require('../../../img/SkinnySeveralAsianlion.gif')} style={{ width: 25, height: 25 }} />
            : <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../../../img/facebook.gif')} style={{ width: 35, height: 35 }} />
              <Text style={{ color: 'white', fontSize: 14 }}>Facebook</Text></View> 
            
          }
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor:'#ede7f6', marginTop:20}]} onPress={() => this.googlesn()}>
          {this.state.hide3 ?
            <Image source={require('../../../img/SkinnySeveralAsianlion.gif')} style={{ width: 25, height: 25 }} />
            :<View style={{flexDirection:'row', flex:1, alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../../../img/google.gif')} style={{ width: 35, height: 35 }} />
               <Text style={{ color: 'black', fontSize: 14 }}>Google</Text></View>
          }

    </TouchableOpacity>
        <Text style={{ marginTop: 40 }}>By tapping Login you agree to our</Text>
        <Text> <Text style={{ color: '#2979ff', textDecorationLine: 'underline' }}>Terms</Text> and <Text style={{ color: '#2979ff', textDecorationLine: 'underline' }}>Privary Policy</Text></Text>
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
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 10,
    paddingBottom:5,
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

