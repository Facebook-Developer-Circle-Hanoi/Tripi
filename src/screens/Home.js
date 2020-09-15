import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableHighlight,
  ScrollView, Alert
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";

import Search from "../components/Search";
import Weather from "../components/Weather";
import THEME from "../Theme/Color";
import Navbar from "../navigation/Navbar";

const data = [
  {
    id: "1",
    name: "Hà Nội",
    url:
      "https://i.pinimg.com/564x/87/9a/a0/879aa0d98eab8913cdab628e0ba35be7.jpg",
  },
  {
    id: "2",
    name: "Hội An",
    url:
      "https://i.pinimg.com/564x/b8/ea/5e/b8ea5e0d5d747f7d316fdd51cf2e3795.jpg",
  },
  {
    id: "3",
    name: "Hạ Long",
    url:
      "https://i.pinimg.com/564x/76/ab/91/76ab91398423b091dc5c43855e9fe5cf.jpg",
  },
];

export default function Home(props) {
  var i = 0;
  const [keyword, onChangeKeyword] = useState("");
  const [session, setSession] = useState(false);

  const [user, setUser] = useState({
    name: "Bạn có tài khoản chưa?",
    avatar: require("../../assets/icon/avatar.gif")
  });
  const [redirectLogin, setRedirectLogin] = useState("Login");

  useEffect(() => {
    _retrieveData();
  }, []);

  async function _retrieveData() {
    const value = await AsyncStorage.getItem("authhihi");
    try {
      if (value == "hi") {
        setUser({
          name: props.route.params.name,
          avatar: props.route.params.avatar,
        });
        setRedirectLogin("Profile");
      }
    } catch (error) {

    }
  }
  
  async function search(locationSuggest = "", option = 0) {
    if (keyword == "" && option == 0) {
      Alert.alert("Bạn ưii, bạn chưa nhập địa điểm kìa 🥺");
      return;
    } else if (locationSuggest != "" && option != 0) {
      props.navigation.navigate("Result", {
        key: locationSuggest,
      });
    } else {
      props.navigation.navigate("Result", {
        key: keyword,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Navbar
        name={user.name}
        avatar={user.avatar}
        onPress={() => {
          props.navigation.push(redirectLogin);
        }}
      ></Navbar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Search props={props}></Search>
        <View style={styles.location}>
          <View style={styles.title}>
            <Image
              source={require("../../assets/icon/location.png")}
              style={styles.titleIcon}
            />
            <Text style={styles.titleContent}>Địa điểm nổi bật</Text>
          </View>
          <View style={styles.locationList}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={data}
              horizontal={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                var imgLeft = { marginLeft: 0 };
                i++;
                if (i == 1) {
                  var imgLeft = { marginLeft: 20 };
                }
                return (
                  <View style={styles.locationChild}>
                    <TouchableHighlight
                      onPress={() => {
                        search(item.name, 1);
                      }}
                      underlayColor="transparent"
                      style={styles.shadow}
                    >
                      <Image
                        source={{
                          uri: item.url,
                        }}
                        style={[styles.imageLocation, imgLeft]}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {
                        search(item.name, 1);
                      }}
                      underlayColor="transparent"
                    >
                      <LinearGradient
                        colors={["transparent", "#000"]}
                        style={[styles.linearGradient, imgLeft, styles.shadow]}
                      ></LinearGradient>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {
                        search(item.name, 1);
                      }}
                      underlayColor="transparent"
                      style={[styles.nameLocation, imgLeft]}
                    >
                      <Text style={styles.contentNameLocation}>
                        {item.name}
                      </Text>
                    </TouchableHighlight>
                  </View>
                );
              }}
            ></FlatList>
          </View>
        </View>
        <Weather></Weather>
        </ScrollView>
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
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  location: {
    height: 350,
    marginTop: 30,
  },
  locationList: {
    height: 350,
  },
  locationChild: {
    position: "relative",
  },
  imageLocation: {
    width: DEVICE_WIDTH - DEVICE_WIDTH / 2 + 30,
    height: 320,
    borderRadius: 14,
    marginRight: 15,
    marginVertical: 15,
  },
  linearGradient: {
    width: DEVICE_WIDTH - DEVICE_WIDTH / 2 + 30,
    height: 180,
    borderRadius: 14,
    marginRight: 20,
    position: "absolute",
    bottom: 15,
    left: 0,
  },
  nameLocation: {
    borderRadius: 14,
    marginRight: 20,
    position: "absolute",
    bottom: 30,
    left: 15,
  },
  contentNameLocation: {
    fontSize: 20,
    fontWeight: "700",
    color: THEME.COLORS.WHITE,
  },
  titleContent: {
    fontSize: 20,
    fontWeight: "700",
  },
  title: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  titleIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  }
});