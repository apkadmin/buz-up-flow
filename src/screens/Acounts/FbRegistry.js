import React from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  Picker,
  AsyncStorage
} from "react-native";
import {
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Container,
  Content
} from "native-base";
import firebase from "react-native-firebase";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  urlRegister,
  urlListSchools,
  urlListClass,
  urlProfile
} from "../../database/URL";
import Facebook from "../../database/FbLogin";

var { height, width } = Dimensions.get("window");
export default class FbRegistry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: "1234567",
      rules: "0",
      gioitinh: 2,
      truonghoc: null,
      lop: null,
      datatruong: "",
      datalop: ""
    };
  }
  kiemtra() {
    if (this.state.gioitinh == 2) {
      Alert.alert("Cảnh báo!", "Bạn chưa chọn giới tính");
      return false;
    } else if (this.state.truonghoc == 0) {
      Alert.alert("Cảnh báo!", "Bạn chưa chọn trường học");
      return false;
    } else if (this.state.lop == 0) {
      Alert.alert("Cảnh báo!", "Bạn chưa chọn lớp học");
      return false;
    }
    return true;
  }
  onCreate() {
    const {params} = this.props.navigation.state;
    if (this.kiemtra()) {
         AsyncStorage.setItem("rules", "" + this.state.rules);
         AsyncStorage.setItem("hoten", params.user);
         AsyncStorage.setItem("truong_id", "" + this.state.truong_id);
      fetch(urlRegister, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: params.email,
          password: this.state.pass,
          hoten: params.user,
          rules: this.state.rules,
          gioitinh: this.state.gioitinh,
          truong_id: this.state.truonghoc || 0,
          lop_id: this.state.lop || 0
        })
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData["status"] == 1) {
     fetch(urlProfile, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: params.email
          })
        }).then(response => response.json())
        .then((results)=>{ AsyncStorage.setItem("rules", "" + profile.rules);}).catch((err)=>{console.log(err)}).done();
            
        this.props.navigation.navigate("App");

          } else if (responseData["error"] == 2) {
            Alert.alert("Thông báo!", "Tài khoản đã tồn tại!");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .done();
    }
  }
  async chonnghenghiep(itemValue) {
    if (itemValue == "1") {
      let data = await fetch(urlListSchools, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .catch(error => {
          console.log("Can't connect server");
        });
      this.setState({
        rules: itemValue,
        truonghoc: "0",
        lop: null,
        datatruong: data
      });
    }
    if (itemValue == "3") {
      let data = await fetch(urlListSchools, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .catch(error => {
          console.log("Can't connect server");
        });
      this.setState({
        rules: itemValue,
        truonghoc: "0",
        lop: "0",
        datatruong: data
      });
    }
    if (itemValue == "2") {
      this.setState({
        rules: itemValue,
        truonghoc: null,
        lop: null
      });
    }
  }

  renderTruong() {
    let arr = [];
    this.state.datatruong.map((value, index) => {
      arr.push(<Picker.Item value={value.truong_id} label={value.tentruong} />);
    });
    return arr;
  }
  async chonTruong(itemValue) {
    let data = null;
    this.setState({
      truonghoc: itemValue
    });
    if (this.state.lop) {
      data = await fetch(urlListClass + itemValue, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .catch(error => {
          console.log("Can't connect server");
        });
      this.setState({ datalop: data });
    }
  }
  renderLop() {
    let arr = [];
    if (this.state.datalop) {
      this.state.datalop.map((value, index) => {
        arr.push(<Picker.Item value={value.lop_id} label={value.tenlop} />);
      });
    }
    return arr;
  }
  onToggleMenuPress() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <Container>
        <Header style={{ height: 45 }}>
          <Left>
            <Button transparent onPress={this.onToggleMenuPress.bind(this)}>
              <FontAwesome
                name="chevron-left"
                style={{ width: 40, color: "white" }}
              />
            </Button>
          </Left>
          <Body>
            <View
              style={{
                height: 40,
                backgroundColor: "transparent",
                shadowColor: "gray",
                shadowOpacity: 3,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                  fontWeight: "bold",
                  fontSize: 15
                }}
              >
                ĐĂNG KÝ
              </Text>
            </View>
          </Body>
        </Header>
        <View>
          <Picker
            selectedValue={this.state.gioitinh}
            style={styles.picer}
            onValueChange={itemValue => this.setState({ gioitinh: itemValue })}
          >
            <Picker.Item label="Giới tính" value="2" />
            <Picker.Item label="Nam" value="1" />
            <Picker.Item label="Nữ" value="0" />
          </Picker>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Picker
            selectedValue={this.state.rules}
            style={styles.picer}
            onValueChange={itemValue => {
              this.chonnghenghiep(itemValue);
            }}
          >
            <Picker.Item label="Nghề nghiệp" value="0" />
            <Picker.Item label="Giáo Viên" value="1" />
            <Picker.Item label="Phụ huynh" value="2" />
            <Picker.Item label="Học sinh" value="3" />
          </Picker>
        </View>
        {this.state.truonghoc ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Picker
              selectedValue={this.state.truonghoc}
              style={styles.picer}
              onValueChange={itemValue => {
                this.chonTruong(itemValue);
              }}
            >
              <Picker.Item value="0" label="Chọn trường" />
              {this.renderTruong()}
            </Picker>
          </View>
        ) : (
          <View />
        )}
        {this.state.lop ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Picker
              selectedValue={this.state.lop}
              style={styles.picer}
              onValueChange={itemValue => this.setState({ lop: itemValue })}
            >
              <Picker.Item label="Chọn Lớp" value="0" />
              {this.renderLop()}
            </Picker>
          </View>
        ) : (
          <View />
        )}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.onCreate.bind(this)}
          >
            <Text style={{ color: "black" }}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  subtitle: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  btn: {
    borderRadius: 25,
    flexDirection: "row",
    backgroundColor: "#00ff00",
    alignItems: "center",
    width: width * 4 / 5,
    height: 40,
    justifyContent: "center",
    marginBottom: 40
  },
  label: {
    color: "#777777",
    marginLeft: 20
  },
  input: {
    marginBottom: 10,
    height: 40,
    borderColor: "#cbcbcb",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginLeft: 10,
    color: "#000",
    fontSize: 14,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#fff",
    paddingBottom: 0,
    width: width * 9 / 10
  },
  picer: {
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
    width: width * 9 / 10
  }
});
