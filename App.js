import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Facebook from 'expo-facebook';

// screens
import Result from "./src/screens/Result";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Logout from "./src/screens/Logout";
import HotelDetail from "./src/screens/HotelDetail";
import ReviewDetail from "./src/screens/ReviewDetail";
import AllReview from "./src/screens/AllReview";

// create Stack
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
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="HotelDetail"
                    component={HotelDetail}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="ReviewDetail"
                    component={ReviewDetail}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="AllReview"
                    component={AllReview}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}