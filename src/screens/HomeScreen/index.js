import {SwitchNavigator, StackNavigator} from 'react-navigation';
import SearchPageScreen from "../SearchPageScreen";
import NotificationScreen from "../NotificationScreen";
import Main from './Main';
export default HomeScreen = StackNavigator({
  Main:Main,
  Notification:NotificationScreen,
  SearchPageScreen:SearchPageScreen,
}, {
    initialRouteName: "Main",
  headerMode:'none'
  });