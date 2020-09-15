import React from "react";
import { View, Image, StyleSheet, Dimensions, Text, TouchableHighlight } from "react-native";
import THEME from "../Theme/Color";

export default function Navbar(props) {
  return (
    <View style={[styles.shadow, {marginTop: 45}]}>
      <View style={styles.navbar}>
        <View style={[styles.layoutAvatar, styles.shadow]}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={props.onPress}
          >
            <Image
              source={props.avatar}
              style={styles.avatar}
            />
          </TouchableHighlight>
          <Text style={styles.welcome}>
            Chin Chào, <Text style={styles.name}>{props.name}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  navbar: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  layoutAvatar: {
    width: DEVICE_WIDTH - 40,
    flex: 1,
    // backgroundColor: THEME.COLORS.ERROR,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 42,
    height: 42,
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
  },
  name: {
    fontWeight: "600",
  },
});