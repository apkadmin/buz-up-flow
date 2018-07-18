import {errorsconect,errordatabase} from '../services/errors.js';
import { saveSMSToLocal, insertmultysms} from "./conectdatabase.js";

var URL1='http://channel.movan.mobi/getsms';
var URL2='http://channel.movan.mobi/success';
var URL3='http://channel.movan.mobi/pushsms';
var URL4 ='http://channel.movan.mobi/getsmsdefault';
export function getSMSToApi(phoneNumber){
    if (phoneNumber!='telephone') {
        fetch(URL1, {
            method: 'POST',
            headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({numbersend: phoneNumber}),
        })
            .then((response) => response.json())
            .then((responseData) => {
               saveSMSToLocal(responseData)
            })
            .catch((error) => {
                errorsconect("Can't connect server");
            })
            .done();
    }
}

export function getsmsdefault() {
        fetch(URL4, {
            method: 'GET',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                insertmultysms(responseData);
            })
            .catch((error) => {
                errorsconect("Can't connect server");
            })
            .done();
    }
export function pushSuccessToApi(phoneNumber,id,msg){
    fetch(URL2, {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            numbersend:phoneNumber,
            id:id,
            error:msg
        }),
        })
        .catch((error) => {
            errorsconect("Can't connect server");
        })
        .done();
}

export function pushSMSToApi(data,phone){
    console.log(data);
    fetch(URL3, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:data._id,
            telephone:phone,
            address:data.address,
            body:data.body,
            date:data.date
        }),
         })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            errorsconect("Can't connect server");
        })
        .done();
}