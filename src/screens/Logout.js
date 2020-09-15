import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import THEME from "../Theme/Color";

export default function Profile({ navigation }) {
    const storeData = async (NameStorage, value) => {
        try {
        await AsyncStorage.setItem(NameStorage, value);
        } catch (e) {
        }
    };
    function logout() {
        storeData("username", "ho");
        storeData("password", "ho");
        storeData("authhihi", "ho");
        navigation.push("Home");
    }
    setTimeout(() => {
        logout();
    }, 3000);
  return (
    <View>
      <ImageBackground
        source={require("../../assets/bg/bg.png")}
        style={styles.container}
      >
        <Image
          source={require("../../assets/icon/thanks.gif")}
          style={styles.imageThanks}
        />
        <Text style={styles.contentThanks}>Hẹn gặp lại bạn lần sau</Text>
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
  },
  imageThanks: {
    width: DEVICE_WIDTH / 2,
    height: DEVICE_WIDTH / 2,
    borderRadius: 20,
    marginBottom: 10,
  },
  contentThanks: {
    fontSize: DEVICE_WIDTH / 15,
    color: THEME.COLORS.WHITE,
    fontWeight: "600"
  },
});
