import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  TouchableHighlight,
  Alert,
} from "react-native";

import THEME from "../Theme/Color";


export default function Search(props) {
  var i = 0;
  const [keyword, onChangeKeyword] = useState("");

  function search(locationSuggest = "", option = 0) {
    if (keyword == "" && option == 0) {
      Alert.alert("Bạn ưii, bạn chưa nhập địa điểm kìa 🥺");
      return;
    } else if (locationSuggest != "" && option != 0) {
      props.props.navigation.navigate("Result", {
        key: locationSuggest,
      });
    } else {
      props.props.navigation.navigate("Result", {
        key: keyword,
      });
    }
  }
  return (
    <View style={styles.search}>
      <View style={styles.row}>
        <TextInput
          autoCapitalize="none"
          placeholder="Bạn mún đi đâu?"
          returnKeyType="done"
          onSubmitEditing={() => search()}
          onChangeText={(text) => onChangeKeyword(text)}
          style={[styles.input, styles.shadow]}
        />
        <TouchableHighlight
          style={styles.buttonSearch}
          onPress={() => {
            search();
          }}
          underlayColor="transparent"
        >
          <Image
            source={require("../../assets/icon/search.png")}
            style={styles.iconSearch}
          />
        </TouchableHighlight>
      </View>
      <Image
        source={require("../../assets/bg/home_hero_got_illustration.png")}
        style={styles.imageSearch}
      />
    </View>
  );
}

const DEVICE_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  search: {
    height: 130,
    paddingLeft: DEVICE_WIDTH / 30,
    position: "relative",
    marginTop: 15,
  },
  imageSearch: {
    width: DEVICE_WIDTH - DEVICE_WIDTH / 2 + 10,
    height: DEVICE_WIDTH - DEVICE_WIDTH / 2 - 60,
    position: "absolute",
    top: 0,
    right: 25,
    zIndex: 0,
  },
  buttonSearch: {
    width: 35,
    height: 30,
    position: "absolute",
    left: 0,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSearch: {
    width: 18,
    height: 20,
  },
  row: {
    flex: 1,
    width: DEVICE_WIDTH - 80,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 1,
    position: "relative",
    top: 0,
  },
  input: {
    height: 45,
    color: THEME.COLORS.BLACK,
    backgroundColor: "#fff",
    fontSize: 16,
    flex: 1,
    borderRadius: 10,
    paddingLeft: 35,
    borderColor: "#eaeaea",
    borderWidth: 0.2,
    borderStyle: "solid",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  }
});