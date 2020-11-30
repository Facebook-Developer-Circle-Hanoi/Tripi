import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Articles from "../components/Articles";
import NavbarBack from "../navigation/NavbarBack";

export default function Result(props) {
  const keyword = props.route.params.key;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetch_data = async (keyword) => {
    setLoading(true);
    var hi = pageNumber;
    hi++;
    fetch(`http://40.74.91.212/read_hotel.php?page=${pageNumber}&key=${keyword}`)
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

  useEffect(() => {
    fetch_data(keyword);
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
        name={keyword}
        onPress={() => {
          props.navigation.goBack("Home");
        }}
      ></NavbarBack>
      <FlatList
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator="false"
        data={articles}
        keyExtractor={(item) => item.id}
        onEndReached={() => fetch_data(keyword)}
        ListFooterComponent={
          <ActivityIndicator size="large" loading={loading} />
        }
        renderItem={({ item }) => {
          return (
            <Articles navigation={props.navigation} data={item}></Articles>
          );
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 50
  },
});
