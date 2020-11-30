import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Linking, Alert } from "react-native";
import THEME from "../Theme/Color";
import ButtonViewDetail from "../components/ButtonViewDetail";
import NavbarBackDetail from "../navigation/NavbarBackDetail";

export default function Hotel(props) {
  const id = props.route.params.id;
  const [ReviewDetail, setReviewDetail] = useState({
    id_post: "",
    username: "thnguyen36",
    message: "Lên lịch tới Hà Giang ngay vì HOA TAM GIÁC MẠCH đã bắt đầu nở rồi! Mùa tam giác mạch ở Hà Giang bây giờ đã bắt đầu nở và đẹp nhất là cuối tháng 9 này đến hết tháng 12.",
    picture: "https://sworld.com.vn/wp-content/uploads/2019/03/5-1-e1582183709211.png",
    link_facebook: "https://www.facebook.com/groups/1390872991029042/permalink/1396914237091584/"
  });
  
  useEffect(() => {
    fetch_review(id);
  }, []);

  async function fetch_review() {
    fetch(
      "http://40.74.91.212/read_one_review_location.php?id="+id
      // `http://localhost/tripi/a.php?id=3808257`
    )
      .then(async (response) => {
        const data = await response.json();
        setReviewDetail(data.reviews[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const openLink = (url) => {
     if (url.length < 3){
       Alert.alert("Xin lỗi, hiện link đặt phòng đang bị lỗi 🥺");
       return;
     }
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Xin lỗi, hiện link đặt phòng đang bị lỗi");
        }
      });
   };

  return (
    <View style={styles.container}>
      <NavbarBackDetail
        name="Chi tiết bài viết"
        onPress={() => {
          props.navigation.goBack("Result");
        }}
      />
      <ScrollView
        contentContainerStyle={styles.containerScroll}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{
            uri: ReviewDetail.picture
          }}
          style={styles.imageHotel}
        />
        <View style={[styles.Hotel, styles.shadow]}>
          <View style={styles.hotelBoxTitle}>
            <Text style={styles.hotelAddress}>{ReviewDetail.message}</Text>
          </View>
          <ButtonViewDetail
            onPress={() => {
              openLink(ReviewDetail.link_facebook);
            }}
            text="Xem Chi Tiết"
            style={{ width: DEVICE_WIDTH - 20 }}
          ></ButtonViewDetail>
        </View>
      </ScrollView>
    </View>
  );
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerScroll: {
    width: DEVICE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  Hotel: {
    width: DEVICE_WIDTH - 20,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: THEME.COLORS.WHITE,
    zIndex: 1,
    top: -65,
    paddingTop: 15,
    paddingBottom: 15,
  },
  imageHotel: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH - 80,
    marginBottom: 10,
    zIndex: 0,
  },
  title: {
    width: DEVICE_WIDTH - 50,
    marginVertical: 10,
  },
  titleContent: {
    fontSize: DEVICE_WIDTH / 22,
    fontWeight: "600",
    color: "#333",
  },
  report: {
    width: DEVICE_WIDTH - 50,
  },
  textPriceHotel: {
    fontSize: 15,
    marginBottom: 8,
  },
  todayPriceHotel: {
    fontWeight: "700",
    fontSize: 18,
    color: "#36208e",
  },
  lowPriceHotel: {
    fontWeight: "700",
    fontSize: 16,
    color: "#26ae60",
  },
  highPriceHotel: {
    fontWeight: "700",
    fontSize: 16,
    color: "#eb5657",
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
  hotelTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  hotelAddress: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    // textAlign: "justify",
    padding: 6
  },
  hotelBoxTitle: {
    width: DEVICE_WIDTH - 50,
    marginBottom: 20
  },
  review: {
    alignItems: "center",
  },
  star: {
    color: "#f9a825",
    fontSize: 18,
    marginBottom: 5,
  },
  rankNumber: {
    backgroundColor: "#eaeaea",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },
  reviewLayout: {
    width: DEVICE_WIDTH - 20,
    paddingHorizontal: 15,
  },
  reviewSummarizationTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
  },
  reviewSummarization: {
    fontSize: 15,
    marginBottom: 10,
  },
});
