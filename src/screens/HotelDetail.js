import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Linking, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit";
import THEME from "../Theme/Color";
import ButtonViewDetail from "../components/ButtonViewDetail";
import Reviews from "../components/Reviews";
import NavbarBackDetail from "../navigation/NavbarBackDetail";

export default function Hotel(props) {
  const [Label, setLabel] = useState([1,1,1,1]);
  const [Price, setPrice] = useState([1,1,1,1]);
  const [InfoPrice, setInfoPrice] = useState({
    price_max: 123,
    price_min: 123,
    price_medium: 123,
    price_today: 123,
  });
  const data = props.route.params.data != "" ? props.route.params.data : [];
  const PriceToday = data.price.replace(/[\,]/g,"");
  const domainHotelId = data.domain_hotel_id;
  const [Review, setReview] = useState([{username: "1"}]);
  const [ReviewSummarization, setReviewSummarization] = useState("");

  useEffect(() => {
    fetch_price();
    fetch_review();
  }, []);

  async function fetch_price() {
    fetch(
      `http://40.74.91.212/price.php?id=${domainHotelId}&price=${PriceToday}`
    )
      .then(async (response) => {
        const data = await response.json();
        var hi = data.result;
        setInfoPrice(data);
        var label = [];
        var price = [];
        hi.forEach((val) => {
          label.push(val.time);
          price.push(parseInt(val.price));
        });
        label.push("Today");
        price.push(parseInt(data.price_today));

        setLabel(label);
        setPrice(price);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function fetch_review() {
    fetch(
      `http://40.74.91.212/a.php?id=${domainHotelId}`
      // `http://localhost/tripi/a.php?id=3808257`
    )
      .then(async (response) => {
        const data = await response.json();
        if (data.all != "") {
          review_summarization(data.all);
          var data1 = [];
          for (const a of data.reviews) {
            if (parseInt(a.id) < 6) {
              data1.push(a);
            }
          }
          setReview(data1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function review_summarization(description) {
    fetch("https://hackcovy.herokuapp.com/summarization", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        contents: description,
        title: "",
        number: 3,
        keyword: [],
        hash: "edd64e8c6a95c2f85aa138c6abdf4a22",
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        setReviewSummarization(data.messages[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function format2(n, currency = "₫") {
    var a = n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    return currency + a.slice(0, a.length - 3);
  }

  function result_price() {
    var max = InfoPrice.price_max;
    var min = InfoPrice.price_min;
    var medium = InfoPrice.price_medium;
    var today = PriceToday;
    if ((max == min && min == medium && medium == PriceToday)) {
      return "Ở MỨC BÌNH THƯỜNG";
    } else if (today >= max) {
      return "Ở MỨC CAO NHẤT";
    } else if (today <= max && today >= medium && today < (max + medium) / 2) {
      return "Ở MỨC ƯU ĐÃI NHẸ";
    } else if (today <= max && today >= medium && today < (max + medium) / 2) {
      return "Ở MỨC ƯU ĐÃI LỚN";
    } else if (today >= min && today <= medium && today > (medium + min) / 2) {
      return "Ở MỨC ƯU ĐÃI CỰC LỚN";
    } else if (today >= min && today <= medium && today < (medium + min) / 2) {
      return "Ở MỨC GẦN THẤP NHẤT";
    } else if (min >= today) {
      return "Ở MỨC THẤP NHẤT";
    }
  }

  const render_star = (number) => {
    var star = "★";
    if (number == 0) {
      return "☻";
    }
    return star.repeat(number);
  };

  const rank = (str) => {
    if (str < 10) {
      return "0." + str;
    }
    var num_after = str.slice(1, 2);
    return str.slice(0, 1) + "." + num_after;
  };

  const openLink = (url, domain_id = 0) => {
     if (domain_id == 3) {
       var url = "https://www.agoda.com" + url;
     }
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
      name={data.name}
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
            uri: data.image,
          }}
          style={styles.imageHotel}
        />
        <View style={[styles.Hotel, styles.shadow]}>
          <View style={styles.hotelBoxTitle}>
            <View style={styles.review}>
              <Text style={styles.star}>
                《{render_star(data.star_number)}》
              </Text>
              <Text>
                Đánh giá:{" "}
                <Text style={styles.rankNumber}>
                  {" "}
                  {rank(data.overall_score.toString())}{" "}
                </Text>
              </Text>
            </View>
            <Text style={styles.hotelTitle}>{data.name}</Text>
            <Text style={styles.hotelAddress}>Địa chỉ: {data.address}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleContent}>Biến động giá</Text>
          </View>
          <View>
            <LineChart
              data={{
                labels: Label,
                datasets: [
                  {
                    data: Price,
                  },
                ],
              }}
              width={Dimensions.get("window").width - 30}
              height={220}
              yAxisLabel="₫"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#5b39c940",
                backgroundGradientFrom: "#5b39c940",
                backgroundGradientTo: "#ce7fd8",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#5b39c940",
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
          <View style={styles.report}>
            <Text style={styles.textPriceHotel}>
              Giá hiện tại:{" "}
              <Text style={styles.todayPriceHotel}>₫{data.price}</Text>
            </Text>
            <Text style={styles.textPriceHotel}>
              Thấp nhất:{" "}
              <Text style={styles.lowPriceHotel}>
                {format2(InfoPrice.price_min)}
              </Text>{" "}
              - Cao nhất:{" "}
              <Text style={styles.highPriceHotel}>
                {format2(InfoPrice.price_max)}
              </Text>
            </Text>
            <Text style={styles.textPriceHotel}>
              Giá khách sạn đang
              <Text style={styles.highPriceHotel}> {result_price()}</Text>
            </Text>
          </View>
          <ButtonViewDetail
            onPress={() => {
              openLink(data.url, data.domain_id);
            }}
            text="Đặt ngay"
            style={{ width: DEVICE_WIDTH - 20 }}
          ></ButtonViewDetail>
          <View style={styles.title}>
            <Text style={styles.titleContent}>Đánh giá</Text>
          </View>
          <View style={styles.reviewLayout}>
            <Text style={styles.reviewSummarizationTitle}>
              Tóm tắt đánh giá khách hàng
            </Text>
            <Text style={styles.reviewSummarization}>
              {ReviewSummarization.text}
            </Text>
            <Text style={styles.reviewSummarizationTitle}>
              Đánh giá khách hàng
            </Text>
            {Review.map((item) => {
              if (item.username != "1") {
                return (
                  <Reviews
                    key={item.id}
                    content={item.text}
                    username={item.username}
                  ></Reviews>
                );
              } else {
                return <Text key="0">Không có đánh giá</Text>;
              }
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
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
  chart: {
    borderRadius: 10,
    marginBottom: 10,
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
  },
  hotelBoxTitle: {
    width: DEVICE_WIDTH - 50,
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
