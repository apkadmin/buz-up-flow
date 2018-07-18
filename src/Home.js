import React, { Component } from 'react';
import {View} from 'react-native';
import { Dimensions } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import HomeScreen from "./screens/HomeScreen";
import CustomSMS from './screens/SideMenu/CustomSMS';
import CustomMail from './screens/SideMenu/CustomMail';
import ButtomTab from './screens/BottomTab';
var { height, width } = Dimensions.get('window');
const Home = TabNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
        },
        CustomSMS:{
            screen:CustomSMS,
        },
        CustomMail:{
            screen:CustomMail,
        },
    },{
        navigationOptions: {
            
        },
        tabBarComponent:ButtomTab,
        initialRouteName:'HomeScreen',
        tabBarPosition:'bottom',
        swipeEnabled:false
        
    });
    export default Home;

