import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// screens
import Result from "./src/screens/Result";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Logout from "./src/screens/Logout";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Result"
          component={Result}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Logout"
          component={Logout}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}