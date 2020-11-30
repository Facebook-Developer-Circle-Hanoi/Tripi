import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

export default function Review(props) {
  const random = Math.floor(Math.random() * 100) + 1;
    return (
      <View style={styles.reviewUser} key={props.id}>
        <View style={styles.shadow}>
          <Image
            source={{
              uri: `http://40.74.91.212/images_avatar/${random}.jpg`,
            }}
            style={styles.avatarUser}
          />
        </View>
        <View style={styles.boxContentReview}>
          <Text style={styles.userReview}>{props.username}</Text>
          <Text style={styles.contentReview}>{props.content}</Text>
        </View>
      </View>
    );
}
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  reviewUser: {
    flexDirection: "row",
    marginTop: 14,
  },
  avatarUser: {
    width: DEVICE_WIDTH / 9,
    height: DEVICE_WIDTH / 9,
    borderRadius: 10,
    marginRight: 10,
  },
  contentReview: {
    width: DEVICE_WIDTH - 70 - DEVICE_WIDTH / 8,
    textAlign: "justify",
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 5,
  },
  boxContentReview: {
    backgroundColor: "#e5e6eb",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  userReview: {
    fontWeight: "700"
  },
});