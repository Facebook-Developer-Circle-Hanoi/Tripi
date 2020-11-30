import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";

import THEME from "../Theme/Color";
import Button from "../components/ButtonLogin";

const storeData = async (NameStorage, value) => {
  try {
    await AsyncStorage.setItem(NameStorage, value);
  } catch (e) {
    // saving error
  }
};

const Error = ({ display = false }) => {
  const viewElement = useRef(null);

  useEffect(() => {
    if (display) {
      viewElement.current.animate("shake", 500, "linear");
    } else {
      viewElement.current.animate("bounceOut", 500);
    }
  }, [display]);

  const viewStyles = [styles.error, { opacity: 0 }];

  if (display) {
    viewStyles.push({ opacity: 1 });
  }

  return (
    <Animatable.View style={viewStyles} ref={viewElement}>
      <Text style={styles.errorText}>X</Text>
    </Animatable.View>
  );
};

const Input = ({ label, error, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.row}>
        <TextInput autoCapitalize="none" style={styles.input} {...props} />

        <Error display={error} />
      </View>
    </View>
  );
};

storeData("authhihi", "ho");

const useLoginFormState = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  let isUsernameValid = false;
  let isPasswordValid = false;

  if (username != "") {
    isUsernameValid = true;
  }

  if (password != "" && password.length >= 6) {
    isPasswordValid = true;
  }

  if (isPasswordValid == true && isUsernameValid == true && submit == true) {
    if (username == "micro" && password == "123456") {
      setSubmit(false);
      storeData("username", username);
      storeData("password", password);
      storeData("authhihi", "hi");
      navigation.push("Home", {
        name: "Nguyễn Nam Hồng",
        avatar: {uri: "https://freesharevn.com/wp-content/uploads/2019/04/anh-girl-xinh-de-thuong-1.jpg"}
      });
    }
  }

  return {
    username: {
      value: username,
      set: setUsername,
      valid: isUsernameValid,
    },
    password: {
      value: password,
      set: setPassword,
      valid: isPasswordValid,
    },
    submit: {
      value: submit,
      set: () => {
        setSubmit(true);
      },
    },
  };
};

export default function Login({ navigation }) {
  const { username, password, submit } = useLoginFormState({ navigation });
  useEffect(() => {
    _retrieveData();
  }, []);

  async function _retrieveData() {
    const value = await AsyncStorage.getItem("authhihi");
    try {
      if (value == "hi") {
        console.log(value);
        navigation.navigate("Home");
      }
    } catch (error) {
      
    }
  }
  return (
    <View>
      <ImageBackground
        source={require("../../assets/bg/bg.png")}
        style={styles.container}
      >
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="25">
          <View style={styles.layoutHeaderLogin}>
            <Image
              source={require("../../assets/icon/logo-noback.png")}
              style={styles.logo}
            />
            <Text style={styles.headerText}>OTA Đo' Đei</Text>
          </View>
          <Input
            label="Tài khoản"
            placeholder="micro"
            onChangeText={username.set}
            error={submit.value && !username.valid}
          />
          <Input
            label="Mật khẩu"
            placeholder="******"
            secureTextEntry
            onChangeText={password.set}
            error={submit.value && !password.valid}
          />
          <Button text="ĐĂNG NHẬP" onPress={submit.set} />
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: THEME.COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: DEVICE_WIDTH / 15,
    marginBottom: 10,
  },
  inputContainer: {
    width: DEVICE_WIDTH - 40,
    backgroundColor: THEME.COLORS.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: DEVICE_WIDTH / 30,
    color: THEME.COLORS.DEFAULT,
  },
  input: {
    color: THEME.COLORS.DEFAULT,
    fontWeight: "bold",
    fontSize: DEVICE_WIDTH / 23,
    marginTop: 3,
    marginRight: 10,
    flex: 1,
  },
  error: {
    backgroundColor: "#cc0011",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  logo: {
    width: DEVICE_WIDTH / 3 + 10,
    height: DEVICE_WIDTH / 2.9,
    marginBottom: 15,
  },
  layoutHeaderLogin: {
    alignItems: "center",
    // backgroundColor: "#333",
    marginBottom: 10,
  },
});
