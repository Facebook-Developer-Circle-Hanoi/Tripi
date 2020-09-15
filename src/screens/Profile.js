import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import THEME from "../Theme/Color";
import ButtonLogin from "../components/ButtonLogin";

export default function Profile({ navigation }) {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/bg/bg.png")}
        style={styles.container}
      >
        <View style={styles.Profile}>
          <View style={styles.infoUser}>
            <Image
              source={{
                uri:
                  "https://freesharevn.com/wp-content/uploads/2019/04/anh-girl-xinh-de-thuong-1.jpg",
              }}
              style={styles.avatarUser}
            />
            <Text style={styles.Username}>namhong1412</Text>
            <Image
              source={require("../../assets/icon/menu.png")}
              style={styles.menu}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
                navigation.navigate("Logout");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: THEME.COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: DEVICE_WIDTH / 2 + 50,
  },
  Profile: {
    flex: 1,
    width: DEVICE_WIDTH,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: THEME.COLORS.WHITE,
  },
  infoUser: {
    width: DEVICE_WIDTH - 40,
    alignItems: "center",
    position: "relative",
    top: -DEVICE_WIDTH / 6 + 10,
    // backgroundColor: "#333",
  },
  avatarUser: {
    width: DEVICE_WIDTH / 3.5,
    height: DEVICE_WIDTH / 3.5,
    borderRadius: 20,
    marginBottom: 10,
  },
  Username: {
    fontSize: DEVICE_WIDTH / 19,
    fontWeight: "600",
  },
  menu: {
    position: "absolute",
    width: DEVICE_WIDTH / 20,
    height: DEVICE_WIDTH / 20,
    right: 0,
    bottom: 55,
  },
  button: {
    width: DEVICE_WIDTH - 40,
    backgroundColor: THEME.COLORS.GRADIENT_START,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
