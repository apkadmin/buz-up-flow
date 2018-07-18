import React, { Component } from 'react';
import {
    View,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions,
    CameraRoll,
    Modal,
    ToastAndroid,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    BackHandler,
    KeyboardAvoidingView
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SmsAndroid from 'react-native-get-sms-android';
import { Header, Left, Title, Body, Button } from 'native-base';
import { deletesms, insertsms, sms, updatesms } from '../../database/conectdatabase';
let { width, height } = Dimensions.get('window');

export default class SendImg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: null,
            id: null,
            message: null,
            signature: null,
            img: null,
            subject: null,
            from: null,
            phone: null,
            email: null,
            name: null,
            show:false
        }
    }
    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                this.setState({ photos: r.edges, show: true });
            })
            .catch((err) => {
                ToastAndroid.show("No Image", ToastAndroid.SHORT);
            });
    };
    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            email: params.email, phone: params.phone, name: params.name, id: params.id
        })
        sms(params.id).then(result => {
            this.setState({ id: result[0], message: result[1], img: result[2], signature: result[3], subject: result[4], from: result[5] })
        }).catch((err) => { console.log(err) })
    }
    async onSet(uri) {
        this.setState({show:false})
        const data = new FormData();
        let n = Date.now();
        await data.append('file', {
            uri: uri,
            type: 'image/jpeg',
            name: n + ".jpg"
        });
        await fetch("http://file.movan.mobi/img/upload", {
            method: 'post',
            body: data
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({ img: res.result.link });
                ToastAndroid.show("Upload success!", ToastAndroid.SHORT);
            }).catch((err) => {
                ToastAndroid.show("Error UploadImg", ToastAndroid.SHORT)
            });
    }
    async onClick() {
        if (this.state.id == 2) {
            temp = this.state.message;
            temp = temp.replace(/%name%/g, this.state.name);
            msg = temp.replace(/%email%/g, this.state.email);
            msg = msg + "\n" + this.state.img + "\n" + this.state.signature;
            SmsAndroid.autoSend(this.state.phone, msg, (err) => { ToastAndroid.show(err, ToastAndroid.SHORT) });
        }
        else {
            temp = this.state.message;
            temp = temp.replace(/%name%/g, this.state.name);
            msg = temp.replace(/%email%/g, this.state.email);
            msg = msg + "\n" + this.state.img + "\n" + this.state.signature;
            await fetch("http://channel.movan.mobi/sendmail", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ to: this.state.email, subject: this.state.subject, message: msg, from: this.state.from })
            })
                .then((result) => {
                    ToastAndroid.show("Email send!", ToastAndroid.SHORT);
                }).catch((err) => {
                    ToastAndroid.show("Email error", ToastAndroid.SHORT);
                }).done();
        }
        BackHandler.exitApp();
    }

    getTime() {

    }
    onToggleClosePress() {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                <Header style={{ backgroundColor: '#000' }}>
                    <Left>
                        <TouchableOpacity onPress={this.onToggleClosePress.bind(this)}>
                            <Text style={{ color: '#fff' }}>Close</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title>Send Message</Title>
                    </Body>
                </Header>
                <ScrollView style={{ flex: 5 / 6 }}>
                    <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10 }}>
                        {this.state.id == 4 ?
                            <View>
                                <Text style={styles.text}>From</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                                    <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 10, height: 30, width: "90%", }} multiline={true} onChangeText={(text) => { this.setState({ from: text }) }} placeholder={this.state.from} value={this.state.from} />
                                </View>
                                <Text style={styles.text}>Subject</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                                    <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 10, height: 30, width: "90%", }} multiline={true} onChangeText={(text) => { this.setState({ subject: text }) }} placeholder={this.state.subject} value={this.state.subject} />
                                </View>
                            </View> : <View></View>}

                        <Text style={styles.text}>Message</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                            <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 10, height: 100, width: "90%", }} multiline={true} onChangeText={(text) => { this.setState({ message: text }) }} placeholder={this.state.message} value={this.state.message} />
                        </View>
                        <Text style={styles.text}>Image</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15,}}>
                        <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10, height: 60, borderColor: 'gray', width: "90%",alignItems:'center',justifyContent:'center' }}>
                            <TouchableOpacity onPress={this._handleButtonPress} style={{marginLeft:50}}><Entypo name="camera" style={styles.icon} /></TouchableOpacity>
                            <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ height: 60,  }} multiline={true} onChangeText={(text) => { this.setState({ img: text }) }} placeholder={this.state.img} value={this.state.img} />
                        </View>
                        </View>
                        <Text style={styles.text}>Chữ ký</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-start', marginBottom: 15 }}>
                            <TextInput autoCorrect={false} underlineColorAndroid={'transparent'} style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 10, height: 60, width: "90%", }} multiline={true} onChangeText={(text) => { this.setState({ signature: text }) }} placeholder={this.state.signature} value={this.state.signature} />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.btn,{marginBottom:10}]} onPress={() => { this.onClick() }}><Text>SEND</Text></TouchableOpacity>
                        </View>
                        </View>
                </ScrollView>
                    {this.state.show ?
                    <View style={{ height:150,width:width}}>
                        <ScrollView horizontal={true}>
                            {this.state.photos.map((p, i) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        this.onSet(p.node.image.uri);
                                    }} key={i}>
                                        <Image
                                            key={i}
                                            style={{
                                                width: 150,
                                                height: 150,
                                            }}
                                            source={{ uri: p.node.image.uri }}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        </View>
                        : <View></View>}
            </KeyboardAvoidingView>
        );
    }

}

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modal: {
        width: width,
        height: height * 4 / 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    icon: {
        color: "#777",
        fontSize: 26,
        width: 30,
        marginRight: 12
    },
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
            color: "black",
            fontSize: 14,
            paddingLeft: 12,
            paddingBottom: 10
        },
    });
