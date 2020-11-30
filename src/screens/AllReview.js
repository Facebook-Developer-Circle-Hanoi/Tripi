import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, FlatList, Dimensions, ActivityIndicator, TouchableHighlight, Text, Image } from "react-native";
import NavbarBack from "../navigation/NavbarBack";
import THEME from "../Theme/Color";

export default function Result(props) {
//   const keyword = props.route.params.key;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetch_data = async () => {
    setLoading(true);
    var hi = pageNumber;
    hi++;
    fetch(`http://40.74.91.212/review.php?page=${pageNumber}`)
      .then(async (response) => {
        const data = await response.json();
        setArticles(articles.concat(data.reviews[0]));
        setPageNumber(hi);
      })
      .catch((err) => {
        console.log(err);
      });
    
    setLoading(false);
  };

  const filterForUniqueArticles = (arr) => {
    const cleaned = [];
    arr.forEach((itm) => {
      let unique = true;
      cleaned.forEach((itm2) => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

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

  useEffect(() => {
    fetch_data();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" loading={loading} />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#fff", paddingBottom: 100 }}>
      <NavbarBack
        name="Review du lịch có tâm"
        onPress={() => {
          props.navigation.goBack("Home");
        }}
      ></NavbarBack>
      <FlatList
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator="false"
        data={articles}
        keyExtractor={(item) => item.id_post}
        onEndReached={() => fetch_data()}
        ListFooterComponent={
          <ActivityIndicator size="large" loading={loading} />
        }
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
    </View>
  );
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 50
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  reviewChild: {
    width: DEVICE_WIDTH - 30,
    height: 260,
    position: "relative",
    marginBottom: DEVICE_WIDTH / 22
  },
  reviewImage: {
    width: DEVICE_WIDTH - 30,
    height: 200,
    borderRadius: 14,
    marginVertical: DEVICE_WIDTH / 30,
    borderColor: "#eaeaea",
    borderWidth: 0.5
  },
  reviewDescription: {
    width: DEVICE_WIDTH - 80,
    height: 100,
    backgroundColor: THEME.COLORS.WHITE,
    position: "absolute",
    bottom: 0,
    right: 28,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
    reviewDescriptionContent: {
    fontSize: DEVICE_WIDTH / 26
  }
});
