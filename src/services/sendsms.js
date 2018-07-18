import SmsAndroid  from 'react-native-get-sms-android';
import {changeSMStoLocal} from '../database/conectdatabase.js';

export async function executeSMS(phone,id,reciver,message) {
    console.log("gui tin");
    SmsAndroid.autoSend(String(reciver),String(message), (msg)=>{console.log(msg), changeSMStoLocal(phone,id,msg)});
}
