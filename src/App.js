import React from "react";
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Image
} from "react-native";
import { SwitchNavigator } from "react-navigation";
import Home from "./Home";
import AuthStack from './screens/Acounts';
import {sms,deletesms} from './database/conectdatabase';
import {getsmsdefault} from './database/conectapi';
import firebase from "react-native-firebase";
class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        // sms(1).catch((err)=>{
        //     getsmsdefault();
        // });
        // firebase.auth().onAuthStateChanged(async (results) => {
        //     console.log(results);
        //     if (results) {
        //         let token = await results.getToken();
        //         console.log(token);
        // fetch("https://sb.netadx.com/check?access_token=" + token, { method: 'GET' }).then(response => response.json()).then((results)=>{
        //     console.log(results);

        // })
        //     }
        // });
    }
     componentWillMount(){
    this._bootstrapAsync();
    }
    _bootstrapAsync = async () => {               
        const user_id = await AsyncStorage.getItem("user_id");
      setTimeout(()=>{
           this.props.navigation.navigate(user_id ? "App" : "Auth");
       }, 3000);
    };


    
    render() {
        return <View style={styles.container}>
            <ActivityIndicator color="white" size="large" />
            <StatusBar barStyle="default" />
            <Image source={require('../img/MOVAN.png')} style={{width:120, height:50}}/>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});




export default App = SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: Home,
        Auth: AuthStack
    },
    {
        initialRouteName: "App"
    }
);
