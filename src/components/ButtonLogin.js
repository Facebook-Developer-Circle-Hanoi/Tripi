import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import THEME from "../Theme/Color";

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME.COLORS.GRADIENT_START,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Button;