import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import THEME from "../Theme/Color";

export default function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.button, styles.shadow]}
      onPress={props.onPress}
    >
      <Text style={styles.textButton}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    backgroundColor: THEME.COLORS.GRADIENT_START,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 15,
    textTransform: "uppercase",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});