import React from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import { SignIn } from "../screens/SignInScreen";
import { Home } from "../screens/HomeScreen";

import { Profile } from "../screens/ProfileScreen";
import { CalendarScreen } from "../screens/CalendarScreen";
import { Text, Header, Card, Button, Icon, Image } from "react-native-elements";
import { Record } from "../screens/RecordScreen";

import { LogoutBtn } from "../components/LogoutBtn";

const headerStyle = {
  backgroundColor: "#01395c",
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const navigationOption = {
  headerTitle: (
    <Image
      source={require("../assets/images/logo.png")}
      style={{
        width: Dimensions.get("screen").width * 0.5,
        resizeMode: "contain"
      }}
    />
  ),
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "300",
    fontSize: 30,
    color: "hsl(0, 0%, 96%)",
    paddingBottom: 5
  },
  headerRight: <LogoutBtn />,
  headerStyle: headerStyle
};

export const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => navigationOption
  },
  Record: {
    screen: Record,
    navigationOptions: () => ({
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
      },
      headerStyle: headerStyle
    })
  }
});

export const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => navigationOption
  }
});

export const CalendarNavigator = createStackNavigator({
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: () => navigationOption
  }
});

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Calendar: {
      screen: CalendarNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="calendar" size={20} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={20} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor:'#7c96c8',
      inactiveTintColor:'white',
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#01395c"
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
