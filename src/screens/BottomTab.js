import { View, StyleSheet, Image,Dimensions, Keyboard } from 'react-native';
import React from 'react';
import BottomNavigation, {
    IconTab,
    Badge,
    ShiftingTab
} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BoxShadow from '../Component/BoxShadow';
const {height,width}= Dimensions.get('window');

export default class ButtomTab extends React.Component {
    constructor(props) {
        super(props)

        this.keyboardWillShow = this.keyboardWillShow.bind(this)
        this.keyboardWillHide = this.keyboardWillHide.bind(this)

        this.state = {
            activeTab: 'HomeScreen',
            isVisible: true
        }
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }

    keyboardWillShow = event => {
        this.setState({
            isVisible: false
        })
    }

    keyboardWillHide = event => {
        this.setState({
            isVisible: true
        })
    }


    tabs = [
        {
            key: 'HomeScreen',
            label: 'Home',
            barColor: 'white',
            pressColor: '#fafafa',
            icon: 'home'
        },
        {
            key: 'CustomSMS',
            label: 'Message',
            barColor: 'white',
            pressColor: '#fafafa',
            icon: 'forum'
        },
        {
            key: 'CustomMail',
            label: 'Mail',
            barColor: 'white',
            pressColor: '#fafafa',
            icon: 'email'
        }
    ]


    renderIcon = icon => ({ isActive }) => (
        isActive?
        <Icon size={24} color="#0277bd" name={icon} />:
            <Icon size={24} color="gray" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <ShiftingTab 
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            labelStyle={{ color:'#0277bd'}}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    render() {
        const shadowOpt = {
            width: width,
            height: height/12,
            color: "#000",
            border: 3,
            radius: 10,
            opacity: 0.8,
            x: 0,
            y: 3,
            style: { marginVertical: 5 },
            position: 'relative'
        }
        return (this.state.isVisible ?
            <BoxShadow setting={shadowOpt}>
            <BottomNavigation
                tabs={this.tabs}
                activeTab={this.state.activeTab}
                onTabPress={newTab => {
                    this.setState({ activeTab: newTab.key })
                    this.props.navigation.navigate(newTab.key);
                }}
                renderTab={this.renderTab}
                useLayoutAnimation
                style={{borderRadius:10,position:'relative'}}
            />
            </BoxShadow>:null
        )
    }
}