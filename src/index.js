import React from "react";
import { registerRootComponent } from "expo";
import { Text, View, StyleSheet, Button } from "react-native";
import { createStore } from 'redux';
import { Provider } from "react-redux";

let store = createStore();

import allReducers from './reducers';

let store = createStore(allReducers);

const App = () => {
    <Provider store={store}>

    </Provider>
}

registerRootComponent(App);