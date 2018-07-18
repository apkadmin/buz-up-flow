import { View, StyleSheet, Image,TextInput } from 'react-native'
import React from 'react';
import BottomNavigation, {
    IconTab,
    Badge,
    ShiftingTab
} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class App extends React.Component {
constructor(props){
    super(props);
    this.state={
        text:null
    }
}
    render() {
        return (
<View>
                <TextInput   
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    editable={true}
                    style={{borderBottomWidth:1,borderBottomColor:'#111'}}
                    maxHeight={60}
                />    

</View>
        )
    }
}