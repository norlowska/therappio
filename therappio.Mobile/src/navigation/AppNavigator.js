import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Main: BottomTabNavigator,
    Auth: AuthStack
  }),
  {
    initialRouteName: "AuthLoading"
  }
);
