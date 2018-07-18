import {BackHandler,Alert} from 'react-native';
import BackgroundJob from 'react-native-background-job';

export async function errorsconect(err) {
	console.log(err);
    BackgroundJob.cancelAll();
}
export async function errorsmessage(err) {
    Alert.alert('Error',err);
}
export async function errordatabase() {
    BackgroundJob.cancelAll();
}