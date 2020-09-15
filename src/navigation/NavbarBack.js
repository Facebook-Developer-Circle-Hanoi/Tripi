import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
} from "react-native";
import THEME from "../Theme/Color";

export default function Navbar(props) {
  return (
    <View style={{ marginTop: 45, zIndex: 2 }}>
      <View style={styles.navbar}>
        <View style={[styles.layoutBack, styles.shadow]}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={props.onPress}
            style={styles.ButtonBack}
          >
            <Image
              // source={{
              //   uri:
              //     "https://freesharevn.com/wp-content/uploads/2019/04/anh-girl-xinh-de-thuong-1.jpg",
              // }}
              source={require("../../assets/icon/back.png")}
              style={styles.back}
            />
          </TouchableHighlight>
          <Text style={styles.welcome}>
            Kết quả tìm kiếm cho:
            <Text style={styles.name}> {props.name}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  navbar: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  layoutBack: {
    width: DEVICE_WIDTH - 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  ButtonBack: {
    width: 60,
    height: 24,
    alignItems: "flex-end",
    position: "relative",
    left: -30,
  },
  back: {
    width: 15,
    height: 24,
    borderRadius: 10,
    marginRight: 10,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  welcome: {
    fontSize: DEVICE_WIDTH / 24,
    marginLeft: -30
  },
  name: {
    fontWeight: "600",
  },
});
