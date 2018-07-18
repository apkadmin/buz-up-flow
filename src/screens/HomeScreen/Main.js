import React, {
    Component
} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    ScrollView,
    Image,
    AsyncStorage,
    Dimensions,
    LayoutAnimation,
    Modal,
    PanResponder,
    ToastAndroid,
    BackHandler,
    Picker,
    TextInput
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import BackgroundJob from 'react-native-background-job';
import {
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon,
    CheckBox,
    Thumbnail
} from 'native-base';
import { getSMSToApi } from '../../database/conectapi';
import {
    deleteSMSToLocal,
    readSMSToLocal
} from '../../database/conectdatabase';
import { listSMS } from '../../database/pushsmstoserver';
import ShareMenu from 'react-native-share-menu';
import { sms } from '../../database/conectdatabase';
import SmsAndroid from 'react-native-get-sms-android';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import ButtomTab from '../BottomTab';

var {
    height,
    width
} = Dimensions.get('window');
const exactJobKey = "exactJobKey";
var danhxung1 = [
    { name: '', id: '1' },
    { name: 'Tôi', id: '2' },
    { name: 'Mình', id: '3' },
    { name: 'Bạn', id: '4' },
];
var danhxung2 = [
    { name: '', id: '1' },
    { name: 'Anh', id: '2' },
    { name: 'Chị', id: '3' },
    { name: 'Bạn', id: '4' },
];
export default class Main extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            danhxung1: null,
            danhxung2: null,
            share: true,
            telephone: null,
            email: null,
            name: null,
            check1: false,
            check2: false,
            check3: false,
            check4: false,
            text: null,
            time: null,
            img: null,
        }
    }



    parse(input) {
        var Re1 = /^(version|fn|title|org):(.+)$/i;
        var Re2 = /^([^:;]+);([^:]+):(.+)$/;
        var ReKey = /item\d{1,2}\./;
        var fields = {};

        input.split(/\r\n|\r|\n/).forEach(function (line) {
            var results, key;

            if (Re1.test(line)) {
                results = line.match(Re1);
                key = results[1].toLowerCase();
                fields[key] = results[2];
            } else if (Re2.test(line)) {
                results = line.match(Re2);
                key = results[1].replace(ReKey, '').toLowerCase();

                var meta = {};
                results[2].split(';')
                    .map(function (p, i) {
                        var match = p.match(/([a-z]+)=(.*)/i);
                        if (match) {
                            return [match[1], match[2]];
                        } else {
                            return ["TYPE" + (i === 0 ? "" : i), p];
                        }
                    })
                    .forEach(function (p) {
                        meta[p[0]] = p[1];
                    });

                if (!fields[key]) fields[key] = [];

                fields[key].push({
                    meta: meta,
                    value: results[3].split(';')
                })
            }
        });

        return fields;
    };
    async componentDidMount() {
        this.getDate();
        await ShareMenu.getSharedText((text) => {

            if (text && text.length) {
                this.setState({
                    share: 2
                });
                text1 = JSON.stringify(
                    this.parse(text)
                );
                text2 = JSON.parse(text1);
                console.log(text2);
                this.setState({
                    email: text2.email[0].value[0]
                });
                str = text2.fn[0].value[0];
                str = str.replace(/={1}/g, '%');
                str = decodeURI(str);
                this.setState({
                    name: str
                });
                temp = text2.tel[0].value[0];
                temp = temp.replace(/[-. ]/g, '');
                this.setState({
                    telephone: temp
                });
            }
        });
    }
    async componentWillMount() {
        firebase.auth().onAuthStateChanged((results) => {
            if (results) {
                if (results.photoURL) {
                    this.setState({
                        img: results.providerData[0].photoURL,
                    });
                }
            }
        });
    }

    render() {
        return (<View style={{ flex: 1, backgroundColor: 'white', }}>
            <Header style={Platform.OS == "android" ? { backgroundColor: '#039be5' } : styles.header}>
                {
                    Platform.OS == "android" ?
                        <Left>
                            <Button transparent onPress={this.onToggleMenuPress.bind(this)}>
                                {this.state.img ? (
                                    <Thumbnail
                                        source={{ uri: this.state.img }}
                                        style={{ width: 40, height: 40, borderWidth:0.5, borderColor:'white' }}
                                    />
                                ) : (
                                        <Thumbnail source={require("../../../img/account.png")} 
                                            style={{ width: 40, height: 40, borderWidth: 0.5, borderColor: 'white' }}/>
                                    )}
                            </Button>
                        </Left>
                        : <View />
                }
                <Body>
                    <Title>Trang chủ</Title>
                </Body>
                <Right>
                    {
                        Platform.OS == "android" ?
                            <Button transparent onPress={this.toNotificationScreen.bind(this)}>
                                <Icon name='notifications' />
                            </Button>
                            : <View />
                    }

                    <Button transparent onPress={this.onModalPress.bind(this)}>
                        <Icon name='search' />
                    </Button>

                </Right>
            </Header>
            <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
                {this.state.share ? <ScrollView>
                    <View style={styles.containerPicker}>
                        <Text style={styles.textPicker}>Danh xưng người gửi:</Text>
                        <Picker style={styles.picker} mode={'dropdown'}
                            selectedValue={this.state.danhxung1}
                            onValueChange={itemValue =>
                                this.setState({ danhxung1: itemValue })
                            }>
                            {danhxung1.map(function (reports) {
                                return <Picker.Item style={{ alignSelf: 'center', }} label={reports.name}
                                    value={reports.id} key={reports.id} />;
                            })}
                        </Picker>
                    </View>
                    <View style={styles.containerPicker}>
                        <Text style={styles.textPicker}>Danh xưng người nhận:</Text>
                        <Picker style={styles.picker} mode={'dropdown'}
                            selectedValue={this.state.danhxung2}
                            onValueChange={itemValue =>
                                this.setState({ danhxung2: itemValue })
                            }>

                            {danhxung2.map(function (reports) {
                                return <Picker.Item style={{ alignSelf: 'center' }} label={reports.name}
                                    value={reports.id} key={reports.id} />;
                            })}
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.text, { flex: 1, justifyContent: 'flex-start' }]}>Tên:</Text>
                        <TextInput onChangeText={(text) => { this.state.name }} value={this.state.name} placeHoder={"name"} style={[styles.textInput, { flex: 3 }]} underlineColorAndroid={'transparent'} />
                    </View>
                </ScrollView> :
                    <ScrollView >
                        <Text style={{ color: 'gray', fontSize: 30 }}>Chưa có thông tin</Text>
                    </ScrollView>}
            </View>
        </View>
        );
    }

    getDate() {
        let date = new Date()
        let year = date.getFullYear();
        let day = date.getDate();
        let month = date.getMonth();
        let temp = year + "/" + month + "/" + day;
        this.setState({
            time: temp
        });
    }
    async send() {
        if (this.state.check1 == true) {
            await sms(1).then(result => {
                temp = result[1].replace(/%name%/g, this.state.name);
                msg = temp.replace(/%email%/g, this.state.email);
                msg = msg + "\n" + result[3];
                msg = msg.replace(/%name%/g, this.state.name);
                SmsAndroid.autoSend(this.state.telephone, msg, (err) => {
                    ToastAndroid.show(err, ToastAndroid.SHORT)
                });
            })
        }
        if (this.state.check2 == true) {
            await sms(3).then(async (result) => {
                temp = result[1].replace(/%name%/g, this.state.name);
                msg = temp.replace(/%email%/g, this.state.email);
                msg = msg + "\n" + result[2] + "\n" + result[3];
                msg = msg.replace(/%name%/g, this.state.name);
                await fetch("http://channel.movan.mobi/sendmail", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        to: this.state.email,
                        subject: result[4],
                        message: msg,
                        from: result[5]
                    })
                })
                    .then((result) => {
                        ToastAndroid.show("Email send!", ToastAndroid.SHORT);
                    }).catch((err) => {
                        ToastAndroid.show("Email error", ToastAndroid.SHORT);
                    }).done();
            })
        }
        await this.setState({
            share: 3
        });
        await BackHandler.exitApp();
    }

    toNotificationScreen() {
        this.props.navigation.navigate('Notification');
    }

    onToggleMenuPress() {
        this.props.navigation.navigate('DrawerOpen');
    }
    onModalPress() {
        this.props.navigation.navigate('SearchPageScreen');
    }
}

const styles = StyleSheet.create({
    hideButtonWritePost: {
        width: 0,
        height: 0
    },
    buttonWritePostStyle: {
        bottom: 20,
        right: 20
    },
    containerModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modal: {
        width: width * 3 / 5,
        height: height * 3 / 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10
    },
    text: {
        color: "black",
        fontSize: 14,
    },
    choose: {
        flexDirection: 'row',
        flex: 1 / 5,
    },
    checkbox: {
        borderRadius: 100,
        width: 40,
        height: 40,
        marginLeft: 10
    },
    btn: {
        flex: 1 / 5,
        paddingLeft: 15,
        borderRadius: 25,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    icon: {
        fontSize: 24,
        color: 'black',
        backgroundColor: '#ffeb3b',
        borderRadius: 25
    },
    picker: {
        marginBottom: 15,
        height: 40,
        borderColor: "#cbcbcb",
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        marginLeft: 10,
        color: "#000",
        borderRadius: 8,
        marginTop: 5,
        paddingBottom: 0,
        width: width / 3
    },
    labepicker: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    containerPicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textPicker: {
        textAlign: 'center',
        color: 'black',
    },
    textInput: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#111'
    }
});