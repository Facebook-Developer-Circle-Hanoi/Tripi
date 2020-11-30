import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableHighlight, ScrollView, Alert } from "react-native";
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
  {
    id: "4",
    name: "Hải Phòng",
    url:
      "http://media.dulich24.com.vn/diemden/do-son-5824/b76fc15e-18d9-4b2b-943a-69b301df1cb4-9.JPG",
  },
  {
    id: "5",
    name: "Đà Nẵng",
    url:
      "https://rosamiahotel.com/FileUpload/Images/bana.jpg",
  }
];

export default function Home(props) {
  var i = 0;
  const [keyword, onChangeKeyword] = useState("");
  const [session, setSession] = useState(false);
  const [dataReviewFacebook, setDataReviewFacebook] = useState([]);

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

  async function read_review(id) {
    if (id == "" && id == 0) {
      Alert.alert("Bạn ưii, hình như có lỗi gì đó 🥺");
      return;
    } else {
      props.navigation.navigate("ReviewDetail", {
        id: id,
      });
    }
  }

  const fetch_data = async () => {
    fetch(`http://40.74.91.212/review_location.php`)
      .then(async (response) => {
        const data = await response.json();
        setDataReviewFacebook(data.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch_data();
  }, []);

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
                  var imgLeft = { marginLeft: DEVICE_WIDTH / 30 };
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
        <View style={styles.reviewLocation}>
          <View style={[styles.title, {marginTop: 15, marginBottom: 10}]}>
            <Image
              source={require("../../assets/icon/favourite.png")}
              style={styles.titleIcon}
            />
            <Text style={styles.titleContent}>Review du lịch có tâm</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={dataReviewFacebook}
                horizontal={true}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                      <TouchableHighlight
                        onPress={() => {
                          read_review(item.id_post)
                        }}
                        underlayColor="transparent"
                      >
                        <View style={styles.reviewChild}>
                          <Image
                            source={{uri: item.picture}}
                            style={styles.reviewImage}
                          />
                          <View style={[styles.reviewDescription, styles.shadow]}>
                            <Text style={styles.reviewDescriptionContent}>{item.message}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                  );
                }}
              ></FlatList>
              <TouchableHighlight
                        onPress={() => {
                          props.navigation.navigate("AllReview")
                        }}
                        underlayColor="transparent"
                      >
              <View style={styles.seeMore}>
                <Image
                  source={{uri: "https://skindividualblog.files.wordpress.com/2015/08/airplane.jpg"}}
                  style={styles.reviewImage}
                />
                <Text style={styles.seeMoreContent}>Xem thêm</Text>
              </View>
              </TouchableHighlight>
          </ScrollView>
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
  reviewLocation: {
    height: 280,
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
    marginRight: DEVICE_WIDTH / 30,
    marginVertical: 15,
  },
  linearGradient: {
    width: DEVICE_WIDTH - DEVICE_WIDTH / 2 + 30,
    height: 180,
    borderRadius: 14,
    marginRight: DEVICE_WIDTH / 30,
    position: "absolute",
    bottom: 15,
    left: 0,
  },
  nameLocation: {
    borderRadius: 14,
    marginRight: DEVICE_WIDTH / 30,
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
    paddingLeft: DEVICE_WIDTH / 30,
  },
  titleIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  reviewChild: {
    width: DEVICE_WIDTH - DEVICE_WIDTH / 2 + 30,
    height: 160,
    position: "relative",
    marginLeft: DEVICE_WIDTH / 30
  },
  reviewImage: {
    width: DEVICE_WIDTH - DEVICE_WIDTH / 2 + 30,
    height: 160,
    borderRadius: 14,
    marginVertical: DEVICE_WIDTH / 30,
    borderColor: "#eaeaea",
    borderWidth: 0.5
  },
  reviewDescription: {
    width: DEVICE_WIDTH - DEVICE_WIDTH / 2 + 10,
    height: 80,
    backgroundColor: THEME.COLORS.WHITE,
    position: "absolute",
    bottom: -60,
    right: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  seeMore: {
    width: DEVICE_WIDTH - DEVICE_WIDTH / 2 + 30,
    height: 160,
    marginLeft: DEVICE_WIDTH / 30,
    backgroundColor: THEME.COLORS.BLOCK,
    marginRight: DEVICE_WIDTH / 30,
    marginTop: DEVICE_WIDTH / 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  seeMoreContent: {
    color: THEME.COLORS.WHITE,
    fontSize: DEVICE_WIDTH / 21,
    textTransform: "capitalize",
    fontWeight: "700",
    position: "absolute",
  },
  reviewDescriptionContent: {
    fontSize: DEVICE_WIDTH / 28
  }
});