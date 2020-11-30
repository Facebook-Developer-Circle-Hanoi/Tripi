import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import THEME from "../Theme/Color";

export default function Weather() {
    const [weather, setWeather] = useState({
      temp_c: 28,
      condition: {
        text: "Có Mây",
        icon: "//cdn.weatherapi.com/weather/64x64/night/116.png",
      },
    });
    const [today, setToday] = useState("");

    useEffect(() => {
        fetchWeather();
        getToday();
    }, []);

    function getToday() {
    var objToday = new Date(),
        weekday = new Array(
        "CN",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7"
        ),
        dayOfWeek = weekday[objToday.getDay()],
        dayOfMonth =
        today + (objToday.getDate() < 10)
            ? "0" + objToday.getDate()
            : objToday.getDate(),
        months = new Array(
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
        ),
        curMonth = months[objToday.getMonth()];
    var today = dayOfWeek + ", " + dayOfMonth + " " + curMonth;
    setToday(today.toString());
    }

    async function fetchWeather() {
        fetch(
          `https://api.weatherapi.com/v1/current.json?key=cf138cc2dd4f4d12937161615201309&q=HaNoi&lang=vi`
        )
          .then(async (response) => {
            var data = await response.json();
            setWeather(data.current);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const trimWords = (str, numWords, more = "...") => {
      var countWords = str;
      countWords = countWords.replace(/(^\s*)|(\s*$)/gi, "");
      countWords = countWords.replace(/[ ]{2,}/gi, " ");
      countWords = countWords.replace(/\n /, "\n");
      if (countWords.split(" ").length > numWords) {
        str = str.split(" ").splice(0, numWords).join(" ");
        str += more;
      }
      return str;
    };
    
    return (
      <View style={styles.weatherForecast}>
        <View style={[styles.title, { paddingLeft: 0 }]}>
          <Image
            source={require("../../assets/icon/temperature.png")}
            style={styles.titleIcon}
          />
          <Text style={styles.titleContent}>Thời tiết hôm nay</Text>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#4d3da6", "#da71af"]}
          style={[styles.layoutWeather, styles.shadow]}
        >
          <View style={styles.infoWeather}>
            <Text style={styles.tempWeather}>{Math.ceil(weather.temp_c)}°</Text>
            <View style={styles.dateLocationWeather}>
              <Text style={styles.todayWeather}>{today}</Text>
              <Text style={styles.locationWeather}>Hà Nội</Text>
            </View>
          </View>
          <View style={styles.imageWeatherLayout}>
            <Image
              source={{ uri: "https:" + weather.condition.icon }}
              style={styles.imageWeather}
            />
            <Text style={styles.statusWeather}>
              {trimWords(weather.condition.text, 2)}
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
}
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
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
  weatherForecast: {
    flex: 4,
    marginTop: 30,
    paddingHorizontal: DEVICE_WIDTH / 30,
    marginBottom: 30,
  },
  layoutWeather: {
    height: 120,
    marginTop: 18,
    borderRadius: 14,
    flexDirection: "row",
  },
  infoWeather: {
    flex: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingTop: 22,
    position: "relative",
    flexDirection: "row",
  },
  tempWeather: {
    color: THEME.COLORS.WHITE,
    fontSize: 60,
    marginRight: 6,
  },
  dateLocationWeather: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    top: 7,
  },
  todayWeather: {
    width: 300,
    color: THEME.COLORS.WHITE,
    fontSize: 14,
  },
  locationWeather: {
    color: THEME.COLORS.WHITE,
  },
  imageWeatherLayout: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: DEVICE_WIDTH / 30,
    position: "relative",
  },
  imageWeather: {
    width: 85,
    height: 85,
    marginTop: -10,
  },
  statusWeather: {
    width: 130,
    textAlign: "center",
    color: "#fff",
    position: "absolute",
    bottom: 22,
    left: -72,
    fontWeight: "600",
  },
});