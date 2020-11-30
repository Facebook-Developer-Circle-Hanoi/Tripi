import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Linking,
  Dimensions,
} from "react-native";
import Theme from '../Theme/Color';
import ButtonViewDetail from "./ButtonViewDetail";
import ButtonSuggest from './ButtonSuggest';

export default function Article(props) {
  var navigation = props.navigation;

  const image_num = () => {
    var total =
      item.review + item.overall_score + parseInt(item.id);
    var result = total / 30;
    if (result > 100) {
      return Math.floor(result / 100) + item.star_number + item.name.length;
    } else if ((result < 100) & (result > 1)) {
      return Math.floor(result) + item.star_number + item.name.length;
    } else if (result < 1) {
      return Math.floor(result * 100) + item.star_number + item.name.length;
    }
  } 

  const trimWords = (str, numWords, more = '...') => {
    var countWords = str;
    countWords = countWords.replace(/(^\s*)|(\s*$)/gi, '');
    countWords = countWords.replace(/[ ]{2,}/gi, ' ');
    countWords = countWords.replace(/\n /, '\n');
    if (countWords.split(' ').length > numWords) {
      str = str.split(' ').splice(0, numWords).join(' ');
      str += more;
    }
    return str;
  }
        
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

  function formatNumber(num) {
    var num_new = Math.round(num)
    return num_new.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const price_update = (price) => {
    const p = '336,573,234';
    const regex = /[,]/gi;
    return formatNumber(parseInt(price.replace(regex, '')) * 1.55);
  }

  var j = 0;

  const item = props.data;

  const render_star = (number) => {
    var star = "★";
    if (number == 0) {
      return "☻";
    }
    return star.repeat(number);
  }

  const rank = (str) => {
    if (str < 10) {
      return "0." + str; 
    }
    var num_after = str.slice(1, 2);
    return str.slice(0, 1) + "." + num_after;
  };
  
  return (
    <View style={[styles.hotel, styles.shadow]}>
      <View style={styles.shadow}>
        <Image
          style={styles.hotelImage}
          source={{
            uri: item.image,
          }}
        />
      </View>
      <View style={styles.hotelBoxTitle}>
        <Text style={styles.hotelTitle}>{trimWords(item.name, 4)}</Text>
        <Text style={styles.hotelAddress}>{trimWords(item.address, 13)}</Text>
        <Text style={styles.review}>
          <Text style={styles.star}>《{render_star(item.star_number)}》</Text>
          <Text style={styles.rankNumber}>
            {" "}
            {rank(item.overall_score.toString())}{" "}
          </Text>
          {` ${item.review} đánh giá`}
        </Text>
      </View>
      <View style={styles.source}>
        <Text style={styles.sourceText}>{`#${item.provider}`}</Text>
      </View>
      <View style={styles.hotelDeal}>
        <Text style={styles.hotelPrice}>{`₫${price_update(item.price)}`}</Text>
        <ButtonViewDetail
          onPress={() => {
            // openLink(item.url, item.domain_id);
            navigation.push("HotelDetail", {
              data: item,
            });
          }}
          text="Chi TIết"
        ></ButtonViewDetail>
      </View>
      <View style={styles.suggest}>
        {item.suggest.slice(1, 3).map((item1) => {
          return (
            <ButtonSuggest
              key={item1.provider}
              price={item1.price}
              provider={item1.provider}
              onPress={() => {openLink(item1.url, item1.domain_id)}}
            />
          );
        })}
      </View>
    </View>
  );
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  hotel: {
    width: DEVICE_WIDTH - 30,
    height: 445,
    backgroundColor: "#fff",
    marginTop: 50,
    borderRadius: 10,
    position: "relative",
    paddingHorizontal: 10,
    marginBottom: 30
  },
  hotelTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 5,
    marginBottom: 0,
    textTransform: "capitalize"
  },
  hotelAddress: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  hotelBoxTitle: {
    paddingHorizontal: 15,
  },
  hotelImage: {
    width: DEVICE_WIDTH - 50,
    height: 240,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    zIndex: 1,
    position: "relative",
    top: -30,
  },
  source: {
    position: "absolute",
    zIndex: 2,
    left: 10,
    bottom: 200,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  sourceText: {
    color: Theme.COLORS.GRADIENT_START,
    fontSize: 16,
    textTransform: "uppercase",
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
  hotelDeal: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  hotelPrice: {
    fontSize: 22,
    fontWeight: "bold",
  },
  review: {
    fontSize: 16,
    position: "relative",
    left: -10,
  },
  star: {
    color: "#f9a825",
  },
  suggest: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    borderTopColor: "#eaeaea",
    borderStyle: "solid",
    borderTopWidth: 0.5,
  },
  rankNumber: {
    backgroundColor: "#eaeaea",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },
});